import React, { createContext, useContext, useState, useEffect } from 'react';
import useSignOut from './useSignOut';
import Error from "./Error";
import useUserInfo from "./useUserInfo";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { error, getSignOutData } = useSignOut();
  const { errorUser, data, getUserInfo } = useUserInfo();
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);

  const handleSignIn = (newToken) => {
    getUserInfo(newToken);
    setIsAuthenticated(true);
    setToken(newToken);
  };

  const handleSignOut = () => {
    setUserId(null);
    setUserName(null);
    getSignOutData(token);
    setIsAuthenticated(false);
    setToken(null);
  };

  useEffect(() => {
    if(data!=null && isAuthenticated) {
      setUserId(data.userId);
      setUserName(data.userName);
    }
    const handleBeforeUnload = (event) => {
      if (isAuthenticated && token !== null) {
        getSignOutData(token);
      }
    };
  
    window.addEventListener('beforeunload', handleBeforeUnload);
  
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isAuthenticated, token, getSignOutData, data]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, handleSignIn, handleSignOut, userId, userName }}>
      {children}
      <Error>{error}</Error>
      <Error>{errorUser}</Error>
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
