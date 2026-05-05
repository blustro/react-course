import { useSelector } from 'react-redux';
import { CartItemsDetails } from './CartItemDetails';
import { DeliveryDate } from './DeliveryDate';
import { selectCartItems } from '../../store/cartSlice';

export const OrderSummary = () => {
  const cartItems = useSelector(selectCartItems);
  const deliveryOptions = useSelector((state) => state.cart.deliveryOptions);

  return (
    <div className='order-summary'>
      {deliveryOptions.length > 0 &&
        cartItems.map((cartItem) => {
          const selectedDeliveryOption = deliveryOptions.find(
            (deliveryOption) => deliveryOption.id === cartItem.deliveryOptionId,
          );

          return (
            /* .cart-item-container */
            <div
              key={cartItem.id}
              className='border border-[rgb(222,222,222)] rounded-sm p-4.5 mb-3'
            >
              <DeliveryDate selectedDeliveryOption={selectedDeliveryOption} />

              <CartItemsDetails cartItem={cartItem} />
            </div>
          );
        })}
    </div>
  );
};
