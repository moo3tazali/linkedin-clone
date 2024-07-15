import React, { createContext, useEffect, useContext } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  useEffect(() => {
    const interval = setInterval(() => {
      refreshAccessToken();
    }, 55 * 60 * 1000); // 55 minutes

    return () => clearInterval(interval);
  }, []);

  const storeToken = (token) => {
    const expires = new Date(new Date().getTime() + 60 * 60 * 1000);
    Cookies.set('accessToken', token, {
      expires,
      secure: true,
      sameSite: 'Strict',
      path: '/',
    });
  };

  const refreshAccessToken = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/refresh`,
        {},
        { withCredentials: true }
      );
      storeToken(response.data.accessToken);
    } catch (error) {
      console.error('Failed to refresh access token:', error);
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/logout`,
        {},
        { withCredentials: true }
      );
      Cookies.remove('accessToken');
      window.location.reload();
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  const accessToken = Cookies.get('accessToken');

  return (
    <AuthContext.Provider
      value={{ accessToken, storeToken, refreshAccessToken, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
