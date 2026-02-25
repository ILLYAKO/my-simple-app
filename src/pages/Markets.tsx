import axios from "axios";
import React, { useEffect, useState } from "react";
import { OAUTH_CONFIG } from "../config";
import { useIsAuth } from "../context/AuthContext";

const Markets = () => {
    const [error, setError] = useState<string | null>(null);
    const { isAuth, setIsAuth } = useIsAuth();
    const [markets, setMarkets] = useState<any | null>(null);
    const [selectedMarket, setSelectedMarket] = useState<any>(null);

    const [loading, setLoading] = useState(false);

    const api = axios.create({ baseURL: OAUTH_CONFIG.backUrl });

    useEffect(() => {
        fetchMarkets();
    }, []);

    const fetchMarkets = async () => {
        // console.log("-- Markets --");
        setError(null);
        try {
            setLoading(true);
            const response = await api.get("/markets");
            // console.log("Markets response:", response.data);
            const data = response.data;
            setMarkets(response.data);
            return data;
        } catch (err) {
            console.error(err);
            setError("Failed to fetch markets");
            setMarkets(null);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Markets</h2>

            {markets?.markets && (
                <div className="dropdown">
                    <button
                        className="btn btn-primary dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        {selectedMarket
                            ? `${selectedMarket.name} — ${selectedMarket.defaultTradingVenue}`
                            : "Select market"}
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
                        {markets.markets.map((market: any) => (
                            <li key={market.defaultTradingVenue}>
                                <button
                                    className="dropdown-item d-flex justify-content-between align-items-center"
                                    onClick={() => setSelectedMarket(market)}
                                >
                                    <span>
                                        {market.name} —{" "}
                                        {market.defaultTradingVenue}
                                    </span>

                                    {/* {market.isPrimary && (
                                        <span className="badge bg-success ms-2">
                                            Primary
                                        </span>
                                    )} */}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* <pre className="mt-3">{JSON.stringify(markets, null, 2)}</pre> */}
            {selectedMarket ? (
                <div>
                    <h3>{`${selectedMarket.name} — ${selectedMarket.defaultTradingVenue}`}</h3>
                    <pre className="mt-3">
                        {JSON.stringify(selectedMarket, null, 2)}
                    </pre>
                </div>
            ) : (
                "Select market"
            )}

            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
};

export default Markets;
