#!/usr/bin/env bash

# Get script execution directory
BASE_DIRECTORY="$( cd -P "$( dirname "$( readlink -f "${BASH_SOURCE[0]}" )" )" && pwd )"

# Source helper
source "${BASE_DIRECTORY}/helper.sh"

# Migrate
"${_FLYWAY}" migrate \
    -url="${SCHEME}//${HOST}/${DATABASE}" \
    -user="${USERNAME}" \
    -password="${PASSWORD}" \
    -schemas="${SCHEMA}" \
    -locations="filesystem:${BASE_DIRECTORY}/../../../sql"

#google flyway migrate to review this
