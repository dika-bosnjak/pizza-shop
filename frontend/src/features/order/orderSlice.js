import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import orderService from "./orderService";
import { ADMIN_DATA } from "../../data/static_data";

const initialState = {
  orders: [],
  order: {},
  isError: null,
  isSuccess: null,
  message: "",
};

export const getAllOrdersAdmin = createAsyncThunk(
  "getAllOrdersAdmin",
  async (_, thunkAPI) => {
    try {
      const token = JSON.parse(localStorage.getItem(ADMIN_DATA)).token;

      return orderService.getAllOrdersAdmin(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createOrder = createAsyncThunk(
  "createOrder",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await orderService.createOrder(data, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getOrdersForUser = createAsyncThunk(
  "getOrderForUser",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await orderService.getOrdersForUser(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//GET SINGLE ORDER
export const getOrderById = createAsyncThunk(
  "getOrderById",
  async (data, thunkAPI) => {
    try {
      let token = "";
      if (data.is_admin) {
        token = JSON.parse(localStorage.getItem(ADMIN_DATA)).token;
      } else {
        token = thunkAPI.getState().auth.user.token;
      }

      return await orderService.getSingleOrder(data.id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },

  extraReducers: (builder) => {
    builder
      .addCase(createOrder.fulfilled, (state) => {
        state.isSuccess = true;
        state.isError = false;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(getOrdersForUser.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isError = false;
        state.orders = action.payload;
      })
      .addCase(getOrdersForUser.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isError = false;
        state.order = action.payload;
      })
      .addCase(getOrderById.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(getAllOrdersAdmin.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isError = false;
        state.orders = action.payload;
      })
      .addCase(getAllOrdersAdmin.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      });
  },
});

export const { reset } = orderSlice.actions;

export default orderSlice.reducer;
