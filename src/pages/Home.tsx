import React, { useEffect, useState } from 'react';
import Map from '../components/Map/Map.tsx'
import s from './Home.module.scss';
import Popup from '../components/EventDetailsPopup/EventDetailsPopup.tsx';
import { useAuth0 } from "@auth0/auth0-react";
import PostRegistrationPopUp from '../components/PostRegistrationPopUp/PostRegistrationPopUp.tsx';
import LocalActuality from '../components/LocalActuality/LocalActuality.tsx';
import SubmitEventPopup from '../components/SubmitEventPopup/SubmitEventPopup.tsx';

function Home() {
    const [showEventDetails, setShowEvenDetails] = useState();
    const { isAuthenticated } = useAuth0();
    const [isPopUpVisible, setIsPopUpVisible] = useState(false)

    useEffect(() => {
        setIsPopUpVisible(isAuthenticated)
    }, [isAuthenticated]);

    if (!isAuthenticated) {
        return
    }

    return (
        <div className={s.home}>
            {isPopUpVisible && <PostRegistrationPopUp closePopUp={() => setIsPopUpVisible(false)} />}
            {showEventDetails && <Popup eventDetails={showEventDetails} />}

            <span className={s.boardLeft}>
                <Map onEventClick={setShowEvenDetails} />
            </span>

            <span className={s.boardRight}>
                <LocalActuality />
                <SubmitEventPopup />
            </span>
        </div>
    );
}

export default Home;
