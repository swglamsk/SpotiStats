import React from 'react';
import { getAuthorizationCode } from '../utils/getAuthorizationCode';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid } from '@material-ui/core';
import { FormatListNumbered, Folder, TrendingUp } from '@material-ui/icons';
import { getToken } from '../store/token/selectors';
import { useSelector } from 'react-redux';
import SpotifyWebApi from 'spotify-web-api-js';
import Player from '../components/landingPage/Player';
import { ColorButton } from '../components/shared/ColorButton';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        width: '100vw',
        height: '100vh',
        paddingBottom: 30
    },
    containerLogin: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    boxLogin: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
    },
    buttonLogin: {
        marginTop: 8,
    },
    gridInfo: {
        borderTop: '2px solid black',
        paddingTop: 10,
        width: '100%',
        marginBottom: 0,
        marginTop: 'auto',
        textAlign: 'justify'
    },
    gridItem: {
        display: 'flex',
        flexDirection: 'column',
    },
    gridItemChild: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: 10
    },
    gridIcon: {
        display: 'flex',
        fontSize: 50,
        justifyContent: 'center',
        alignItems: 'center',
        border: '1px solid black',
        borderRadius: '50%',
        padding: 8,
    },
    gridText: {
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
    },
    profilepic: {
        borderRadius: '50%',
        width: 50,
        height: 50,
    },
}));

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
                    {token ? (
                        <>
                            <img
                                className={classes.profilepic}
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
                                className={classes.buttonLogin}
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
                <Grid
                    container
                    className={classes.gridInfo}
                    spacing={2}
                    justify="center"
                >
                    <Grid item xs={3} className={classes.gridItem}>
                        <div className={classes.gridItemChild}>
                            <div className={classes.gridIcon}>
                                <FormatListNumbered fontSize="inherit" />
                            </div>
                            <div className={classes.gridText}>
                                <a href="#tracks">Recent Tracks List</a>
                            </div>
                        </div>
                        <div>
                            Lorem ipsum dolor sit amet enim. Etiam ullamcorper.
                            Suspendisse a pellentesque dui, non felis. Maecenas
                            malesuada elit lectus felis, malesuada ultricies.
                            Curabitur et ligula. Ut molestie a, ultricies porta
                            urna. Vestibulum
                        </div>
                    </Grid>
                    <Grid item  xs={3} className={classes.gridItem}>
                        <div className={classes.gridItemChild}>
                            <div className={classes.gridIcon}>
                                <Folder fontSize="inherit" />
                            </div>
                            <div className={classes.gridText}>
                                <a href="#top">Top Albums and Artists </a>
                            </div>
                        </div>
                        <div>
                            Lorem ipsum dolor sit amet enim. Etiam ullamcorper.
                            Suspendisse a pellentesque dui, non felis. Maecenas
                            malesuada elit lectus felis, malesuada ultricies.
                            Curabitur et ligula. Ut molestie a, ultricies porta
                            urna. Vestibulum
                        </div>
                    </Grid>
                    <Grid item  xs={3} className={classes.gridItem}>
                        <div className={classes.gridItemChild}>
                            <div className={classes.gridIcon}>
                                <TrendingUp fontSize="inherit" />
                            </div>
                            <div className={classes.gridText}>
                                <a href="#compare">Compare artists</a>
                            </div>
                        </div>
                        <div>
                            Lorem ipsum dolor sit amet enim. Etiam ullamcorper.
                            Suspendisse a pellentesque dui, non felis. Maecenas
                            malesuada elit lectus felis, malesuada ultricies.
                            Curabitur et ligula. Ut molestie a, ultricies porta
                            urna. Vestibulum
                        </div>
                    </Grid>
                </Grid>
            )}
        </div>
    );
};
export default LandingPage;
