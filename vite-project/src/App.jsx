import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './components/Login/login'
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from './components/Dashboard/Dashboard'


function App() {
  const [count, setCount] = useState(0)

  return (
      <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
       <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
  )
}

export default App
