import React from 'react';
import { Outlet } from 'react-router-dom';
import Layout from '../components/user/Layout';

const User = () => {
  return (
    <div>
      <Layout outlet={<Outlet />} />
    </div>
  )
}

export default User