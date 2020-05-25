import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getToken } from '../store/token/selectors';
import SpotifyWebApi from 'spotify-web-api-js';
import { TopDisplayGrid } from '../components/shared/TopDisplayGrid';
import { ColorButton } from '../components/shared/ColorButton';

const useStyles = makeStyles({
    button: {
        position: 'absolute',
        right: 10,
        top: 60,
    },
    label: {
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
    },
});

const TopTracks = () => {
    const history = useHistory();
    const classes = useStyles();

    const [state, setState] = React.useState({
        items: null,
    });

    const token = useSelector((state) => getToken(state));

    React.useEffect(() => {
        const getTopTracks = async () => {
            let spotifyApi = new SpotifyWebApi();
            spotifyApi.setAccessToken(token);
            let tracks = await spotifyApi.getMyTopTracks({ limit: '9' });
            console.log(tracks.items);
            setState({
                items: tracks.items,
            });
        };
        if (token) {
            getTopTracks();
        }
    }, [token]);

    return (
        <div>
            <div className={classes.label}>Top Tracks List</div>
            <ColorButton
                className={classes.button}
                onClick={() => history.push('/top-artists')}
            >
                Switch to Top Artists
            </ColorButton>
            {state.items && <TopDisplayGrid list={state.items} />}
        </div>
    );
};
export default TopTracks;