import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/utils/axios';

export const fetchCart = createAsyncThunk('cart/fetchCart', async () => {
  const cartResponse = await axiosInstance.get('/cart-items?expand=product');
  return {
    items: cartResponse.data,
    summary: { totalCents: 0, shippingCents: 0, estimatedTaxCents: 0 },
  };
});

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ productId, quantity }, { dispatch }) => {
    await axiosInstance.post('/cart-items', {
      productId,
      quantity,
    });

    dispatch(fetchCart());
  },
);

export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async (productId, { dispatch }) => {
    await axiosInstance.delete(`/cart-items/${productId}`);
    dispatch(fetchCart());
  },
);

export const updateCartItem = createAsyncThunk(
  'cart/updateCartItem',
  async ({ productId, updates }, { dispatch }) => {
    await axiosInstance.put(`/cart-items/${productId}`, updates);
    dispatch(fetchCart());
  },
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    deliveryOptions: [],
    summary: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    clearCart: (state) => {
      state.items = [];
      state.summary = null;
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.summary = action.payload.summary;
        state.status = 'succeeded';
      })
      .addCase(fetchCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message;
      });

    builder.addCase(addToCart.fulfilled, (state, action) => {
      if (Array.isArray(action.payload)) {
        state.items = action.payload;
      } else if (action.payload && action.payload.productId) {
        const existingItem = state.items.find(
          (item) => item.productId === action.payload.productId,
        );
        if (existingItem) {
          existingItem.quantity += action.payload.quantity;
        } else {
          state.items.push(action.payload);
        }
      }
      state.status = 'succeeded';
    });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;

export const selectCartItems = (state) => {
  return state?.cart?.items || [];
};

export const selectCartTotalQuantity = (state) => {
  const items = selectCartItems(state);
  if (!Array.isArray(items)) return 0;
  return items.reduce((total, item) => total + item.quantity, 0);
};
