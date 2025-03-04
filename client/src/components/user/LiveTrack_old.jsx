import React, { useEffect, useState } from 'react';
import { addToast } from '@heroui/react';
import axios from '../../axios';

const LiveTrack = () => {
  const [machineData, setMachineData] = useState({});

  useEffect(() => {
    getData();
    const interval = setInterval(getData, 10000);
    return () => clearInterval(interval);
  }, []);
  
  const transformMachineData = (serverData) => {
    const transformedData = {};
  
    serverData.forEach((machine) => {
      const machineType = machine.MachineID.split('-')[0];
      
      if (!transformedData[machineType]) {
        transformedData[machineType] = {
          totalAvailable: 0,
          EstAvailableTime: "N/A",
          data: []
        };
      }
      
      const status = machine.Status === 1 ? "Available" : "Occupied";
      if (status === "Available") {
        transformedData[machineType].totalAvailable += 1;
      }
      
      transformedData[machineType].data.push({
        machineID: machine.MachineID,
        Status: status,
        EstAvailableTime: status === "Occupied" ? "Unknown" : "Now"
      });
    });
  
    return transformedData;
  };  

  const getData = async () => {
    try {
      const { data } = await axios.get("/get_occupancy");
      const transformedData = transformMachineData(data);
      setMachineData(transformedData);
    } catch (error) {
      console.log(error);
      addToast({
        title: "Failed to get Live Status",
        description: error.response?.data?.message || "Please retry again later.",
        color: "danger"
      });
    }
  };
  
  return (
    <div className="flex flex-col gap-4">
      <p className="text-2xl font-bold">Live Tracking</p>
      <div className="flex flex-wrap sm:flex-wrap justify-center sm:justify-start items-center gap-10 max-h-[80vh] overflow-y-auto">
        {Object.entries(machineData).map(([machineType, details]) => (
          <div key={machineType} className="mb-6 p-4 border rounded-lg shadow-md">
            <h2 className="text-xl font-bold capitalize">{machineType === "T" ? "Treadmill" : machineType === "C" ? "Cycling" : machineType === "D" ? "Dumbbells" : "Rowing"}</h2>
            <p><strong>Total Available:</strong> {details.totalAvailable}</p>
            <p><strong>Earliest Available Time:</strong> {details.EstAvailableTime}</p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              {details.data.map((machine) => (
                <div key={machine.machineID} className={`p-3 rounded-md shadow text-black ${machine.Status === "Available" ? "bg-green-500" : "bg-red-500"}`}>
                  <p><strong>ID:</strong> {machine.machineID}</p>
                  <p><strong>Status:</strong> {machine.Status}</p>
                  <p><strong>Est. Available Time:</strong> {machine.EstAvailableTime}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveTrack;