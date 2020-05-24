import React from "react";
import { Button, Grid } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import { withStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { getToken } from "./store/token/selectors";
import SpotifyWebApi from "spotify-web-api-js";
import { TopDisplayGrid } from "./TopDisplayGrid";

const ColorButton = withStyles((theme) => ({
  root: {
    boxShadow: theme.shadows[5],
    color: "white",
    backgroundColor: green[500],
    width: 250,
    "&:hover": {
      backgroundColor: green[700],
    },
    position: 'absolute',
    right: 10,
    top: 60
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
      console.log(artists);
      setState({
        items: artists.items,
      });
    }; 
    if (token) {
      getTopArtists();
    }
  }, [token]);

//   return (
//     state.items && <TopDisplayGrid list={state.items} />
//   );

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
            <div>{state.items ? <TopDisplayGrid list={state.items} /> : <></>} </div>
          </Grid>
        </Grid>
    </div>
  );
};
export default TopArtists;
