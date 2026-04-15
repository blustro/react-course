import { useDispatch } from 'react-redux';
import { addCollection, addedToast } from '../redux/features/collectionSlice';

export const ResultCard = ({ item }) => {
  const dispatch = useDispatch();

  const addToCollection = (item) => {
    dispatch(addCollection(item));
    dispatch(addedToast());
  };

  return (
    <div className='w-[22vw] relative h-80 bg-white rounded'>
      <a target='_blank' className='h-full' href={item.url}>
        {item.type === 'photo' ? (
          <img
            className='h-full w-full object-cover object-center'
            src={item.src}
            alt=''
          />
        ) : (
          ''
        )}
        {item.type === 'video' ? (
          <video
            autoPlay
            loop
            muted
            className='h-full w-full object-cover object-center'
            src={item.src}
          ></video>
        ) : (
          ''
        )}
      </a>
      <div
        id='bottom'
        className='flex justify-between gap-2 items-center w-full py-10 px-6 absolute bottom-0 text-white'
        onClick={() => {
          addToCollection(item);
        }}
      >
        <h2 className='font-semibold capitalize'>{item.title}</h2>
        <button className='bg-indigo-600 active:scale-95 text-white rounded px-3 py-1 cursor-pointer'>
          Save
        </button>
      </div>
    </div>
  );
};
