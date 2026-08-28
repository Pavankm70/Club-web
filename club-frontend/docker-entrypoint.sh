#!/bin/sh
set -e

# Substitute environment variables into the nginx config template.
# BACKEND_URL is the Render internal/service URL of the backend, e.g. https://api.onrender.com
BACKEND_URL="${BACKEND_URL:-http://localhost:8080}"

envsubst '${BACKEND_URL}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf

exec "$@"
