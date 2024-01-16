import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/navBar/NavBar';
import MarkHomework from './components/MarkHomework';
import ClassPerformance from './components/ClassPerformance';
import Profile from './components/Profile';
import GradesDisplay from './components/GradesDisplay';

function App() {
        return (
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/MarkHomework" element={<MarkHomework />}></Route>
                    <Route path="/ClassPerformance" element={<ClassPerformance />}></Route>
                    <Route path="/Profile" element={<Profile />}></Route>
                    <Route path="/markhomework" element={<MarkHomework />} />
                    <Route path="/gradesdisplay" element={<GradesDisplay />} />
                </Routes>
            </BrowserRouter>

        );

}
export default App;
