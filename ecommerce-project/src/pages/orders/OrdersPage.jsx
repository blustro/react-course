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

      <div className='orders-page'>
        <div className='page-title'>Your Orders</div>

        <OrdersGrid orders={orders} />
      </div>
    </>
  );
};
