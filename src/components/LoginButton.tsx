import { OAUTH_CONFIG } from "../config";

const LoginButton = () => {
    const handleLogin = () => {
        const url = new URL(OAUTH_CONFIG.authUrl);
        url.searchParams.append("client_id", OAUTH_CONFIG.clientId);
        url.searchParams.append("response_type", "code");
        url.searchParams.append("redirect_uri", OAUTH_CONFIG.redirectUri);
        window.location.href = url.toString();
    };

    return (
        <button className="btn btn-primary" onClick={handleLogin}>
            Login with Questrade
        </button>
    );
};

export default LoginButton;
