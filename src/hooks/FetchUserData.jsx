/* eslint-disable react-hooks/exhaustive-deps */
import { handleUserDataApi } from "../store/features/userDataSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserToken } from "./handleAuth";

const FetchUserData = () => {
  const token = getUserToken();
  const dispatch = useDispatch();
  const { name, title, avatar, cover, userId, userName, coverId } = useSelector(
    (state) => state.userData
  );

  useEffect(() => {
    if (!token) return;
    dispatch(handleUserDataApi());
  }, [avatar, cover, title, name, userId, userName, coverId, token]);
  return null;
};

export default FetchUserData;
