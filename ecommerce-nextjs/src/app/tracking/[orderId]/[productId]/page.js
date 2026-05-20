'use client';

import {
  clearTrackingData,
  fetchTrackingData,
  selectDeliveryDetails,
} from '@/store/trackingSlice';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import { use, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function TrackingPage({ params }) {
  const { orderId, productId } = use(params);
  const dispatch = useDispatch();

  const status = useSelector((state) => state.tracking.status);
  const details = useSelector((state) =>
    selectDeliveryDetails(state, productId),
  );

  useEffect(() => {
    dispatch(fetchTrackingData(orderId));
    return () => dispatch(clearTrackingData());
  }, [dispatch, orderId]);

  if (status === 'loading' || !details)
    return (
      <div className='p-10 text-center' role='status'>
        Loading tracing info...
      </div>
    );
  if (status === 'failed')
    return (
      <div className='p-10 text-center text-red-500' role='alert'>
        Failed to load.
      </div>
    );

  return (
    <main className='max-w-3xl mx-auto mt-10 px-6'>
      <nav aria-label='Secondary Navigation'>
        <Link
          href='/orders'
          className='text-blue-600 hover:underline mb-8 inline-block font-medium'
          aria-label='Back to all orders page'
        >
          ← View all orders
        </Link>
      </nav>

      <article className='order-tracking'>
        <h1 className='text-3xl font-bold mb-2'>
          {details.arrivalText}{' '}
          <time
            dateTime={dayjs(details.estimatedDeliveryTimeMs).format(
              'YYYY-MM-DD',
            )}
          >
            {dayjs(details.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
          </time>
        </h1>

        <p className='text-lg text-gray-700 mb-1'>{details.product.name}</p>
        <p className='text-gray-600 mb-8'>Quantity: {details.quantity}</p>

        <div className='flex justify-center mb-12'>
          <Image
            className='object-contain'
            src={
              details.product.image.startsWith('/')
                ? details.product.image
                : `/${details.product.image}`
            }
            alt={`Product image for ${details.product.name}`}
            width={200}
            height={200}
          />
        </div>
      </article>

      <section aria-labelledby='progress-status-heading'>
        <h2 id='progress-status-heading' className='sr-only'>
          Delivery Progress
        </h2>
        {/* Progress Labels */}
        <div className='flex justify-between font-bold text-lg mb-4'>
          <span
            className={details.isPreparing ? 'text-green-700' : 'text-gray-400'}
            aria-current={details.isPreparing ? 'step' : undefined}
          >
            Preparing
          </span>
          <span
            className={details.isShipped ? 'text-green-700' : 'text-gray-400'}
            aria-current={details.isShipped ? 'step' : undefined}
          >
            Shipped
          </span>
          <span
            className={details.isDelivered ? 'text-green-700' : 'text-gray-400'}
            aria-current={details.isDelivered ? 'step' : undefined}
          >
            Delivered
          </span>
        </div>

        {/* Progress Bar */}
        <div
          className='w-full h-8 bg-gray-200 rounded-full border border-gray-300 overflow-hidden'
          role='progressbar'
          aria-valuenow={Math.round(details.deliveryPercent)}
          aria-valuemin='0'
          aria-valuemax='100'
          aria-label='Order delivery progress percentage'
        >
          <div
            className='h-full bg-green-600 transition-all duration-700 ease-out'
            style={{ width: `${details.deliveryPercent}%` }}
          ></div>
        </div>
      </section>
    </main>
  );
}
