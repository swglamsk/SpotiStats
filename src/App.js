import React, { Component } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as $ from "jquery";
import logo from './logo.svg';
import './App.css';
import { authEndpoint, clientId, redirectUri, scopes } from "./config";
import Player from "./Player";
import hash from "./hash";

import SpotifyWebApi from 'spotify-web-api-js';
import { getToken } from './store/token/selectors';
import { getQueryParameter } from './utils/getQueryParameter';
import { getAccessToken } from './utils/getAccessToken';
import { getAuthorizationCode } from './utils/getAuthorizationCode';
import { addToken } from './store/token/actions';

const App = () => {
    const [hasCredentials, setHasCredentials] = React.useState(false);
    const dispatch = useDispatch();

    React.useEffect(() => {
        const sessionToken = sessionStorage.getItem('token');
        if(sessionToken){
            dispatch(addToken(sessionToken));
            setHasCredentials(true);
        }
        else {
            const code = getQueryParameter('code');
            console.log(code);
            if(code){
                getAccessToken(code).then((data) => {
                    console.log(data);
                    if(data.access_token){
                        dispatch(addToken(data.access_token));
                        sessionStorage.setItem('token', data.access_token);
                        setHasCredentials(true);
                    }
                });
            }
        };
    }, [dispatch, hasCredentials]);
    const token = useSelector((state) => getToken(state))
    return (
        hasCredentials 
        ? <Player token={token}/>
        : <div>
            Not logged in
            <button onClick={() => getAuthorizationCode()}>Log in</button>
        </div>
    );
};

export default App;
