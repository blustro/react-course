import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCart = createAsyncThunk('cart/fetchCart', async () => {
  const cartResponse = await axios.get('/api/cart-items?expand=product');
  const summaryResponse = await axios.get('/api/payment-summary');
  return {
    items: cartResponse.data,
    summary: summaryResponse.data,
  };
});

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ productId, quantity }) => {
    const response = await axios.post('/api/cart-items', {
      productId,
      quantity,
    });

    return response.data;
  },
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    summary: null,
    status: 'idle',
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.items = action.payload.items || [];
      state.summary = action.payload.summary || null;
      state.status = 'succeeded';
    });
    builder.addCase(addToCart.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = 'succeeded';
    });
  },
});

export default cartSlice.reducer;

// SELECTORS
export const selectCartItems = (state) => {
  if (state.cart.items && Array.isArray(state.cart.items.items)) {
    return state.cart.items;
  }

  if (Array.isArray(state.cart.items)) {
    return state.cart.items;
  }

  return [];
};

export const selectCartTotalQuantity = (state) => {
  const items = state.cart.items;
  if (!Array.isArray(items)) return 0;
  return items.reduce((total, item) => total + item.quantity, 0);
};
