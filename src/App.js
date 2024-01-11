import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/navBar/NavBar';
import MarkHomework from './components/MarkHomework';
import ClassPerformance from './components/ClassPerformance';
import Profile from './components/Profile';

function App() {
        return (
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/MarkHomework" element={<MarkHomework />}></Route>
                    <Route path="/ClassPerformance" element={<ClassPerformance />}></Route>
                    <Route path="/Profile" element={<Profile />}></Route>
                </Routes>
            </BrowserRouter>

        );

}
export default App;
