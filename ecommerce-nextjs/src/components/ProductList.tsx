'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { setProducts } from '@/store/productSlice';
import { fetchCart } from '@/store/cartSlice';
import { ProductCard } from './ProductCard';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Product } from '@/types';

interface ProductListProps {
  initialData: Product[];
}

export default function ProductList({ initialData }: ProductListProps) {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();

  const { items, selectedCategory } = useAppSelector((state) => state.products);
  const cartStatus = useAppSelector((state) => state.cart.status);

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
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </section>
  );
}
