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

const LiveTrack = () => {
  const machineModel = useDisclosure();

  const [machineData, setMachineData] = useState({});
  const [modalHeader, setModalHeader] = useState("");
  const [modalContent, setModalContent] = useState([]);

  useEffect(() => {
    getData();
  }, []);
  
  const transformMachineData = (serverData) => {
    const transformedData = {};
  
    Object.keys(serverData).forEach((machineType) => {
      const machines = serverData[machineType];
      
      const totalAvailable = machines.filter(machine => machine.Status === "Available").length;
      const estAvailableTime = machines
        .filter(machine => machine.Status === "Occupied")
        .map(machine => machine.EstAvailableTime)
        .sort()[0] || 0;
  
      transformedData[machineType] = {
        totalAvailable,
        EstAvailableTime: estAvailableTime,
        data: machines,
      };
    });
  
    return transformedData;
  };  

  const getData = async () => {
    try {
      const { data } = await axios.get("/machine_status");
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
  }
  
  return (
    <div className="flex flex-col gap-4">
      <p className="text-2xl font-bold">Live Tracking</p>
      <div className="flex flex-wrap sm:flex-wrap justify-center sm:justify-start items-center gap-10 max-h-[80vh] overflow-y-auto">
      {Object.entries(machineData).length !== 0 && Object.entries(machineData).map(([machineType, details]) => (
        <>
          <Card key={machineType} className="bg-slate-200 dark:bg-slate-900">
            <CardBody>
              <Image
                alt={machineType}
                className="object-fit rounded-xl p-10 px-5"
                src={machineType === "treadmill" ? Treadmill : machineType === "cycling" ? Cyclying : machineType === "dumbbells" ? Dumbbell : Rowing}
                width={200}
              />
              <div className="flex justify-around items-center">
                <p className="font-bold">{machineType.replace(/^./, machineType[0].toUpperCase())}</p>
                <Button size="sm" color="primary" variant="shadow" onPress={() => {setModalHeader(machineType.replace(/^./, machineType[0].toUpperCase())); setModalContent(details.data); machineModel.onOpen();}}>Check</Button>
              </div>
              <div className="absolute flex top-1 right-1">{details.totalAvailable !== 0 ? (<Chip color="success" variant="dot">Available</Chip>) : (<><Chip color="danger" variant="dot">Occupied</Chip> <Chip color="success" variant="faded">Est. Available Time: {details.estAvailableTime}</Chip></> )} </div>
            </CardBody>
          </Card>
        </>
      ))}
      
      <Modal isOpen={machineModel.isOpen} onOpenChange={machineModel.onOpenChange} size="5xl" isDismissable={false} isKeyboardDismissDisabled>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-row gap-10">
                {modalHeader} Status <Chip color="success" variant="dot">Live</Chip>
              </ModalHeader>
              <ModalBody className="w-full max-w-[90vw] max-h-[60vh] overflow-y-auto flex flex-wrap">
                {modalContent.map((machine) => (
                  <div key={machine.machineID} className="flex flex-col items-center gap-2">
                    <Card className="bg-slate-200 dark:bg-slate-800 p-5">
                      <TreadmillIcon className={machine.Status === "Available" ? "text-green-600" : "text-red-600"} />
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
        {/* <Card className="bg-slate-200 dark:bg-slate-900">
          <CardBody>
            <Image
              alt="Card background"
              className="object-fit rounded-xl p-10 px-5"
              src={Treadmill}
              width={200}
            />
            <div className="flex justify-around items-center">
              <p className="font-bold">Treadmills</p>
              <Button size="sm" color="primary" variant="shadow" onPress={treadmillModel.onOpen}>Check</Button>
            </div>
            <div className="absolute top-1 right-1"><Chip color="success" variant="dot">Available</Chip></div>
          </CardBody>
        </Card>
        <Modal isOpen={treadmillModel.isOpen} onOpenChange={treadmillModel.onOpenChange} size="5xl" isDismissable={false} isKeyboardDismissDisabled>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-row gap-10">
                  Treadmills Status <Chip color="success" variant="dot">Live</Chip>
                </ModalHeader>
                <ModalBody className="w-full max-w-[90vw] max-h-[60vh] overflow-y-auto flex">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {[
                      { id: "T-01", status: "text-red-600" },
                      { id: "T-02", status: "text-green-600" },
                      { id: "T-03", status: "text-red-600" },
                      { id: "T-04", status: "text-green-600" },
                      { id: "T-05", status: "text-red-600" },
                      { id: "T-06", status: "text-green-600" },
                      { id: "T-07", status: "text-red-600" },
                      { id: "T-08", status: "text-green-600" },
                      { id: "T-09", status: "text-red-600" },
                      { id: "T-10", status: "text-green-600" },
                    ].map((treadmill) => (
                      <div key={treadmill.id} className="flex flex-col items-center gap-2">
                        <Card className="bg-slate-200 dark:bg-slate-800 p-5">
                          <TreadmillIcon className={treadmill.status} />
                        </Card>
                        <p>{treadmill.id}</p>
                      </div>
                    ))}
                  </div>
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

        <Card className="bg-slate-200 dark:bg-slate-900">
          <CardBody>
            <Image
              alt="Card background"
              className="object-fit rounded-xl p-10 px-5"
              src={Cyclying}
              width={200}
            />
            <div className="flex justify-around items-center">
              <p className="font-bold">Cycling</p>
              <Button size="sm" color="primary" variant="shadow" onPress={cyclingModel.onOpen}>Check</Button>
            </div>
            <div className="absolute top-1 right-1"><Chip color="danger" variant="dot">Occupied</Chip></div>
          </CardBody>
        </Card>
        <Modal isOpen={cyclingModel.isOpen} onOpenChange={cyclingModel.onOpenChange} size="5xl" isDismissable={false} isKeyboardDismissDisabled>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-row gap-10">
                  Cycling Status <Chip color="success" variant="dot">Live</Chip>
                </ModalHeader>
                <ModalBody className="w-full max-w-[90vw] max-h-[60vh] overflow-y-auto flex">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {[
                      { id: "C-01", status: "text-red-600" },
                      { id: "C-02", status: "text-red-600" },
                      { id: "C-03", status: "text-red-600" },
                      { id: "C-04", status: "text-red-600" },
                      { id: "C-05", status: "text-red-600" },
                      { id: "C-06", status: "text-red-600" },
                    ].map((cycling) => (
                      <div key={cycling.id} className="flex flex-col items-center gap-2">
                        <Card className="bg-slate-200 dark:bg-slate-800 p-5">
                          <CyclingIcon className={cycling.status} />
                        </Card>
                        <p>{cycling.id}</p>
                      </div>
                    ))}
                  </div>
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

        <Card className="bg-slate-200 dark:bg-slate-900">
          <CardBody>
            <Image
              alt="Card background"
              className="object-fit rounded-xl p-10 px-5"
              src={Dumbbell}
              width={200}
            />
            <div className="flex justify-around items-center">
              <p className="font-bold">Dumbells</p>
              <Button size="sm" color="primary" variant="shadow" onPress={dumbbellModel.onOpen}>Check</Button>
            </div>
            <div className="absolute top-1 right-1"><Chip color="danger" variant="dot">Occupied</Chip></div>
          </CardBody>
        </Card>
        <Modal isOpen={dumbbellModel.isOpen} onOpenChange={dumbbellModel.onOpenChange} size="5xl" isDismissable={false} isKeyboardDismissDisabled>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-row gap-10">
                  Dumbbells Status <Chip color="success" variant="dot">Live</Chip>
                </ModalHeader>
                <ModalBody className="w-full max-w-[90vw] max-h-[60vh] overflow-y-auto flex">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {[
                      { id: "D-01", status: "text-red-600" },
                      { id: "D-02", status: "text-red-600" },
                      { id: "D-03", status: "text-red-600" },
                      { id: "D-04", status: "text-red-600" },
                      { id: "D-05", status: "text-red-600" },
                      { id: "D-06", status: "text-red-600" },
                    ].map((dumbbells) => (
                      <div key={dumbbells.id} className="flex flex-col items-center gap-2">
                        <Card className="bg-slate-200 dark:bg-slate-800 p-5">
                          <DumbbellsIcon className={dumbbells.status} />
                        </Card>
                        <p>{dumbbells.id}</p>
                      </div>
                    ))}
                  </div>
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

        <Card className="bg-slate-200 dark:bg-slate-900">
          <CardBody>
            <Image
              alt="Card background"
              className="object-fit rounded-xl p-10 px-5"
              src={Rowing}
              width={200}
            />
            <div className="flex justify-around items-center">
              <p className="font-bold">Rowing Machine</p>
              <Button size="sm" color="primary" variant="shadow" onPress={rowingModel.onOpen}>Check</Button>
            </div>
            <div className="absolute top-1 right-1"><Chip color="success" variant="dot">Available</Chip></div>
          </CardBody>
        </Card>
        <Modal isOpen={rowingModel.isOpen} onOpenChange={rowingModel.onOpenChange} size="5xl" isDismissable={false} isKeyboardDismissDisabled>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-row gap-10">
                  Rowing Machine Status <Chip color="success" variant="dot">Live</Chip>
                </ModalHeader>
                <ModalBody className="w-full max-w-[90vw] max-h-[60vh] overflow-y-auto flex">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {[
                      { id: "R-01", status: "text-green-600" },
                      { id: "R-02", status: "text-green-600" },
                      { id: "R-03", status: "text-red-600" },
                      { id: "R-04", status: "text-green-600" },
                      { id: "R-05", status: "text-red-600" },
                      { id: "R-06", status: "text-green-600" },
                    ].map((dumbells) => (
                      <div key={dumbells.id} className="flex flex-col items-center gap-2">
                        <Card className="bg-slate-200 dark:bg-slate-800 p-5">
                          <RowingMachineIcon color={dumbells.status === "text-green-600" ? "green" : "red"} />
                        </Card>
                        <p>{dumbells.id}</p>
                      </div>
                    ))}
                  </div>
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
        </Modal> */}
      </div>
    </div>
  )
}

export default LiveTrack