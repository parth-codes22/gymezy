import os
import time
import random
import decimal
import boto3
import pandas as pd
from flask import Flask, jsonify, request, render_template
from flask_cors import CORS
from dotenv import load_dotenv
from threading import Thread

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Initialize DynamoDB resource
dynamodb = boto3.resource(
    'dynamodb',
    aws_access_key_id=os.getenv('AWS_ACCESS_KEY_DB'),
    aws_secret_access_key=os.getenv('AWS_SECRET_KEY_DB'),
    region_name=os.getenv('AWS_REGION_DB'),
)

table_name = 'GymManagement'
table = dynamodb.Table(table_name)

# Global variables to store the latest machine statuses and interval
current_machines = []
update_interval = 10
running = False

def convert_decimals(obj):
    """ Recursively converts DynamoDB Decimal values to int or float """
    if isinstance(obj, list):
        return [convert_decimals(i) for i in obj]
    elif isinstance(obj, dict):
        return {k: convert_decimals(v) for k, v in obj.items()}
    elif isinstance(obj, decimal.Decimal):
        return int(obj) if obj % 1 == 0 else float(obj) 
    return obj

def update_statuses():
    global current_machines, running
    while running:
        machines = table.scan().get('Items', [])
        for machine in machines:
            new_status = random.choice([0, 1])
            table.update_item(
                Key={'ID': machine['ID']},
                UpdateExpression='SET #st = :val',
                ExpressionAttributeNames={'#st': 'Status'},
                ExpressionAttributeValues={':val': decimal.Decimal(new_status)}
            )
        
        current_machines = convert_decimals(table.scan().get('Items', []))
        print("Updated machine statuses in global variable.")
        time.sleep(update_interval)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get_occupancy', methods=['GET'])
def get_occupancy():
    return jsonify(current_machines)

@app.route('/start', methods=['POST'])
def start():
    global running
    if not running:
        running = True
        Thread(target=update_statuses, daemon=True).start()
    return jsonify({"message": "Started updating statuses"})

@app.route('/stop', methods=['POST'])
def stop():
    global running
    running = False
    return jsonify({"message": "Stopped updating statuses"})

@app.route('/set_interval', methods=['POST'])
def set_interval():
    global update_interval
    data = request.json
    update_interval = max(1, int(data.get("interval", 10)))
    return jsonify({"message": f"Interval set to {update_interval} seconds"})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)