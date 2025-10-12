import { useState } from "react";
import { API_KEY } from "../config";
import { data, useNavigate, useParams } from "react-router-dom";
const Navbar = ({setMovies}) => {
  const navigate = useNavigate();
  const[genres, setGenres] = useState([]);
  const[search, setSearch] = useState("");
  const fetchGenres = () => {
    const genre_URL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`
    fetch(genre_URL)
    .then(res => res.json())
    .then(data => setGenres(data.genres))
    .catch(err => console.log(err));
  }

  const handleGenreClick = (id) => {
    const URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${id}`;
    fetch(URL)
    .then(res => res.json())
    .then(data => setMovies(data.results))
    .catch(err => console.log(err));
  }
  
       const handleSearch = () => {
            if(search.trim() !== ""){ 
              navigate(`/`);
              setSearch("");
              
              const URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${search}`;
              fetch(URL)
              .then(res => res.json())
              .then(data => setMovies(data.results))
              .catch(err => console.log(err));
            }
            
          }

    return (
     <nav>
        <div className="logo">
          <a href="/">DoBot Film</a>
        </div>
        <search className="search-film">
          <input type="text" placeholder="Search" className="search" onChange={(e) => setSearch(e.target.value)} value={search} onKeyDown={(e) => e.key === "Enter" && handleSearch()} />
          <button type="button" className="submit" onClick={handleSearch} >Search</button>
        </search>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <div className="genre-container">
              <span onMouseEnter={() => { if (genres.length === 0) fetchGenres(); }}>Genre</span>
              <ul className="genre-list">
                {genres.map((genre) => (
                  <li key={genre.id} onClick={() => handleGenreClick(genre.id)}>{genre.name}</li>
                ))}
              </ul>
            </div>
          </li>
          <li>
            <a href="">Contact</a>
          </li>
        </ul>
      </nav>
        
    )
}

export default Navbar