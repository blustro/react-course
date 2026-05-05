import { useSelector } from 'react-redux';
import { selectCartTotalQuantity } from '../../store/cartSlice';

export const CheckoutHeader = () => {
  const totalQuantity = useSelector(selectCartTotalQuantity);

  return (
    <div className='h-15 px-7.5 bg-white flex justify-center fixed top-0 left-0 right-0 z-1000'>
      <div className='w-full max-w-275 flex items-center'>
        {/* Left Section - Logo */}
        <div className='w-50 max-[575px]:w-auto'>
          <a href='/'>
            <img
              className='h-6.5 mt-0 block max-[575px]:hidden'
              src='images/logo.png'
            />
            <img
              className='h-6.5 hidden max-[575px]:inline-block'
              src='images/mobile-logo.png'
            />
          </a>
        </div>

        {/* Middle Section - Title */}
        <div className='flex-1 shrink-0 text-center text-[22px] font-medium flex justify-center max-[1000px]:text-[20px] max-[1000px]:mr-15 max-[575px]:mr-1.25'>
          Checkout (
          <a
            className='text-[rgb(25,135,84)] no-underline cursor-pointer max-[1000px]:text-[20px]'
            href='/'
          >
            {totalQuantity} items
          </a>
          )
        </div>

        {/* Right Section - Lock Icon */}
        <div className='text-right w-50 flex items-center justify-end max-[1000px]:w-auto'>
          <img className='h-8' src='images/icons/checkout-lock-icon.png' />
        </div>
      </div>
    </div>
  );
};
