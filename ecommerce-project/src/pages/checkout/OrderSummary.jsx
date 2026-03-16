import { CartItemsDetailsGrid } from './CartItemDetailsGrid';
import { DeliveryDate } from './DeliveryDate';

export const OrderSummary = ({ cart, deliveryOptions }) => {
  return (
    <div className='order-summary'>
      {deliveryOptions.length > 0 &&
        cart.map((cartItem) => {
          const selectedDeliveryOption = deliveryOptions.find(
            (deliveryOption) => {
              return deliveryOption.id === cartItem.deliveryOptionId;
            },
          );
          return (
            <div key={cartItem.id} className='cart-item-container'>
              <DeliveryDate selectedDeliveryOption={selectedDeliveryOption} />

              <CartItemsDetailsGrid
                cartItem={cartItem}
                deliveryOptions={deliveryOptions}
              />
            </div>
          );
        })}
    </div>
  );
};
