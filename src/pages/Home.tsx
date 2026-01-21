import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    const goToSite = () => {
        window.location.href = "https://google.com";
    };
    return (
        <div>
            <h1>Home Page</h1>
            <button onClick={() => navigate("/about")}>Go to About Page</button>
            <button onClick={goToSite}>Go to Google</button>
            <Link to="/about" className="btn btn-primary">
                Go to About
            </Link>
            
        </div>
    );
};

export default Home;
