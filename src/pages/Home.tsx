import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { OAUTH_CONFIG } from "../config";
import LoginButton from "../components/LoginButton";
import Navtabs from "../components/Navtabs";
import { useAccounts } from "../context/AccountsContext";

const Home = () => {
    const navigate = useNavigate();
    const backUrl = "http://localhost:3000";

    const { accounts, setAccounts } = useAccounts();

    const [tokenData, setTokenData] = useState<any>(null);
    //const [accounts, setAccounts] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [selectedAccount, setSelectedAccount] = useState<any>(null);
    const [accountOrders, setAccountOrders] = useState<any>(null);
    const [questradeTime, setQuestradeTime] = useState<any>(null);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");

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
            const response = await axios.post(`${backUrl}/exchange-token`, {
                code,
            });

            const data = response.data;

            if (data?.access_token && data?.refresh_token && data?.api_server) {
                setTokenData(data);

                window.history.replaceState(
                    {},
                    document.title,
                    "/my-simple-app/",
                );
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
            const response = await axios.get(`${backUrl}/accounts`);
            console.log("Accounts response:", response.data);
            setAccounts(response.data);
        } catch (err) {
            console.error(err);
            setError("Failed to fetch accounts");
            setAccounts(null);
        }
    };
    const fetchTime = async () => {
        try {
            const response = await axios.get(`${backUrl}/time`);
            console.log("Time response:", response.data);
            setQuestradeTime(response.data);
        } catch (err) {
            console.error(err);
            setError("Failed to fetch accounts");
        }
    };
    const fetchAccountOrders = async (accountNumber: any) => {
        console.log("fetchAccountOrders accountNumber", accountNumber);
        console.log("fetchAccountOrders selectedAccount", selectedAccount);
        try {
            const response = await axios.get(
                `${backUrl}/accounts/${accountNumber}/orders`,
            );
            console.log("Accounts Orders response:", response.data);
            setAccountOrders(response.data);
        } catch (err) {
            console.error(err);
            setError("Failed to fetch accounts");
        }
    };

    const selectAccount = (account: any) => {
        console.log("Selected account: ", account);
        setSelectedAccount(account);
        fetchAccountOrders(account.number);
    };

    return (
        <div>
            <h1>Home Page</h1>
            {questradeTime && <div>{questradeTime.time}</div>}

            {/* {!accounts ? (
                <p>No accounts loaded yet...</p>
            ) : (
                <pre>{JSON.stringify(accounts, null, 2)}</pre>
            )} */}

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
                                    onClick={() => selectAccount(acc)}
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

            {selectedAccount && (
                <pre className="mt-3">
                    {JSON.stringify(selectedAccount, null, 2)}
                </pre>
            )}

            {accountOrders && (
                <pre className="mt-3">
                    {JSON.stringify(accountOrders, null, 2)}
                </pre>
            )}
            <Navtabs />

            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
};

export default Home;
