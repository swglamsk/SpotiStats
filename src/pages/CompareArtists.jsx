import React from "react";
import SpotifyWebApi from "spotify-web-api-js";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { getToken } from "../store/token/selectors";
import { ColorButton } from "../components/shared/ColorButton";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles({
    root: {
        paddingTop: 110,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        "& > *": {
            borderColor: "white",
            color: "#ffffff",
        },
        "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "white",
            color: "white",
        },
        "&:hover fieldset": {
            borderColor: "white",
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "white",
            color: "white",
        },
    },
    artist: {
        display: "flex",
        flexDirection: "column",
        width: 300,
        minWidth: 300,
        // height: 300,
        justifyContent: "center",
        alignItems: "center",
        color: "#ffffff",
        fontWeight: "bold",
    },
    content: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
    },
    label: {
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 40,
        marginBottom: 20,
        color: "#ffffff",
    },
    buttonView: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "center",
        minWidth: 300,
    },
    versus: {
        display: "flex",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: "auto",
        fontWeight: "bold",
        fontSize: 30,
        color: "#ffffff",
    },
    button: {
        padding: "5px 10px",
        marginTop: 8,
        fontWeight: "bold",
        fontSize: 15,
        marginBottom: 10,
        textDecoration: "none",
        borderRadius: "500px",
        width: 300,
    },
    input: {
        marginBottom: 10,
        marginTop: "auto",
        borderRadius: "500px",
        color: "#ffffff",
    },
    image: {
        width: 200,
        height: 200,
        border: "1px solid black",
        marginBottom: 15,
    },
    info: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10,
    },
    bg: {
        width: "100vw",
        height: "100vh",
        zIndex: -1,
        position: "fixed",
        backgroundImage: "linear-gradient(90deg, #c074b2, #8ab5e8)",
    },
    premiumbg: {
        width: "100vw",
        height: "100vh",
        zIndex: -1,
        position: "fixed",
        backgroundImage: "linear-gradient(transparent, #000)",
    },
});

export const CompareArtists = () => {
    const classes = useStyles();
    const [firstArtist, setFirstArtist] = React.useState(null);
    const [secondArtist, setSecondArtist] = React.useState(null);
    const [firstInput, setFirstInput] = React.useState("");
    const [secondInput, setSecondInput] = React.useState("");

    const token = useSelector((state) => getToken(state));

    const searchArtists = async () => {
        if (!token || !firstInput || !secondInput) {
            return;
        }
        const spotifyApi = new SpotifyWebApi();
        spotifyApi.setAccessToken(token);
        const firstArtist = await spotifyApi.searchArtists(firstInput);
        const secondArtist = await spotifyApi.searchArtists(secondInput);
        setFirstArtist(firstArtist.artists.items[0]);
        setSecondArtist(secondArtist.artists.items[0]);
    };

    const artistImage = (artist) => (
        <img src={artist.images[0].url} alt="artist" width={198} height={198} />
    );

    const artistInfo = (artist) => (
        <div className={classes.info}>
            <div className={classes.textDisplay}>{`${artist.name}`}</div>
            <div className={classes.textDisplay}>
                {`Popularity: ${artist.popularity}`}
            </div>
            <div className={classes.textDisplay}>
                {`Followers: ${artist.followers.total}`}
            </div>
        </div>
    );

    const artist = (artist, input, setInput) => (
        <div className={classes.artist}>
            <div className={classes.image}>{artist && artistImage(artist)}</div>
            {artist && artistInfo(artist)}
            <TextField
                type="text"
                placeholder="Enter artists name"
                onChange={(e) => setInput(e.target.value)}
                value={input}
                label="Artist name"
                variant="outlined"
                InputProps={{ className: classes.input }}
                id="mui-theme-provider-outlined-input"
            />
        </div>
    );

    return (
        <>
            <div className={classes.bg} />
            <div className={classes.premiumbg} />
            <div className={classes.root}>
                <div className={classes.label}>Compare Artists</div>
                <div className={classes.content}>
                    {artist(firstArtist, firstInput, setFirstInput)}
                    <div className={classes.buttonView}>
                        <div className={classes.versus}>VS</div>
                    </div>
                    {artist(secondArtist, secondInput, setSecondInput)}
                    <ColorButton
                        className={classes.button}
                        onClick={searchArtists}
                    >
                        Start
                    </ColorButton>
                </div>
            </div>
        </>
    );
};
