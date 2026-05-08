'use client';

import dayjs from 'dayjs';

export default function OrderHeader({ order }) {
  const totalCents = order.totalCostCents || 0;
  const orderDate = dayjs(order.orderTimeMs).format('MMMM D');

  return (
    <div className='bg-gray-100 p-4 border-b border-gray-300 grid grid-cols-2 md:grid-cols-[auto_auto_1fr_auto] gap-x-10 gap-y-2 text-sm text-gray-700'>
      {/* Order Placed Date */}
      <div>
        <div className='font-bold uppercase text-xs'>Order Placed:</div>
        <div>{orderDate}</div>
      </div>

      {/* Total Price */}
      <div>
        <div className='font-bold uppercase text-xs'>Total:</div>
        <div>${(totalCents / 100).toFixed(2)}</div>
      </div>

      {/* Empty space for middle alignment on desktop */}
      <div className='hidden md:block'></div>

      {/* Order ID */}
      <div className='col-span-2 md:col-span-1 md:text-right'>
        <div className='font-bold uppercase text-xs'>Order ID:</div>
        <div className='font-mono text-xs text-gray-500 break-all'>
          {order.id}
        </div>
      </div>
    </div>
  );
}
