import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '@/utils/axios';
import {
  AddToCartArgs,
  AddToCartResponse,
  CartItem,
  CartState,
  UpdateCartArgs,
} from '@/types';

const initialState: CartState = {
  items: [],
  deliveryOptions: [],
  summary: null,
  status: 'idle',
  error: null,
};

export const fetchCart = createAsyncThunk('cart/fetchCart', async () => {
  const response = await axiosInstance.get<{
    items: CartItem[];
    summary: {
      totalCents: number;
      shippingCents: number;
      estimatedTaxCents: number;
    };
  }>('/cart-items?expand=product');
  return response.data;
});

export const addToCart = createAsyncThunk<
  AddToCartResponse,
  AddToCartArgs,
  { rejectValue: string } // Explicitly define the config
>('cart/addToCart', async ({ productId, quantity }, { rejectWithValue }) => {
  try {
    await axiosInstance.post('/cart-items', { productId, quantity });
    return { productId, quantity }; // Now matches AddToCartResponse
  } catch (error) {
    return rejectWithValue('Could not add to cart');
  }
});

export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async (productId: string, { dispatch }) => {
    await axiosInstance.delete(`/cart-items/${productId}`);
    dispatch(fetchCart());
  },
);

export const updateCartItem = createAsyncThunk(
  'cart/updateCartItem',
  async ({ productId, updates }: UpdateCartArgs, { dispatch }) => {
    await axiosInstance.put(`/cart-items/${productId}`, updates);
    dispatch(fetchCart());
  },
);

export const fetchDeliveryOptions = createAsyncThunk(
  'cart/fetchDeliveryOptions',
  async () => {
    const response = await axiosInstance.get('/delivery-options');
    return response.data;
  },
);

export const placeOrder = createAsyncThunk(
  'cart/placeOrder',
  async (_, { dispatch }) => {
    try {
      const response = await axiosInstance.post('/orders');
      dispatch(clearCart());
      return response.data;
    } catch (error) {
      throw error;
    }
  },
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.items = [];
      state.summary = null;
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        fetchCart.fulfilled,
        (
          state,
          action: PayloadAction<{
            items: CartItem[];
            summary: {
              totalCents: number;
              shippingCents: number;
              estimatedTaxCents: number;
            };
          }>,
        ) => {
          state.items = action.payload.items;
          state.summary = action.payload.summary;
          state.status = 'succeeded';
        },
      )
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message;
      });

    builder.addCase(addToCart.fulfilled, (state, action) => {
      const { productId, quantity } = action.payload;

      const existingItem = state.items.find(
        (item) => item.productId === productId,
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        // Construct the full object to satisfy the CartItem interface
        state.items.push({
          productId,
          quantity,
          deliveryOptionId: '1', // Default value
          product: undefined, // It will be populated by the next fetchCart
        });
      }
      state.status = 'succeeded';
    });

    builder.addCase(fetchDeliveryOptions.fulfilled, (state, action) => {
      state.deliveryOptions = action.payload;
    });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;

import { RootState } from './store';
export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartTotalQuantity = (state: RootState) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);
