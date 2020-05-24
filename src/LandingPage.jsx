import React from "react";
import { getAuthorizationCode } from "./utils/getAuthorizationCode";
import "./LandingPage.css";
import { Box, Button, Grid } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import { withStyles } from "@material-ui/core/styles";
import { FormatListNumbered, Folder, TrendingUp } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { getToken } from "./store/token/selectors";
import { useSelector } from "react-redux";
import SpotifyWebApi from "spotify-web-api-js";
import Player from "./Player";
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

const LandingPage = () => {
  const history = useHistory();
  const token = useSelector((state) => getToken(state));
  const [state, setState] = React.useState({
    id: null,
    name: null,
    profileImageURL: null,
  });

  React.useEffect(() => {
    const getUserData = async () => {
      let spotifyApi = new SpotifyWebApi();
      spotifyApi.setAccessToken(token);
      let userData = await spotifyApi.getMe();
      setState({
        id: userData.id,
        name: userData.display_name,
        profileImageURL: userData.images[0].url,
      });
    };
    if (token) {
      getUserData();
    }
  }, [token]);

  return (
    <div>
      <div className="topnav">
        <a href ="#test" onClick={() => history.push("/recent")} >Recent tracks</a>

        <a href="#news" onClick={() => history.push("/top-artists")} >Top albums and tracks</a>
        <a href="#contact">Compare artists</a>
        {token ? <a href="#about">Log out</a> : <a href="#about">Log in</a>}
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
          {token ? (
            <>
              <img
                className="profilepic"
                src={state.profileImageURL}
                alt="yourpic"
              />
              Hello {state.name} :)
            </>
          ) : (
            <>
              Log in with your Spotify account
              <br />
              <ColorButton
                className="buttonLogin"
                onClick={() => getAuthorizationCode()}
              >
                Log in with Spotify
              </ColorButton>
            </>
          )}
        </Box>
      </div>
      {token ? (
        <Player />
      ) : (
        <div>
          <Grid container className="gridInfo" spacing={2} justify="center">
            <Grid item className="gridItem">
              <div className="gridItemChild">
                <div className="gridIcon">
                  <FormatListNumbered fontSize="inherit" />
                </div>
                <div className="gridText">
                  <a href="#tracks">Recent Tracks List</a>
                </div>
              </div>
              <div>
                Lorem ipsum dolor sit amet enim. Etiam ullamcorper. Suspendisse
                a pellentesque dui, non felis. Maecenas malesuada elit lectus
                felis, malesuada ultricies. Curabitur et ligula. Ut molestie a,
                ultricies porta urna. Vestibulum
              </div>
            </Grid>
            <Grid item className="gridItem">
              <div className="gridItemChild">
                <div className="gridIcon">
                  <Folder fontSize="inherit" />
                </div>
                <div className="gridText">
                  <a href="#top">Top Albums and Artists </a>
                </div>
              </div>
              <div>
                Lorem ipsum dolor sit amet enim. Etiam ullamcorper. Suspendisse
                a pellentesque dui, non felis. Maecenas malesuada elit lectus
                felis, malesuada ultricies. Curabitur et ligula. Ut molestie a,
                ultricies porta urna. Vestibulum
              </div>
            </Grid>
            <Grid item className="gridItem">
              <div className="gridItemChild">
                <div className="gridIcon">
                  <TrendingUp fontSize="inherit" />
                </div>
                <div className="gridText">
                  <a href="#compare">Compare artists</a>
                </div>
              </div>
              <div>
                Lorem ipsum dolor sit amet enim. Etiam ullamcorper. Suspendisse
                a pellentesque dui, non felis. Maecenas malesuada elit lectus
                felis, malesuada ultricies. Curabitur et ligula. Ut molestie a,
                ultricies porta urna. Vestibulum
              </div>
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  );
};
export default LandingPage;
