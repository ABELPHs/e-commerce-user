import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [authData, setAuthData] = useState(null);

  useEffect(() => {
    const storedAuthData = JSON.parse(localStorage.getItem('authData'));
    if (storedAuthData) {
      setAuthData(storedAuthData);
    }
  }, []);

  const login = (data) => {
    data['token'] = `Bearer ${data.token}`;
    setAuthData(data);
    localStorage.setItem('authData', JSON.stringify(data));
  };

  const logout = () => {
    setAuthData(null);
    localStorage.removeItem('authData');
  };

  return (
    <AuthContext.Provider value={{ authData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
