'use client';

import { Order } from '@/types';
import dayjs from 'dayjs';

interface OrderHeaderProps {
  order: Order;
}

export default function OrderHeader({ order }: OrderHeaderProps) {
  const totalCents = order.totalCostCents || 0;

  const machineReadableDate = dayjs(order.orderTimeMs).format('YYYY-MM-DD');
  const humanReadableDate = dayjs(order.orderTimeMs).format('MMMM D, YYYY');

  return (
    <header className='bg-gray-100 p-4 border-b border-gray-300 grid grid-cols-2 md:grid-cols-[auto_auto_1fr_auto] gap-x-10 gap-y-2 text-sm text-gray-700'>
      {/* Order Placed Date */}
      <div>
        <span className='block font-bold uppercase text-xs text-gray-500'>
          Order Placed
        </span>
        <time dateTime={machineReadableDate} className='font-medium'>
          {humanReadableDate}
        </time>
      </div>

      {/* Total Price */}
      <div>
        <span className='block font-bold uppercase text-xs text-gray-500'>
          Total
        </span>
        <data value={totalCents} className='font-medium'>
          ${(totalCents / 100).toFixed(2)}
        </data>
      </div>

      {/* Empty space for middle alignment on desktop */}
      <div className='hidden md:block' aria-hidden='true'></div>

      {/* Order ID */}
      <div className='col-span-2 md:col-span-1 md:text-right'>
        {/* 4. Semantic grouping for unique references */}
        <dfn className='block not-italic font-bold uppercase text-xs text-gray-500'>
          Order ID
        </dfn>
        <code className='block font-mono text-xs text-gray-600 break-all bg-gray-200/50 px-1 py-0.5 rounded md:bg-transparent md:p-0'>
          {order.id}
        </code>
      </div>
    </header>
  );
}
