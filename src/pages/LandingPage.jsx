import React from 'react';
import { getAuthorizationCode } from '../utils/getAuthorizationCode';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { getToken } from '../store/token/selectors';
import { useSelector } from 'react-redux';
import SpotifyWebApi from 'spotify-web-api-js';
import Player from '../components/landingPage/Player';
import { ColorButton } from '../components/shared/ColorButton';
import { Info } from '../components/landingPage/Info';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        width: '100vw',
        height: 'calc(100vh - 65px)',
        overflow: 'hidden',
    },
    containerLogin: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    boxLogin: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
    },
    buttonLogin: {
        marginTop: 8,
    },
    profilepic: {
        borderRadius: '50%',
        width: 50,
        height: 50,
    },
});

const LandingPage = () => {
    const token = useSelector((state) => getToken(state));
    const classes = useStyles();
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

    const logged = (
        <>
            <img
                className={classes.profilepic}
                src={state.profileImageURL}
                alt="yourpic"
            />
            Hello {state.name} :)
        </>
    );

    const unlogged = (
        <>
            Log in with your Spotify account
            <br />
            <ColorButton
                className={classes.buttonLogin}
                onClick={() => getAuthorizationCode()}
            >
                Log in with Spotify
            </ColorButton>
        </>
    );

    return (
        <div className={classes.root}>
            <div className={classes.containerLogin}>
                <Box
                    component="div"
                    m={4}
                    className={classes.boxLogin}
                    p={2}
                    border={2}
                    borderRadius={8}
                >
                    <h2>SpotiStats </h2>
                    Check informations about your music <br />
                    {token ? logged : unlogged}
                </Box>
            </div>
            {token ? <Player /> : <Info />}
        </div>
    );
};
export default LandingPage;
