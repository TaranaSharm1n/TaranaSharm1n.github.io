import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import NavBar from './components/NavBar'
import LandingPage from './pages/LandingPage'
import About from './pages/About'
import Motifs from './pages/Motifs/index.jsx';


import CursorTrail from './components/CursorTrail'
import { DecorationLayer } from './components/Decorations'

function App() {
  return (
    <BrowserRouter>
      <CursorTrail />
      <DecorationLayer />
      <NavBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/motifs" element={<Motifs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
