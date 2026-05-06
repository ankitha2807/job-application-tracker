import { createContext, useState, useEffect, useContext } from 'react';
import { login as apiLogin, signup as apiSignup } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (token) {
      setIsAuthenticated(true);
    }

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem('user');
      }
    }

    setLoading(false);
  }, []);

  const saveSession = (token, userData) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setIsAuthenticated(true);
    setUser(userData);
  };

  const login = async (email, password) => {
    const response = await apiLogin(email, password);
    const { token, fullName, email: userEmail } = response.data;
    saveSession(token, { fullName, email: userEmail });
    return response.data;
  };

  const signup = async (fullName, email, password) => {
    const response = await apiSignup(fullName, email, password);
    const { token, fullName: name, email: userEmail } = response.data;
    saveSession(token, { fullName: name, email: userEmail });
    return response.data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
