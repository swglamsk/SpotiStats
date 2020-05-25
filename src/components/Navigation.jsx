import * as React from 'react';
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getToken } from "../store/token/selectors";
import { addToken } from "../store/token/actions";
import { getAuthorizationCode } from "../utils/getAuthorizationCode";
import { makeStyles } from "@material-ui/core/styles";
import SpotifyWebApi from 'spotify-web-api-js';


const useStyles = makeStyles({
    root: {
        overflow: 'hidden',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        width: '100%',
        marginBottom: 8,
        '& button': {
            all: 'unset',
            cursor: 'pointer',
            float: 'left',
            color: '#f2f2f2',
            textAlign: 'center',
            paddingTop: 14,
            paddingBottom: 14,
            paddingLeft: 16,
            paddingRight: 16,
            textDecoration: 'none',
            fontSize: 17,
            '&:hover': {
                backgroundColor: '#ddd',
                color: 'black'
            },
            '&.active' : {
                backgroundColor: '#4caf50',
                color: 'white'
            }
        }
    },
    profilepic: {
        borderRadius: '50%',
        width: 40,
        height: 40,
        margin: '10px 10px',

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
    });

    const dispatch = useDispatch();

    const logOut = () => {
      dispatch(addToken(null));
      sessionStorage.removeItem("token");
      history.push('/');
    };

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

    const profilePic = (
        <>
            <img
                className={classes.profilepic}
                src={state.profileImageURL}
                alt="yourpic"
            />
        </>
    );

    return (
        token
        ? <div className={classes.root}>
            <button onClick={() => history.push("/recent")} >Recent tracks</button>
            <button onClick={() => history.push("/top-artists")}>
                Top artists and tracks
            </button>
            <button onClick={() => history.push("/compare-artists")}>Compare artists</button>
            {token
                ? <button onClick={() => logOut()}>Log out</button>
                : <button onClick={() => getAuthorizationCode()}>Log in</button>}
            {profilePic}
        </div>
        : null
    );
}