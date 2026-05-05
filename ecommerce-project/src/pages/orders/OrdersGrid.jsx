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
    <div className='orders-grid'>
      {orders.map((order) => {
        return (
          <div
            key={order.id}
            className='order-container'
            data-testid='order-container'
          >
            <OrderHeader order={order} />
            <OrderDetails order={order} />
          </div>
        );
      })}
    </div>
  );
};
