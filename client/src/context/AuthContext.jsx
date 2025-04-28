import React, { createContext, useState, useContext,useEffect } from "react";
export const AuthContext = createContext();
//const context = useContext(AuthContext);

export const AuthProvider = ({ children }) => {
 // console.log('Children:', children);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  //console.log('isAuthenticated:', user);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("token", userData.token); 
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setUser({ token: storedToken }); // no other user details, only token
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children} 
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const { user, isAuthenticated, login, logout } = useContext(AuthContext);
  const token = user?.token || localStorage.getItem("token"); // fallback
  return { token, isAuthenticated, login, logout };
};