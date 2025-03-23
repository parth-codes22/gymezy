import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../ui/Sidebar";
import { Link } from "react-router-dom";
import { Button, Image, Switch } from "@heroui/react";
import { AnimatePresence, motion, animate } from "framer-motion";
import { cn } from "../ui/utils";
import { useGlobalContext } from "../../contexts/GlobalContext";
import { LogoutIcon } from "../../assets/LogoutIcon";
import { useTheme } from "@heroui/use-theme";
import SunIcon from "../../assets/SunIcon";
import MoonIcon from "../../assets/MoonIcon";

export function SidebarDemo({ links, outlet }) {
  const [open, setOpen] = useState(false);
  const { logout } = useGlobalContext();
  const { theme, setTheme } = useTheme();

  return (
    (<div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 mx-auto overflow-hidden",
        "h-screen"
      )}>
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} onClick={() => setOpen(!open)} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "Theme",
                href: "#",
                icon: (
                  <Switch
                    defaultSelected
                    size="sm"
                    color="primary"
                    thumbIcon={({ isSelected, className }) =>
                      !isSelected ? (
                        <SunIcon className={className} />
                      ) : (
                        <MoonIcon className={className} />
                      )
                    }
                    onChange={() => {
                      if (theme === "light") {
                        setTheme("dark");
                      } else if (theme === "dark") {
                        setTheme("light");
                      }
                    }}
                  />
                ),
              }}
            />
            <SidebarLink
              link={{
                label: "Admin",
                href: "#",
                icon: (
                  <Image
                    src="https://i.pravatar.cc/150?img=36"
                    className="h-5 w-7 flex-shrink-0 rounded-full"
                    width={50}
                    height={30}
                    alt="Avatar" />
                ),
              }} />
              <Link
                className="flex items-center justify-start gap-2  group/sidebar py-2 text-red-600"
                onClick={() => {logout(); setOpen(false);}}
              >
                <LogoutIcon />
                <motion.span
                  animate={{
                    display: animate ? (open ? "inline-block" : "none") : "inline-block",
                    opacity: animate ? (open ? 1 : 0) : 1,
                  }}
                  className="text-red-700 text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0"  
                >
                  Logout
                </motion.span>
              </Link>
          </div>
        </SidebarBody>
      </Sidebar>
      <Content outlet={outlet} />
    </div>)
  );
}
export const Logo = () => {
  return (
    (<Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20">
      <div
        className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre">
        GymEzy
      </motion.span>
    </Link>)
  );
};
export const LogoIcon = () => {
  return (
    (<Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20">
      <div
        className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>)
  );
};

const Content = ({ outlet }) => {
  return (
    <div className="flex flex-1">
      <div className="p-2 md:p-10 rounded-tl-2xl bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
        {outlet}
      </div>
    </div>
  );
};
