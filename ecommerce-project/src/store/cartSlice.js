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

export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async (productId, { dispatch }) => {
    await axios.delete(`/api/cart-items/${productId}`);
    dispatch(fetchCart());
  },
);

export const updateCartItem = createAsyncThunk(
  'cart/updateCartItem',
  async ({ productId, updates }, { dispatch }) => {
    await axios.put(`/api/cart-items/${productId}`, updates);

    dispatch(fetchCart());
  },
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    summary: null,
    status: 'idle',
  },
  reducers: {
    updateLocalDelivery: (state, action) => {
      const { productId, deliveryOptionId } = action.payload;
      const item = state.items.find((i) => i.productId === productId);
      if (item) {
        item.deliveryOptionId = deliveryOptionId;
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.summary = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.items = action.payload.items;
      state.summary = action.payload.summary;
      state.status = 'succeeded';
    });
    builder.addCase(addToCart.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = 'succeeded';
    });
    builder.addCase(updateCartItem.fulfilled, (state, action) => {
      const index = state.items.findIndex(
        (item) => item.productId === action.meta.arg.productId,
      );

      if (index !== -1) {
        state.items[index] = {
          ...state.items[index],
          ...action.meta.arg.updates,
        };
      }

      if (action.payload?.summary) {
        state.summary = action.payload.summary;
      }
    });
  },
});

export const { updateLocalDelivery, clearCart } = cartSlice.actions;

export default cartSlice.reducer;

// SELECTORS
export const selectCartItems = (state) => {
  const items = state.cart.items;
  // If it's a plain array, return it.
  if (Array.isArray(items)) return items;
  // If it's nested (from a messy API response), return the inner array.
  if (items && Array.isArray(items.items)) return items.items;
  // Always return an array to prevent .map() crashes
  return [];
};

export const selectCartTotalQuantity = (state) => {
  const items = selectCartItems(state);
  return items.reduce((total, item) => total + item.quantity, 0);
};
