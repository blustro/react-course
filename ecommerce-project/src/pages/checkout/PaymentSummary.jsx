import axios from 'axios';
import { formatMoney } from '../../utils/money';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, selectCartItems } from '../../store/cartSlice';
import { useEffect, useState } from 'react';

export const PaymentSummary = () => {
  const paymentSummary = useSelector((state) => state.cart.summary);
  const cartItems = useSelector((state) => state.cart.items);

  if (!paymentSummary || cartItems.length === 0) {
    return <div className='payment-summary'>Your cart is empty.</div>;
  }

  return (
    <div className='payment-summary'>
      <div className='payment-summary-title'>Payment Summary</div>
      {paymentSummary && (
        <>
          <div className='payment-summary-row'>
            <div>Items ({paymentSummary.totalItems}):</div>
            <div className='payment-summary-money'>
              {formatMoney(paymentSummary.productCostCents)}
            </div>
          </div>

          <div className='payment-summary-row'>
            <div>Shipping &amp; handling:</div>
            <div className='payment-summary-money'>
              {formatMoney(paymentSummary.shippingCostCents)}
            </div>
          </div>

          <div className='payment-summary-row subtotal-row'>
            <div>Total before tax:</div>
            <div className='payment-summary-money'>
              {formatMoney(paymentSummary.totalCostBeforeTaxCents)}
            </div>
          </div>

          <div className='payment-summary-row'>
            <div>Estimated tax (10%):</div>
            <div className='payment-summary-money'>
              {formatMoney(paymentSummary.taxCents)}
            </div>
          </div>

          <div className='payment-summary-row total-row'>
            <div>Order total:</div>
            <div className='payment-summary-money'>
              {formatMoney(paymentSummary.totalCostCents)}
            </div>
          </div>

          <button
            className='place-order-button button-primary'
            // onClick={createOrder}
          >
            Place your order
          </button>
        </>
      )}
    </div>
  );
};
