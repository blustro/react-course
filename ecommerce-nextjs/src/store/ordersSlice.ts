import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '@/utils/axios';
import { Order, OrdersState } from '@/types';
import { RootState } from './store';

const initialState: OrdersState = {
  list: [],
  status: 'idle',
};

export const fetchOrders = createAsyncThunk<Order[], void>(
  'orders/fetchOrders',
  async () => {
    const response = await axiosInstance.get<Order[]>(
      '/orders?expand=products',
    );
    return response.data;
  },
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        fetchOrders.fulfilled,
        (state, action: PayloadAction<Order[]>) => {
          state.list = action.payload;
          state.status = 'succeeded';
        },
      );
  },
});

export default ordersSlice.reducer;

export const selectAllOrders = (state: RootState) => state.orders.list;
