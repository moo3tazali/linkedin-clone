import {
  addItemToCartAPI,
  addToCartLocal,
  clearCartAPI,
  clearCartLocal,
  connectCartAPI,
  refetchCartAPI,
  removeFromCartLocal,
  removeItemFromCartAPI,
} from "../Redux/cartslice";
import { userData } from "../utils/handleAuth";
import { useDispatch, useSelector } from "react-redux";
const useCart = () => {
  const { jwt } = userData();
  const dispatch = useDispatch();
  const { cart = [], loading, error } = useSelector((state) => state.redux);
  const addToCart = (item) => {
    if (jwt) {
      dispatch(addItemToCartAPI({ item, jwt }));
    } else {
      dispatch(addToCartLocal(item));
    }
  };
  const removeFromCart = (item) => {
    if (jwt) {
      dispatch(removeItemFromCartAPI({ item, jwt }));
    } else {
      dispatch(removeFromCartLocal(item));
    }
  };
  const clearCart = () => {
    if (jwt) {
      console.log("s");
      dispatch(clearCartAPI({ jwt }));
    } else {
      dispatch(clearCartLocal());
    }
  };
  const connectCart = (token) => {
    if (token) {
      dispatch(connectCartAPI({ jwt: token }));
    }
  };
  const unConnectCart = () => {
    dispatch(clearCartLocal());
  };
  const refetchCart = () => {
    if (jwt) {
      dispatch(refetchCartAPI({ jwt }));
    }
  };
  return {
    addToCart,
    removeFromCart,
    clearCart,
    connectCart,
    refetchCart,
    unConnectCart,
    cart,
    loading,
    error,
  };
};

export default useCart;
