import { Order } from '@/types';
import OrderDetails from './OrderDetails';
import OrderHeader from './OrderHeader';

interface OrdersGridProps {
  orders: Order[];
}

export default function OrdersGrid({ orders }: OrdersGridProps) {
  if (orders.length === 0) return <p>No orders found.</p>;

  return (
    <section className='flex flex-col gap-10'>
      {orders.map((order) => (
        <div
          className='border border-gray-300 rounded-md overflow-hidden'
          key={order.id}
        >
          <OrderHeader order={order} />
          <OrderDetails order={order} />
        </div>
      ))}
    </section>
  );
}
