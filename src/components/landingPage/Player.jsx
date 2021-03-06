import React from "react";

import SpotifyWebApi from "spotify-web-api-js";
import { getToken } from "../../store/token/selectors";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    root: {
        display: "flex",
        flexDirection: "row",
        flex: 2,
        color: "white",
    },
    name: {
        fontSize: "3em",
    },
    artist: {
        fontSize: "2em",
        marginBottom: "1em",
    },
    album: {
        fontSize: "1.5em",
        marginBottom: "1em",
    },
    status: {
        marginBottom: "1em",
    },
    img: {
        marginRight: "10px",
        textAlign: "right",
        width: "45%",
        "& img": {
            maxWidth: "40vmin",
            width: "100%",
        },
    },
    side: {
        marginLeft: "5%",
        width: "45%",
    },
});

const Player = () => {
    const [state, setState] = React.useState({
        item: null,
        is_playing: null,
        progress_ms: null,
    });
    const token = useSelector((state) => getToken(state));
    const classes = useStyles();

    React.useEffect(() => {
        const getCurrentlyPlaying = async () => {
            let spotifyApi = new SpotifyWebApi();
            spotifyApi.setAccessToken(token);
            let current = await spotifyApi.getMyCurrentPlayingTrack();
            console.log(current.item);
            setState({
                item: current.item,
                is_playing: current.is_playing,
                progress_ms: current.progress_ms,
            });
        };
        const interval = setTimeout(() => {
            if (token) {
                getCurrentlyPlaying();
            }
        }, 5000);
    }, [token, state]);

    return state.item ? (
        <div className={classes.root}>
            <div className={classes.img}>
                <img src={state.item.album.images[0].url} alt="pic" />
            </div>
            <div className={classes.side}>
                <div className={classes.name}>{state.item.name}</div>
                <div className={classes.album}>{state.item.album.name}</div>
                <div className={classes.artist}>
                    {state.item.artists[0].name}
                </div>
                <div className={classes.status}>
                    {state.is_playing ? "Playing" : "Paused"}
                </div>
            </div>
        </div>
    ) : null;
};

export default Player;
