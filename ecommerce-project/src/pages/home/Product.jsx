import { useState } from 'react';
import { formatMoney } from '../../utils/money';
import { useDispatch } from 'react-redux';
import { addToCart, fetchCart } from '../../store/cartSlice';

export const Product = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [showAddedMessage, setShowAddedMessage] = useState(false);
  const dispatch = useDispatch();

  const handleAddToCart = async () => {
    await dispatch(addToCart({ productId: product.id, quantity }));
    dispatch(fetchCart());

    setShowAddedMessage(true);
    setTimeout(() => {
      setShowAddedMessage(false);
    }, 2000);
  };

  const selectQuantity = (event) => {
    const quantitySelected = Number(event.target.value);
    setQuantity(quantitySelected);
  };

  return (
    <div
      className='pt-10 pb-6.25 px-6.25 border-r border-b border-[rgb(240,240,240)] flex flex-col h-full'
      data-testid='product-container'
    >
      <div className='flex justify-center items-center h-45 mb-5'>
        <img
          className='max-w-full max-h-full rounded-[5px]'
          data-testid='product-image'
          src={product.image}
        />
      </div>

      <div className='min-h-10 mb-1.25 line-clamp-2 leading-tight'>
        {product.name}
      </div>

      <div className='flex items-center mb-2.5'>
        <img
          className='w-25 mr-1.5'
          data-testid='product-rating-stars-image'
          src={`images/ratings/rating-${product.rating.stars * 10}.png`}
        />
        <div className='text-[rgb(25,135,84)] cursor-auto mt-0.75'>
          {product.rating.count}
        </div>
      </div>

      <div className='font-bold mb-2.5'>{formatMoney(product.priceCents)}</div>

      <div className='mb-4.25'>
        <select
          className='border border-[rgb(200,200,200)] rounded-[5px] p-[3px_5px] text-[15px] cursor-pointer'
          value={quantity}
          onChange={selectQuantity}
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
        className={`text-[rgb(25,135,84)] text-base flex items-center mb-2 transition-opacity duration-200 ${
          showAddedMessage ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <img className='h-4.75 mr-1.5' src='images/icons/checkmark.png' />
        Added
      </div>

      <button
        className='w-full p-2 h-8.5 mt-px button-primary'
        onClick={handleAddToCart}
        data-testid='add-to-cart-button'
      >
        Add to Cart
      </button>
    </div>
  );
};
