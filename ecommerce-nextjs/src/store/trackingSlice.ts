import axiosInstance from '@/utils/axios';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Order, TrackingState } from '@/types';
import { RootState } from './store';

const initialState: TrackingState = {
  order: null,
  status: 'idle',
  error: null,
};

export const fetchTrackingData = createAsyncThunk<
  Order,
  string,
  { rejectValue: string }
>('tracking/fetchTrackingData', async (orderId, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get<Order>(
      `/orders/${orderId}?expand=products`,
    );
    return response.data;
  } catch (error) {
    return rejectWithValue('Failed to fetch tracking data');
  }
});

const trackingSlice = createSlice({
  name: 'tracking',
  initialState,
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
      .addCase(
        fetchTrackingData.fulfilled,
        (state, action: PayloadAction<Order>) => {
          state.status = 'succeeded';
          state.order = action.payload;
        },
      )
      .addCase(fetchTrackingData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Something went wrong';
      });
  },
});

export const { clearTrackingData } = trackingSlice.actions;
export default trackingSlice.reducer;

export const selectDeliveryDetails = (state: RootState, productId: string) => {
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
