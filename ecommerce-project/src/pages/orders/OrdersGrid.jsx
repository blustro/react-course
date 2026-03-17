import { OrderDetails } from './OrderDetails';
import { OrderHeader } from './OrderHeader';

export const OrdersGrid = ({ orders, loadCart }) => {
  return (
    <div className='orders-grid'>
      {orders.map((order) => {
        return (
          <div key={order.id} className='order-container'>
            <OrderHeader order={order} />
            <OrderDetails order={order} loadCart={loadCart} />
          </div>
        );
      })}
    </div>
  );
};
