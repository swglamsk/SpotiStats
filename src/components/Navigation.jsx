import * as React from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getToken } from "../store/token/selectors";
import { addToken } from "../store/token/actions";
import { getAuthorizationCode } from "../utils/getAuthorizationCode";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import SpotifyWebApi from "spotify-web-api-js";
import {
    Hidden,
    Drawer,
    ListItem,
    Button,
    IconButton,
} from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        overflow: "hidden",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        display: "flex",
        alignItems: "center",
        position: "fixed",
        width: "100%",
        marginBottom: 8,
        flexWrap: "wrap",
        "& button": {
            color: "#f2f2f2",
            paddingTop: 14,
            paddingBottom: 14,
            paddingLeft: 16,
            paddingRight: 16,
            fontSize: 20,
        },
    },
    player: {
        overflow: "hidden",
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        width: "100%",
        marginBottom: 8,
        marginTop: 60,
        fontFamily: [
            '"Helvetica Neue"',
            "Circular",
            "spotify-circular",
            "Arial",
            "sans-serif",
        ].join(","),
    },
    profilepic: {
        borderRadius: "50%",
        width: 40,
        height: 40,
        margin: "10px 10px",
    },
    icon: {
        color: "#ffffff",
    },
    logo: {
        color: "#ffffff",
        flex: 1,
        display: "flex",
        justifyContent: "center",
    },
    drawer: {
        backgroundColor: "grey",
        width: 200,
        "& *": {
            color: "white !important",
        },
    },
    spacer: {
        width: 67,
        height: 63,
    },
    bg: {
        width: 200,
        height: "100%",
        zIndex: -1,
        position: "fixed",
        backgroundImage: "linear-gradient(90deg, #c074b2, #8ab5e8)",
    },
    premiumbg: {
        width: 200,
        height: "100%",
        zIndex: -1,
        position: "fixed",
        backgroundImage: "linear-gradient(transparent, #000)",
    },
});

export const Navigation = () => {
    const history = useHistory();
    const token = useSelector((state) => getToken(state));
    const classes = useStyles();

    const [state, setState] = React.useState({
        id: null,
        name: null,
        profileImageURL: null,
        current_playing: null,
        is_playing: null,
    });

    const [open, setOpen] = React.useState(false);

    let spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(token);

    const dispatch = useDispatch();

    const logOut = () => {
        dispatch(addToken(null));
        sessionStorage.removeItem("token");
        history.push("/");
    };

    const nextSong = async () => {
        spotifyApi.skipToNext();
    };

    const prevSong = async () => {
        spotifyApi.skipToPrevious();
    };

    const resumeSong = async () => {
        spotifyApi.play();
    };

    const pauseSong = async () => {
        spotifyApi.pause();
    };

    React.useEffect(() => {
        let spotifyApi = new SpotifyWebApi();
        spotifyApi.setAccessToken(token);

        const getUserData = async () => {
            let userData = await spotifyApi.getMe();
            let current = await spotifyApi.getMyCurrentPlayingTrack();
            setState({
                id: userData.id,
                name: userData.display_name,
                profileImageURL: userData.images[0].url,
                current_playing: current.item,
                is_playing: current.is_playing,
            });
        };
        const interval = setTimeout(() => {
            if (token) {
                getUserData();
            }
        }, 5000);
    }, [token, state.current_playing]);

    const handleDrawerOpen = () => setOpen(true);
    const handleDrawerClose = () => setOpen(false);

    const profilePic = (
        <>
            <img
                className={classes.profilepic}
                src={state.profileImageURL}
                alt="yourpic"
            />
        </>
    );

    const logo = (
        <>
            <div className={classes.logo}>
                <a href="/">
                    <img
                        src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.iconsdb.com%2Ficons%2Fdownload%2Fwhite%2Fspotify-512.gif&f=1&nofb=1"
                        alt="logo"
                        color="white"
                        width="50px"
                        height="50px"
                    />
                    <b>{" SpotiStats"}</b>
                </a>
            </div>
        </>
    );

    return token ? (
        <>
            <div className={classes.root}>
                <IconButton onClick={handleDrawerOpen}>
                    <MenuIcon fontSize="large" />
                </IconButton>
                {logo}
                <div className={classes.spacer}></div>
            </div>

            <Drawer
                open={open}
                onClose={handleDrawerClose}
                classes={{
                    paper: classes.drawer,
                }}
            >
                <div className={classes.bg} />
                <div className={classes.premiumbg} />
                <ListItem button onClick={() => history.push("/recent")}>
                    Recent tracks
                </ListItem>
                <ListItem button onClick={() => history.push("/top-artists")}>
                    Top artists and tracks
                </ListItem>
                <ListItem
                    button
                    onClick={() => history.push("/compare-artists")}
                >
                    Compare artists
                </ListItem>
                <ListItem button onClick={() => history.push("/genres")}>
                    Genre Wordcloud
                </ListItem>
                {token ? (
                    <div style={{ marginLeft: 8 }}>
                        {profilePic}
                        <Button onClick={() => logOut()}>Log out</Button>
                    </div>
                ) : (
                    <Button onClick={() => getAuthorizationCode()}>
                        Log in
                    </Button>
                )}
            </Drawer>

            <Hidden xsDown>
                <div className={classes.player}>
                    <div className={classes.icon} onClick={() => prevSong()}>
                        <SkipPreviousIcon fontSize="large" />
                    </div>
                    <div className={classes.icon} onClick={() => resumeSong()}>
                        <PlayArrowIcon fontSize="large" />
                    </div>
                    <div className={classes.icon} onClick={() => pauseSong()}>
                        <PauseIcon fontSize="large" />
                    </div>
                    <div className={classes.icon} onClick={() => nextSong()}>
                        <SkipNextIcon fontSize="large" />
                    </div>
                    <div className={classes.icon}>
                        {state.is_playing
                            ? "Playing: " +
                              state.current_playing.name +
                              " " +
                              state.current_playing.artists[0].name
                            : null}
                    </div>
                </div>
            </Hidden>
        </>
    ) : (
        <div></div>
    );
};
