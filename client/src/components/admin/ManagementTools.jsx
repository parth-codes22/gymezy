import React from "react";
import TreadmillIcon from '../../assets/treadmill1.png';
import BenchPressIcon from '../../assets/bench-press.png';
import SquatRacksIcon from '../../assets/squat-racks.png';
import DumbbellIcon from '../../assets/dumbbell.png';
import LegPressIcon from '../../assets/leg-press.png';
import BodyWeightIcon from '../../assets/body-weight.png';
import RowingMachineIcon from '../../assets/rowing-machine1.png';
import EllipticalIcon from '../../assets/elliptical.png';
import LatPulldownIcon from '../../assets/lat-pulldown.png';
import CurlingIronIcon from '../../assets/curling-iron.png';
import { Image } from "@heroui/react";
import { PersonIcon } from "../../assets/PersonIcon";

const equipments = [
  { id: 1, icon: TreadmillIcon, name: "Treadmill", inUseBy: "User 1", queue: ["User 5", "User 7"] },
  { id: 2, icon: BenchPressIcon, name: "Bench Press", inUseBy: "User 2", queue: ["User 8", "User 10"] },
  { id: 3, icon: SquatRacksIcon, name: "Squat Rack", inUseBy: "User 3", queue: ["User 4", "User 9"] },
  { id: 4, icon: DumbbellIcon, name: "Dumbbells", inUseBy: "User 4", queue: ["User 2", "User 6"] },
  { id: 5, icon: LegPressIcon, name: "Leg Press", inUseBy: "User 5", queue: ["User 3", "User 1"] },
  { id: 6, icon: BodyWeightIcon, name: "Pull-up Bar", inUseBy: "User 6", queue: ["User 7", "User 11"] },
  { id: 7, icon: RowingMachineIcon, name: "Rowing Machine", inUseBy: "User 7", queue: ["User 9", "User 12"] },
  { id: 8, icon: EllipticalIcon, name: "Elliptical", inUseBy: "User 8", queue: ["User 10", "User 14"] },
  { id: 9, icon: LatPulldownIcon, name: "Lat Pulldown", inUseBy: "User 9", queue: ["User 13", "User 15"] },
  { id: 10, icon: CurlingIronIcon, name: "Biceps Curl", inUseBy: "User 10", queue: ["User 16", "User 18"] },
];

const GymEquipmentDisplay = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-center mb-4">Gym Equipment Status</h2>
      <div className="flex justify-center gap-3 ">
        {equipments.map((equipment, index) => (
          <div className="flex flex-col gap-5 justify-center items-center">
            <div key={index} className="p-5 bg-slate-300 dark:bg-slate-800 rounded-xl flex flex-col gap-5 justify-between align-middle items-center">
              <h3 className="text-sm font-semibold">{equipment.name}</h3>
              <Image src={equipment.icon} alt={`equipment-${index}`} width="80" height="80" />
              <p className="text-sm text-gray-700">
                {equipment.inUseBy ? (
                  <span className="font-bold text-green-600">{equipment.inUseBy}</span>
                ) : (
                  <span className="text-gray-500">Available</span>
                )}
              </p>
            </div>
            {equipment.queue.length > 0 ? (
              <div className="p-2 flex flex-col gap-2">
                {equipment.queue.map((user, index) => (
                  <div key={index} className="bg-slate-300 dark:bg-slate-800 p-2 gap-2 rounded">
                    <div className="flex"><PersonIcon /> {user}</div> <br /> <p className="text-sm">Est. time: {Math.floor((Math.random()) + 1)} min</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-gray-500">No users waiting</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GymEquipmentDisplay;
