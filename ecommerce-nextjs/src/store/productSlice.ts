import { ProductState, Product } from '@/types';
import axiosInstance from '@/utils/axios';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

const initialState: ProductState = {
  items: [],
  searchQuery: '',
  status: 'idle',
  selectedCategory: 'All',
};

export const fetchProducts = createAsyncThunk<Product[], void>(
  'products/fetchProducts',
  async () => {
    const response = await axiosInstance.get<Product[]>('/products');
    return response.data;
  },
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
      state.status = 'succeeded';
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchProducts.fulfilled,
      (state, action: PayloadAction<Product[]>) => {
        state.items = action.payload;
        state.status = 'succeeded';
      },
    );
  },
});

export const { setProducts, setSearchQuery, setSelectedCategory } =
  productSlice.actions;
export default productSlice.reducer;

export const selectAllProducts = (state: RootState) => state.products.items;
export const selectFilteredProducts = (state: RootState) => {
  const { items, searchQuery, selectedCategory } = state.products;

  return items.filter((product) => {
    const matchesCategory =
      selectedCategory === 'All' ||
      product.keywords.includes(selectedCategory.toLowerCase());
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });
};
