import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import Player from "./Player";
import RecentSongs from "./RecentSongs";
import TopArtists from "./TopArtists";
import TopTracks from "./TopTracks";
import { getToken } from "./store/token/selectors";
import { getQueryParameter } from "./utils/getQueryParameter";
import { getAccessToken } from "./utils/getAccessToken";
import { addToken } from "./store/token/actions";
import LandingPage from "./LandingPage";
import { BrowserRouter, Route } from "react-router-dom";

const App = () => {
  const [hasCredentials, setHasCredentials] = React.useState(false);
  const dispatch = useDispatch();

  React.useEffect(() => {
    const sessionToken = sessionStorage.getItem("token");
    if (sessionToken) {
      dispatch(addToken(sessionToken));
      setHasCredentials(true);
    } else {
      const code = getQueryParameter("code");
      console.log(code);
      if (code) {
        getAccessToken(code).then((data) => {
          console.log(data);
          if (data.access_token) {
            dispatch(addToken(data.access_token));
            sessionStorage.setItem("token", data.access_token);
            setHasCredentials(true);
          }
        });
      }
    }
  }, [dispatch, hasCredentials]);
  return (
    // hasCredentials
    // ? <Player token={token}/>
    // : <LandingPage/>
    <BrowserRouter>
    <Route exact path = "/" component = {LandingPage}/>
    <Route path = "/recent" component = {RecentSongs}/>
    <Route path = "/top-artists" component = {TopArtists}/>
    <Route path = "/top-tracks" component = {TopTracks}/>
    </BrowserRouter>
  );
};

export default App;