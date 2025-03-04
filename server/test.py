from flask import Flask, jsonify
import time

app = Flask(__name__)

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

if __name__ == '__main__':
    app.run(debug=True)
