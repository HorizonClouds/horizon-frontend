import React, { createContext, useState, useEffect } from 'react';
import usersService from '@/services/microservices/usersService';

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(usersService.getLoggedUser());

  useEffect(() => {
    setLoggedInUser(usersService.getLoggedUser());
  }, []);

  return (
    <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      {children}
    </UserContext.Provider>
  );
};
