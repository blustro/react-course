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

      <div className='max-w-212.5 mt-22.5 mb-25 px-7.5 mx-auto'>
        <div className='order-tracking'>
          <Link className='inline-block mb-7.5 link-primary' to='/orders'>
            View all orders
          </Link>

          <div className='text-[25px] font-bold mb-2.5'>
            {details.arrivalText}{' '}
            {dayjs(details.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
          </div>

          <div className='mb-0.75'>{details.name}</div>

          <div className='mb-0.75'>Quantity: {details.quantity}</div>

          <img
            className='max-w-37.5 max-h-37.5 mt-6.25 mb-12.5'
            src={details.product.image}
            alt={details.name}
          />

          {/* Progress Labels Container */}
          <div className='flex justify-between text-[20px] font-medium mb-3.75 max-[575px]:text-[16px] max-[450px]:flex-col max-[450px]:mb-1.25'>
            <div
              className={`max-[450px]:mb-0.75 ${details.isPreparing ? 'text-[rgb(25,135,84)]' : ''}`}
            >
              Preparing
            </div>
            <div
              className={`max-[450px]:mb-0.75 ${details.isShipped ? 'text-[rgb(25,135,84)]' : ''}`}
            >
              Shipped
            </div>
            <div
              className={`max-[450px]:mb-0.75 ${details.isDelivered ? 'text-[rgb(25,135,84)]' : ''}`}
            >
              Delivered
            </div>
          </div>

          {/* Progress Bar Container */}
          <div className='h-6.25 w-full border border-[rgb(200,200,200)] rounded-[50px] overflow-hidden'>
            <div
              className='h-full bg-[rgb(25,135,84)] rounded-[50px] transition-all duration-500'
              style={{ width: `${details.deliveryPercent}%` }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
};
