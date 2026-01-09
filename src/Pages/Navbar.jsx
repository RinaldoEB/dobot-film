import { useState } from "react";
import { API_KEY } from "../config";
import { data, useNavigate, useParams } from "react-router-dom";
const Navbar = ({setMovies}) => {
  const navigate = useNavigate();
  const[genres, setGenres] = useState([]);
  const[search, setSearch] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
        <div className="logo text-2xl font-bold text-white italic">
          <a href = "/" className="">Dobot Film</a>
        </div>

        <div class="w-full max-w-sm min-w-[200px]">
          <div class="relative">
            <input
              class="w-full bg-transparent placeholder:text-slate-400 text-white text-sm border border-slate-200 rounded-md pl-3 pr-28 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              placeholder="Search movies..." 
              onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { handleSearch(); } }}
              value={search}
            />
            <button
              class="absolute top-1 right-1 flex items-center rounded bg-slate-800 py-1 px-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
              onClick={handleSearch}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 mr-2">
                <path fill-rule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clip-rule="evenodd" />
              </svg>
        
              Search
            </button> 
          </div>
        </div>

        <div className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <ul className={isMenuOpen ? 'open' : ''}>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <div className="genre-container">
              <span onMouseEnter={() => { if (genres.length === 0) fetchGenres(); }}>Genre</span>
              <ul className="genre-list">
                {genres.map((genre) => (
                  <li key={genre.id} onClick={() => handleGenreClick(genre.id)} target="/">{genre.name}</li>
                ))}
              </ul>
            </div>
          </li>
          <li>
            <a href="/Contact">Contact</a>
          </li>
        </ul>
      </nav>

    )
}

export default Navbar