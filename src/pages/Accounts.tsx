import { useEffect, useState } from "react";
import axios from "axios";
import Navtabs from "../components/Navtabs";
import { OAUTH_CONFIG } from "../config";
import { useIsAuth } from "../context/AuthContext";

const Accounts = () => {
    const { isAuth } = useIsAuth();
    const [accounts, setAccounts] = useState<any>(null);
    const [selectedAccount, setSelectedAccount] = useState<any>(null);
    const [accountBalances, setAccountBalances] = useState<any>(null);
    const [accountPositions, setAccountPositions] = useState<any>(null);
    const [accountOrders, setAccountOrders] = useState<any>(null);
    const [accountExecutions, setAccountExecutions] = useState<any>(null);
    const [accountActivities, setAccountActivities] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("balances");

    const api = axios.create({ baseURL: OAUTH_CONFIG.backUrl });

    useEffect(() => {
        fetchAccounts();
    }, []);

    useEffect(() => {
        if (selectedAccount) {
            fetchAccountBalances();
        }
    }, [selectedAccount]);

    const fetchAccounts = async () => {
        setError(null);
        try {
            setLoading(true);
            const response = await api.get("/accounts");
            console.log("Accounts response:", response.data);
            const data = response.data;
            setAccounts(response.data);
            return data;
        } catch (err) {
            console.error(err);
            setError("Failed to fetch accounts");
            setAccounts(null);
        } finally {
            setLoading(false);
        }
    };

    const fetchAccountBalances = async () => {
        setError(null);
        if (!selectedAccount) return;
        console.log("fetchAccountBalances selectedAccount:", selectedAccount);
        try {
            setLoading(true);
            const response = await api.get(
                `/accounts/${selectedAccount.number}/balances`,
            );

            console.log("Accounts Balances response:", response.data);
            setAccountBalances(response.data);
        } catch (err) {
            console.error(err);
            setError("Failed to fetch accounts balances");
        } finally {
            setLoading(false);
        }
    };

    const fetchAccountPositions = async () => {
        setError(null);
        console.log("fetchAccountPositions selectedAccount", selectedAccount);
        try {
            setLoading(true);
            const response = await api.get(
                `/accounts/${selectedAccount.number}/positions`,
            );
            console.log("Accounts Positions response:", response.data);
            setAccountPositions(response.data);
        } catch (err) {
            console.error(err);
            setError("Failed to fetch accounts positions");
        } finally {
            setLoading(false);
        }
    };

    const fetchAccountOrders = async () => {
        setError(null);
        console.log("fetchAccountOrders selectedAccount", selectedAccount);
        try {
            setLoading(true);
            const response = await api.get(
                `/accounts/${selectedAccount.number}/orders`,
            );
            console.log("Accounts Orders response:", response.data);
            setAccountOrders(response.data);
        } catch (err) {
            console.error(err);
            setError("Failed to fetch accounts orders");
        } finally {
            setLoading(false);
        }
    };

    const fetchAccountExecutions = async () => {
        setError(null);
        console.log("fetchAccountExecutions selectedAccount", selectedAccount);
        try {
            setLoading(true);
            const response = await api.get(
                `/accounts/${selectedAccount.number}/executions`,
            );
            console.log("Accounts Executions response:", response.data);
            setAccountExecutions(response.data);
        } catch (err) {
            console.error(err);
            setError("Failed to fetch accounts Executions");
        } finally {
            setLoading(false);
        }
    };

    const fetchAccountActivities = async () => {
        setError(null);
        console.log("fetchAccountActivities selectedAccount", selectedAccount);
        try {
            setLoading(true);
            const response = await api.get(
                `/accounts/${selectedAccount.number}/activities`,
            );
            console.log("Accounts Activities response:", response.data);
            setAccountActivities(response.data);
        } catch (err) {
            console.error(err);
            setError("Failed to fetch accounts Activities");
        } finally {
            setLoading(false);
        }
    };

    const selectAccount = (acc: any) => {
        setSelectedAccount(acc);
        setActiveTab("balances");
        fetchAccountBalances();
    };

    return (
        <div>
            <h1>Accounts: </h1>

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
                        <li>
                            <button
                                className="dropdown-item text-muted"
                                disabled
                            >
                                Select account
                            </button>
                        </li>

                        <li>
                            <hr className="dropdown-divider" />
                        </li>
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

            <Navtabs
                loading={loading}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                balances={accountBalances}
                fetchBalances={fetchAccountBalances}
                positions={accountPositions}
                fetchPositions={fetchAccountPositions}
                orders={accountOrders}
                fetchOrders={fetchAccountOrders}
                executions={accountExecutions}
                fetchExecutions={fetchAccountExecutions}
                activities={accountActivities}
                fetchActivities={fetchAccountActivities}
            />

            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
};

export default Accounts;
