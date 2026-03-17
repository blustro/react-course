import { useState } from 'react';
import dayjs from 'dayjs';
import axios from 'axios';
import { Fragment } from 'react';

export const OrderDetails = ({ order, loadCart }) => {
  const [addedItems, setAddedItems] = useState({});

  const handleBuyAgain = async (productId) => {
    await axios.post('/api/cart-items', {
      productId: productId,
      quantity: 1,
    });

    await loadCart();

    setAddedItems((prev) => ({ ...prev, [productId]: true }));
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [productId]: false }));
    }, 2000);
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
