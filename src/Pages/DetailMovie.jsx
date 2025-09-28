import { useEffect , useState} from "react";
import { useParams } from "react-router-dom";

const DetailMovie = () => {
    const API_KEY = "9619524c9830758fbe8d040ba40b9974";


    const [detail, setDetail] = useState([]);
    const {id} = useParams();
    useEffect(() => {
        const ApiDetail = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
        fetch(ApiDetail)
        .then(res => res.json())
        .then(data => setDetail(data))
        .catch(err => console.log(err));
    }, [id]);

    return (
        <h1>{detail.title}</h1>
    )
}

export default DetailMovie;