import OrderDetails from './OrderDetails';
import OrderHeader from './OrderHeader';

export default function OrdersGrid({ orders }) {
  if (orders.length === 0) return <p>No orders found.</p>;

  return (
    <div className='flex flex-col gap-10'>
      {orders.map((order) => (
        <div
          className='border border-gray-300 rounded-md overflow-hidden'
          key={order.id}
        >
          <OrderHeader order={order} />
          <OrderDetails order={order} />
        </div>
      ))}
    </div>
  );
}
