import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await axios.get('/api/products');
    return response.data;
  },
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    searchQuery: '',
    status: 'idle',
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = 'succeeded';
    });
  },
});

export const { setSearchQuery } = productSlice.actions;
export default productSlice.reducer;
