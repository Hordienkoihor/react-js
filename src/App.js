import React from 'react';
import './styles/App.css'
import {BrowserRouter, Link, Route, Routes, Redirect, Navigate} from "react-router-dom";
import About from "./pages/About";
import Posts from "./pages/Posts";
import NavBar from "./components/UI/navbar/NavBar";
import Error from "./pages/Error";

function App ()  {
    return (
        <BrowserRouter>
            <NavBar/>

            <Routes>

                <Route path="/about" element={<About />} />
                <Route path="/posts" element={<Posts />} />
                <Route path="error" element={<Error/>} />
                <Route  path="*" element={<Navigate replace to="/error" />} />
            </Routes>


        </BrowserRouter>
    );
}

export default App;