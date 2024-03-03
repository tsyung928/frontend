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
    const [loggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState("");

    const logout = () => {
        setLoggedIn(false);
        setUsername("");
        // Clear any stored data if necessary
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
