'use client';

import OrdersGrid from '@/components/orders/OrdersGrid';
import { fetchOrders } from '@/store/ordersSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function OrdersPage() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.list);
  const status = useSelector((state) => state.orders.status);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <main className='max-w-4xl mt-10 mb-10 px-5 mx-auto'>
      <h1 className='font-bold text-3xl mb-8'>Your Orders</h1>
      {status === 'loading' ? (
        <p>Loading orders...</p>
      ) : (
        <OrdersGrid orders={orders} />
      )}
    </main>
  );
}
