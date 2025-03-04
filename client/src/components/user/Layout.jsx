import React, { useEffect, useState } from 'react';
import { SidebarDemo } from './Sidebar';
import { useLocation } from 'react-router-dom';
import { DashboardIcon } from '../../assets/DashboardIcon';
import { ProfileIcon } from '../../assets/ProfileIcon';
import { SettingsIcon } from '../../assets/SettingsIcon';

const Layout = ({ outlet }) => {
  const location = useLocation();
  useEffect(() => {
    let temp = links;
    if (location.pathname.includes("/user/dashboard")) temp[0].active = true;
    else if (location.pathname.includes("/user/profile")) temp[1].active = true;
    else if (location.pathname.includes("/user/settings")) temp[2].active = true;
    setLinks(temp);
  }, [outlet]);

  const [links, setLinks] = useState([
    {
      label: "Dashboard",
      href: "/user/dashboard",
      active: true,
      icon: (
        <DashboardIcon className="h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Profile",
      href: "/user/profile",
      active: true,
      icon: (
        <ProfileIcon className="h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Settings",
      href: "/user/settings",
      active: true,
      icon: (
        <SettingsIcon className="h-5 w-5 flex-shrink-0" />
      ),
    }
  ]);

  return (
    <SidebarDemo links={links} outlet={outlet} />
  )
}

export default Layout