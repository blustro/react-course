'use client';

import { addToCart } from '@/store/cartSlice';
import { useDispatch } from 'react-redux';
import Image from 'next/image';
import Link from 'next/link';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { Order } from '@/types';

interface OrderDetailsProps {
  order: Order;
}

export default function OrderDetails({ order }: OrderDetailsProps) {
  const dispatch = useAppDispatch();
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});

  const handleBuyAgain = async (productId: string) => {
    setAddedItems((prev) => ({ ...prev, [productId]: true }));
    await dispatch(addToCart({ productId, quantity: 1 }));
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [productId]: false }));
    }, 2000);
  };

  return (
    <section className='p-6 grid grid-cols-1 md:grid-cols-[120px_1fr_200px] gap-8 items-start bg-white'>
      {order.products.map((orderProduct) => {
        const product = orderProduct.product;
        if (!product) return null;

        const isAdded = addedItems[product.id];

        return (
          <div className='contents' key={product.id}>
            {/* Image */}
            <div className='flex justify-center'>
              <Image
                className='object-contain'
                src={
                  product.image.startsWith('/')
                    ? product.image
                    : `/${product.image}`
                }
                alt={product.name}
                width={100}
                height={100}
              />
            </div>

            {/* Info */}
            <div>
              <div className='font-bold text-lg mb-1'>{product.name}</div>
              <div className='text-gray-700'>
                Arriving on:
                <time
                  dateTime={dayjs(orderProduct.estimatedDeliveryTimeMs).format(
                    'YYYY-MM-DD',
                  )}
                >
                  {dayjs(orderProduct.estimatedDeliveryTimeMs).format('MMMM D')}
                </time>
              </div>
              <div className='text-gray-600 mb-4'>
                Quantity: {orderProduct.quantity}
              </div>

              <button
                className={`flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 px-4 py-2 rounded-md font-semibold text-sm transition-all ${isAdded ? 'opacity-50 pointer-events-none' : ''}`}
                onClick={() => handleBuyAgain(product.id)}
              >
                <span>{isAdded ? '✓ Added' : 'Buy it again'}</span>
              </button>
            </div>

            {/* Actions */}
            <div className='md:text-right'>
              <Link href={`/tracking/${order.id}/${product.id}`}>
                <button className='w-full border border-gray-300 py-2 px-4 rounded-md text-sm hover:bg-gray-50 shadow-sm'>
                  Track package
                </button>
              </Link>
            </div>
          </div>
        );
      })}
    </section>
  );
}
