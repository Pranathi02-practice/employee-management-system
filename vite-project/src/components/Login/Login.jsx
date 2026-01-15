import React, { useState } from 'react'
import { Box, Button, TextField } from "@mui/material";


 const Login=()=> {
    const [ user,setUser] = useState("")
    const [password, setPassword] = useState("");

//Enable Submit button
const isEnabled = user.trim() && password.trim();

//     document.cookie = `username=${user}; path=/`;
// document.cookie = `password=${password}; path=/`;

// const username = getCookie("username");
// const pwd =  getCookie("password");


    console.log("user",user);
    

//      const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(name, marks);
//   };
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
    <TextField label="Password" type="password" onChange={(e) => setPassword(e.target.value)}/>
    <Button variant="contained" sx={{width: 200,  mx: "auto",  backgroundColor: "#ae85ed", }} disabled={!isEnabled} >
      Login
    </Button>
  </Box>
</Box>



  
 
  )
}

export default Login