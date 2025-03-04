import React from 'react';
import HemiChart from '../charts/HemiCircle';
import { ActionIcon } from '../../assets/ActionIcon';
import {  Modal,  ModalContent,  ModalHeader,  ModalBody,  ModalFooter, useDisclosure, Button, Card, CardFooter, Image } from "@heroui/react";
import Tracking from '../../assets/follow-up.png';
import CheckIn from '../../assets/check-in.png';
import Membership from '../../assets/member-card.png';
import History from '../../assets/clock.png';

const Dashboard = () => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <div className="relative p-10 flex flex-col gap-10">
      <HemiChart />
      <div className="fixed md:absolute w-full translate-x-1/2 bottom-10">
        <div
          className="flex justify-center items-center cursor-pointer -translate-x-20 md:-translate-x-1/2 rounded-full w-20 h-20 bg-orange-600 shadow-xl hover:shadow-orange-600/30 hover:scale-110 transition-all"
          onClick={() => onOpen()}
        >
          <ActionIcon className="font-bold"/>
        </div>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} hideCloseButton isDismissable={true}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody className="flex flex-col gap-5 p-10">
                <div className="flex flex-row gap-5">
                  <Card isFooterBlurred className="border-none hover:scale-110 transition-all" radius="lg">
                    <Image
                      alt="Live Tracking"
                      className="object-fit p-10 px-5"
                      height={200}
                      src={Tracking}
                      width={200}
                    />
                    <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                      <p className="text-tiny text-white/80">Live Tracking</p>
                      <Button
                        className="text-tiny text-white bg-black/20"
                        color="default"
                        radius="lg"
                        size="sm"
                        variant="flat"
                      >
                        Track Now
                      </Button>
                    </CardFooter>
                  </Card>
                  <Card isFooterBlurred className="border-none hover:scale-110 transition-all" radius="lg">
                    <Image
                      alt="Woman listing to music"
                      className="object-fit p-10 px-5"
                      height={200}
                      src={CheckIn}
                      width={200}
                    />
                    <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                      <p className="text-tiny text-white/80">Check In</p>
                      <Button
                        className="text-tiny text-white bg-black/20"
                        color="default"
                        radius="lg"
                        size="sm"
                        variant="flat"
                      >
                        Check
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
                <div className="flex flex-row gap-5">
                  <Card isFooterBlurred className="border-none hover:scale-110 transition-all" radius="lg">
                    <Image
                      alt="Woman listing to music"
                      className="object-fit p-10 px-5"
                      height={200}
                      src={History}
                      width={200}
                    />
                    <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                      <p className="text-tiny text-white/80">History</p>
                      <Button
                        className="text-tiny text-white bg-black/20"
                        color="default"
                        radius="lg"
                        size="sm"
                        variant="flat"
                      >
                        Check
                      </Button>
                    </CardFooter>
                  </Card>
                  <Card isFooterBlurred className="border-none hover:scale-110 transition-all" radius="lg">
                    <Image
                      alt="Woman listing to music"
                      className="object-fit p-10 px-5"
                      height={200}
                      src={Membership}
                      width={200}
                    />
                    <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                      <p className="text-tiny text-white/80">Manage Membership</p>
                      <Button
                        className="text-tiny text-white bg-black/20"
                        color="default"
                        radius="lg"
                        size="sm"
                        variant="flat"
                      >
                        Now
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
      <br /><br />
    </div>
  )
}

export default Dashboard