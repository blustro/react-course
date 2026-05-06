import { useEffect } from 'react';
import { Header } from '../../components/Header';
import { ProductsGrid } from './ProductsGrid';
import './HomePage.css';
import { useSearchParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, setSearchQuery } from '../../store/productSlice';
import { fetchCart } from '../../store/cartSlice';

export const HomePage = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  const {
    items,
    status: productStatus,
    selectedCategory,
  } = useSelector((state) => state.products);
  const cartStatus = useSelector((state) => state.cart.status);

  const urlSearch = searchParams.get('search') || '';

  useEffect(() => {
    dispatch(setSearchQuery(urlSearch));
  }, [urlSearch, dispatch]);

  useEffect(() => {
    if (productStatus === 'idle') {
      dispatch(fetchProducts());
    }
  }, [productStatus, dispatch]);

  useEffect(() => {
    if (cartStatus === 'idle') {
      dispatch(fetchCart());
    }
  }, [cartStatus, dispatch]);

  const filteredProducts = items.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(urlSearch.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' ||
      product.keywords.includes(selectedCategory.toLowerCase());

    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <title>Ecommerce Project</title>

      <Header />
      <ProductsGrid products={filteredProducts} />
    </>
  );
};
