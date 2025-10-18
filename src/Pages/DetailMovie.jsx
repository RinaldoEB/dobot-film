import { useEffect , useState} from "react";
import { data, useParams } from "react-router-dom";

const DetailMovie = () => {
    const API_KEY = "9619524c9830758fbe8d040ba40b9974";


    const [detail, setDetail] = useState([]);
    const [cast, setCast] = useState([]);

    const {id} = useParams();
    useEffect(() => {
        const fetchDetail = async () => {
            const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`);
            const data = await res.json();
            setDetail(data);
        }

        const fetchCast = async () => {
            const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`);
            const data = await res.json();
            setCast(data.cast);
        }

        fetchDetail();
        fetchCast();
    }, [id]);


    console.log(detail);


    return (
        <>
            <div className="flex text-white detail-movie-container" style={{  backgroundImage: ` linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://image.tmdb.org/t/p/original/${detail.backdrop_path})` }}>
                <div className="detail-movie-poster">
                    <img src={`https://image.tmdb.org/t/p/w500/${detail.poster_path}`} alt={detail.title} />
                </div>
                <div className="detail-movie-info">
                    <h1 className="detail-movie-title">{detail.title}</h1>
                    <div className="detail-movie-meta">
                        <p className="detail-movie-release">Release Date: {detail.release_date}</p>
                        <p className="detail-movie-rating">Rating: {detail.vote_average}/10</p>
                        <p className="detail-movie-genres">Genres: {detail.genres ? detail.genres.map(genre => genre.name).join(', ') : 'N/A'}</p>
                    </div>
                    <div className="detail-movie-overview">
                        <h2>Overview</h2>
                        <p>{detail.overview}</p>
                    </div>
                    {/* Placeholder for additional content */}
                    <div className="detail-movie-additional">
                        {/* Add more sections here, e.g., cast, reviews, etc. */}
                        <h2>Additional Information</h2>
                        <p>Runtime: {detail.runtime} minutes</p>
                    </div>
                </div>
            </div>
            <h1 className="cast-title">Cast</h1>
            <div className="container grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto justify-items-center">
                {cast.slice(0,10).map((actor) => (
                    <div className="bg-gray-800/75 text" key={actor.id}>
                        <img src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`} alt="" />
                        <p style={{ fontWeight : "bold" }}>{actor.name}</p>
                        <p>{actor.character}</p>
                    </div>
                ))}
            </div>
        </>
    )
}

export default DetailMovie;