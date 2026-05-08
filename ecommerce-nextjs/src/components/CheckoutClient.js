'use client';

import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {
  fetchCart,
  fetchDeliveryOptions,
  selectCartItems,
} from '@/store/cartSlice';
import Link from 'next/link';
import CartItemRow from './CartItemRow';

export default function CheckoutClient() {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const status = useSelector((state) => state.cart.status);
  const deliveryOptions = useSelector((state) => state.cart.deliveryOptions);

  const productTotalCents = cartItems.reduce((acc, item) => {
    return acc + (item.product?.priceCents || 0) * item.quantity;
  }, 0);

  const shippingTotalCents = cartItems.reduce((acc, item) => {
    const selectedOption = deliveryOptions.find(
      (option) => option.id === (item.deliveryOptionId || '1'),
    );
    return acc + (selectedOption?.priceCents || 0);
  }, 0);

  const totalBeforeTaxCents = productTotalCents + shippingTotalCents;
  const estimatedTaxCents = Math.round(totalBeforeTaxCents * 0.1);
  const orderTotalCents = totalBeforeTaxCents + estimatedTaxCents;

  useEffect(() => {
    dispatch(fetchCart());
    dispatch(fetchDeliveryOptions());
  }, [dispatch]);

  if (status === 'loading') return <p>Loading your cart...</p>;

  if (cartItems.length === 0) {
    return (
      <div className='text-center py-10'>
        <p className='mb-4 text-xl'>Your cart is empty</p>
        <Link href='/' className='text-blue-500 hover:underline font-bold'>
          View products to add to your cart
        </Link>
      </div>
    );
  }

  return (
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
      {/* LEFT: Item List */}
      <div className='lg:col-span-2 space-y-4'>
        {cartItems.map(
          (item) =>
            item.product && <CartItemRow key={item.productId} item={item} />,
        )}
      </div>

      {/* RIGHT: Order Summary */}
      <div className='border p-6 rounded shadow-md h-fit bg-white'>
        <h2 className='text-xl font-bold mb-4'>Order Summary</h2>

        <div className='flex justify-between mb-2'>
          <span>Items ({cartItems.length}):</span>
          <span>${(productTotalCents / 100).toFixed(2)}</span>
        </div>

        <div className='flex justify-between mb-2'>
          <span>Shipping & handling:</span>
          <span>${(shippingTotalCents / 100).toFixed(2)}</span>
        </div>

        <div className='flex justify-between mb-2 border-t pt-2'>
          <span>Total before tax:</span>
          <span>${(totalBeforeTaxCents / 100).toFixed(2)}</span>
        </div>

        <div className='flex justify-between mb-2'>
          <span>Estimated tax (10%):</span>
          <span>${(estimatedTaxCents / 100).toFixed(2)}</span>
        </div>

        <hr className='my-4' />

        <div className='flex justify-between text-lg font-bold text-red-700'>
          <span>Order Total:</span>
          <span>${(orderTotalCents / 100).toFixed(2)}</span>
        </div>

        <button className='w-full bg-yellow-400 hover:bg-yellow-500 py-3 rounded-lg mt-6 font-bold shadow transition-colors'>
          Place your order
        </button>
      </div>
    </div>
  );
}
