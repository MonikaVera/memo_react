import React, { createContext, useContext, useState, useEffect } from 'react';
import Error from "./Error";
import useUserInfo from "./useUserInfo";

/**
 * Context to manage authentication state.
 */
export const AuthContext = createContext();

/**
 * Provider component for authentication context.
 * @param {object} children - Child components.
 * @returns {JSX.Element} - Authentication provider component.
 */
export const AuthProvider = ({ children }) => {
  /** State variable to store authentication token. */
  const [token, setToken] = useState(null);
  /** State variable to manage authentication status. */
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  /** Custom hook to retrieve user information. */
  const { errorUser, data, getUserInfo } = useUserInfo();
  /** State variable to store user ID. */
  const [userId, setUserId] = useState(null);
  /** State variable to store user name. */
  const [userName, setUserName] = useState(null);

  /**
   * Function to handle user sign-in.
   * @param {string} newToken - New authentication token.
   */
  const handleSignIn = (newToken) => {
    getUserInfo(newToken);
    setIsAuthenticated(true);
    setToken(newToken);
  };

  /**
   * Function to handle user sign-out.
   */
  const handleSignOut = () => {
    setUserId(null);
    setUserName(null);
    setIsAuthenticated(false);
    setToken(null);
  };

  /** Effect to update user ID and user name when user data changes.*/
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
