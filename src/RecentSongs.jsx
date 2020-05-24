import React from "react";
import "./RecentSongs.css";
import { Grid } from "@material-ui/core";
import { useSelector } from "react-redux";
import { getToken } from "./store/token/selectors";
import SpotifyWebApi from "spotify-web-api-js";
import RecentTable from "./RecentTable"

const RecentSongs = () => {
  const [state, setState] = React.useState({
    items: null,
  });

  const token = useSelector((state) => getToken(state));
  console.log(token);

  React.useEffect(() => {
    const getRecentlyPlayed = async () => {
      // Make a call using the token
      let spotifyApi = new SpotifyWebApi();
      spotifyApi.setAccessToken(token);
      let recent = await spotifyApi.getMyRecentlyPlayedTracks({ limit: 50 });
      //console.log("elo melo recent.items")
      console.log(recent.items);
      setState({
        items: recent.items,
      });
    };
    if (token) {
      console.log(token);
      getRecentlyPlayed();
    }
  }, [token]);

  return (
    <div>
        <Grid container className="gridInfo" spacing={2} justify="center">
          <Grid item className="gridItem">
            <div className="gridItemChild">
              <div className="gridText">
                Recent Tracks List
              </div>
            </div>
            <div>{state.items ? <RecentTable items={state.items}/> : <></>}</div>
          </Grid>
        </Grid>
    </div>
  );
};
export default RecentSongs;
