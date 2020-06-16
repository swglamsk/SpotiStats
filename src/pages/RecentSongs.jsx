import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { getToken } from "../store/token/selectors";
import SpotifyWebApi from "spotify-web-api-js";
import RecentTable from "../components/recentSongs/RecentTable";

const useStyles = makeStyles({
    gridInfo: {
        paddingTop: 110,
        width: "100%",
    },
    gridItem: {
        display: "flex",
        flexDirection: "column",
    },
    gridItemChild: {
        display: "flex",
        alignItems: "center",
    },
    gridText: {
        fontWeight: "bold",
        flex: "1",
        textAlign: "center",
        color: "#ffffff",
    },
    bg: {
        width: "100%",
        height: "100%",
        zIndex: -1,
        position: "fixed",
        backgroundImage: "linear-gradient(90deg, #c074b2, #8ab5e8)",
    },
    premiumbg: {
        width: "100%",
        height: "100%",
        zIndex: -1,
        position: "fixed",
        backgroundImage: "linear-gradient(transparent, #000)",
    },
});

const RecentSongs = () => {
    const [state, setState] = React.useState({
        items: null,
    });

    const classes = useStyles();

    const token = useSelector((state) => getToken(state));

    React.useEffect(() => {
        const getRecentlyPlayed = async () => {
            let spotifyApi = new SpotifyWebApi();
            spotifyApi.setAccessToken(token);
            let recent = await spotifyApi.getMyRecentlyPlayedTracks({
                limit: 50,
            });
            setState({
                items: recent.items,
            });
        };
        if (token) {
            getRecentlyPlayed();
        }
    }, [token]);

    return (
        <>
            <div className={classes.bg} />
            <div className={classes.premiumbg} />
            <div>
                <Grid container className={classes.gridInfo} spacing={0}>
                    <Grid item className={classes.gridItem}>
                        <div className={classes.gridItemChild}>
                            <div className={classes.gridText}>
                                <h2>Recent Tracks List</h2>
                            </div>
                        </div>
                        {state.items && <RecentTable items={state.items} />}
                    </Grid>
                </Grid>
            </div>
        </>
    );
};
export default RecentSongs;
