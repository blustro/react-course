'use client';

import { useEffect } from 'react';
import {
  fetchCart,
  fetchDeliveryOptions,
  placeOrder,
  selectCartItems,
} from '@/store/cartSlice';
import Link from 'next/link';
import CartItemRow from './CartItemRow';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

export default function CheckoutClient() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const status = useAppSelector((state) => state.cart.status);
  const deliveryOptions = useAppSelector((state) => state.cart.deliveryOptions);

  // Business Logic Calculations (Keep as is)
  const items = cartItems || [];
  const productTotalCents = items.reduce(
    (acc, item) => acc + (item.product?.priceCents || 0) * item.quantity,
    0,
  );
  const shippingTotalCents = items.reduce((acc, item) => {
    const selectedOption = deliveryOptions.find(
      (option) => option.id === (item.deliveryOptionId || '1'),
    );
    return acc + (selectedOption?.priceCents || 0);
  }, 0);
  const totalBeforeTaxCents = productTotalCents + shippingTotalCents;
  const estimatedTaxCents = Math.round(totalBeforeTaxCents * 0.1);
  const orderTotalCents = totalBeforeTaxCents + estimatedTaxCents;

  const handlePlaceOrder = async () => {
    try {
      const resultAction = await dispatch(placeOrder());
      if (placeOrder.fulfilled.match(resultAction)) router.push('/orders');
    } catch (error) {
      alert('Failed to place order. Please try again.');
    }
  };

  useEffect(() => {
    dispatch(fetchCart());
    dispatch(fetchDeliveryOptions());
  }, [dispatch]);

  if (status === 'loading') return <p role='status'>Loading your cart...</p>;

  if (items.length === 0) {
    return (
      <main className='text-center py-10'>
        <h1 className='text-xl mb-4'>Your cart is empty</h1>
        <Link href='/' className='text-blue-500 hover:underline font-bold'>
          View products to add to your cart
        </Link>
      </main>
    );
  }

  return (
    // 1. Used <main> to define the core page content
    <main className='grid grid-cols-1 lg:grid-cols-3 gap-8 p-4'>
      {/* 2. Structured items as a List (Semantic) */}
      <section aria-label='Review your items' className='lg:col-span-2'>
        <ul className='space-y-4 list-none p-0'>
          {cartItems.map(
            (item) =>
              item.product && (
                <li key={item.productId}>
                  <CartItemRow item={item} />
                </li>
              ),
          )}
        </ul>
      </section>

      {/* 3. Used <aside> for the summary, which is supporting information */}
      <aside
        aria-label='Order Summary'
        className='border p-6 rounded shadow-md h-fit bg-white'
      >
        <h2 className='text-xl font-bold mb-4'>Order Summary</h2>

        {/* 4. Using <table> for financial data mapping */}
        <table className='w-full text-sm border-collapse'>
          <caption className='sr-only'>Detailed price breakdown</caption>
          <tbody className='space-y-2'>
            <tr>
              <th scope='row' className='text-left font-normal py-1'>
                Items ({cartItems.length}):
              </th>
              <td className='text-right'>
                ${(productTotalCents / 100).toFixed(2)}
              </td>
            </tr>
            <tr>
              <th scope='row' className='text-left font-normal py-1'>
                Shipping & handling:
              </th>
              <td className='text-right'>
                ${(shippingTotalCents / 100).toFixed(2)}
              </td>
            </tr>
            <tr className='border-t pt-2'>
              <th scope='row' className='text-left font-normal py-1'>
                Total before tax:
              </th>
              <td className='text-right'>
                ${(totalBeforeTaxCents / 100).toFixed(2)}
              </td>
            </tr>
            <tr>
              <th scope='row' className='text-left font-normal py-1'>
                Estimated tax (10%):
              </th>
              <td className='text-right'>
                ${(estimatedTaxCents / 100).toFixed(2)}
              </td>
            </tr>
          </tbody>
          <tfoot className='border-t-2 mt-4'>
            <tr className='text-lg font-bold text-red-700'>
              <th scope='row' className='text-left pt-3'>
                Order Total:
              </th>
              <td className='text-right pt-3'>
                ${(orderTotalCents / 100).toFixed(2)}
              </td>
            </tr>
          </tfoot>
        </table>

        <button
          className='w-full bg-yellow-400 hover:bg-yellow-500 py-3 rounded-lg mt-6 font-bold shadow transition-colors'
          onClick={handlePlaceOrder}
          aria-label='Place your order and proceed to payment'
        >
          Place your order
        </button>
      </aside>
    </main>
  );
}
