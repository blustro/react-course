import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import productReducer from './productSlice';
import trackingReducer from './trackingSlice';
import ordersReducer from './ordersSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productReducer,
    orders: ordersReducer,
    tracking: trackingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
