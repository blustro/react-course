import { Link, useParams } from 'react-router';
import { Header } from '../components/Header';
import './TrackingPage.css';
import { useEffect } from 'react';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchTrackingData,
  clearTrackingData,
  selectDeliveryDetails,
} from '../store/trackingSlice';

export const TrackingPage = () => {
  const { orderId, productId } = useParams();
  const dispatch = useDispatch();

  const status = useSelector((state) => state.tracking.status);
  const error = useSelector((state) => state.tracking.error);
  const details = useSelector((state) =>
    selectDeliveryDetails(state, productId),
  );

  useEffect(() => {
    dispatch(fetchTrackingData(orderId));
    return () => dispatch(clearTrackingData());
  }, [dispatch, orderId]);

  if (status === 'failed') return <div className='error'>{error}</div>;
  if (status === 'loading' || !details)
    return <div className='loading'>Loading...</div>;

  return (
    <>
      <title>Tracking Orders</title>

      <Header />

      <div className='tracking-page'>
        <div className='order-tracking'>
          <Link className='back-to-orders-link link-primary' to='/orders'>
            View all orders
          </Link>

          <div className='delivery-date'>
            {details.arrivalText}
            {dayjs(details.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
          </div>

          <div className='product-info'>{details.name}</div>

          <div className='product-info'>Quantity: {details.quantity}</div>

          <img className='product-image' src={details.product.image} />

          <div className='progress-labels-container'>
            <div
              className={`progress-label ${details.isPreparing && 'current-status'}`}
            >
              Preparing
            </div>
            <div
              className={`progress-label ${details.isShipped && 'current-status'}`}
            >
              Shipped
            </div>
            <div
              className={`progress-label ${details.isDelivered && 'current-status'}`}
            >
              Delivered
            </div>
          </div>

          <div className='progress-bar-container'>
            <div
              className='progress-bar'
              style={{ width: `${details.deliveryPercent}%` }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
};
