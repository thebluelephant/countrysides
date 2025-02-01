import React, { createContext, useState, useContext } from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';
import Notification from './components/Notification/Notification.tsx';

const root = createRoot(document.getElementById('root'));
const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [account, setAccount] = useState();
  const [notification, setNotification] = useState({ type: '', content: '' });
  const [agenda, setAgenda] = useState([])

  return (
    <AppContext.Provider value={{ account, setAccount, notification, setNotification, agenda, setAgenda }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

root.render(
  <Auth0Provider
    domain="dev-bfwkqoak.us.auth0.com"
    clientId="kIXo4fKVfokYtRoQb9qguuNN9IQctNe4"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <AppContextProvider>
      <Notification />
      <App />
    </AppContextProvider>
  </Auth0Provider>,
);
