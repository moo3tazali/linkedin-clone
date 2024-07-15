/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { handleUserDataApi } from '../services/store/features/userDataSlice';
import { useAuth } from './AuthContext';

export const useFetchUserData = () => {
  const { accessToken } = useAuth();
  const dispatch = useDispatch();
  const { name, title, avatar, cover, userId, userName, isLoading } =
    useSelector((state) => state.userData);

  useEffect(() => {
    if (accessToken) dispatch(handleUserDataApi());
  }, [avatar, cover, title, name, userId, userName, accessToken]);

  return { isLoading, name, title, avatar, cover, userId, userName };
};
