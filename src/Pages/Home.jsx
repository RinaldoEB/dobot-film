import {useState , useEffect} from 'react';
import { API_KEY,BASE_URL } from '../config';

const Home = ({movies, setMovies}) => {
  
  useEffect(() => {
    const URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;
    fetch(URL)
    .then(res => res.json())
    .then(data => setMovies(data.results))
    .catch(err => console.log(err));
  }, []);
  
  
  return (
    <div className="App">

      {/* main */}
      <main>
        <div className="container">
          {movies.map((movie) => (
              <a href={`/detail/${movie.id}`} className="card-film" key={movie.id}>
                <div className="img-film">
                  <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="" />
                </div>
                <div className="content-film">
                  <h4>{movie.title}</h4>
                  <p>{Math.round(movie.vote_average)}/10 ⭐</p>
                </div>
              </a>
          ))}
        
        </div>
      </main>
    </div>
  );
}

export default Home;