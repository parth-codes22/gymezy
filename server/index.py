from datetime import datetime, timedelta
import os
import decimal
import random
import uuid
import bcrypt
import boto3
import jwt as pyjwt
from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv

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
table_name = 'GymManagement'
table = dynamodb.Table(table_name)

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

@app.route('/get_occupancy', methods=['GET'])
def get_occupancy():
    machines = table.scan().get('Items', [])
    
    for machine in machines:
        new_status = random.choice([0, 1])
        table.update_item(
            Key={'ID': machine['ID']},
            UpdateExpression='SET #st = :val',
            ExpressionAttributeNames={'#st': 'Status'},
            ExpressionAttributeValues={':val': decimal.Decimal(new_status)}
        )
    
    updated_machines = convert_decimals(table.scan().get('Items', []))
    return jsonify(updated_machines)

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
    
    sorted_logs = sorted(items, key=get_log_id)
    
    return jsonify(sorted_logs), 200


# JWT Secret Key
SECRET_KEY = os.getenv("JWT_SECRET_KEY", "your_secret_key")

users_table = dynamodb.Table("GymUsers")  # Your DynamoDB users table

def hash_password(password):
    """Hash password before storing in DynamoDB"""
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(password.encode("utf-8"), salt).decode("utf-8")

def check_password(password, hashed):
    """Check if entered password matches stored hash"""
    return bcrypt.checkpw(password.encode("utf-8"), hashed.encode("utf-8"))


@app.route("/register", methods=["POST"])
def register():
    """Registers a new user and stores data in DynamoDB"""
    data = request.json
    username = data.get("username")
    password = data.get("password")
    email = data.get("email")
    gender = data.get('gender')
    age = data.get('age')
    name = data.get('name')

    if not username or not password or not email:
        return jsonify({"message": "All fields are required"}), 400

    # Check if user already exists
    response = users_table.scan(
        FilterExpression="Username = :username OR Email = :email",
        ExpressionAttributeValues={":username": username, ":email": email}
    )
    if response.get("Items"):  # If any existing user is found
        return jsonify({"message": "Username or Email already exists"}), 409

    # Generate unique MemberID (UUID)
    member_id = str(uuid.uuid4())

    # Store user in DynamoDB
    users_table.put_item(
        Item={
            "ID": member_id,
            "Username": username,
            "Email": email,
            "Password": hash_password(password),
            "Name": name,
            "Gender": gender,
            "Age": age,
            "CreatedAt": datetime.utcnow().isoformat(),
            "Role": "user"
        }
    )

    return jsonify({"message": "User registered successfully", "member_id": member_id}), 201

@app.route("/login", methods=["POST"])
def login():
    """Authenticates user and returns a JWT token"""
    data = request.json
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"message": "Username and password are required"}), 400

    # Fetch user from DynamoDB
    response = users_table.scan(FilterExpression="Username = :username", ExpressionAttributeValues={":username": username})
    users = response.get("Items", [])

    if not users:
        return jsonify({"message": "Invalid credentials"}), 401

    user = users[0]  # Get first matching user

    # Verify password
    if not check_password(password, user["Password"]):
        return jsonify({"message": "Invalid credentials"}), 401

    # Generate JWT Token with 2-day expiration
    expiration_time = datetime.utcnow() + timedelta(days=2)
    token = pyjwt.encode({"id": user["ID"], "email": user["Email"], "role": user["Role"], "exp": expiration_time}, SECRET_KEY, algorithm="HS256")

    return jsonify({"message": "Login successful", "token": token, "user": {"id": user["ID"], "username": user["Username"]}}), 200

# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=5000, debug=True)