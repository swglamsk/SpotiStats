export const authEndpoint = "https://accounts.spotify.com/authorize?";
export const clientId = "dc9baef164d3457b80831a005a3a4a33";
export const clientSecret = "e03ef52772524e089caac17932b16789";
export const env = process.env.NODE_ENV || "development";
export const redirectUri =
    env === "development"
        ? "http://localhost:3000"
        : "https://spotistats-zpi.netlify.app/";
export const scopes = [
    "user-top-read",
    "user-read-currently-playing",
    "user-read-playback-state",
    "user-read-recently-played",
    "user-modify-playback-state",
];
