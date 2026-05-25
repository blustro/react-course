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
  const response = await axiosInstance.get<CartItem[]>(
    '/cart-items?expand=product',
  );
  return response.data; // This is now correctly typed as CartItem[]
});

export const addToCart = createAsyncThunk<
  AddToCartResponse,
  AddToCartArgs,
  { rejectValue: string }
>('cart/addToCart', async ({ productId, quantity }, { rejectWithValue }) => {
  try {
    await axiosInstance.post('/cart-items', { productId, quantity });
    return { productId, quantity };
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
        (state, action: PayloadAction<CartItem[]>) => {
          console.log('API Response:', action.payload);
          state.items = action.payload;
          state.summary = null;
          state.status = 'succeeded';
        },
      )
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message;
      });

    builder.addCase(addToCart.fulfilled, (state, action) => {
      const { productId, quantity } = action.payload;

      // Use state.items directly, do not create a local 'items' variable
      const items = state?.items || [];
      const existingItem = items.find((item) => item.productId === productId);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        // Redux Toolkit uses Immer under the hood; .push() is safe here
        items.push({
          productId,
          quantity,
          deliveryOptionId: '1',
          product: undefined,
        });
      }
      state.status = 'succeeded';
    });

    builder.addCase(fetchDeliveryOptions.fulfilled, (state, action) => {
      state.deliveryOptions = action.payload;
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
    });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;

import { RootState } from './store';
export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartTotalQuantity = (state: RootState) => {
  const items = state.cart?.items || [];
  return items.reduce((total, item) => total + item.quantity, 0);
};
