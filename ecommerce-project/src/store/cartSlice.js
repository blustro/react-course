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
  async ({ productId, quantity }, { dispatch }) => {
    await axios.post('/api/cart-items', {
      productId,
      quantity,
    });

    dispatch(fetchCart());
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

export const placeOrder = createAsyncThunk(
  'cart/placeorder',
  async (cartItems, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post('/api/orders', { cart: cartItems });
      dispatch(clearCart());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const fetchDeliveryOptions = createAsyncThunk(
  'cart/fetchDeliveryOptions',
  async () => {
    const response = await axios.get(
      '/api/delivery-options?expand=estimatedDeliveryTime',
    );
    return response.data;
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
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.items = action.payload.items;
      state.summary = action.payload.summary;
      state.status = 'succeeded';
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
    builder
      .addCase(placeOrder.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(placeOrder.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
    builder.addCase(fetchDeliveryOptions.fulfilled, (state, action) => {
      state.deliveryOptions = action.payload;
    });
  },
});

export const { updateLocalDelivery, clearCart } = cartSlice.actions;

export default cartSlice.reducer;

export const selectCartItems = (state) => {
  const items = state.cart.items;
  if (Array.isArray(items)) return items;
  if (items && Array.isArray(items.items)) return items.items;
  return [];
};

export const selectCartTotalQuantity = (state) => {
  const items = selectCartItems(state);
  return items.reduce((total, item) => total + item.quantity, 0);
};
