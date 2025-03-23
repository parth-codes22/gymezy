import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Layout from '../components/admin/Layout';
import { useGlobalContext } from '../contexts/GlobalContext';
import { jwtDecode } from 'jwt-decode';

const User = () => {
  const { user, setUser } = useGlobalContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (jwtDecode(user?.token).role === "user") {
      navigate("/user/dashboard");
    }
  });

  return (
    <div>
      <Layout outlet={<Outlet />} />
    </div>
  )
}

export default User