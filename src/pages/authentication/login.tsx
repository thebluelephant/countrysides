import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import s from './Authentication.module.scss';

const LoginButton = () => {
    const { loginWithRedirect, isAuthenticated, logout } = useAuth0();

    if (isAuthenticated) {
        return (<button className={s.loginButton} onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
            Déconnexion
        </button>)
    } else {
        return <button className={s.loginButton} onClick={() => loginWithRedirect()}>Connexion / Inscription</button>;
    }
};

export default LoginButton;