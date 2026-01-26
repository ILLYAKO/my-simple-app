import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { OAUTH_CONFIG } from "../config";
import axios from "axios";

const Home = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");

        if (code) {
            console.log("OAuth code received:", code);
            exchangeCodeForToken(code);
        }
    }, []);

    const exchangeCodeForToken = async (code: string) => {
        try {
            const response = await axios.post(
                "http://localhost:3000/exchange-token",
                { code },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                },
            );

            console.log("Access token response:", response.data);

            window.history.replaceState({}, document.title, "/my-simple-app/");
        } catch (error) {
            console.error("Failed to exchange code for token:", error);
        }
    };


    const goToQuestradeLogin = () => {
        const url = new URL("https://login.questrade.com/oauth2/authorize");
        url.searchParams.append("client_id", OAUTH_CONFIG.clientId);
        url.searchParams.append("response_type", "code");
        url.searchParams.append("redirect_uri", OAUTH_CONFIG.redirectUri);

        window.location.href = url.toString();
    };

    return (
        <div>
            <h1>Home Page</h1>
            <button
                onClick={goToQuestradeLogin}
                className="btn btn-primary m-2"
            >
                Login with Questrade
            </button>
            <button
                onClick={() => navigate("/about")}
                className="btn btn-secondary m-2"
            >
                Go to About Page
            </button>
            <Link to="/about" className="btn btn-success m-2">
                Go to About
            </Link>
        </div>
    );
};

export default Home;
