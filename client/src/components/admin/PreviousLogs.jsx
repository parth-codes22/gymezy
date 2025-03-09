import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip } from "@heroui/react";
import React from 'react'

const PreviousLogs = () =>  {
  const data = [
    {
      timestamp: "13:30:41",
      equipmentType: "Treadmill",
      equipmentId: "T01",
      ultrasonicReading: "41.31769751 cm",
      loadSensorReading: "0 KG",
      occupancyStatus: "1 (Occupied)"
    },
    {
      timestamp: "13:30:41",
      equipmentType: "Dumbbell",
      equipmentId: "D01",
      ultrasonicReading: "100 cm",
      loadSensorReading: "80.90902666 KG",
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