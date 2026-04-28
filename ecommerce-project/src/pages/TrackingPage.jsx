import { Link, useParams } from 'react-router';
import { Header } from '../components/Header';
import './TrackingPage.css';
import { useEffect } from 'react';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrackingData, clearTrackingData } from '../store/trackingSlice';

export const TrackingPage = () => {
  const { orderId, productId } = useParams();
  const dispatch = useDispatch();

  const order = useSelector((state) => state.tracking.order);
  const status = useSelector((state) => state.tracking.status);
  const cart = useSelector((state) => state.cart.items);
  const error = useSelector((state) => state.tracking.error);

  useEffect(() => {
    dispatch(fetchTrackingData(orderId));
    return () => dispatch(clearTrackingData());
  }, [dispatch, orderId]);

  if (status === 'failed') {
    return (
      <div className='error-container'>
        <h2>Oops!</h2>
        <p>{error}</p>
        <button onClick={() => dispatch(fetchTrackingData(orderId))}>
          Try Again
        </button>
      </div>
    );
  }

  if (status === 'loading' || !order)
    return <div>Loading tracking info...</div>;

  const orderProduct = order.products.find(
    (orderProduct) => orderProduct.productId === productId,
  );

  const totalDeliveryTimeMs =
    orderProduct.estimatedDeliveryTimeMs - order.orderTimeMs;
  const timePassedMs = dayjs().valueOf() - order.orderTimeMs;

  let deliveryPercent = (timePassedMs / totalDeliveryTimeMs) * 100;
  if (deliveryPercent > 100) deliveryPercent = 100;

  const isPreparing = deliveryPercent < 33;
  const isShipped = deliveryPercent >= 33 && deliveryPercent < 100;
  const isDelivered = deliveryPercent === 100;

  return (
    <>
      <title>Tracking Orders</title>

      <Header cart={cart} />

      <div className='tracking-page'>
        <div className='order-tracking'>
          <Link className='back-to-orders-link link-primary' to='/orders'>
            View all orders
          </Link>

          <div className='delivery-date'>
            {deliveryPercent >= 100 ? 'Delivered on ' : 'Arriving on '}
            {dayjs(orderProduct.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
          </div>

          <div className='product-info'>{orderProduct.name}</div>

          <div className='product-info'>Quantity: {orderProduct.quantity}</div>

          <img className='product-image' src={orderProduct.product.image} />

          <div className='progress-labels-container'>
            <div
              className={`progress-label ${isPreparing && 'current-status'}`}
            >
              Preparing
            </div>
            <div className={`progress-label ${isShipped && 'current-status'}`}>
              Shipped
            </div>
            <div
              className={`progress-label ${isDelivered && 'current-status'}`}
            >
              Delivered
            </div>
          </div>

          <div className='progress-bar-container'>
            <div
              className='progress-bar'
              style={{ width: `${deliveryPercent}%` }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
};
