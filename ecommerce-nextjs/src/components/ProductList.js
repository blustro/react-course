'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'next/navigation';
import { setProducts } from '@/store/productSlice';
import { fetchCart } from '@/store/cartSlice';
import { Product } from './Product';

export default function ProductList({ initialData }) {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();

  const { items, selectedCategory } = useSelector((state) => state.products);
  const cartStatus = useSelector((state) => state.cart.status);

  const urlSearch = searchParams.get('search') || '';

  useEffect(() => {
    if (initialData) {
      dispatch(setProducts(initialData));
    }
  }, [initialData, dispatch]);

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
    <section className='mt-4' aria-label='Product Catalog'>
      <ul className='list-none p-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 border-l border-t border-[rgb(240,240,240)]'>
        {filteredProducts.map((product) => (
          <li key={product.id}>
            <Product product={product} />
          </li>
        ))}
      </ul>
    </section>
  );
}
