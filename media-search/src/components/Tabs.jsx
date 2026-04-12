import { useDispatch, useSelector } from 'react-redux';
import { setActiveTabs } from '../redux/features/searchSlice';

export const Tabs = () => {
  const tabs = ['photos', 'videos'];
  const dispatch = useDispatch();
  const activeTab = useSelector((state) => state.search.activeTab);

  return (
    <div className='flex gap-5 p-10'>
      {tabs.map((elem, index) => {
        return (
          <button
            className={`${activeTab === elem ? 'bg-blue-700' : 'bg-gray-500'}  cursor-pointer transition active:scale-95 px-5 py-2 rounded uppercase`}
            key={index}
            onClick={() => {
              dispatch(setActiveTabs(elem));
            }}
          >
            {elem}
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;
