import React, { createContext, useState, useContext, useEffect } from 'react';

// Create a context for auth
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => Boolean(sessionStorage.getItem('token')));
  const [userId, setUserId] = useState(() => sessionStorage.getItem('userId'));
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (token, nextUserId) => {
    sessionStorage.setItem('token', token);
    if (nextUserId) sessionStorage.setItem('userId', nextUserId);
    setIsAuthenticated(true);
    setUserId(nextUserId || sessionStorage.getItem('userId'));
  };

  const logout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userId');
    setIsAuthenticated(false);
    setUserId(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

