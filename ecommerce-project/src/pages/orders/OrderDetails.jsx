import { useState } from 'react';
import dayjs from 'dayjs';
import { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/cartSlice';
import { Link } from 'react-router';

export const OrderDetails = ({ order }) => {
  const dispatch = useDispatch();
  const [addedItems, setAddedItems] = useState({});

  const handleBuyAgain = async (productId) => {
    try {
      setAddedItems((prev) => ({ ...prev, [productId]: true }));
      await dispatch(addToCart({ productId, quantity: 1 })).unwrap();

      setTimeout(() => {
        setAddedItems((prev) => ({ ...prev, [productId]: false }));
      }, 2000);
    } catch (error) {
      setAddedItems((prev) => ({ ...prev, [productId]: false }));
      alert('Could not add to cart.');
      console.error(error);
    }
  };

  return (
    <div className='p-10 px-6.25 border border-[rgb(222,222,222)] border-top-0 rounded-b-[5px] grid grid-cols-[110px_1fr_220px] gap-x-8.75 gap-y-15 items-center max-[800px]:grid-cols-[110px_1fr] max-[800px]:gap-y-0 max-[800px]:pb-2 max-[450px]:grid-cols-1'>
      {order.products.map((orderProduct) => {
        const isAdded = addedItems[orderProduct.product.id];

        return (
          <Fragment key={orderProduct.product.id}>
            {/* Image Section */}
            <div className='text-center max-[450px]:mb-6.25'>
              <img
                className='max-w-27.5 max-h-27.5 max-[450px]:max-w-37.5 max-[450px]:max-h-37.5'
                src={orderProduct.product.image}
              />
            </div>

            {/* Info Section */}
            <div className='product-details'>
              <div className='font-bold mb-1.25 max-[450px]:mb-2.5'>
                {orderProduct.product.name}
              </div>
              <div className='mb-0.75'>
                Arriving on:{' '}
                {dayjs(orderProduct.estimatedDeliveryTimeMs).format('MMMM D')}
              </div>
              <div className='mb-2 max-[450px]:mb-3.75'>
                Quantity: {orderProduct.quantity}
              </div>

              <button
                className={`text-sm w-35 h-9 rounded-[5px] flex items-center justify-center button-primary max-[800px]:mb-2.5 max-[450px]:w-full max-[450px]:mb-3.75 ${isAdded ? 'opacity-70' : ''}`}
                onClick={() => handleBuyAgain(orderProduct.product.id)}
                disabled={isAdded}
              >
                <img
                  className='w-5 mr-2.5'
                  src={
                    isAdded
                      ? 'images/icons/checkmark.png'
                      : 'images/icons/buy-again.png'
                  }
                />
                <span>{isAdded ? 'Added!' : 'Add to Cart'}</span>
              </button>
            </div>

            {/* Actions Section */}
            <div className='self-start max-[800px]:col-start-2 max-[800px]:mb-7.5 max-[450px]:col-auto max-[450px]:mb-17.5'>
              <Link to={`/tracking/${order.id}/${orderProduct.product.id}`}>
                <button className='w-full text-sm p-2 button-secondary max-[800px]:w-35 max-[450px]:w-full max-[450px]:p-3'>
                  Track package
                </button>
              </Link>
            </div>
          </Fragment>
        );
      })}
    </div>
  );
};
