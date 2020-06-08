import * as React from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getToken } from "../store/token/selectors";
import { addToken } from "../store/token/actions";
import { getAuthorizationCode } from "../utils/getAuthorizationCode";
import { Icon } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import SpotifyWebApi from "spotify-web-api-js";
import { SvgIcon } from "material-ui";
import { wait } from "@testing-library/react";

const useStyles = makeStyles({
  root: {
    overflow: "hidden",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "fixed",
    width: "100%",
    marginBottom: 8,
    "& button": {
      all: "unset",
      cursor: "pointer",
      float: "left",
      color: "#f2f2f2",
      textAlign: "center",
      paddingTop: 14,
      paddingBottom: 14,
      paddingLeft: 16,
      paddingRight: 16,
      textDecoration: "none",
      fontSize: 20,
      fontFamily: [
        '"Helvetica Neue"',
        "Circular",
        "spotify-circular",
        "Arial",
        "sans-serif",
      ].join(","),
      "&:hover": {
        backgroundColor: "#ddd",
        color: "black",
      },
      "&.active": {
        backgroundColor: "#4caf50",
        color: "white",
      },
    },
  },
  player: {
    overflow: "hidden",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "fixed",
    width: "100%",
    marginBottom: 8,
    marginTop: 60,
    fontFamily: [
      '"Helvetica Neue"',
      "Circular",
      "spotify-circular",
      "Arial",
      "sans-serif",
    ].join(","),
  },
  profilepic: {
    borderRadius: "50%",
    width: 40,
    height: 40,
    margin: "10px 10px",
  },
  icon: {
    color: "#ffffff",
  },
  logo: {
      paddingRight: 100,
      color: '#ffffff'
  },
});

export const Navigation = () => {
  const history = useHistory();
  const token = useSelector((state) => getToken(state));
  const classes = useStyles();

  const [state, setState] = React.useState({
    id: null,
    name: null,
    profileImageURL: null,
    current_playing: null,
    is_playing: null,
  });

  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(addToken(null));
    sessionStorage.removeItem("token");
    history.push("/");
  };

  const nextSong = async () => {
    let spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(token);
    await spotifyApi.skipToNext();
    wait(100);
    await refresh();
  };

  const prevSong = async () => {
    let spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(token);
    await spotifyApi.skipToPrevious();
    wait(100);
    await refresh();
  };

  const resumeSong = async () => {
    let spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(token);
    await spotifyApi.play();
    wait(100);
    await refresh();
  };

  const pauseSong = async () => {
    let spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(token);
    await spotifyApi.pause();
    wait(100);
    await refresh();
  };

  const refresh = async () => {
    let spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(token);
    let userData = await spotifyApi.getMe();
    let current = await spotifyApi.getMyCurrentPlayingTrack();
    setState({
      id: userData.id,
      name: userData.display_name,
      profileImageURL: userData.images[0].url,
      current_playing: current.item,
      is_playing: current.is_playing,
    });
  };

  React.useEffect(() => {
    let spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(token);

    const getUserData = async () => {
      let userData = await spotifyApi.getMe();
      let current = await spotifyApi.getMyCurrentPlayingTrack();
      setState({
        id: userData.id,
        name: userData.display_name,
        profileImageURL: userData.images[0].url,
        current_playing: current.item,
        is_playing: current.is_playing,
      });
    };
    if (token) {
      getUserData();
    }

  }, [token, state.item]);

  const profilePic = (
    <>
      <img
        className={classes.profilepic}
        src={state.profileImageURL}
        alt="yourpic"
      />
    </>
  );

  const logo = (
    <>
    <div className={classes.logo}>
    <a href="/">
      <img
        
        src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.iconsdb.com%2Ficons%2Fdownload%2Fwhite%2Fspotify-512.gif&f=1&nofb=1"
        alt="logo"
        color='white'
        width='50px'
        height='50px'
      />
      <b>{" SpotiStats"}</b>
      </a>
      </div>
    </>
  );

  return token ? (
    <>
      <div className={classes.root}>
        {logo}
        <button onClick={() => history.push("/recent")}>Recent tracks</button>
        <button onClick={() => history.push("/top-artists")}>
          Top artists and tracks
        </button>
        <button onClick={() => history.push("/compare-artists")}>
          Compare artists
        </button>
        {token ? (
          <button onClick={() => logOut()}>Log out</button>
        ) : (
          <button onClick={() => getAuthorizationCode()}>Log in</button>
        )}
        {profilePic}
      </div>
      
        
          <div className={classes.player}>
            <div className={classes.icon} onClick={() => prevSong()}>
              <SkipPreviousIcon fontSize="large" />
            </div>
            <div className={classes.icon} onClick={() => resumeSong()}>
              <PlayArrowIcon fontSize="large" />
            </div>
            <div className={classes.icon} onClick={() => pauseSong()}>
              <PauseIcon fontSize="large" />
            </div>
            <div className={classes.icon} onClick={() => nextSong()}>
              <SkipNextIcon fontSize="large" />
            </div>
            <div className={classes.icon}>

              {state.is_playing ? "Playing: " +
                state.current_playing.name +
                " " +
                state.current_playing.artists[0].name : null}
            </div>
          </div>
        
      
    </>
  ) : null;
};
