import React, { useEffect } from "react";
import axios from "axios";
import { OAUTH_CONFIG } from "./config";

const OAuthHandler = () => {
    useEffect(() => {
        // Parse URL parameters
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code"); // get ?code=...

        if (code) {
            console.log("OAuth code received:", code);

            // Send the next request to exchange code for access token
            const fetchToken = async () => {
                try {
                    const response = await axios.post(
                        "https://login.questrade.com/oauth2/token",
                        {
                            grant_type: "authorization_code",
                            code: code,
                            client_id: OAUTH_CONFIG.clientId,
                            redirect_uri: OAUTH_CONFIG.redirectUri,
                        },
                    );

                    console.log("Token response:", response.data);
                    // Save token in Redux / localStorage as needed
                } catch (error) {
                    console.error("Error fetching token:", error);
                }
            };

            fetchToken();
        }
    }, []);

    return (
        <div>
            <h2>Processing OAuth login...</h2>
        </div>
    );
};

export default OAuthHandler;
