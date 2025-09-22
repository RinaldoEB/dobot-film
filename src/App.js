import './App.css';
import { useState , useEffect } from 'react';

function App() {
  const[movies, setMovies] = useState([]);
  const[search, setSearch] = useState("");

  const API_KEY = "9619524c9830758fbe8d040ba40b9974";



  const handleSearch = () => {
    if(search.trim() !== ""){ 
      setSearch("");
    
      const URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${search}`;
      fetch(URL)
        .then(res => res.json())
        .then(data => setMovies(data.results))
        .catch(err => console.log(err));
    }
    
  }

  useEffect(() => {
    const URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;
    fetch(URL)
      .then(res => res.json())
      .then(data => setMovies(data.results))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="App">
      {/* nav */}
      <nav>
        <div className="logo">
          <a href="">DoBot Film</a>
        </div>
        <search className="search-film">
          <input type="text" placeholder="Search" className="search" onChange={(e) => setSearch(e.target.value)} value={search} onKeyDown={(e) => e.key === "Enter" && handleSearch()} />
          <button type="button" className="submit" onClick={handleSearch} >Search</button>
        </search>
        <ul>
          <li>
            <a href="">Home</a>
          </li>
          <li>
            <a href="">Genre</a>
          </li>
          <li>
            <a href="">Contact</a>
          </li>
        </ul>
      </nav>

      {/* main */}
      <main>
        <div className="container">
          {movies.map((movie) => (
              <div className="card-film" key={movie.id}>
                <div className="img-film">
                  <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="" />
                </div>
                <div className="content-film">
                  <h2>{movie.title}</h2>
                  <p>{movie.overview}</p>
                </div>
              </div>
          ))}
        
        </div>
      </main>
    </div>
  );
}

export default App;
