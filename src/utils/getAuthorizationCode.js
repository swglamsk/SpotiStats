import { authEndpoint, clientId, redirectUri, scopes} from "../config";


export const getAuthorizationCode = () => {

    var scopes_string = "";
    scopes.forEach(function (item, index) {
        scopes_string += (item + "%20");
    });
    console.log(scopes_string);

    window.location.href
    = authEndpoint
    + `client_id=${clientId}`
    + "&response_type=code"
    + `&redirect_uri=${redirectUri}`
    + `&scope=${scopes_string}`;
};