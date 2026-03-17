import { useState } from 'react';
import axios from 'axios';
import { formatMoney } from '../../utils/money';
import { DeliveryOptions } from './DeliveryOptions';

export const CartItemsDetails = ({ cartItem, deliveryOptions, loadCart }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [quantity, setQuantity] = useState(cartItem.quantity);

  const deleteCartItem = async () => {
    await axios.delete(`/api/cart-items/${cartItem.productId}`);
    await loadCart();
  };

  // The Update Method
  const updateCartItem = async () => {
    await axios.put(`/api/cart-items/${cartItem.productId}`, {
      quantity: quantity,
    });
    setIsEditing(false);
    await loadCart();
  };

  return (
    <div className='cart-item-details-grid'>
      <img
        className='product-image'
        src={cartItem.product.image}
        alt={cartItem.product.name}
      />

      <div className='cart-item-details'>
        <div className='product-name'>{cartItem.product.name}</div>
        <div className='product-price'>
          {formatMoney(cartItem.product.priceCents)}
        </div>

        <div className='product-quantity'>
          <span>
            Quantity:{' '}
            {isEditing ? (
              <input
                type='number'
                min='1'
                max='99'
                value={quantity}
                onChange={(event) => setQuantity(Number(event.target.value))}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') updateCartItem();
                  if (event.key === 'Escape') setIsEditing(false);
                }}
                className='quantity-input'
              />
            ) : (
              <span className='quantity-label'>{cartItem.quantity}</span>
            )}
          </span>
          {isEditing ? (
            <>
              <span
                className='save-quantity-link link-primary'
                onClick={updateCartItem}
              >
                Save
              </span>
              <span
                className='link-primary'
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </span>
            </>
          ) : (
            <span
              className='update-quantity-link link-primary'
              onClick={() => setIsEditing(true)}
            >
              Update
            </span>
          )}
          <span
            className='delete-quantity-link link-primary'
            onClick={deleteCartItem}
          >
            Delete
          </span>
        </div>
      </div>

      <DeliveryOptions
        cartItem={cartItem}
        deliveryOptions={deliveryOptions}
        loadCart={loadCart}
      />
    </div>
  );
};
