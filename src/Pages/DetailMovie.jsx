import { useEffect , useState} from "react";
import { data, useParams } from "react-router-dom";

const DetailMovie = () => {


    const [detail, setDetail] = useState([]);
    const [cast, setCast] = useState([]);

    const {id} = useParams();
    useEffect(() => {
        const fetchDetail = async () => {
            const res = await fetch(`http://localhost:3002/api/movies/detail/${id}`);
            const data = await res.json();
            setDetail(data);
        }

        const fetchCast = async () => {
            const res = await fetch(`http://localhost:3002/api/movies/detail/cast/${id}`);
            const data = await res.json();
            setCast(data.cast);
        }

        fetchDetail();
        fetchCast();
    }, [id]);


    console.log(detail);


    return (
        <>
            <div className="min-h-screen">
                <div className="detail-movie-container text-white" style={{  backgroundImage: ` linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(https://image.tmdb.org/t/p/original/${detail.backdrop_path})` }}>
                    <div className="">
                        <a href="/" className="mx-8 px-4 py-2 bg-blue-500 text-white text-xl rounded-lg hover:bg-blue-700 transition duration-300">Back</a>
                    </div>
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
                        <div className="detail-movie-additional">
                            <h2>Additional Information</h2>
                            <p>Runtime: {detail.runtime} minutes</p>
                        </div>
                    </div>
                </div>

                <h1 className="cast-title">Cast</h1>
                <div className="container mx-auto justify-items-center px-4">
                    <div className="card-container grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 mx-auto justify-items-center">
                        {cast.slice(0,10).map((actor) => (
                            <div className="actor-card w-40" key={actor.id}>
                                {!actor.profile_path && <span className="w-full h-[210px] flex items-center justify-center bg-stone-700 text-gray-300 rounded-lg">Image Not Found</span>}
                                <img src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`} alt="" />
                                <p style={{ fontWeight : "bold" }}>{actor.name}</p>
                                <p>{actor.character}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default DetailMovie;