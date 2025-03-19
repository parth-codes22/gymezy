import os
import decimal
import boto3
import pandas as pd
from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
import pandas as pd

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
log_table = dynamodb.Table("GymLogs")

def convert_decimals(obj):
    """ Recursively converts DynamoDB Decimal values to int or float """
    if isinstance(obj, list):
        return [convert_decimals(i) for i in obj]
    elif isinstance(obj, dict):
        return {k: convert_decimals(v) for k, v in obj.items()}
    elif isinstance(obj, decimal.Decimal):
        return int(obj) if obj % 1 == 0 else float(obj) 
    return obj

@app.route('/')
def index():
    return "Welcome to GymEzy Backend Server"

@app.route("/get_update", methods=["GET"])
def get_update():
    """Returns the latest collected data."""
    response = log_table.scan(
        TableName="GymLogs",
    )
    
    items = response.get('Items', [])
    
    def get_log_id(item):
        log_id = item.get('LogID')
        if isinstance(log_id, dict) and 'N' in log_id:
            return int(log_id['N'])
        elif isinstance(log_id, decimal.Decimal):
            return int(log_id)
        return 0
    
    sorted_logs = sorted(items, key=get_log_id, reverse=True)
    
    return jsonify(sorted_logs), 200

users_data = pd.DataFrame({
    "ID": [1, 2, 3, 4, 5],
    "Username": ["alice01", "bob22", "charlie3", "david_d", "eve.e"],
    "Password": ["pass123", "bob@321", "charlie!23", "david$pass", "eve#123"]
})

@app.route("/login", methods=["POST"])
def login():
    data = request.json
    user = users_data[(users_data["Username"] == data["username"]) & (users_data["Password"] == data["password"])]
    if not user.empty:
        return jsonify({"message": "Login successful", "user_id": int(user.iloc[0]["ID"])}), 200
    return jsonify({"message": "Invalid credentials"}), 401


# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=5000, debug=True)