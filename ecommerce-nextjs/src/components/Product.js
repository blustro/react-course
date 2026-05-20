'use client';

import { useState } from 'react';
import { formatMoney } from '@/utils/money';
import { useDispatch } from 'react-redux';
import { addToCart, fetchCart } from '@/store/cartSlice';
import Image from 'next/image';

export const Product = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [showAddedMessage, setShowAddedMessage] = useState(false);
  const dispatch = useDispatch();

  const handleAddToCart = async () => {
    await dispatch(addToCart({ productId: product.id, quantity }));
    dispatch(fetchCart());
    setShowAddedMessage(true);
    setTimeout(() => setShowAddedMessage(false), 2000);
  };

  const displayPrice = (product.priceCents / 100).toFixed(2);

  return (
    <article className='pt-10 pb-6.25 px-6.25 border-r border-b border-[rgb(240,240,240)] flex flex-col h-full bg-white'>
      <div className='relative h-45 mb-5 flex justify-center'>
        <Image
          className='object-contain rounded-[5px] w-auto h-auto'
          src={
            product.image.startsWith('/') ? product.image : `/${product.image}`
          }
          alt={product.name}
          width={200}
          height={200}
          loading='eager'
        />
      </div>

      <h3 className='min-h-10 mb-1.25 line-clamp-2 leading-tight text-sm'>
        {product.name}
      </h3>

      <div
        className='flex items-center mb-2.5'
        aria-label={`Rated ${product.rating.stars} out of 5 stars based on ${product.rating.count} reviews`}
      >
        <Image
          src={`/images/ratings/rating-${product.rating.stars * 10}.png`}
          alt='rating'
          width={100}
          height={20}
          className='w-25 mr-1.5'
        />
        <div className='text-[rgb(25,135,84)] mt-0.75'>
          {product.rating.count}
        </div>
      </div>

      {/* Price layout */}
      <div className='text-lg font-bold text-gray-900 mb-4'>
        <span className='sr-only'>Price: </span>${displayPrice}
      </div>

      <div className='mb-4.25'>
        <select
          className='border border-[rgb(200,200,200)] rounded-[5px] p-[3px_5px] text-[15px] cursor-pointer outline-none'
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        >
          {[...Array(10)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
      </div>

      <div className='flex-1'></div>

      <div
        className={`text-[rgb(25,135,84)] text-base flex items-center mb-2 transition-opacity duration-200 ${showAddedMessage ? 'opacity-100' : 'opacity-0'}`}
      >
        <Image
          className='mr-1.5'
          src='/images/icons/checkmark.png'
          alt='added'
          width={20}
          height={20}
          style={{ width: 'auto', height: 'auto' }}
        />
        Added
      </div>

      <button
        className='w-full p-2 h-8.5 button-primary transition-colors'
        onClick={handleAddToCart}
        aria-label={`Add ${product.name} to shopping cart`}
      >
        Add to Cart
      </button>
    </article>
  );
};
