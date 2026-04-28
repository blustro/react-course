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
