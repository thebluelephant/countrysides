import React, { useEffect, useState } from 'react';

import Map from './components/Map/Map.tsx'
import './App.css';
import Popup from './components/EventDetailsPopup/EventDetailsPopup.tsx';
import LoginButton from './pages/authentication/login.tsx';
import { useAuth0 } from "@auth0/auth0-react";
import { fetchAccountById } from './api/account.tsx'
import { useAppContext } from './index.js'
import PostRegistrationPopUp from './components/PostRegistrationPopUp/PostRegistrationPopUp.tsx';
import LocalActuality from './components/LocalActuality/LocalActuality.tsx';
import SubmitEventPopup from './components/SubmitEventPopup/SubmitEventPopup.tsx';

function App() {
  const [showEventDetails, setShowEvenDetails] = useState();
  const { user, isAuthenticated } = useAuth0();
  const { setAccount, account } = useAppContext();
  const [isPopUpVisible, setIsPopUpVisible] = useState(false)


  useEffect(() => {
    setIsPopUpVisible(isAuthenticated)
    if (isAuthenticated && !account) {
      //user.sub = auth0 user id
      fetchAccountById(user.sub).then((userAccount) => {
        setAccount(userAccount[0])
      })
    }
  }, [isAuthenticated]);



  return (
    <div className="App">
      <div className="header">
        {
          account?.firstname && <p>👋 Bonjour {account.firstname} ! </p>
        }

        <LoginButton />
      </div>


      {
        isAuthenticated &&
        <>
          {
            isPopUpVisible && <PostRegistrationPopUp closePopUp={() => setIsPopUpVisible(false)} />
          }

          {
            showEventDetails && <Popup eventDetails={showEventDetails} />
          }
          <div className="board">

            <Map onEventClick={setShowEvenDetails} />
            <span className="board__right">
              <LocalActuality />
              <SubmitEventPopup />
            </span>


          </div>
        </>
      }


    </div>
  );
}

export default App;
