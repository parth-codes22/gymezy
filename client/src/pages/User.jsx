import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Layout from '../components/user/Layout';
import { useGlobalContext } from '../contexts/GlobalContext';
import { jwtDecode } from 'jwt-decode';

const User = () => {
  const { user, setUser } = useGlobalContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (jwtDecode(user?.token).role === "admin") {
      navigate("/admin/panel");
    }
  });

  return (
    <div>
      <Layout outlet={<Outlet />} />
    </div>
  )
}

export default User