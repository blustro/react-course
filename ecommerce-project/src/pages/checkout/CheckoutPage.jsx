import { useEffect } from 'react';
import './checkout-header.css';
import './CheckoutPage.css';
import { CheckoutHeader } from './CheckoutHeader';
import { OrderSummary } from './OrderSummary';
import { PaymentSummary } from './PaymentSummary';
import { useDispatch } from 'react-redux';
import { fetchCart, fetchDeliveryOptions } from '../../store/cartSlice';

export const CheckoutPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCart());
    dispatch(fetchDeliveryOptions());
  }, [dispatch]);

  return (
    <>
      <title>Checkout</title>

      <CheckoutHeader />

      <div className='max-w-[1100px] px-[30px] mt-[140px] mb-[100px] mx-auto'>
        <div className='font-bold text-[22px] mb-[18px]'>Review your order</div>

        <div className='grid grid-cols-[1fr_350px] gap-x-3 items-start max-[1000px]:grid-cols-1'>
          <OrderSummary />
          <PaymentSummary />
        </div>
      </div>
    </>
  );
};
