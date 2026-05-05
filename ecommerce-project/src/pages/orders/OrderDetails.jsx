import { useState } from 'react';
import dayjs from 'dayjs';
import { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/cartSlice';

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
    <div className='order-details-grid'>
      {order.products.map((orderProduct) => {
        const isAdded = addedItems[orderProduct.product.id];

        return (
          <Fragment key={orderProduct.product.id}>
            <div className='product-image-container'>
              <img src={orderProduct.product.image} alt='' />
            </div>

            <div className='product-details'>
              <div className='product-name'>{orderProduct.product.name}</div>
              <div className='product-delivery-date'>
                Arriving on:{' '}
                {dayjs(orderProduct.estimatedDeliveryTimeMs).format('MMMM D')}
              </div>
              <div className='product-quantity'>
                Quantity: {orderProduct.quantity}
              </div>

              <button
                className={`buy-again-button button-primary ${isAdded ? 'added-success' : ''}`}
                onClick={() => handleBuyAgain(orderProduct.product.id)}
                disabled={isAdded}
              >
                <img
                  className='buy-again-icon'
                  src={
                    isAdded
                      ? 'images/icons/checkmark.png'
                      : 'images/icons/buy-again.png'
                  }
                />
                <span className='buy-again-message'>
                  {isAdded ? 'Added!' : 'Add to Cart'}
                </span>
              </button>
            </div>

            <div className='product-actions'>
              <a href={`/tracking/${order.id}/${orderProduct.product.id}`}>
                <button className='track-package-button button-secondary'>
                  Track package
                </button>
              </a>
            </div>
          </Fragment>
        );
      })}
    </div>
  );
};
