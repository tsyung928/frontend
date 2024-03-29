import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, Container, Typography } from "@mui/material";
import { ResponsiveContainer } from "recharts";
import { Event } from "@mui/icons-material";

// const LoginPage = ({ onLoginSuccess }) => {
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
//     const [error, setError] = useState("");

//     const handleLogin = async (event) => {
//         event.preventDefault();
//         // Perform the login operation
//         try {
//             const response = await fetch("http://127.0.0.1:5000/login", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ username, password }),
//             });

//             if (!response.ok) {
//                 throw new Error("Login failed");
//             }

//             const data = await response.json();
//             onLoginSuccess(data); // Pass the token to the parent component
//         } catch (error) {
//             setError("Invalid credentials or server error");
//         }
//     };

//     return (
//         <div>
//             <form onSubmit={handleLogin}>
//                 <label>
//                     Username:
//                     <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
//                 </label>
//                 <label>
//                     Password:
//                     <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//                 </label>
//                 <button type="submit">Log In</button>
//             </form>
//             {error && <div>{error}</div>}
//         </div>
//     );
// };

// export default LoginPage;

const Login = ({ setLoggedIn }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const navigate = useNavigate();

    const onButtonClick = (e) => {
        console.log("Login button clicked");
        e.preventDefault();
        setUsernameError("");
        setPasswordError("");

        if ("" === username) {
            setUsernameError("Please enter your username");
            return;
        }

        if ("" === password) {
            setPasswordError("Please enter a password");
            return;
        }

        // Send POST request to Flask backend
        fetch("http://127.0.0.1:5000/login", {
            // Ensure the URL matches your Flask app's
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Success:", data);
                if (data.status === "success") {
                    localStorage.setItem("role", data.role);
                    localStorage.setItem("username", data.username);

                    if (data.role === "admin") {
                        navigate("/Admin"); // Navigate to Admin on success
                    } else {
                        navigate("/MarkHomework"); // Navigate to MarkHomework on success
                    }
                    setLoggedIn(true);
                } else {
                    // Handle login failure
                    setPasswordError("Invalid username or password");
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    return (
        <Container
            component="main"
            maxWidth="sm"
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                height: "100vh",
                justifyContent: "center",
            }}
        >
            <div className="titleContainer" align="center">
                <div>Automated Homework Marking Web Application</div>
                <br />
            </div>
            <div className="title2Container">
                <div>Please Sign In</div>
            </div>
            <Box component="form" noValidate sx={{ mt: 1, width: "100%" }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    autoFocus
                    error={Boolean(usernameError)}
                    helperText={usernameError}
                    onChange={(ev) => setUsername(ev.target.value)}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    error={Boolean(passwordError)}
                    helperText={passwordError}
                    onChange={(ev) => setPassword(ev.target.value)}
                />
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={onButtonClick}>
                    Login
                </Button>
            </Box>
        </Container>
    );
};

export default Login;
