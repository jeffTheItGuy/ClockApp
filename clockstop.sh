#!/bin/bash


# Find the process ID of the running Flask app
FLASK_PID=$(pgrep -f "python app.py")

if [ -n "$FLASK_PID" ]; then
    echo "Stopping Flask app with PID: $FLASK_PID"
    kill $FLASK_PID
else
    echo "No Flask app is running."
fi


echo "Flask app has been terminated."
