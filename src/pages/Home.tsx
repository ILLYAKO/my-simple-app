import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { OAUTH_CONFIG } from "../config";

const Home = () => {
    const navigate = useNavigate();
    const backUrl = "http://localhost:3000";

    const [tokenData, setTokenData] = useState<any>(null);
    const [accounts, setAccounts] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [selectedAccount, setSelectedAccount] = useState<any>(null);
    const [questradeTime, setQuestradeTime] = useState<any>(null);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");

        // if (code) {
        //     console.log("OAuth code received:", code);
        //     exchangeCodeForToken(code);
        //     fetchTime();
        //     fetchAccounts();
        // }
        if (!code) return;
        const run = async () => {
            console.log("OAuth code received:", code);

            await exchangeCodeForToken(code);
            await fetchTime();
            await fetchAccounts();
        };

        run();
    }, []);

    const exchangeCodeForToken = async (code: string) => {
        try {
            const response = await axios.post(
                //"http://localhost:3000/exchange-token",
                `${backUrl}/exchange-token`,
                { code },
            );

            const data = response.data;

            if (data?.access_token && data?.refresh_token && data?.api_server) {
                setTokenData(data);

                window.history.replaceState(
                    {},
                    document.title,
                    "/my-simple-app/",
                );

                // fetchTime(data.access_token, data.api_server);
                // fetchAccounts(data.access_token, data.api_server);
            } else {
                setError("Token response is missing required fields");
            }
        } catch (err) {
            console.error("Failed to exchange code for token:", err);
            setError("Failed to exchange code for token");
        }
    };

    const fetchAccounts = async () => {
        try {
            const response = await axios.get(
                // "http://localhost:3000/accounts",
                `${backUrl}/accounts`,
                {
                    // params: {
                    //     accessToken,
                    //     apiServer,
                    // },
                },
            );
            console.log("Accounts response:", response.data);
            setAccounts(response.data);
        } catch (err) {
            console.error(err);
            setError("Failed to fetch accounts");
        }
    };
    const fetchTime = async () => {
        try {
            const response = await axios.get(
                // "http://localhost:3000/time",
                `${backUrl}/time`,
                {
                    // params: {
                    //     accessToken,
                    //     apiServer,
                    // },
                },
            );
            console.log("Time response:", response.data);
            setQuestradeTime(response.data);
        } catch (err) {
            console.error(err);
            setError("Failed to fetch accounts");
        }
    };
    const fetchAccountActivities = async (tokenData: any) => {
        // GET https://api01.iq.questrade.com/v1/accounts/26598145/activities?startTime=2011-02-01T00:00:00-05:00&endTime=2011-02-28T00:00:00-05:00&

        try {
            const response = await axios.get(
                // "http://localhost:3000/time",
                `${backUrl}/activities`,
                {
                    // params: {
                    //     tokenData.access_token,
                    //     tokenData.api_server,
                    // },
                },
            );
            console.log("Time response:", response.data);
            setQuestradeTime(response.data);
        } catch (err) {
            console.error(err);
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

    const selectAccount = (account: any) => {
        setSelectedAccount(account);
    };

    return (
        <div>
            <h1>Home Page</h1>
            {questradeTime && <div>{questradeTime.time}</div>}

            <button onClick={goToQuestradeLogin}>Login with Questrade</button>
            <button onClick={() => navigate("/about")}>Go to About</button>
            <Link to="/about">Go to About</Link>
            {accounts?.accounts && (
                <div className="dropdown">
                    <button
                        className="btn btn-primary dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        {selectedAccount
                            ? `${selectedAccount.type} — ${selectedAccount.number}`
                            : "Select account"}
                    </button>

                    <ul className="dropdown-menu">
                        {accounts.accounts.map((acc: any) => (
                            <li key={acc.number}>
                                <button
                                    className="dropdown-item d-flex justify-content-between align-items-center"
                                    // onClick={() => setSelectedAccount(acc)}
                                    onClick={selectAccount}
                                >
                                    <span>
                                        {acc.type} — {acc.number}
                                    </span>

                                    {acc.isPrimary && (
                                        <span className="badge bg-success ms-2">
                                            Primary
                                        </span>
                                    )}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {selectedAccount && <div>{selectedAccount}</div>}

            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
};

export default Home;
