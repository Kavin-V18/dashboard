import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/DashBoard"
import Users from "./pages/Users";
import UserDetails from "./pages/UserDetails";
import AddUser from "./pages/AddUser";
 import EditUser from "./pages/EditUser";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from './components/Navbar'





export default function App() {
  return (
    <BrowserRouter>
 
     <Routes> 
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
       <Route path='/navbar' element={<Navbar />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<UserDetails />} />
        <Route path="/add-user" element={<AddUser />} />
        <Route path="/edit-user/:id" element={<EditUser />} />
      </Route>
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
    </BrowserRouter>
  );
}


