import { useSelector } from 'react-redux';
import { selectCartTotalQuantity } from '../../store/cartSlice';

export const CheckoutHeader = () => {
  const totalQuantity = useSelector(selectCartTotalQuantity);

  return (
    <div className='checkout-header'>
      <div className='header-content'>
        <div className='checkout-header-left-section'>
          <a href='/'>
            <img className='logo' src='images/logo.png' />
            <img className='mobile-logo' src='images/mobile-logo.png' />
          </a>
        </div>

        <div className='checkout-header-middle-section'>
          Checkout (
          <a className='return-to-home-link' href='/'>
            {totalQuantity}
          </a>
          )
        </div>

        <div className='checkout-header-right-section'>
          <img src='images/icons/checkout-lock-icon.png' />
        </div>
      </div>
    </div>
  );
};
