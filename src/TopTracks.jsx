import React from "react";
import "./RecentSongs.css";
import { Button, Grid } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import { withStyles } from "@material-ui/core/styles";
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
  );
};
export default TopTracks;
