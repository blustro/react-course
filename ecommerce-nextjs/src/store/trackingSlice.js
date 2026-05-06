import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTrackingData = createAsyncThunk(
  'tracking/fetchTrackingData',
  async (orderId) => {
    const response = await axios.get(`api/orders/${orderId}?expand=products`);
    return response.data;
  },
);

const trackingSlice = createSlice({
  name: 'tracking',
  initialState: {
    order: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    clearTrackingData: (state) => {
      state.order = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrackingData.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchTrackingData.fulfilled, (state, action) => {
        state.status = 'suceeded';
        state.order = action.payload;
      })
      .addCase(fetchTrackingData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export const { clearTrackingData } = trackingSlice.actions;
export default trackingSlice.reducer;

// SELECTORS
export const selectTrackingOrder = (state) => state.tracking.order;
export const selectTrackingStatus = (state) => state.tracking.status;
export const selectTrackingError = (state) => state.tracking.error;

export const selectDeliveryDetails = (state, productId) => {
  const order = state.tracking.order;
  if (!order || !productId) return null;

  const orderProduct = order.products.find(
    (product) => product.productId === productId,
  );
  if (!orderProduct) return null;

  const totalTime = orderProduct.estimatedDeliveryTimeMs - order.orderTimeMs;
  const timePassed = Date.now() - order.orderTimeMs;

  let percent = (timePassed / totalTime) * 100;
  if (percent > 100) percent = 100;
  if (percent < 0) percent = 0;

  return {
    ...orderProduct,
    deliveryPercent: percent,
    isPreparing: percent < 33,
    isShipped: percent >= 33 && percent < 100,
    isDelivered: percent === 100,
    arrivalText: percent >= 100 ? 'Delivered on' : 'Arriving on',
  };
};
