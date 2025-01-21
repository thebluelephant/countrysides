import React, { useEffect } from 'react';
import s from './Layout.module.scss';
import LoginButton from './authentication/login.tsx';
import { useAuth0 } from "@auth0/auth0-react";
import { fetchAccountById } from '../api/account.tsx'
import { useAppContext } from '../index.js'

import { Outlet, useNavigate } from 'react-router-dom';

function Layout() {
    let navigate = useNavigate();
    const { user, isAuthenticated } = useAuth0();
    const { setAccount, account } = useAppContext();

    useEffect(() => {
        if (isAuthenticated) {
            if (!account && user) {
                fetchAccountById(user.sub as string).then((userAccount) => {
                    setAccount(userAccount?.[0])
                })
            }
            navigate('/home')
        } else {
            navigate('/welcome')
        }
    }, [isAuthenticated]);

    return (
        <div className={s.layout}>
            {
                isAuthenticated &&
                <div className={s.header}>
                    {
                        account?.firstname && <p>👋 Bonjour {account.firstname} ! </p>
                    }
                    <LoginButton />
                </div>
            }
            <div className={s.body}>
                <Outlet />
            </div>

        </div>
    );
}

export default Layout;
