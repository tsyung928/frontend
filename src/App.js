import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/navBar/NavBar";
import MarkHomework from "./components/MarkHomework";
import ClassPerformance from "./components/ClassPerformance";
import Profile from "./components/Profile";
import GradesDisplay from "./components/GradesDisplay";
import Login from "./components/Login";
import Admin from "./components/Admin";

function App() {
    const [loggedIn, setLoggedIn] = useState(localStorage.getItem("loggedIn") === "true");
    const [username, setUsername] = useState(localStorage.getItem("username") || "");

    useEffect(() => {
        // Sync loggedIn state to local storage whenever it changes
        localStorage.setItem("loggedIn", loggedIn);
        localStorage.setItem("username", username);
    }, [loggedIn, username]);

    const logout = () => {
        setLoggedIn(false);
        setUsername("");
        localStorage.removeItem("loggedIn");
        localStorage.removeItem("username");
        // Redirect to login page after logout if needed
    };
    return (
        <BrowserRouter>
            {loggedIn && <Header logout={logout} />} {/* Only show Header if loggedIn is true */}
            <Routes>
                {/* <Route
                    path="/"
                    element={<Login username={username} setLoggedIn={setLoggedIn} setUsername={setUsername} />}
                /> */}
                <Route path="/" element={<Login setLoggedIn={setLoggedIn} setUsername={setUsername} />} />

                <Route path="/MarkHomework" element={<MarkHomework />}></Route>
                <Route path="/ClassPerformance" element={<ClassPerformance />}></Route>
                <Route path="/Profile" element={<Profile />}></Route>
                <Route path="/GradesDisplay" element={<GradesDisplay />}></Route>
                <Route path="/Admin" element={<Admin />}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
