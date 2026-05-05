import dayjs from 'dayjs';
import { formatMoney } from '../../utils/money';

export const OrderHeader = ({ order }) => {
  return (
    <div className='bg-white border border-[rgb(222,222,222)] flex items-center justify-between p-5 px-6.25 rounded-t-[5px] max-[575px]:flex-col max-[575px]:items-start max-[575px]:leading-5.75 max-[575px]:p-3.75'>
      <div className='flex shrink-0 max-[575px]:flex-col'>
        <div className='mr-11.25 max-[575px]:grid max-[575px]:grid-cols-[auto_1fr] max-[575px]:mr-0'>
          <div className='font-bold max-[575px]:mr-1.25'>Order Placed:</div>
          <div>{dayjs(order.orderTimeMs).format('MMMM D')}</div>
        </div>
        <div className='mr-11.25 max-[575px]:grid max-[575px]:grid-cols-[auto_1fr] max-[575px]:mr-0'>
          <div className='font-bold max-[575px]:mr-1.25'>Total:</div>
          <div>{formatMoney(order.totalCostCents)}</div>
        </div>
      </div>

      <div className='shrink max-[575px]:grid max-[575px]:grid-cols-[auto_1fr]'>
        <div className='font-bold max-[575px]:mr-1.25'>Order ID:</div>
        <div>{order.id}</div>
      </div>
    </div>
  );
};
