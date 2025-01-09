import React, { useEffect, useState } from "react";
import s from './Notification.module.scss';
import { useAppContext } from "../..";


const Notification = () => {
    const { notification, setNotification } = useAppContext();
    const [startAnimation, setStartAnimation] = useState(true)

    useEffect(() => {
        if (notification.type) {
            setStartAnimation(true)
            setTimeout(() => {
                setStartAnimation(false)
            }, 4000);
            setTimeout(() => {
                setNotification({ type: '', content: '' })
            }, 6000);
        }
    }, [notification, setNotification]);

    if (!notification.type) {
        return
    }

    return (
        <div className={startAnimation ? s.notification__animated : s.notification}>
            <div className={s.content}>
                {
                    notification.type === 'success' && <img src="icon/notif_success.svg" alt="notification success icon" />
                }
                <p>{notification.content}</p>
            </div>
        </div>
    )
};

export default Notification;