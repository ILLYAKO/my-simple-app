import { OAUTH_CONFIG } from "../config";

const LoginButton = () => {
    const handleLogin = () => {
        const url = `https://login.questrade.com/oauth2/authorize?client_id=${OAUTH_CONFIG.clientId}&response_type=code&redirect_uri=${encodeURIComponent(OAUTH_CONFIG.redirectUri)}`;
        window.location.href = url;
    };

    return (
        <button className="btn btn-primary" onClick={handleLogin}>
            Login with Questrade
        </button>
    );
};

export default LoginButton;
