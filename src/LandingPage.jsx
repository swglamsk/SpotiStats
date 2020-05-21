import React from "react";
import { getAuthorizationCode } from "./utils/getAuthorizationCode";
import "./LandingPage.css";
import { Box, Button, Grid } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import { withStyles } from "@material-ui/core/styles";
import { FormatListNumbered, Folder, TrendingUp } from "@material-ui/icons";

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
  return (
    <div>
      <div className="topnav">
        <a href="#home">Recent tracks</a>
        <a href="#news">Top albums and tracks</a>
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
              <div className="gridIcon">
                <FormatListNumbered fontSize="inherit" />
              </div>
              <div className="gridText">
                <a href="#tracks">Recent Tracks List</a>
              </div>
            </div>
            <div>
              Lorem ipsum dolor sit amet enim. Etiam ullamcorper. Suspendisse a
              pellentesque dui, non felis. Maecenas malesuada elit lectus felis,
              malesuada ultricies. Curabitur et ligula. Ut molestie a, ultricies
              porta urna. Vestibulum
            </div>
          </Grid>
          <Grid item className="gridItem">
            <div className="gridItemChild">
              <div className="gridIcon">
                <Folder fontSize="inherit" />
              </div>
              <div className="gridText"><a href="#top">Top Albums and Artists </a></div>
            </div>
            <div>
              Lorem ipsum dolor sit amet enim. Etiam ullamcorper. Suspendisse a
              pellentesque dui, non felis. Maecenas malesuada elit lectus felis,
              malesuada ultricies. Curabitur et ligula. Ut molestie a, ultricies
              porta urna. Vestibulum
            </div>
          </Grid>
          <Grid item className="gridItem">
            <div className="gridItemChild">
              <div className="gridIcon">
                <TrendingUp fontSize="inherit" />
              </div>
              <div className="gridText"><a href="#compare">Compare artists</a></div>
            </div>
            <div>
              Lorem ipsum dolor sit amet enim. Etiam ullamcorper. Suspendisse a
              pellentesque dui, non felis. Maecenas malesuada elit lectus felis,
              malesuada ultricies. Curabitur et ligula. Ut molestie a, ultricies
              porta urna. Vestibulum
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
export default LandingPage;
