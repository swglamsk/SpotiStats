import * as React from 'react';
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getToken } from "./store/token/selectors";
import { addToken } from "./store/token/actions";
import { getAuthorizationCode } from "./utils/getAuthorizationCode";
import "./LandingPage.css";

export const Navigation = () => {

    const history = useHistory();
    const token = useSelector((state) => getToken(state));

    const dispatch = useDispatch();

    const logOut = () => {
      dispatch(addToken(null));
      sessionStorage.removeItem("token");
    };

    return (
        token
        ? <div className="topnav">
            <a href ="#test" onClick={() => history.push("/recent")} >Recent tracks</a>
            <a href="#news" onClick={() => history.push("/top-artists")} >Top albums and tracks</a>
            <a href="#contact">Compare artists</a>
            {token
                ? <a href="#" onClick={() => logOut()}>Log out</a>
                : <a href="#" onClick={() => getAuthorizationCode()}>Log in</a>}
        </div>
        : null
    );
}