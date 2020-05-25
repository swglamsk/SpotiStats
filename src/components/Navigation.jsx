import * as React from 'react';
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getToken } from "../store/token/selectors";
import { addToken } from "../store/token/actions";
import { getAuthorizationCode } from "../utils/getAuthorizationCode";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    root: {
        overflow: 'hidden',
        backgroundColor: '#333',
        display: 'flex',
        justifyContent: 'center',
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
});

export const Navigation = () => {

    const history = useHistory();
    const token = useSelector((state) => getToken(state));
    const classes = useStyles();

    const dispatch = useDispatch();

    const logOut = () => {
      dispatch(addToken(null));
      sessionStorage.removeItem("token");
      history.push('/');
    };

    return (
        token
        ? <div className={classes.root}>
            <button onClick={() => history.push("/recent")} >Recent tracks</button>
            <button onClick={() => history.push("/top-artists")}>
                Top albums and tracks
            </button>
            <button onClick={() => history.push("/compare-artists")}>Compare artists</button>
            {token
                ? <button onClick={() => logOut()}>Log out</button>
                : <button onClick={() => getAuthorizationCode()}>Log in</button>}
        </div>
        : null
    );
}