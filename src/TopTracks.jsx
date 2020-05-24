import React from "react";
import { getAuthorizationCode } from "./utils/getAuthorizationCode";
import "./RecentSongs.css";
import { Box, Button, Grid } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import { withStyles } from "@material-ui/core/styles";
import { FormatListNumbered, Folder, TrendingUp } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { getToken } from "./store/token/selectors";
import SpotifyWebApi from "spotify-web-api-js";
import TracksTable from "./TracksTable"

const ColorButton = withStyles((theme) => ({
  root: {
    boxShadow: theme.shadows[5],
    color: "white",
    backgroundColor: green[500],
    width: 250,
    "&:hover": {
      backgroundColor: green[700],
    },
  },
}))(Button);


const TopTracks = () => {
  let history = useHistory();

  const [state, setState] = React.useState({
    items: null,
  });

  const token = useSelector((state) => getToken(state));
  console.log(token);

  React.useEffect(() => {
    const getTopTracks = async () => {
      // Make a call using the token
      let spotifyApi = new SpotifyWebApi();
      spotifyApi.setAccessToken(token);
      let tracks = await spotifyApi.getMyTopTracks({ "limit": "9" });
      console.log("elo melo tracks.items")
      console.log(tracks.items);
      setState({
        items: tracks.items,
      });
    }; 
    if (token) {
      console.log(token);
      getTopTracks();
    }
  }, [token]);

  return ( 
    <div>
      <div className="topnav">
        <a href="#test" onClick={() => history.push("/recent")}>
          Recent tracks
        </a>
        <a href="#news" onClick={() => history.push("/top-artists")}>Top albums and tracks</a>
        <a href="#contact">Compare artists</a>
        <a href="#about">Log in</a>
      </div>

      <div className="containerLogin">
        <Box
          component="div" 
          m={4}
          className="boxLogin"
          p={2}
          border={2}
          borderRadius={8}
        >
          <h2>SpotiStats </h2>
          Check informations about your music <br />
          Log in with your Spotify account to see personal statistics!
          <br />
          <ColorButton
            className="buttonLogin"
            onClick={() => getAuthorizationCode()}
          >
            Log in with Spotify
          </ColorButton>
        </Box>
      </div>
      <div>
        <Grid container className="gridInfo" spacing={2} justify="center">
          <Grid item className="gridItem">
            <div className="gridItemChild">
              <div className="gridText">
                Top Tracks List
              </div>
              <ColorButton
                className="buttonTracks"
                onClick={() => history.push("/top-artists")}>
                Switch to Top Artists
              </ColorButton>
            </div>
            <div>{state.items ? <TracksTable items={state.items}/> : <></>} </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
export default TopTracks;
