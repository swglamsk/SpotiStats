import { authEndpoint, clientId, redirectUri } from "../config";


export const getAuthorizationCode = () => {
    window.location.href
    = authEndpoint
    + `client_id=${clientId}`
    + "&response_type=code"
    + `&redirect_uri=${redirectUri}`
    + "&scope=user-read-private%20user-read-email%20user-read-currently-playing";
};