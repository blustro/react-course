import dayjs from 'dayjs';
import { formatMoney } from '../../utils/money';
import { useDispatch, useSelector } from 'react-redux';
import { updateLocalDelivery, updateCartItem } from '../../store/cartSlice';

export const DeliveryOptions = ({ cartItem }) => {
  const dispatch = useDispatch();
  const deliveryOptions = useSelector((state) => state.cart.deliveryOptions);

  if (!deliveryOptions || deliveryOptions.length === 0) return null;

  return (
    <div className='delivery-options'>
      <div className='delivery-options-title'>Choose a delivery option:</div>
      {deliveryOptions.map((deliveryOption) => {
        let priceString = 'FREE Shipping';

        if (deliveryOption.priceCents > 0)
          priceString = `${formatMoney(deliveryOption.priceCents)} - Shipping`;

        const handleOptionChange = () => {
          dispatch(
            updateLocalDelivery({
              productId: cartItem.productId,
              deliveryOptionId: deliveryOption.id,
            }),
          );

          dispatch(
            updateCartItem({
              productId: cartItem.productId,
              updates: { deliveryOptionId: deliveryOption.id },
            }),
          );
        };

        return (
          <div
            key={deliveryOption.id}
            className='delivery-option'
            onClick={handleOptionChange}
          >
            <input
              type='radio'
              checked={deliveryOption.id === cartItem.deliveryOptionId}
              onChange={() => {}}
              className='delivery-option-input'
              name={`delivery-option-1-${cartItem.productId}`}
            />
            <div>
              <div className='delivery-option-date'>
                {dayjs(deliveryOption.estimatedDeliveryTimeMs).format(
                  'dddd, MMMM, D',
                )}
              </div>
              <div className='delivery-option-price'>{priceString}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
