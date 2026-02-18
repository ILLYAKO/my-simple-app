import axios from "axios";
import React, { useEffect, useState } from "react";
import { OAUTH_CONFIG } from "../config";
import { useIsAuth } from "../context/AuthContext";

const Home = () => {
    const [error, setError] = useState<string | null>(null);
    const { isAuth, setIsAuth } = useIsAuth();

    const api = axios.create({ baseURL: OAUTH_CONFIG.backUrl });

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");

        if (!code) return;
        const run = async () => {
            console.log("OAuth code received:", code);
            await exchangeCodeForToken(code);
        };

        run();
    }, []);

    const exchangeCodeForToken = async (code: string) => {
        try {
            console.log("Home exchangeCodeForToken");
            const response = await api.post("/auth/exchange-token", { code });
            const data = response.data;
            console.log(
                "Home exchangeCodeForToken response.data:",
                response.data,
            );
            console.log(
                "Home exchangeCodeForToken access_token:",
                data?.access_token,
            );
            console.log(
                "Home exchangeCodeForToken refresh_token:",
                data?.refresh_token,
            );
            console.log(
                "Home exchangeCodeForToken api_server:",
                data?.api_server,
            );

            if (
                data?.access_token &&
                data?.refresh_token &&
                data?.api_server &&
                data?.isAuth
            ) {
                setIsAuth(data?.isAuth);
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
    return isAuth ? <h2>"Welcome.1"</h2> : <h2>"Please login."</h2>;
};

export default Home;
function setAccounts(isAuth: any) {
    throw new Error("Function not implemented.");
}
