import dayjs from 'dayjs';

export const DeliveryDate = ({ selectedDeliveryOption }) => {
  return (
    <div className='text-[rgb(25,135,84)] font-bold text-[19px] mt-[5px] mb-[22px]'>
      Delivery date:{' '}
      {dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format(
        'dddd, MMMM, D',
      )}
    </div>
  );
};
