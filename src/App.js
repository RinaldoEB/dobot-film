import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import DetailMovie from './Pages/DetailMovie';
import Navbar from './Pages/Navbar';

function App() {
  const[movies, setMovies] = useState([]);
 return (

  <Router>
      <Navbar  movies={movies} setMovies={setMovies} />
    <Routes>
      <Route path="/" element={<Home movies={movies} setMovies={setMovies}/>} />
      <Route path="/detail/:id" element={<DetailMovie />} />
    </Routes>
  </Router>
 )
}

export default App;
