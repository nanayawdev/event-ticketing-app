import React, { createContext, useContext, useState } from 'react';
import { authService } from '../services/api';
import { handleApiError } from '../utils/errorHandler';
import { toast } from 'sonner';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (credentials) => {
    try {
      setLoading(true);
      const { data } = await authService.login(credentials);
      setUser(data.user);
      localStorage.setItem('token', data.token);
      toast.success('Successfully logged in!');
    } catch (error) {
      const errorDetails = handleApiError(error);
      toast.error(errorDetails.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await authService.logout();
      localStorage.removeItem('token');
      setUser(null);
      toast.success('Successfully logged out');
    } catch (error) {
      const errorDetails = handleApiError(error);
      toast.error(errorDetails.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 