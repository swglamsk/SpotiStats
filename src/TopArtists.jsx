import React from "react";
import "./RecentSongs.css";
import { Button, Grid } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import { withStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { getToken } from "./store/token/selectors";
import SpotifyWebApi from "spotify-web-api-js";
import ArtistsTable from "./ArtistsTable"

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


const TopArtists = () => {
  let history = useHistory();

  const [state, setState] = React.useState({
    items: null,
  });

  const token = useSelector((state) => getToken(state));

  React.useEffect(() => {
    const getTopArtists = async () => {
      let spotifyApi = new SpotifyWebApi();
      spotifyApi.setAccessToken(token);
      let artists = await spotifyApi.getMyTopArtists({ "limit": "9" });
      setState({
        items: artists.items,
      });
    }; 
    if (token) {
      getTopArtists();
    }
  }, [token]);

  return ( 
    <div>
        <Grid container className="gridInfo" spacing={2} justify="center">
          <Grid item className="gridItem">
            <div className="gridItemChild">
              <div className="gridText">
                Top Artists List
              </div>
              <ColorButton
                className="buttonTracks"
                onClick={() => history.push("/top-tracks")}>
                Switch to Top Tracks
              </ColorButton>
            </div>
            <div>{state.items ? <ArtistsTable items={state.items}/> : <></>} </div>
          </Grid>
        </Grid>
    </div>
  );
};
export default TopArtists;
