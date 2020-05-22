import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './App.css';
import Player from "./Player";
import { getToken } from './store/token/selectors';
import { getQueryParameter } from './utils/getQueryParameter';
import { getAccessToken } from './utils/getAccessToken';
import { addToken } from './store/token/actions';
import LandingPage from "./LandingPage"

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
        : <LandingPage/>
    );
};

export default App;
