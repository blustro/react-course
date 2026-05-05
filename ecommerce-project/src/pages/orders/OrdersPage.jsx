import { useEffect, Fragment } from 'react';
import { Header } from '../../components/Header';
import { OrdersGrid } from './OrdersGrid';
import './OrdersPage.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../../store/ordersSlice';

export const OrdersPage = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.list);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <>
      <title>Orders</title>

      <Header />

      <div className='max-w-212.5 mt-10 mb-10 px-5 mx-auto'>
        <div className='font-bold text-[26px] mb-6.25'>Your Orders</div>
        <OrdersGrid orders={orders} />
      </div>
    </>
  );
};
