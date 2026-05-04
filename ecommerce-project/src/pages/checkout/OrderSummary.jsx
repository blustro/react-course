import { useSelector } from 'react-redux';
import { CartItemsDetails } from './CartItemDetails';
import { DeliveryDate } from './DeliveryDate';
import { selectCartItems } from '../../store/cartSlice';

export const OrderSummary = ({ deliveryOptions }) => {
  const cartItems = useSelector(selectCartItems);

  return (
    <div className='order-summary'>
      {deliveryOptions.length > 0 &&
        cartItems.map((cartItem) => {
          const selectedDeliveryOption = deliveryOptions.find(
            (deliveryOption) => {
              return deliveryOption.id === cartItem.deliveryOptionId;
            },
          );
          return (
            <div key={cartItem.id} className='cart-item-container'>
              <DeliveryDate selectedDeliveryOption={selectedDeliveryOption} />

              <CartItemsDetails
                cartItem={cartItem}
                deliveryOptions={deliveryOptions}
              />
            </div>
          );
        })}
    </div>
  );
};
