import { useState } from "react";
import { API_KEY } from "../config";
const Navbar = ({setMovies}) => {
    const[search, setSearch] = useState("");
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
        
    )
}

export default Navbar