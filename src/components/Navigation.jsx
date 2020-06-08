import * as React from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getToken } from "../store/token/selectors";
import { addToken } from "../store/token/actions";
import { getAuthorizationCode } from "../utils/getAuthorizationCode";
import { Icon } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
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
      fontSize: 17,
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
      fontSize: 17,
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
  profilepic: {
    borderRadius: "50%",
    width: 40,
    height: 40,
    margin: "10px 10px",
  },
  icon: {
      color: "#ffffff",
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

  const resumeSong = async () =>  {
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
  }

  React.useEffect(() => {
    const getUserData = async () => {
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
    if (token) {
      getUserData();
    }
  }, [token]);

  const profilePic = (
    <>
      <img
        className={classes.profilepic}
        src={state.profileImageURL}
        alt="yourpic"
      />
    </>
  );

  return token ? (
    <>
      <div className={classes.root}>
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
      {state.is_playing ? (
        <>
          <div className={classes.player}>
            <div className={classes.icon} onClick={() => prevSong()}>
              <SkipPreviousIcon fontSize="large"/>
            </div>
            <div className={classes.icon} onClick={() => resumeSong()}>
              <PlayArrowIcon fontSize="large"/>
            </div>
            <div className={classes.icon} onClick={() => pauseSong()}>
              <PauseIcon fontSize="large" />
            </div>
            <div className={classes.icon} onClick={() => nextSong()}>
              <SkipNextIcon fontSize="large"/>
            </div>
            <div className={classes.icon}>
                {"Playing: " + state.current_playing.name + " by " + state.current_playing.artists[0].name}
            </div>
          </div>
        </>
      ) : null}
    </>
  ) : null;
};
