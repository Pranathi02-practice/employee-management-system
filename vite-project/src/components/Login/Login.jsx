import React, { useState } from 'react'
import { Box, Button, TextField } from "@mui/material";
import { Navigate, useNavigate } from 'react-router-dom';

const Login = () => {
    const [user, setUser] = useState("")
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    //Enable Submit button
    const isEnabled = (user.trim() && password.trim());
console.log("enable",isEnabled);

    //     document.cookie = `username=${user}; path=/`;
    // document.cookie = `password=${password}; path=/`;

    // const username = getCookie("username");
    // const pwd =  getCookie("password");


    console.log("user", user);


         const handleSubmit = (e) => {
         e.preventDefault();
        localStorage.setItem("isLoggedIn", "true");
        navigate("/dashboard")
      };
    return (
        <Box
            sx={{
                minHeight: "100vh",
                // maxWidth: "100vw",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Box
                component="form"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    maxWidth: 360,
                    width: "100%",
                }}
            >
                <TextField label="Username" onChange={(e) => setUser(e.target.value)} />
                <TextField label="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
                <Button variant="contained" sx={{ width: 200, mx: "auto", backgroundColor: "#ae85ed", }} disabled={!isEnabled} 
                onClick={(e) =>handleSubmit(e) }>
                    Login
                </Button>
            </Box>
        </Box>
    )
}

export default Login