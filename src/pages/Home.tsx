import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { OAUTH_CONFIG } from "../config";

const Home = () => {
    const navigate = useNavigate();

    // const [tokenData, setTokenData] = useState<{
    //     access_token?: string;
    //     refresh_token?: string;
    //     expires_in?: number;
    //     api_server?: string;
    // } | null>(null);
    // const [error, setError] = useState<string | null>(null);
    const [tokenData, setTokenData] = useState<any>(null);
    const [accounts, setAccounts] = useState<any>(null);
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
                // {headers: {"Content-Type": "application/json",},},
            );

            // console.log("Access token response:", response.data);
            // console.log("-->access_token: ", response.data.access_token);
            // console.log("-->refresh_token: ", response.data.refresh_token);

            if (response.data?.access_token && response.data?.refresh_token) {
                setTokenData(response.data);

                window.history.replaceState(
                    {},
                    document.title,
                    "/my-simple-app/",
                );

                fetchAccounts(response.data.access_token);
            } else {
                setError("Token response is missing required fields");
            }
        } catch (error) {
            console.error("Failed to exchange code for token:", error);
        }
    };

    const fetchAccounts = async (accessToken: string) => {
        try {
            const response = await axios.get(
                // "https://api01.iq.questrade.com/v1/accounts", ///////////////////
                `${tokenData.api_server}v1/accounts`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                },
            );

            console.log("Accounts response:", response.data);
            setAccounts(response.data);
        } catch (err) {
            console.error("Failed to fetch accounts:", err);
            setError("Failed to fetch accounts");
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

            <button onClick={goToQuestradeLogin}>Login with Questrade</button>

            {tokenData && (
                <div>
                    <h3>Access Token</h3>
                    <pre>{tokenData.access_token}</pre>
                </div>
            )}

            {accounts && (
                <div>
                    <h3>Accounts</h3>
                    <pre>{JSON.stringify(accounts, null, 2)}</pre>
                </div>
            )}

            {error && <p style={{ color: "red" }}>{error}</p>}

            <button onClick={() => navigate("/about")}>Go to About</button>
            <Link to="/about">Go to About</Link>
        </div>
    );
};

export default Home;
