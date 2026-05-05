import { useDispatch } from 'react-redux';
import { OrderDetails } from './OrderDetails';
import { OrderHeader } from './OrderHeader';
import { fetchCart } from '../../store/cartSlice';
import { useEffect } from 'react';

export const OrdersGrid = ({ orders }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  return (
    <div className='grid grid-cols-1 gap-y-12.5'>
      {orders.map((order) => (
        <div
          key={order.id}
          className='order-container'
          data-testid='order-container'
        >
          <OrderHeader order={order} />
          <OrderDetails order={order} />
        </div>
      ))}
    </div>
  );
};
