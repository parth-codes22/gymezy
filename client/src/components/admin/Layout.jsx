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
    if (location.pathname.includes("/admin/panel")) temp[0].active = true;
    else if (location.pathname.includes("/admin/permissions")) temp[1].active = true;
    else if (location.pathname.includes("/admin/configure")) temp[2].active = true;
    setLinks(temp);
  }, [outlet]);

  const [links, setLinks] = useState([
    {
      label: "Admin Panel",
      href: "/admin/panel",
      active: true,
      icon: (
        <DashboardIcon className="h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Permissions",
      href: "/admin/permissions",
      active: true,
      icon: (
        <ProfileIcon className="h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Configure",
      href: "/admin/configure",
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