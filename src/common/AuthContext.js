import React, { createContext, useContext, useState, useEffect } from 'react';
import Error from "./Error";
import useUserInfo from "./useUserInfo";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
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
    setIsAuthenticated(false);
    setToken(null);
  };

  useEffect(() => {
    if(data!=null && isAuthenticated) {
      setUserId(data.userId);
      setUserName(data.userName);
    }
  }, [isAuthenticated, data]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, handleSignIn, handleSignOut, userId, userName }}>
      {children}
      <Error>{errorUser}</Error>
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
