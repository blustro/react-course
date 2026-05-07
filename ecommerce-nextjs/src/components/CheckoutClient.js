'use client';

import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchCart, selectCartItems } from '@/store/cartSlice';
import Link from 'next/link';
import Image from 'next/image';

export default function CheckoutClient() {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const status = useSelector((state) => state.cart.status);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  if (status === 'loading') return <p>Loading your cart...</p>;

  if (cartItems.length === 0) {
    return (
      <div className='text-center py-10'>
        <p className='mb-4'>Your cart is empty.</p>
        <Link href='/' className='text-blue-500 underline'>
          View products
        </Link>
      </div>
    );
  }

  const totalCents = cartItems.reduce((acc, item) => {
    return acc + (item.product?.priceCents || 0) * item.quantity;
  }, 0);

  return (
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
      {/* LEFT: Item List */}
      <div className='lg:col-span-2 space-y-4'>
        {cartItems.map((item) => (
          <div
            key={item.productId}
            className='flex border p-4 rounded shadow-sm gap-4'
          >
            <Image
              src={`/${item.product?.image}`}
              alt={item.product?.name}
              width={96}
              height={96}
              className='w-24 h-24 object-contain'
            />
            <div className='flex-1'>
              <h3 className='font-bold'>{item.product?.name}</h3>
              <p className='text-green-700 font-semibold'>
                ${((item.product?.priceCents || 0) / 100).toFixed(2)}
              </p>
              <p className='text-sm'>Quantity: {item.quantity}</p>
            </div>
            <button className='text-red-500 hover:underline h-fit'>
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* RIGHT: Order Summary */}
      <div className='border p-6 rounded shadow-md h-fit bg-gray-50'>
        <h2 className='text-xl font-bold mb-4'>Order Summary</h2>
        <div className='flex justify-between mb-2'>
          <span>Items:</span>
          <span>${(totalCents / 100).toFixed(2)}</span>
        </div>
        <div className='flex justify-between mb-2'>
          <span>Shipping & handling:</span>
          <span>$0.00</span>
        </div>
        <hr className='my-4' />
        <div className='flex justify-between text-lg font-bold text-red-700'>
          <span>Order total:</span>
          <span>${(totalCents / 100).toFixed(2)}</span>
        </div>
        <button className='w-full bg-yellow-400 hover:bg-yellow-500 py-3 rounded-lg mt-6 font-bold shadow'>
          Place your order
        </button>
      </div>
    </div>
  );
}
