// src/AuthContext.tsx

import React from 'react';

type AuthContextType = {
  isLoggedIn: boolean;
  logIn: () => void;
  logOut: () => void;
};
  
const AuthContext = React.createContext<AuthContextType>({
  isLoggedIn: false,
  logIn: () => {},
  logOut: () => {},
});

export default AuthContext;
