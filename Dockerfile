# Container starting image
FROM python:3.9.19-slim-bookworm

# Install wget, build-essentials, libpq-dev, nodejs, npm; then purge caches
RUN : \
    && apt-get update \
    && DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
        wget \
        build-essential \
        libpq-dev \
        nodejs \
        npm \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Load environment variables
ARG DATABASE_URL
ARG SCHEMA
ARG DATABASE_RESET=false
ARG DATABASE_MIGRATE=true
ARG DATABASE_SEED=true
ARG FLASK_APP=app
ARG FLASK_ENV=production
ARG SECRET_KEY

# Log
RUN echo "Flask App        : ${FLASK_APP}"
RUN echo "Flask Environment: ${FLASK_ENV}"
RUN echo "Secret Key       : ${SECRET_KEY}"

# Set working directory to "/var/www"
WORKDIR /var/www

# Copy application with respect to .dockerignore
COPY . .

# Log layout
# RUN find .

# Set working directory to "/var/www/migrations/tools/bin"
WORKDIR /var/www/migrations/tools/bin

# Install flyway
RUN wget -qO- https://download.red-gate.com/maven/release/com/redgate/flyway/flyway-commandline/10.17.2/flyway-commandline-10.17.2-linux-x64.tar.gz | tar -xvz

# Create symlink
RUN ln -s flyway-10.17.2 flyway

# Set working directory to "/var/www/react-vite"
WORKDIR /var/www/react-vite

# Install required node-modules
RUN npm install

# Build front-end
RUN npm run docker

# Move dist folder
RUN mv --verbose dist ../

# Set working directory to "/var/www"
WORKDIR /var/www/

# Clear react-vite and recreate folder
RUN rm -rf react-vite
RUN mkdir react-vite

# Move dist folder back into expected location
RUN mv --verbose dist react-vite/

# Set working directory to "/var/www"
WORKDIR /var/www

# Upgrade pip
RUN pip install --upgrade pip

# Install pipenv to generate requirements file
RUN pip install pipenv
RUN pipenv requirements > requirements.txt
RUN pip uninstall -y pipenv

# Install python dependecies
RUN pip install -r requirements.txt

# Remove wget, build-essential, libpq-dev, nodejs, npm
RUN : \
    && apt-get -y purge \
        wget \
        build-essential \
        libpq-dev \
        nodejs \
        npm

# Log layout
# RUN find .

# Run webserver (need to specify full path)
CMD /var/www/run.sh
