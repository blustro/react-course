import axiosInstance from '@/utils/axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await axiosInstance.get('/products');
    return response.data;
  },
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    searchQuery: '',
    status: 'idle',
    selectedCategory: 'All',
  },
  reducers: {
    setProducts: (state, action) => {
      state.items = action.payload;
      state.status = 'succeeded';
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = 'succeeded';
    });
  },
});

export const { setProducts, setSearchQuery, setSelectedCategory } =
  productSlice.actions;
export default productSlice.reducer;
