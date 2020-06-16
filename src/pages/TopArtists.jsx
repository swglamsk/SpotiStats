import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { getToken } from "../store/token/selectors";
import SpotifyWebApi from "spotify-web-api-js";
import { TopDisplayGrid } from "../components/shared/TopDisplayGrid";
import { ColorButton } from "../components/shared/ColorButton";

const useStyles = makeStyles({
    root: {
        paddingTop: 110,
    },
    button: {
        position: "absolute",
        right: 10,
        top: 60,
    },
    label: {
        fontWeight: "bold",
        flex: 1,
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

const TopArtists = () => {
    const history = useHistory();
    const classes = useStyles();

    const [state, setState] = React.useState({
        items: null,
    });

    const token = useSelector((state) => getToken(state));

    React.useEffect(() => {
        const getTopArtists = async () => {
            let spotifyApi = new SpotifyWebApi();
            spotifyApi.setAccessToken(token);
            let artists = await spotifyApi.getMyTopArtists({ limit: "9" });
            console.log(await spotifyApi.searchArtists("Metallica"));
            console.log(artists);
            setState({
                items: artists.items,
            });
        };
        if (token) {
            getTopArtists();
        }
    }, [token]);

    return (
        <>
            <div className={classes.bg} />
            <div className={classes.premiumbg} />
            <div className={classes.root}>
                <div className={classes.label}>
                    <h2>Top Artists List</h2>
                </div>
                <ColorButton
                    className={classes.button}
                    onClick={() => history.push("/top-tracks")}
                >
                    Switch to Top Tracks
                </ColorButton>
                {state.items && <TopDisplayGrid list={state.items} />}
            </div>
        </>
    );
};
export default TopArtists;
