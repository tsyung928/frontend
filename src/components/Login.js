import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box } from "@mui/material";
import { ResponsiveContainer } from "recharts";

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

const Login = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const navigate = useNavigate();

    const onButtonClick = () => {
        // You'll update this function later...
        const onButtonClick = () => {
            // Set initial error values to empty
            setUsernameError("");
            setPasswordError("");

            // Check if the user has entered both fields correctly
            if ("" === username) {
                setUsernameError("Please enter your username");
                return;
            }

            if ("" === password) {
                setPasswordError("Please enter a password");
                return;
            }

            // Authentication calls will be made here...
        };
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                height: "700px",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <div className="titleContainer">
                <div>Automated Homework Marking Web Application</div>
                <br />
            </div>
            <div className="title2Container">
                <div>Sign In</div>
            </div>

            <br />
            <div>
                {/* <div> */}
                {/* <input
                    value={username}
                    placeholder="Enter your username here"
                    onChange={(ev) => setUsername(ev.target.value)}
                    className={"inputBox"}
                /> */}
                <TextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    onChange={(ev) => setUsername(ev.target.value)}
                />
                <label className="errorLabel">{usernameError}</label>
            </div>
            <br />
            {/* <div className={"inputContainer"}> */}
            <div>
                {/* <input
                    value={password}
                    placeholder="Enter your password here"
                    onChange={(ev) => setPassword(ev.target.value)}
                    className={"inputBox"}
                /> */}
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    onChange={(ev) => setPassword(ev.target.value)}
                />
                <label className="errorLabel">{passwordError}</label>
            </div>
            <br />
            <div>
                <Button variant="contained" color="primary" onClick={onButtonClick}>
                    Login
                </Button>
                {/* <input className={"inputButton"} type="button" onClick={onButtonClick} value={"Log in"} /> */}
            </div>
        </Box>
    );
};

export default Login;
