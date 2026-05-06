'use client';

import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery, setSelectedCategory } from '../store/productSlice';
import { CATEGORY_MAP } from '../utils/constants';
import { useRouter } from 'next/navigation';

const CategoryDrawer = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const activeCategory = useSelector(
    (state) => state.products.selectedCategory,
  );

  const handleCategoryClick = (value) => {
    dispatch(setSelectedCategory(value));
    dispatch(setSearchQuery(''));
    router.push('/');
    onClose();
  };

  return (
    <>
      {/* Dark Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity ${isOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className='p-5'>
          <div className='flex justify-between items-center mb-6'>
            <h2 className='text-xl font-bond'>Categories</h2>
            <button className='text-2xl' onClick={onClose}>
              &times;
            </button>
          </div>

          <ul className='space-y-4'>
            {CATEGORY_MAP.map((cat) => (
              <li key={cat.value}>
                <button
                  className={`w-full text-left px-4 py-2 rounded-md transition-colors capitalize ${activeCategory === cat.value ? 'bg-[rgb(8,79,45)] font-bold text-white' : 'hover:bg-[rgba(8,79,45,.5)]'}`}
                  onClick={() => handleCategoryClick(cat.value)}
                >
                  {cat.value}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default CategoryDrawer;
