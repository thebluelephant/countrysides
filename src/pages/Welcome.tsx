import React, { useEffect, useState } from 'react';
import s from './Welcome.module.scss';
import { useAuth0 } from '@auth0/auth0-react';


function Welcome() {
    const { loginWithPopup } = useAuth0();

    return (
        <div className={s.welcome}>
            <span className={s.connexion}>
                <button onClick={() => loginWithPopup()}>Connexion</button>

            </span>
            <span className={s.signin}>
                <span className={s.block}>
                    <p className={s.slogan}>Créez, participez et animez la vie de votre territoire.</p>
                    <button onClick={() => loginWithPopup()}>Commencer</button>
                </span>
            </span>
            <img className={s.welcomeImage} src="images/welcome.png" alt="welcome image" />
        </div >
    );
}

export default Welcome;
