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

      <div className='checkout-page'>
        <div className='page-title'>Review your order</div>

        <div className='checkout-grid'>
          <OrderSummary />
          <PaymentSummary />
        </div>
      </div>
    </>
  );
};
