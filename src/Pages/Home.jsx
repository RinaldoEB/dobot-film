import {useState , useEffect} from 'react';

const Home = ({movies, setMovies}) => {
  
  useEffect(() => {
    const URL = `http://localhost:3002/api/movies`;
    fetch(URL)
    .then(res => res.json())
    .then(data => setMovies(data.results))
    .catch(err => console.log(err));
  }, []);
  
  
  return (
    <div className="App">

      {/* main */}
      <main id='top'>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mx-auto container">
          {movies.map((movie) => (
            <a href={`/detail/${movie.id}`} className="card-film" key={movie.id}>
                <div className="img-film">
                  {!movie.poster_path && <span className='w-full h-[320px] flex items-center justify-center bg-stone-700 text-gray-300 rounded-lg'>Image Not Foound</span>}
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
      <footer className="">
        <div className="relative mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 lg:pt-24">
          <div className="absolute end-4 top-4 sm:end-6 sm:top-6 lg:end-8 lg:top-8">
            <a
              className="inline-block rounded-full bg-teal-600 p-2 text-white shadow-sm transition hover:bg-teal-500 sm:p-3 lg:p-4 dark:bg-gray-700/100 dark:text-white-300 dark:hover:bg-gray-600"
              href="#top"
            >
              <span className="sr-only">Back to top</span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>

          <div className="lg:flex lg:items-end lg:justify-between">
            <div>
              <div className="flex justify-center lg:justify-start text-white">
                <p className='text-2xl font-bold italic text-white-500'>Dobot Film</p>
              </div>

              <p
                className="mx-auto mt-6 max-w-md text-center leading-relaxed text-gray-500 lg:text-left dark:text-gray-400"
              >
                Information about popular movies.
              </p>
            </div>

          </div>

          <p className="mt-12 text-center text-sm text-gray-500 lg:text-right dark:text-gray-400">
            Copyright &copy; 2025. All rights reserved.
          </p>
        </div>
      </footer>

    </div>
    
    
    
  );
  
}

export default Home;


