import { useState } from 'react'
import { Button, TextField, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [user, setUser] = useState("")
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    //Enable Submit button
    const isEnabled = (user.trim() && password.trim());

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem("isLoggedIn", "true");
        navigate("/dashboard")
    };
    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "16px",
            }}
        >
            <form

                style={{
                    width: "100%",
                    maxWidth: "360px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                    border: "1px solid #3c3b3b",
                    padding: "24px",

                    borderRadius: "8px",

                }}
            >
                <Typography variant="h6" style={{ textAlign: "center" }}>
                    Login
                </Typography>

                <TextField
                    fullWidth
                    label="Username"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                />

                <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <Button
                    type="submit"
                    variant="contained"
                    disabled={!isEnabled}
                    sx={{ textTransform: "none" }}
                    onClick={handleSubmit}

                >
                    Login
                </Button>
            </form>
        </div>
    );
}

export default Login;