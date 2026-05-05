import { useState } from 'react';
import { formatMoney } from '../../utils/money';
import { DeliveryOptions } from './DeliveryOptions';
import { useDispatch } from 'react-redux';
import { removeFromCart, updateCartItem } from '../../store/cartSlice';

export const CartItemsDetails = ({ cartItem }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [quantity, setQuantity] = useState(cartItem.quantity);
  const dispatch = useDispatch();

  const deleteItem = () => {
    dispatch(removeFromCart(cartItem.productId));
  };

  const saveQuantity = () => {
    dispatch(
      updateCartItem({
        productId: cartItem.productId,
        updates: { quantity },
      }),
    );
    setIsEditing(false);
  };

  return (
    <div className='grid grid-cols-[200px_1fr_1fr] gap-x-6.25 max-[1000px]:grid-cols-[100px_1fr] max-[1000px]:row-gap-[30px] max-[450px]:grid-cols-1'>
      {/* Product Image */}
      <img
        className='max-w-full max-h-50 mx-auto'
        src={cartItem.product.image}
        alt={cartItem.product.name}
      />

      {/* Product Info */}
      <div className='cart-item-details'>
        <div className='font-bold mb-2'>{cartItem.product.name}</div>
        <div className='font-bold mb-1.25'>
          {formatMoney(cartItem.product.priceCents)}
        </div>

        <div className='flex items-center gap-2.5 text-[15px]'>
          <span className='flex items-center gap-1'>
            Quantity:
            {isEditing ? (
              <input
                type='number'
                min='1'
                max='99'
                value={quantity}
                onChange={(event) => setQuantity(Number(event.target.value))}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') saveQuantity();
                  if (event.key === 'Escape') setIsEditing(false);
                }}
                className='w-12 p-1.25 border border-[#d5d9d9] rounded text-[14px] text-center outline-none shadow-[0_2px_5px_rgba(213,217,217,0.5)] focus:border-[#007185] focus:shadow-[0_0_3px_2px_rgba(0,113,133,0.15)] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
              />
            ) : (
              <span className='font-normal'>{cartItem.quantity}</span>
            )}
          </span>

          {isEditing ? (
            <div className='flex gap-2'>
              <span className='font-bold link-primary' onClick={saveQuantity}>
                Save
              </span>
              <span
                className='link-primary'
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </span>
            </div>
          ) : (
            <span className='link-primary' onClick={() => setIsEditing(true)}>
              Update
            </span>
          )}

          <span className='link-primary' onClick={deleteItem}>
            Delete
          </span>
        </div>
      </div>

      <DeliveryOptions cartItem={cartItem} />
    </div>
  );
};
