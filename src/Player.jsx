import React from "react";

import SpotifyWebApi from "spotify-web-api-js";
import "./Player.css";
import { getToken } from "./store/token/selectors";
import { useSelector } from "react-redux";

const Player = () => {
  const [state, setState] = React.useState({
    item: null,
    is_playing: null,
    progress_ms: null,
  });
  const token = useSelector((state) => getToken(state));
  console.log(token);
  React.useEffect(() => {
    const getCurrentlyPlaying = async () => {
      // Make a call using the token
      let spotifyApi = new SpotifyWebApi();
      spotifyApi.setAccessToken(token);
      let current = await spotifyApi.getMyCurrentPlayingTrack();
      setState({
        item: current.item,
        is_playing: current.is_playing,
        progress_ms: current.progress_ms,
      });
    };
    if (token) {
      console.log(token);
      getCurrentlyPlaying();
    }
  }, [token]);

  return (
    state.item && (
      <div className="main-wrapper">
        <div className="now-playing__img">
          <img src={state.item.album.images[0].url} alt="pic" />
        </div>
        <div className="now-playing__side">
          <div className="now-playing__name">{state.item.name}</div>
          <div className="now-playing__artist">
            {state.item.artists[0].name}
          </div>
          <div className="now-playing__status">
            {state.is_playing ? "Playing" : "Paused"}
          </div>
        </div>
        <div
          className="background"
          style={{
            backgroundImage: `url(${state.item.album.images[0].url})`,
          }}
        />
      </div>
    )
  );
};

export default Player;
