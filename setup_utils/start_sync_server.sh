#!/bin/bash

set -u

TOPIC="db_init"
SUB_DIR="/tmp/pubsub"

# Function to wait for message on a topic
wait_for_message() {
    while [ ! -f "$SUB_DIR/$TOPIC" ]; do
        sleep 1
    done
    # Read message from topic file
    MESSAGE=$(cat "$SUB_DIR/$TOPIC")
    echo "Received message: $MESSAGE"
}

# Wait for message on the specified topic
wait_for_message


cd /app/backend/analytics_server
if [ "$ENVIRONMENT" == "prod" ]; then
  /opt/venv/bin/gunicorn -w 2 -b 0.0.0.0:9697 --timeout 0 sync_app:app
else
  /opt/venv/bin/gunicorn -w 2 -b 0.0.0.0:9697 --timeout 0 --reload sync_app:app
fi
