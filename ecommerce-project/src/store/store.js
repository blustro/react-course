import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import trackingReducer from './trackingSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    tracking: trackingReducer,
  },
});
