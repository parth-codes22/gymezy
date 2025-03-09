import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";

import Landing from './pages/Landing';
import About from './pages/About';
import Working from './pages/Working';

import Auth from './pages/Auth';
import Login from './components/Login';
import Register from './components/Register';

import Layout from './components/Layout';

import ProtectedRoute from "./contexts/ProtectedRoute";

import User from './pages/User';
import Dashboard from './components/user/Dashboard';
import Profile from './components/user/Profile';
import Settings from './components/user/Settings';
import LiveTrack from './components/user/LiveTrack';
import CheckIn from './components/user/CheckIn';
import History from './components/user/History';
import Membership from './components/user/Membership';

import Admin from './pages/Admin';
import AdminPanel from './components/admin/AdminPanel';
import AdminSettings from './components/admin/AdminSettings';
import Permissions from './components/admin/Permissions';
import ManagementTools from './components/admin/ManagementTools';
import PreviousLogs from './components/admin/PreviousLogs';
import AdminLiveTrack from './components/admin/AdminLiveTrack';

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/working" element={<Working />} />
      </Route>

      <Route path="/auth" element={<Auth />}>
        <Route index element={<Navigate to="login" replace />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
      
      <Route element={<ProtectedRoute />}>
        <Route path="/user" element={<User />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />}>
            <Route path="live" element={<LiveTrack />} />
            <Route path="checkin" element={<CheckIn />} />
            <Route path="history" element={<History />} />
            <Route path="membership" element={<Membership />} />
          </Route>
          <Route path="profile" element={<Profile />}/>
          <Route path="settings" element={<Settings />}/>
        </Route>
      </Route>

      <Route path="/admin" element={<Admin />}>
        <Route index element={<Navigate to="panel" replace />} />
        <Route path="panel" element={<AdminPanel />}>
          <Route path="livetrack" element={<AdminLiveTrack />} />
          <Route path="logs" element={<PreviousLogs />} />
          <Route path="manage" element={<ManagementTools />} />
        </Route>
        <Route path="permissions" element={<Permissions />}/>
        <Route path="configure" element={<AdminSettings />}/>
      </Route>
    </Routes>
  )
}

export default App