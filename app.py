from flask import Flask, render_template, request, jsonify

import json
import os


app = Flask(__name__)

# Path to save the JSON data
SAVE_PATH = os.path.join(os.getcwd(), 'task_data.json')


# Home page where users can enter task details
@app.route('/', methods=['GET', 'POST'])

def home():
    task_name = request.args.get('task_name')
    stopwatch_time = request.args.get('stopwatch_time')
    return render_template('index.html', task_name=task_name, stopwatch_time=stopwatch_time)

@app.route('/save_task', methods=['POST'])
def save_task():
    try:
        # Get data from the POST request
        data = request.json
        
        # Load existing data from the file if it exists
        if os.path.exists(SAVE_PATH):
            with open(SAVE_PATH, 'r') as file:
                existing_data = json.load(file)
        else:
            existing_data = []

        # Append new data to the existing data
        existing_data.append(data)

        # Save the updated data back to the file
        with open(SAVE_PATH, 'w') as file:
            json.dump(existing_data, file, indent=4)

        return jsonify({"message": "Task saved successfully!"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
