import React from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { getToken } from '../store/token/selectors';

const useStyles = makeStyles({
    root: {
        paddingTop: 110,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    artist: {
        display: 'flex',
        flexDirection: 'column',
        width: 300,
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        display: 'flex',
        flexDirection: 'row',
    },
    label: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 40,
        marginBottom: 20,
    },
    buttonView: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: 100,
        height: 300,
    },
    versus: {
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'auto',
        fontWeight: 'bold',
        fontSize: 30,
    },
    button: {
        all: 'unset',
        border: '1px solid black',
        padding: '5px 10px',
        marginBottom: 10,
        textDecoration: 'none',
    },
    input: {
        marginBottom: 10,
        marginTop: 'auto',
    },
    image: {
        width: 200,
        height: 200,
        border: '1px solid black',
        marginBottom: 15,
    },
    info: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
});

export const CompareArtists = () => {
    const classes = useStyles();
    const [firstArtist, setFirstArtist] = React.useState(null);
    const [secondArtist, setSecondArtist] = React.useState(null);
    const [firstInput, setFirstInput] = React.useState('');
    const [secondInput, setSecondInput] = React.useState('');

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
        <img src={artist.images[0].url} alt='artist' width={198} height={198} />
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
            <input
                type='text'
                placeholder='Enter artists name'
                onChange={(e) => setInput(e.target.value)}
                value={input}
            />
        </div>
    );

    return (
        <div className={classes.root}>
            <div className={classes.label}>Compare Artists</div>
            <div className={classes.content}>
                {artist(firstArtist, firstInput, setFirstInput)}
                <div className={classes.buttonView}>
                    <div className={classes.versus}>VS</div>
                    <button className={classes.button} onClick={searchArtists}>
                        Start
                    </button>
                </div>
                {artist(secondArtist, secondInput, setSecondInput)}
            </div>
        </div>
    );
};
