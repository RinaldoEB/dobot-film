import { useState } from "react";
import { API_KEY } from "../config";
import { useNavigate } from "react-router-dom";
const Navbar = ({setMovies}) => {
  const navigate = useNavigate();
  const[genres, setGenres] = useState([]);
  const[isDropdownOpen, setIsDropdownOpen] = useState(false);
  const[search, setSearch] = useState("");
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
              <span>Genre</span>
              <ul className="genre-list">
                <li><a href="">Action</a></li>
                <li><a href="">Horor</a></li>
                <li><a href="">Comedy</a></li>
                <li><a href="">Romance</a></li>

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