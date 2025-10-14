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
        <div className="logo text-3xl font-bold text-white italic">
          <a href = "/" className="">Dobot Film</a>
        </div>
        
        <form class="w-full max-w-sm">  
            <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div class="relative">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
                <input type="search" id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-500/30 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Film..." required onChange={(e) => setSearch(e.target.value)} value={search} onKeyDown={(e) => e.key === "Enter" && handleSearch()}/>

                <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800" onClick={handleSearch}>Search</button>
            </div>
        </form>

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