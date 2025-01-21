import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Layout from './pages/Layout.tsx'
import Home from './pages/Home.tsx'
import Welcome from './pages/Welcome.tsx';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index path="home" element={<Home />} />
          <Route index path="welcome" element={<Welcome />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
