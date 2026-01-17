import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './components/Login/login'
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from './components/Dashboard/Dashboard'
import { createTheme, ThemeProvider } from '@mui/material'


const theme = createTheme({
  palette: {
    primary: {
      main: "#3c3b3b",
    },
  },
});

function App() {
 const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  return (
    <ThemeProvider theme={theme}>
         <Routes>
      <Route path="/" element={<Login/>} />
       <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />}/>
      </Routes>
    </ThemeProvider>
     
  )
}

export default App
