import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { OAUTH_CONFIG } from "../config";
import axios from "axios";

const Home = () => {
    const navigate = useNavigate();

    const [tokenData, setTokenData] = useState<{
        access_token?: string;
        refresh_token?: string;
        expires_in?: number;
        api_server?: string;
    } | null>(null);

    const [error, setError] = useState<string | null>(null);

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
            // ✅ Condition: must have both tokens
            if (response.data?.access_token && response.data?.refresh_token) {
                setTokenData(response.data);

                // clean URL (remove ?code=...)
                window.history.replaceState(
                    {},
                    document.title,
                    "/my-simple-app/",
                );
            } else {
                setError("Token response is missing required fields");
            }
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

    // return (
    //     <div>
    //         <h1>Home Page</h1>
    //         <button
    //             onClick={goToQuestradeLogin}
    //             className="btn btn-primary m-2"
    //         >
    //             Login with Questrade
    //         </button>
    //         <button
    //             onClick={() => navigate("/about")}
    //             className="btn btn-secondary m-2"
    //         >
    //             Go to About Page
    //         </button>
    //         <Link to="/about" className="btn btn-success m-2">
    //             Go to About
    //         </Link>
    //     </div>
    // );
    return (
        <div className="container mt-4">
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

            {tokenData && (
                <div className="mt-4 alert alert-success">
                    <h4>OAuth Tokens</h4>

                    <p>
                        <strong>Access Token:</strong>
                        <br />
                        <code>{tokenData.access_token}</code>
                    </p>

                    <p>
                        <strong>Refresh Token:</strong>
                        <br />
                        <code>{tokenData.refresh_token}</code>
                    </p>

                    <p>
                        <strong>Expires In:</strong> {tokenData.expires_in}{" "}
                        seconds
                    </p>

                    <p>
                        <strong>API Server:</strong> {tokenData.api_server}
                    </p>
                </div>
            )}

            {/* ❌ Error message */}
            {error && <div className="alert alert-danger mt-3">{error}</div>}
        </div>
    );
};

export default Home;
