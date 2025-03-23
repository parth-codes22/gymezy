import React from 'react';
import { ActionIcon } from '../../assets/ActionIcon';
import {  Modal,  ModalContent,  ModalHeader,  ModalBody,  ModalFooter, useDisclosure, Button, Card, CardHeader, CardBody, CardFooter, Image } from "@heroui/react";
import Tracking from '../../assets/follow-up.png';
import CheckIn from '../../assets/check-in.png';
import ManagementTools from '../../assets/management_tools.png';
import History from '../../assets/clock.png';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  const navigateTo = useNavigate();
  const location = useLocation();
  return (
    <>
    {location.pathname === "/admin/panel" || location.pathname === "/admin/panel/" ? (
      <><div className="hidden sm:block"><div className="w-full h-full grid grid-cols-2 gap-5 md:gap-10 p-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
        <Card className="py-4 w-[80%] hover:scale-110 transition-all relative group bg-slate-200 dark:bg-slate-800 cursor-pointer select-none" >
          <CardBody className="overflow-visible py-2 flex md:flex-row" onClick={() => navigateTo("/admin/panel/livetrack")}>
            <Image
              alt="Card background"
              className="object-fit rounded-xl p-10 px-5"
              src={Tracking}
              width={200}
            />
            <div className="pb-0 pt-2 px-4 h-full flex flex-col justify-center items-start">
              <p className="text-tiny uppercase font-bold">Daily Mix</p>
              <small className="text-default-500">12 Tracks</small>
              <h4 className="font-bold text-large">Admin Live Tracking</h4>
            </div>
            <div className="absolute bottom-0 left-0 w-full md:top-0 md:right-0 md:left-auto font-black md:h-full md:w-3 flex justify-center items-center rounded-full p-1 opacity-0 group-hover:opacity-100 group-hover:bg-green-600 transition-all">&gt;</div>
          </CardBody>
        </Card>
        <Card className="py-4 w-[80%] hover:scale-110 transition-all relative group bg-slate-200 dark:bg-slate-800 cursor-pointer select-none">
          <CardBody className="overflow-visible py-2 flex md:flex-row" onClick={() => navigateTo("/admin/panel/logs")}>
            <Image
              alt="Card background"
              className="object-fit rounded-xl p-10 px-5"
              src={History}
              width={200}
            />
            <div className="pb-0 pt-2 px-4 h-full flex flex-col justify-center items-start">
              <p className="text-tiny uppercase font-bold">Daily Mix</p>
              <small className="text-default-500">12 Tracks</small>
              <h4 className="font-bold text-large">Previous Logs</h4>
            </div>
            <div className="absolute bottom-0 left-0 w-full md:top-0 md:right-0 md:left-auto font-black md:h-full md:w-3 flex justify-center items-center rounded-full p-1 opacity-0 group-hover:opacity-100 group-hover:bg-green-600 transition-all">&gt;</div>
          </CardBody>
        </Card>
        <Card className="py-4 w-[80%] hover:scale-110 transition-all relative group bg-slate-200 dark:bg-slate-800 cursor-pointer select-none">
          <CardBody className="overflow-visible py-2 flex md:flex-row" onClick={() => navigateTo("/admin/panel/manage")}>
            <Image
              alt="Card background"
              className="object-fit rounded-xl p-10 px-5"
              src={ManagementTools}
              width={200}
            />
            <div className="pb-0 pt-2 px-4 h-full flex flex-col justify-center items-start">
              <p className="text-tiny uppercase font-bold">Daily Mix</p>
              <small className="text-default-500">12 Tracks</small>
              <h4 className="font-bold text-large">Gym Live Management</h4>
            </div>
            <div className="absolute bottom-0 left-0 w-full md:top-0 md:right-0 md:left-auto font-black md:h-full md:w-3 flex justify-center items-center rounded-full p-1 opacity-0 group-hover:opacity-100 group-hover:bg-green-600 transition-all">&gt;</div>
          </CardBody>
        </Card>
      </div></div>
      <div className="sm:hidden flex flex-col gap-5 p-5">
        <Card className="p-2 w-full hover:scale-110 transition-all relative group bg-slate-200 dark:bg-slate-800 cursor-pointer select-none">
          <CardBody className="overflow-visible py-2 flex flex-row" onClick={() => navigateTo("/admin/panel/livetrack")}>
            <Image
              alt="Card background"
              className="object-fit rounded-xl p-10 px-5"
              src={Tracking}
              width={100}
            />
            <div className="pb-0 pt-2 px-4 h-full flex flex-col justify-center items-start">
              <p className="text-tiny uppercase font-bold">Daily Mix</p>
              <small className="text-default-500">12 Tracks</small>
              <h4 className="font-bold text-large">Admin Live Tracking</h4>
            </div>
            <div className="absolute top-0 right-0 font-black h-full w-3 flex justify-center items-center rounded-full p-1 opacity-0 group-hover:opacity-100 group-hover:bg-green-600 transition-all">&gt;</div>
          </CardBody>
        </Card>
        <Card className="p-2 w-full hover:scale-110 transition-all relative group bg-slate-200 dark:bg-slate-800 cursor-pointer select-none">
          <CardBody className="overflow-visible py-2 flex flex-row" onClick={() => navigateTo("/admin/panel/logs")}>
            <Image
              alt="Card background"
              className="object-fit rounded-xl p-10 px-5"
              src={CheckIn}
              width={100}
            />
            <div className="pb-0 pt-2 px-4 h-full flex flex-col justify-center items-start">
              <p className="text-tiny uppercase font-bold">Daily Mix</p>
              <small className="text-default-500">12 Tracks</small>
              <h4 className="font-bold text-large">Previous Logs</h4>
            </div>
            <div className="absolute top-0 right-0 font-black h-full w-3 flex justify-center items-center rounded-full p-1 opacity-0 group-hover:opacity-100 group-hover:bg-green-600 transition-all">&gt;</div>
          </CardBody>
        </Card>
        <Card className="p-2 w-full hover:scale-110 transition-all relative group bg-slate-200 dark:bg-slate-800 cursor-pointer select-none">
          <CardBody className="overflow-visible py-2 flex flex-row" onClick={() => navigateTo("/admin/panel/manage")}>
            <Image
              alt="Card background"
              className="object-fit rounded-xl p-10 px-5"
              src={History}
              width={100}
            />
            <div className="pb-0 pt-2 px-4 h-full flex flex-col justify-center items-start">
              <p className="text-tiny uppercase font-bold">Daily Mix</p>
              <small className="text-default-500">12 Tracks</small>
              <h4 className="font-bold text-large">Management Tools</h4>
            </div>
            <div className="absolute top-0 right-0 font-black h-full w-3 flex justify-center items-center rounded-full p-1 opacity-0 group-hover:opacity-100 group-hover:bg-green-600 transition-all">&gt;</div>
          </CardBody>
        </Card>
      </div></>
    ) : (
      <Outlet />
    )}
    </>
  )
}

export default AdminPanel