import React, { useEffect, useState } from 'react'
import Treadmill from '../../assets/treadmill.png';
import Cyclying from '../../assets/cycling.png';
import Dumbbell from '../../assets/dumbell.png';
import Rowing from '../../assets/rowing-machine.png';
import { addToast, Button, Card, CardBody, Chip, Image } from '@heroui/react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/react";
import { TreadmillIcon } from '../../assets/TreadmillIcon';
import { CyclingIcon } from '../../assets/CyclingIcon';
import { DumbbellsIcon } from '../../assets/DumbbellsIcon';
import { RowingMachineIcon } from '../../assets/RowingMachineIcon';
import axios from '../../axios';

const AdminLiveTrack = () => {
  const machineModel = useDisclosure();

  const [machineData, setMachineData] = useState({});
  const [modalHeader, setModalHeader] = useState("");
  const [modalContent, setModalContent] = useState([]);

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

  useEffect(() => {
    if (modalHeader && machineData[modalHeader]) {
      setModalContent(machineData[modalHeader].data);
    }
  }, [machineData, modalHeader]);
  

  const getData = async () => {
    try {
      const { data } = await axios.get("/get_occupancy");
      const transformedData = transformMachineData(data);
      setMachineData(transformedData);
      if (modalHeader !== "") {
        setModalContent(transformedData[modalHeader].data);
      }
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
      <p className="text-2xl font-bold">Admin Live Tracking</p>
      <div className="flex flex-wrap sm:flex-wrap justify-center sm:justify-start items-center gap-10 max-h-[80vh] overflow-y-auto">
      {Object.entries(machineData).length !== 0 && Object.entries(machineData).map(([machineType, details]) => (
        <Card key={machineType} className="bg-slate-200 dark:bg-slate-900">
          <CardBody>
            <Image
              alt={machineType}
              className="object-fit rounded-xl p-10 px-5"
              src={machineType === "T" ? Treadmill : machineType === "C" ? Cyclying : machineType === "D" ? Dumbbell : Rowing}
              width={200}
            />
            <div className="flex justify-around items-center">
              <p className="font-bold">{machineType === "T" ? "Treadmill" : machineType === "C" ? "Cycling" : machineType === "D" ? "Dumbbells" : "Rowing"}</p>
              <Button size="sm" color="primary" variant="shadow" onPress={() => {setModalHeader(machineType); setModalContent(details.data); machineModel.onOpen();}}>Check</Button>
            </div>
            <div className="absolute flex top-1 right-1">{details.totalAvailable !== 0 ? (<Chip color="success" variant="dot">Available</Chip>) : (<><Chip color="danger" variant="dot">Occupied</Chip> <Chip color="success" variant="faded">Est. Available Time: {details.estAvailableTime}</Chip></> )} </div>
          </CardBody>
        </Card>
      ))}
      
      <Modal isOpen={machineModel.isOpen} onOpenChange={machineModel.onOpenChange} size="5xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-row gap-10">
                {modalHeader === "T" ? "Treadmill" : modalHeader === "C" ? "Cycling" : modalHeader === "D" ? "Dumbbells" : "Rowing"} Status <Chip color="success" variant="dot">Live</Chip>
              </ModalHeader>
              <ModalBody className="w-full max-w-[90vw] max-h-[60vh] overflow-y-auto flex flex-wrap">
                {modalContent.map((machine) => (
                  <div key={machine.machineID} className="flex flex-col items-center gap-2">
                    <Card className="bg-slate-200 dark:bg-slate-800 p-5">
                      {modalHeader === "T" ? <TreadmillIcon className={machine.Status === "Available" ? "text-green-600" : "text-red-600"} /> : modalHeader === "C" ? <CyclingIcon className={machine.Status === "Available" ? "text-green-600" : "text-red-600"} /> : modalHeader === "D" ? <DumbbellsIcon className={machine.Status === "Available" ? "text-green-600" : "text-red-600"} /> : <RowingMachineIcon className={machine.Status === "Available" ? "text-green-600" : "text-red-600"} />}
                    </Card>
                    <p>{machine.machineID}</p>
                  </div>
                ))}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      </div>
    </div>
  )
}

export default AdminLiveTrack