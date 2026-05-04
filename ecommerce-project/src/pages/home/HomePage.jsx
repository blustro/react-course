import { useEffect } from 'react';
import { Header } from '../../components/Header';
import { ProductsGrid } from './ProductsGrid';
import './HomePage.css';
import { useSearchParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, setSearchQuery } from '../../store/productSlice';

export const HomePage = ({ cart, loadCart }) => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.products);

  const urlSearch = searchParams.get('search') || '';

  useEffect(() => {
    dispatch(setSearchQuery(urlSearch));
  }, [urlSearch, dispatch]);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const filteredProducts = items.filter((product) =>
    product.name.toLowerCase().includes(urlSearch.toLowerCase()),
  );

  return (
    <>
      <title>Ecommerce Project</title>

      <Header cart={cart} />

      <div className='home-page'>
        <ProductsGrid products={filteredProducts} loadCart={loadCart} />
      </div>
    </>
  );
};
