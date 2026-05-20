import { updateCartItem } from '@/store/cartSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function DeliveryOptions({ cartItem }) {
  const dispatch = useDispatch();
  const deliveryOptions = useSelector((state) => state.cart.deliveryOptions);

  const handleDeliveryChange = (optionId) => {
    dispatch(
      updateCartItem({
        productId: cartItem.productId,
        updates: { deliveryOptionId: optionId },
      }),
    );
  };

  return (
    <section className='flex flex-col gap-2'>
      <p className='font-bold text-sm mb-1'>Choose a delivery option:</p>
      {deliveryOptions.map((option) => {
        const isChecked = option.id === (cartItem.deliveryOptionId || '1');

        return (
          <label
            key={option.id}
            className='flex items-center gap-3 cursor-pointer group'
          >
            <input
              type='radio'
              name={`delivery-${cartItem.productId}`}
              className='w-4 h-4 accent-orange-500'
              checked={isChecked}
              onChange={() => handleDeliveryChange(option.id)}
            />
            <div className='text-sm'>
              <div className='font-semibold text-green-700'>
                {option.deliveryDays} days delivery
              </div>
              <div className='text-gray-500'>
                {option.priceCents === 0
                  ? 'FREE Shipping'
                  : `$${(option.priceCents / 100).toFixed(2)} - Shipping`}
              </div>
            </div>
          </label>
        );
      })}
    </section>
  );
}
