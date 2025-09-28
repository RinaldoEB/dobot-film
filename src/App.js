import './App.css';
import { useState , useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import DetailMovie from './Pages/DetailMovie';

function App() {
 return (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/detail/:id" element={<DetailMovie />} />
    </Routes>
  </Router>
 )
}

export default App;
