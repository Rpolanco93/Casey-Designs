#!/usr/bin/env bash

# Get script execution directory
base_directory() {
  cd -P "$( dirname "$( readlink -f "${BASH_SOURCE[0]}" )" )" && pwd
}

# Source env if DATABASE_URL isn't present
if [ -z "${DATABASE_URL}" ]; then
    source "$(base_directory)/../../../../.env"
fi

# Flyway
_FLYWAY="$(base_directory)/../../bin/flyway/flyway"

# Parse connection string
IFS=' ' read -r SCHEME USERNAME PASSWORD HOST DATABASE < <(sed 's/^\(.*:\)\/\/\(.*\):\(.*\)@\(.*\)\/\(.*\)$/jdbc:\1 \2 \3 \4 \5/' <<< "${DATABASE_URL}")

# Export database connection variables
export SCHEME
export USERNAME
export PASSWORD
export HOST
export DATABASE
