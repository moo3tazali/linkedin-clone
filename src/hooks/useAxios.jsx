import axios from 'axios';
import { useAuth } from './AuthContext';

const useAxios = () => {
  const { accessToken, refreshAccessToken } = useAuth();

  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
  });

  instance.interceptors.request.use(
    (config) => {
      if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response.status === 401) {
        await refreshAccessToken();
        return instance.request(error.config);
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

export default useAxios;
