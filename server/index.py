from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
from datetime import datetime

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Load dummy data from Excel files (mocked as dictionaries here)
users_data = pd.DataFrame({
    "ID": [1, 2, 3, 4, 5],
    "Username": ["alice01", "bob22", "charlie3", "david_d", "eve.e"],
    "Password": ["pass123", "bob@321", "charlie!23", "david$pass", "eve#123"]
})

availability_data = pd.DataFrame([
    [1, 4, "D-04", "2025-03-02 02:53:04", "2025-03-02 03:15:04"],
    [2, 5, "R-03", "2025-03-02 02:28:04", "2025-03-02 02:49:04"],
    [3, 4, "R-03", "2025-03-02 02:57:04", "2025-03-02 03:26:04"],
    [4, 3, "D-04", "2025-03-02 03:04:04", "2025-03-02 03:39:04"],
    [5, 4, "R-03", "2025-03-02 02:53:04", "2025-03-02 03:29:04"],
    [6, 1, "T-01", "2025-03-02 03:14:04", "2025-03-02 03:55:04"],
    [6, 1, "T-02", "2025-03-02 03:14:04", "2025-03-02 03:55:04"],
    [6, 1, "T-03", "2025-03-02 03:14:04", "2025-03-02 03:55:04"],
    [6, 1, "T-04", "2025-03-02 03:14:04", "2025-03-02 03:55:04"],
    [6, 1, "T-01", "2025-03-02 03:14:04", "2025-03-02 03:55:04"],
    [7, 1, "C-02", "2025-03-02 02:35:04", "2025-03-02 03:16:04"],
    [8, 3, "T-01", "2025-03-02 02:45:04", "2025-03-02 03:20:04"],
    [9, 2, "T-01", "2025-03-02 03:18:04", "2025-03-02 03:46:04"],
    [10, 3, "T-01", "2025-03-02 02:41:04", "2025-03-02 03:02:04"]
], columns=["ID", "UserID", "MachineID", "StartTime", "EstEndTime"])

machines = {1: "Treadmill", 2: "Cycling", 3: "Rowing", 4: "Dumbbells"}
machine_counts = {"Treadmill": 4, "Cycling": 4, "Rowing": 3, "Dumbbells": 10}

# Dummy dataset
machines = [
    {"ID": 1, "MachineID": "T-01", "Status": [1, 1, 1, 1, 1]},
    {"ID": 2, "MachineID": "T-02", "Status": [0, 1, 1, 0, 1]},
    {"ID": 3, "MachineID": "T-03", "Status": [1, 1, 0, 1, 0]},
    {"ID": 4, "MachineID": "T-04", "Status": [0, 0, 0, 0, 0]},
    {"ID": 5, "MachineID": "T-05", "Status": [1, 1, 1, 1, 1]},
    {"ID": 6, "MachineID": "C-01", "Status": [0, 0, 0, 0, 0]},
    {"ID": 7, "MachineID": "C-02", "Status": [1, 1, 0, 1, 0]},
    {"ID": 8, "MachineID": "C-03", "Status": [1, 0, 1, 1, 1]},
    {"ID": 9, "MachineID": "C-04", "Status": [0, 1, 0, 0, 0]},
    {"ID": 10, "MachineID": "C-05", "Status": [1, 1, 0, 1, 0]},
    {"ID": 11, "MachineID": "D-10", "Status": [1, 1, 1, 1, 1]},
    {"ID": 12, "MachineID": "D-11", "Status": [0, 1, 0, 0, 0]},
    {"ID": 13, "MachineID": "D-12", "Status": [1, 0, 1, 1, 1]},
    {"ID": 14, "MachineID": "D-13", "Status": [1, 0, 0, 1, 0]},
    {"ID": 15, "MachineID": "D-14", "Status": [0, 0, 0, 0, 0]},
    {"ID": 16, "MachineID": "D-15", "Status": [1, 1, 1, 0, 1]},
    {"ID": 17, "MachineID": "D-16", "Status": [1, 0, 0, 1, 0]},
    {"ID": 18, "MachineID": "D-17", "Status": [1, 0, 0, 1, 0]},
    {"ID": 19, "MachineID": "D-18", "Status": [1, 1, 1, 1, 1]},
    {"ID": 20, "MachineID": "D-19", "Status": [0, 0, 0, 0, 0]},
    {"ID": 21, "MachineID": "D-20", "Status": [0, 1, 0, 0, 0]},
    {"ID": 22, "MachineID": "R-01", "Status": [1, 1, 1, 1, 1]},
    {"ID": 23, "MachineID": "R-02", "Status": [1, 1, 1, 1, 1]},
    {"ID": 24, "MachineID": "R-03", "Status": [1, 0, 1, 1, 1]},
    {"ID": 25, "MachineID": "R-04", "Status": [1, 1, 1, 1, 1]},
    {"ID": 26, "MachineID": "R-05", "Status": [1, 1, 1, 1, 1]},
]

count = 0
@app.route('/get_occupancy', methods=['GET'])
def get_occupancy():
    global count
    column_index = count % 5
    count += 1

    response = []
    for machine in machines:
        response.append({
            "ID": machine["ID"],
            "MachineID": machine["MachineID"],
            "Status": machine["Status"][column_index]
        })

    return jsonify(response)

@app.route("/login", methods=["POST"])
def login():
    data = request.json
    user = users_data[(users_data["Username"] == data["username"]) & (users_data["Password"] == data["password"])]
    if not user.empty:
        return jsonify({"message": "Login successful", "user_id": int(user.iloc[0]["ID"])}), 200
    return jsonify({"message": "Invalid credentials"}), 401

@app.route("/machine_status", methods=["GET"])
def machine_status():
    now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    machine_status_data = {}
    
    for machine_id, machine_name in machines.items():
        occupied = availability_data[(availability_data["MachineID"] == machine_id) & (availability_data["EstEndTime"] > now)]
        occupied_count = occupied.shape[0]
        available_count = machine_counts[machine_name] - occupied_count
        
        machine_list = []
        for i in range(1, machine_counts[machine_name] + 1):
            machine_status = "Occupied" if occupied_count >= i else "Available"
            est_available_time = occupied["EstEndTime"].max() if machine_status == "Occupied" else "Available"
            machine_list.append({
                "machineID": f"{machine_name[0]}-{i:02}",
                "Status": machine_status,
                "EstAvailableTime": est_available_time
            })
        
        machine_status_data[machine_name.lower()] = machine_list
    
    return jsonify(machine_status_data)

# if __name__ == "__main__":
#     app.run(debug=True)
