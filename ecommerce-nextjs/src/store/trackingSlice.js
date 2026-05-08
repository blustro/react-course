import axiosInstance from '@/utils/axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchTrackingData = createAsyncThunk(
  'tracking/fetchTrackingData',
  async (orderId) => {
    const response = await axiosInstance.get(
      `/orders/${orderId}?expand=products`,
    );
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
        state.status = 'succeeded';
        state.order = action.payload;
      })
      .addCase(fetchTrackingData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export const selectDeliveryDetails = (state, productId) => {
  const order = state.tracking.order;
  if (!order || !productId) return null;

  const orderProduct = order.products.find(
    (product) => product.productId === productId,
  );
  if (!orderProduct) return null;

  const today = Date.now();
  const orderTime = order.orderTimeMs;
  const deliveryTime = orderProduct.estimatedDeliveryTimeMs;

  const totalDuration = deliveryTime - orderTime;
  const elapsed = today - orderTime;
  const percent = Math.min(Math.max((elapsed / totalDuration) * 100, 0), 100);

  return {
    ...orderProduct,
    arrivalText: today < deliveryTime ? 'Arriving on' : 'Delivered on',
    deliveryPercent: percent,
    isPreparing: percent >= 0 && percent < 50,
    isShipped: percent >= 50 && percent < 100,
    isDelivered: percent >= 100,
  };
};

export const { clearTrackingData } = trackingSlice.actions;
export default trackingSlice.reducer;
