import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import productReducer from './productSlice';
import trackingReducer from './trackingSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productReducer,
    tracking: trackingReducer,
  },
});
