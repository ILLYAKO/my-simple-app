import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import LoginButton from "../elements/LoginButton";
import { useEffect } from "react";
import { OAUTH_CONFIG } from "../config";
import axios from "axios";

const Home = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");

        if (code) {
            console.log("OAuth code received0:", code);

            exchangeCodeForToken(code);
        }
    }, []);

    const exchangeCodeForToken = async (code: string) => {
        try {
            console.log("OAuth code received1:", code);
            const response = await axios.post(
                "https://login.questrade.com/oauth2/token",
                null,
                {
                    params: {
                        client_id: OAUTH_CONFIG.clientId,
                        code: code,
                        grant_type: "authorization_code",
                        redirect_uri: encodeURIComponent(
                            OAUTH_CONFIG.redirectUri,
                        ),
                    },
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                },
            );

            console.log("Access token response:", response.data);

            /*
        response.data contains:
        - access_token
        - refresh_token
        - expires_in
        - token_type
        */

            // TODO (next steps):
            // save tokens to Redux or localStorage
            // clean URL (?code=)
            window.history.replaceState({}, document.title, "/my-simple-app/");
        } catch (error) {
            console.error("Failed to exchange code for token:", error);
        }
    };

    const goToQuestradeLogin = () => {
        window.location.href =
            `https://login.questrade.com/oauth2/authorize` +
            `?client_id=${OAUTH_CONFIG.clientId}` +
            `&response_type=code` +
            `&redirect_uri=${encodeURIComponent(OAUTH_CONFIG.redirectUri)}`;
    };

    return (
        <div>
            <h1>Home Page</h1>
            <button onClick={goToQuestradeLogin}>Login with Questrade</button>
            <button onClick={() => navigate("/about")}>Go to About Page</button>

            <Link to="/about" className="btn btn-primary">
                Go to About
            </Link>
        </div>
    );
};

export default Home;
