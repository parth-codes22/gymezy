import { useEffect, useState } from "react";
import { TreadmillIcon } from "../assets/TreadmillIcon";
import { IrSensorIcon } from "../assets/IrSensorIcon";
import { CameraIcon } from "../assets/CameraIcon";
import { Chip, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Image} from "@heroui/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@heroui/react";
import axios from '../axios';

const Test = () => {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [data, setData] = useState([]);
  const [latestData, setLatestData] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      axios
        .get("/get_update")
        .then((res) => {
          setData(res.data);
          setLatestData(res.data[res.data.length - 1]);
          console.log(res.data);
        })
        .catch((err) => console.error("Error fetching data:", err));
    }, 5000);
  
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-[90vh] w-screen p-4">
      {latestData !== null && latestData !== undefined && (
        <div className="h-full w-full bg-slate-900 mx-auto p-4 rounded-3xl shadow-xl">
          <div className="flex sm:flex-row flex-col justify-center items-center align-middle gap-5">
            <div className="h-full w-full flex sm:flex-col flex-row justify-center items-center align-middle sm:gap-10 gap-5">
              <div className="flex flex-row gap-0">
                <div className={`relative ${latestData.status === "Unoccupied" ? "text-green-600 bg-green-600/30" : "text-red-600 bg-red-600/30"} p-10 ${latestData.userID !== "" ? "rounded-l-3xl" : "rounded-3xl"} h-fit w-fit flex flex-col gap-5 justify-center items-center`}>
                  <TreadmillIcon className="h-48 w-48" />
                  <strong className="text-white text-xl">{latestData.status === "Unoccupied" ? "Available" : latestData.status}</strong>
                  <div className="absolute top-2 right-2"><Chip size="lg" variant="shadow" color={latestData.status === "Unoccupied" ? "success" : "danger"}>{latestData.equipmentId}</Chip></div>
                </div>
                {latestData.userID !== "" && (
                  <div className="bg-slate-800 p-4 rounded-r-3xl flex flex-col gap-3 items-center justify-center">
                    <Image width={200} height={200} src={`https://gym-sensore-bucket.s3.ap-south-1.amazonaws.com/${latestData.userID.toLowerCase()}.jpeg`} alt="S3 Image" />
                    <strong className="text-2xl">{latestData.userID}</strong>
                  </div>
                )}
              </div>
              <div className="w-full flex sm:flex-row flex-col justify-around">
                <div className="p-5 text-green-600 bg-green-600/30 rounded-3xl h-fit w-44 flex flex-col justify-between align-middle items-center gap-5">
                  <IrSensorIcon className="h-24 w-24" />
                  <strong className={`text-xl ${latestData.ultrasonic_sensor.reading < 45 ? "text-warning-400" : "text-white"}`}>{latestData.ultrasonic_sensor.reading} cm</strong>
                  <p className="font-bold">UltraSonic Sensor</p>
                </div>
                <div className="flex flex-col gap-3 justify-center align-middle items-center">
                  <Chip variant={latestData.led === "green" ? "shadow" : "dot"} color="success" size="lg">Available</Chip>
                  <Chip variant={latestData.led === "blue" ? "shadow" : "dot"} color="primary" size="lg">Recognition</Chip>
                  <Chip variant={latestData.led === "red" ? "shadow" : "dot"} color="danger" size="lg">Unavailable</Chip>
                </div>
                <div className={`p-5 ${latestData.camera ? "text-blue-600 bg-blue-600/30" : "text-slate-600 bg-slate-600/30"} rounded-3xl h-fit w-44 flex flex-col justify-between align-middle items-center gap-5`}>
                  <CameraIcon className="h-24 w-24" />
                  <strong className="text-xl text-white">{latestData.camera ? "Active" : "Inactive"}</strong>
                  <p className="font-bold">Camera</p>
                </div>
              </div>
            </div>
            <div className="h-full w-full">
              <div className="text-xl font-bold">Equipment Status</div>
              <Table isStriped aria-label="User logs">
                <TableHeader>
                  <TableColumn>Machine ID</TableColumn>
                  <TableColumn>Status</TableColumn>
                  <TableColumn>Context</TableColumn>
                </TableHeader>
                <TableBody>
                  {data.length !== 0 && data.slice(-5).reverse().map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.equipmentId}</TableCell>
                      <TableCell className={`font-bold ${item.led === "green" ? "text-green-500" : item.led === "blue" ? "text-blue-500" : "text-red-500"}`}>
                        {item.led === "green" ? "G" : item.led === "blue" ? "B" : "R"}
                      </TableCell>
                      <TableCell>{item.message}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <p onClick={onOpen} className="text-sm indent-3 text-slate-200 hover:text-blue-600 cursor-pointer transition-all">Show more logs...</p>
            </div>
          </div>
        </div>
      )}

      <Modal backdrop="opaque" isOpen={isOpen} onClose={onClose} size="5xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-row gap-1 justify-around text-xl font-bold"><p>Eqipment Logs</p><Chip variant="dot" size="lg" color="success">Live</Chip></ModalHeader>
              <ModalBody>
                <Table isStriped aria-label="User logs">
                  <TableHeader>
                    <TableColumn>Equipment ID</TableColumn>
                    <TableColumn>Ultrasonic Sensor Reading</TableColumn>
                    <TableColumn>Ultrasonic Sensor Status</TableColumn>
                    <TableColumn>LED Status</TableColumn>
                    <TableColumn>Message</TableColumn>
                    <TableColumn>Status</TableColumn>
                    <TableColumn>User ID</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {data.length !== 0 && data.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.equipmentId}</TableCell>
                        <TableCell>{item.ultrasonic_sensor?.reading || "--"}</TableCell>
                        <TableCell>{item.ultrasonic_sensor.status}</TableCell>
                        <TableCell className={`font-bold ${item.led === "green" ? "text-green-500" : item.led === "blue" ? "text-blue-500" : "text-red-500"}`}>
                          {item.led === "green" ? "G" : item.led === "blue" ? "B" : "R"}
                        </TableCell>
                        <TableCell>{item.message}</TableCell>
                        <TableCell>{item.status}</TableCell>
                        <TableCell>{item.userID || "N/A"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Test;