import os
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_socketio import SocketIO
import boto3
import random
import pandas as pd
import time
from dotenv import load_dotenv

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
socketio = SocketIO(app, cors_allowed_origins="*")

# Initialize DynamoDB resource
dynamodb = boto3.resource(
    'dynamodb',
    aws_access_key_id=os.getenv('AWS_ACCESS_KEY_DB'),
    aws_secret_access_key=os.getenv('AWS_SECRET_KEY_DB'),
    region_name=os.getenv('AWS_REGION_DB'),
)
table_name = 'GymManagement'  # Change to your actual table name
table = dynamodb.Table(table_name)

users_data = pd.DataFrame({
    "ID": [1, 2, 3, 4, 5],
    "Username": ["alice01", "bob22", "charlie3", "david_d", "eve.e"],
    "Password": ["pass123", "bob@321", "charlie!23", "david$pass", "eve#123"]
})

import decimal

def convert_decimals(obj):
    """ Recursively converts DynamoDB Decimal values to int or float """
    if isinstance(obj, list):
        return [convert_decimals(i) for i in obj]
    elif isinstance(obj, dict):
        return {k: convert_decimals(v) for k, v in obj.items()}
    elif isinstance(obj, decimal.Decimal):
        return int(obj) if obj % 1 == 0 else float(obj)  # Convert to int if no decimals, else float
    return obj

def update_statuses():
    while True:
        machines = table.scan().get('Items', [])
        for machine in machines:
            new_status = random.choice([0, 1])
            table.update_item(
                Key={'ID': machine['ID']},
                UpdateExpression='SET #st = :val',
                ExpressionAttributeNames={'#st': 'Status'},
                ExpressionAttributeValues={':val': decimal.Decimal(new_status)}
            )

        updated_machines = table.scan().get('Items', [])
        updated_machines = convert_decimals(updated_machines)
        socketio.emit('update', {'machines': updated_machines})
        print("Updated machine statuses and emitted data.")
        time.sleep(10)

@app.route('/get_occupancy', methods=['GET'])
def get_occupancy():
    machines = table.scan().get('Items', [])
    return jsonify(machines)

@app.route("/login", methods=["POST"])
def login():
    data = request.json
    user = users_data[(users_data["Username"] == data["username"]) & (users_data["Password"] == data["password"])]
    if not user.empty:
        return jsonify({"message": "Login successful", "user_id": int(user.iloc[0]["ID"])}), 200
    return jsonify({"message": "Invalid credentials"}), 401

if __name__ == '__main__':
    socketio.start_background_task(update_statuses)
    socketio.run(app, host='0.0.0.0', port=5000, debug=True, allow_unsafe_werkzeug=True)