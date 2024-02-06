// UserContext.js
import React, { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user data exists in local storage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const loginUser = (userData) => {
    console.log("Login user:", userData);
    setUser(userData);
    // Save user data to local storage
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logoutUser = () => {
    setUser(null);
    // Remove user data from local storage
    localStorage.removeItem('user');
  };

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
