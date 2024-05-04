/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { handleUserDataApi } from "../services/store/features/userDataSlice";
import { getUserToken } from "../utils/handleAuth";

export const useFetchUserData = () => {
  const token = getUserToken();
  const dispatch = useDispatch();
  const { name, title, avatar, cover, userId, userName, coverId, isLoading } =
    useSelector((state) => state.userData);

  useEffect(() => {
    if (token) dispatch(handleUserDataApi());
  }, [avatar, cover, title, name, userId, userName, coverId, token]);

  return isLoading;
};
