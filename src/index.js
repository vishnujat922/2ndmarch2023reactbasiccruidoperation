import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Student from './pages/Student';
import EditStudent from './pages/EditStudent';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Student/>}></Route>
                <Route path='/editStudent' element={<EditStudent/>}></Route>
            </Routes>
        </BrowserRouter>
    </>
);