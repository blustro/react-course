import dayjs from 'dayjs';
import { formatMoney } from '../../utils/money';
import { useDispatch, useSelector } from 'react-redux';
import { updateLocalDelivery, updateCartItem } from '../../store/cartSlice';

export const DeliveryOptions = ({ cartItem }) => {
  const dispatch = useDispatch();
  const deliveryOptions = useSelector((state) => state.cart.deliveryOptions);

  if (!deliveryOptions || deliveryOptions.length === 0) return null;

  return (
    <div className='max-[1000px]:col-span-2 max-[450px]:col-span-1'>
      <div className='font-bold mb-2.5'>Choose a delivery option:</div>
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
            className='grid grid-cols-[24px_1fr] mb-3 cursor-pointer'
            onClick={handleOptionChange}
          >
            <input
              type='radio'
              checked={deliveryOption.id === cartItem.deliveryOptionId}
              // onChange is handled by the parent div's onClick for a larger tap target
              onChange={() => {}}
              className='mt-[3px] mr-[5px] cursor-pointer'
              name={`delivery-option-${cartItem.productId}`}
            />
            <div>
              <div className='font-medium mb-[3px]'>
                {dayjs(deliveryOption.estimatedDeliveryTimeMs).format(
                  'dddd, MMMM D',
                )}
              </div>
              <div className='text-[rgb(120,120,120)] text-[15px]'>
                {priceString}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
