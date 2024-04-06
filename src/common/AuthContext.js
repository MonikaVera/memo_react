import React, { createContext, useContext, useState, useEffect } from 'react';
import useSignOut from './useSignOut';
import Error from "./Error";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { error, getSignOutData } = useSignOut();

  const handleSignIn = (newToken) => {
    setIsAuthenticated(true);
    setToken(newToken);
  };

  const handleSignOut = () => {
    getSignOutData(token);
    setIsAuthenticated(false);
    setToken(null);
  };

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (isAuthenticated && token !== null) {
        getSignOutData(token);
      }
    };
  
    window.addEventListener('beforeunload', handleBeforeUnload);
  
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isAuthenticated, token, getSignOutData]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, handleSignIn, handleSignOut }}>
      {children}
      <Error>{error}</Error>
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
