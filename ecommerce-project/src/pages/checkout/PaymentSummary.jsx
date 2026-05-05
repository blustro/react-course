import { formatMoney } from '../../utils/money';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { placeOrder } from '../../store/cartSlice';

export const PaymentSummary = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const paymentSummary = useSelector((state) => state.cart.summary);
  const cartItems = useSelector((state) => state.cart.items);
  const orderStatus = useSelector((state) => state.cart.status);

  const handlePlaceOrder = async () => {
    try {
      await dispatch(placeOrder(cartItems)).unwrap();
      navigate('/orders');
    } catch (error) {
      alert('Failed to place order. Please try again');
      console.error(error);
    }
  };

  if (!paymentSummary || cartItems.length === 0) {
    return <div className='payment-summary'>Your cart is empty.</div>;
  }

  return (
    <div className='border border-[rgb(222,222,222)] rounded p-4.5 pb-1.25 max-[1000px]:row-start-1 max-[1000px]:mb-3'>
      <div className='font-bold text-[18px] mb-3'>Payment Summary</div>
      {paymentSummary && (
        <>
          <div className='grid grid-cols-[1fr_auto] text-[15px] mb-2.25'>
            <div>Items ({paymentSummary.totalItems}):</div>
            <div className='text-right'>
              {formatMoney(paymentSummary.productCostCents)}
            </div>
          </div>

          <div className='grid grid-cols-[1fr_auto] text-[15px] mb-2.25'>
            <div>Shipping &amp; handling:</div>
            <div className='text-right'>
              {formatMoney(paymentSummary.shippingCostCents)}
            </div>
          </div>

          <div className='grid grid-cols-[1fr_auto] text-[15px] mb-2.25 pt-2.25 border-t border-[rgb(222,222,222)]'>
            <div>Total before tax:</div>
            <div className='text-right'>
              {formatMoney(paymentSummary.totalCostBeforeTaxCents)}
            </div>
          </div>

          <div className='grid grid-cols-[1fr_auto] text-[15px] mb-2.25'>
            <div>Estimated tax (10%):</div>
            <div className='text-right'>
              {formatMoney(paymentSummary.taxCents)}
            </div>
          </div>

          <div className='grid grid-cols-[1fr_auto] text-[18px] font-bold text-[rgb(25,135,84)] pt-4.5 border-t border-[rgb(222,222,222)]'>
            <div>Order total:</div>
            <div className='text-right'>
              {formatMoney(paymentSummary.totalCostCents)}
            </div>
          </div>

          <button
            className='w-full py-3 rounded-[5px] mt-5 mb-4.75 button-primary disabled:opacity-50'
            onClick={handlePlaceOrder}
            disabled={orderStatus === 'loading'}
          >
            {orderStatus === 'loading'
              ? 'Placing order...'
              : 'Place your order'}
          </button>
        </>
      )}
    </div>
  );
};
