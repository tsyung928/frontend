import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Button from '@mui/material/Button'; //importing material ui component
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
        //   <div className="App">
        //     <Header />
        //
        //       <Button> Press me </Button>
        //
        //
        //
        //   </div>
        // );

}
export default App;
