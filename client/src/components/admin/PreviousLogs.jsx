import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip } from "@heroui/react";
import React from 'react'

const PreviousLogs = () =>  {
  const data = [
    {
      timestamp: "13:32:15",
      equipmentType: "Bench Press",
      equipmentId: "B02",
      ultrasonicReading: "50.567893 cm",
      loadSensorReading: "60.234567 KG",
      occupancyStatus: "1 (Occupied)"
    },
    {
      timestamp: "13:33:05",
      equipmentType: "Squat Rack",
      equipmentId: "S01",
      ultrasonicReading: "120 cm",
      loadSensorReading: "0 KG",
      occupancyStatus: "0 (Available)"
    },
    {
      timestamp: "13:33:45",
      equipmentType: "Leg Press",
      equipmentId: "L01",
      ultrasonicReading: "42.876543 cm",
      loadSensorReading: "95.123456 KG",
      occupancyStatus: "1 (Occupied)"
    },
    {
      timestamp: "13:34:20",
      equipmentType: "Pull-up Bar",
      equipmentId: "PB01",
      ultrasonicReading: "150 cm",
      loadSensorReading: "0 KG",
      occupancyStatus: "0 (Available)"
    },
    {
      timestamp: "13:35:10",
      equipmentType: "Rowing Machine",
      equipmentId: "RM02",
      ultrasonicReading: "38.987654 cm",
      loadSensorReading: "30.567890 KG",
      occupancyStatus: "1 (Occupied)"
    },
    {
      timestamp: "13:36:02",
      equipmentType: "Elliptical",
      equipmentId: "E01",
      ultrasonicReading: "110 cm",
      loadSensorReading: "0 KG",
      occupancyStatus: "0 (Available)"
    }
  ];  

  return (
    <div>
      <div className="flex justify-around"><p className="text-3xl font-bold">Logs</p><Chip variant="dot" color="success" size="lg">Live</Chip></div><br />
      <Table aria-label="Equipment Status Table">
        <TableHeader>
          <TableColumn>TimeStamp</TableColumn>
          <TableColumn>Equipment Type</TableColumn>
          <TableColumn>Equipment ID</TableColumn>
          <TableColumn>Ultrasonic Reading</TableColumn>
          <TableColumn>Load Sensor Reading</TableColumn>
          <TableColumn>Occupancy Status</TableColumn>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.timestamp}</TableCell>
              <TableCell>{item.equipmentType}</TableCell>
              <TableCell>{item.equipmentId}</TableCell>
              <TableCell>{item.ultrasonicReading}</TableCell>
              <TableCell>{item.loadSensorReading}</TableCell>
              <TableCell>{item.occupancyStatus}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default PreviousLogs;