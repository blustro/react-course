import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '@/utils/axios';

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
  const response = await axiosInstance.get('/orders?expand=products');
  return response.data;
});

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    list: [],
    status: 'idle',
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.list = action.payload;
        state.status = 'suceeded';
      });
  },
});

export default ordersSlice.reducer;
