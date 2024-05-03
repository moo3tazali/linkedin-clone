import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  cart: [],
  lastUpdate: 0,
  loading: false,
  error: null,
  Boundary: false,
  lastCheckError: 0,
  warning: null,
};

export const addItemToCartAPI = createAsyncThunk(
  "cart/addItem",
  async ({ item, jwt }, { rejectWithValue }) => {
    try {
      // Make API call to add item to the cart
      const { data: { data = [] } = {} } = await axios.post(
        `${process.env.REACT_APP_API_URL}/carts`,
        { item },
        {
          headers: {
            Authorization: "bearer " + jwt,
          },
        }
      );
      return data; // Assuming the response contains updated cart data
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const removeItemFromCartAPI = createAsyncThunk(
  "cart/removeItem",
  async ({ item, jwt }, { rejectWithValue }) => {
    try {
      // Make API call to add item to the cart
      const { data: { data = [] } = {} } = await axios.put(
        `${process.env.REACT_APP_API_URL}/carts`,
        { item },
        {
          headers: {
            Authorization: "bearer " + jwt,
          },
        }
      );
      return data; // Assuming the response contains updated cart data
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const clearCartAPI = createAsyncThunk(
  "cart/clearItem",
  async ({ jwt }, { rejectWithValue }) => {
    try {
      // Make API call to add item to the cart
      const { data: { data = [] } = {} } = await axios.delete(
        `${process.env.REACT_APP_API_URL}/carts`,
        {
          headers: {
            Authorization: "bearer " + jwt,
          },
        }
      );
      console.log(data);
      return data; // Assuming the response contains updated cart data
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const connectCartAPI = createAsyncThunk(
  "cart/connectCart",
  async ({ jwt }, { getState, rejectWithValue }) => {
    try {
      const { cart = [] } = getState().redux;
      // Make API call to add item to the cart
      const { data: { data = [] } = {} } = await axios.patch(
        `${process.env.REACT_APP_API_URL}/carts`,
        { items: cart },
        {
          headers: {
            Authorization: "bearer " + jwt,
          },
        }
      );
      return data; // Assuming the response contains updated cart data
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
export const refetchCartAPI = createAsyncThunk(
  "cart/refetchcart",
  async ({ jwt }, { getState, rejectWithValue }) => {
    try {
      const state = getState().redux;
      const { cart, lastUpdate } = state;
      const delayTime = 60000 * 1; // cache request for 1 minute
      // console.log(lastUpdate + delayTime);
      if (lastUpdate + delayTime > new Date().getTime()) {
        // console.log("cached cart");
        return rejectWithValue(cart);
      }
      // console.log("un cached cart");
      const { data: { data = [] } = {} } = await axios.get(
        `${process.env.REACT_APP_API_URL}/carts`,
        {
          headers: {
            Authorization: "bearer " + jwt,
          },
        }
      );
      return data; // Assuming the response contains updated cart data
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const checkBackEndAPI = createAsyncThunk(
  "check/backend",
  async (arg, { getState, rejectWithValue }) => {
    const { lastCheckError, warning, Boundary } = getState().redux;
    const Iscached = lastCheckError + 60000 * 5 > new Date().getTime();
    if (Iscached) {
      // console.log("cached");
      return rejectWithValue({
        Boundary,
      });
    }
    try {
      const { data = {} } = await axios.get(
        `${process.env.REACT_APP_API_URL}/boundary`,
        {
          headers: {
            Authorization: "bearer " + process.env.REACT_APP_API_TOKEN,
          },
        }
      );
      // console.log("data received");
      return {
        Boundary: false,
        warning: data?.hasWarnning,
      };
    } catch (error) {
      return rejectWithValue({ Boundary: true });
    }
  }
);
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCartLocal: (state, action) => {
      state.loading = true;
      const item = state.cart.find(
        (val) => val.product.id === action?.payload?.product?.id
      );
      if (item) {
        item.QTY += action.payload?.QTY;
      } else {
        action.payload.QTY = action.payload.QTY || 1;
        state.cart.push(action.payload);
      }
      state.loading = false;
    },
    removeFromCartLocal: (state, action) => {
      state.loading = true;
      state.cart = state.cart.filter(
        (item) => item.product.id !== action.payload.product.id
      );
      state.loading = false;
    },
    clearCartLocal: (state) => {
      state.cart = [];
    },
    BoundaryHandler: (state, action) => {
      state.Boundary = action.payload;
      state.lastCheckError = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addItemToCartAPI.pending, (state) => {
        state.loading = true;
        state.lastUpdate = new Date().getTime();
      })
      .addCase(addItemToCartAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(addItemToCartAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(removeItemFromCartAPI.pending, (state) => {
        state.loading = true;
        state.lastUpdate = new Date().getTime();
      })
      .addCase(removeItemFromCartAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(removeItemFromCartAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(clearCartAPI.pending, (state) => {
        state.loading = true;
        state.lastUpdate = new Date().getTime();
      })
      .addCase(clearCartAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(clearCartAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(refetchCartAPI.pending, (state) => {
        state.loading = true;
      })
      .addCase(refetchCartAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        state.lastUpdate = new Date().getTime();
      })
      .addCase(refetchCartAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(connectCartAPI.pending, (state) => {
        state.loading = true;
        state.lastUpdate = new Date().getTime();
      })
      .addCase(connectCartAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(connectCartAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(checkBackEndAPI.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkBackEndAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.Boundary = false;
        state.warning = action?.payload?.warning || null;
        state.lastCheckError = new Date().getTime();
      })
      .addCase(checkBackEndAPI.rejected, (state, action) => {
        state.loading = false;
        state.Boundary = action?.payload?.Boundary;
      });
  },
});

export const {
  addToCartLocal,
  removeFromCartLocal,
  clearCartLocal,
  BoundaryHandler,
} = cartSlice.actions;

export default cartSlice.reducer;
