import { useEffect, useState } from 'react';
import axios from 'axios';
import './checkout-header.css';
import './CheckoutPage.css';
import { CheckoutHeader } from './CheckoutHeader';
import { OrderSummary } from './OrderSummary';
import { PaymentSummary } from './PaymentSummary';
import { useSelector } from 'react-redux';
import { selectCartItems } from '../../store/cartSlice';

export const CheckoutPage = () => {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);

  const cartItems = useSelector(selectCartItems);

  useEffect(() => {
    const deliveryOptionsData = async () => {
      const response = await axios.get(
        '/api/delivery-options?expand=estimatedDeliveryTime',
      );
      setDeliveryOptions(response.data);
    };

    deliveryOptionsData();
  }, []);

  useEffect(() => {
    const paymentSummaryData = async () => {
      const response = await axios.get('/api/payment-summary');
      setPaymentSummary(response.data);
    };

    paymentSummaryData();
  }, [cartItems]);

  return (
    <>
      <title>Checkout</title>

      <CheckoutHeader />

      <div className='checkout-page'>
        <div className='page-title'>Review your order</div>

        <div className='checkout-grid'>
          <OrderSummary deliveryOptions={deliveryOptions} />
          <PaymentSummary paymentSummary={paymentSummary} />
        </div>
      </div>
    </>
  );
};
