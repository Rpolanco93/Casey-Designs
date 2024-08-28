#!/usr/bin/env bash

# Get script execution directory
BASE_DIRECTORY="$( cd -P "$( /usr/bin/dirname "$( /usr/bin/readlink -f "${0}" )" )" && /bin/pwd )"

# Log
echo "CWD             : ${BASE_DIRECTORY}"
echo "Database URL    : ${DATABASE_URL}"
echo "Schema          : ${SCHEMA}"
echo "Database Reset  : ${DATABASE_RESET}"
echo "Database Migrate: ${DATABASE_MIGRATE}"
echo "Database Seed   : ${DATABASE_SEED}"

# Reset database if requested
if [ "${DATABASE_RESET}" = true ]; then
    # Log
    echo "Resetting database schema ${SCHEMA}"

    # Clean
    /var/www/migrations/migrate clean

    # Log
    echo "Reset database schema ${SCHEMA}"
else
    # Log
    echo "Skipping resetting database schema ${SCHEMA}"
fi


# Migrate database if requested
if [ "${DATABASE_MIGRATE}" = true ]; then
    # Log
    echo "Running database migrations for schema ${SCHEMA}"

    # Migrate
    /var/www/migrations/migrate migrate

    # Log
    echo "Ran database migrations for schema ${SCHEMA}"
else
    # Log
    echo "Skipping migrations"
fi

# Seed database if requested
if [ "${DATABASE_SEED}" = true ]; then
    # Log
    echo "Seeding database"

    # Seed
    flask seed all

    # Log
    echo "Seeded database"
else
  # Log
  echo "Skipping seeding"
fi

# Log
echo "Starting webserver"

# Start application
# Need either --bind 0.0.0.0:8000 + -p 8000:8000 in docker run or
# CMD gunicorn --access-logfile - --error-logfile - --bind 0.0.0.0:8000 app:app
# no --bind 0.0.0.0:8000 + --network="host" in docker run
gunicorn --access-logfile - --error-logfile - app:app
