#!/bin/bash


export FLASK_APP=app.py  
export FLASK_ENV=development

# Run the Flask app in the background, hide terminal output
python app.py &

FLASK_PID=$!

sleep 2

xdg-open http://127.0.0.1:5000


sleep 1  # Wait a moment to ensure the terminal is fully ready
wmctrl -r :ACTIVE: -b add,hidden

wait $FLASK_PID
