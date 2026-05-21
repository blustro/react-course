'use client';

import { updateCartItem, removeFromCart } from '@/store/cartSlice';
import Image from 'next/image';
import { useState } from 'react';
import DeliveryOptions from './DeliveryOptions';
import { useAppDispatch } from '@/store/hooks';
import { CartItem } from '@/types';

interface CartItemRowProps {
  item: CartItem;
}

export default function CartItemRow({ item }: CartItemRowProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [quantity, setQuantity] = useState(item.quantity);
  const dispatch = useAppDispatch();

  if (!item.product) return null;

  const handleSave = () => {
    dispatch(
      updateCartItem({
        productId: item.productId,
        updates: { quantity },
      }),
    );
    setIsEditing(false);
  };

  return (
    <section className='flex border p-4 rounded shadow-sm gap-4'>
      {/* Product Image & Info Column */}
      <div className='flex flex-1 gap-4'>
        <Image
          className='w-24 h-24 object-contain'
          alt={item.product.name}
          src={
            item.product.image.startsWith('/')
              ? item.product.image
              : `/${item.product.image}`
          }
          width={96}
          height={96}
          loading='eager'
        />
        <div className='flex-1'>
          <h3 className='font-bold'>{item.product.name}</h3>
          <p className='text-green-700 font-semibold'>
            ${(item?.product?.priceCents / 100).toFixed(2)}
          </p>

          <div className='flex items-center gap-2 mt-2 text-sm'>
            Quantity:
            {isEditing ? (
              <input
                type='number'
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className='w-12 border rounded px-1'
                min='1'
              />
            ) : (
              <span>{item.quantity}</span>
            )}
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className='text-blue-600  font-bold'
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className='text-gray-500'
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className='bg-blue-600 hover:underline px-2 py-1 rounded-sm text-white'
              >
                Update
              </button>
            )}
            <button
              onClick={() => dispatch(removeFromCart(item.productId))}
              className='bg-red-500 hover:underline text-white px-2 py-1 ml-2 rounded-sm'
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Delivery Column */}
      <div className='w-64 border-l pl-8'>
        <DeliveryOptions cartItem={item} />
      </div>
    </section>
  );
}
