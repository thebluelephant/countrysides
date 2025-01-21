import React, { useEffect, useState } from 'react';
import s from './Welcome.module.scss';
import { useAuth0 } from '@auth0/auth0-react';


function Welcome() {
    const { loginWithPopup } = useAuth0();

    return (
        <div>
            <span className={s.identityBlock}>
                <img className={s.logo} src="images/welcome-logo.png" alt="logo" />
                <p className={s.slogan}>Le réseau social des territoires</p>
            </span>

            <span className={s.connectionBlock}>
                <p className={s.slogan}>Avec Countrysides, créez, participez et animez la vie de votre territoire.</p>
                <span className={s.buttons}>
                    <button>Inscription</button>
                    <button onClick={() => loginWithPopup()}>Connexion</button>
                </span>
            </span>

            <img className={s.vector1} src="images/welcome-vector1.png" alt="vector image" />
            <img className={s.vector2} src="images/welcome-vector2.png" alt="vector image" />
            <img className={s.backgroundImage} src="images/welcome-image1.jpg" alt="welcome page font image" />
        </div >
    );
}

export default Welcome;
