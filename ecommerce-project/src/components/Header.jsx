import { Link, useNavigate, useSearchParams } from 'react-router';
import './header.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartTotalQuantity } from '../store/cartSlice';
import { setSearchQuery } from '../store/productSlice';

export const Header = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  const totalQuantity = useSelector(selectCartTotalQuantity);

  const searchText = searchParams.get('search');
  const [search, setSearch] = useState(searchText || '');
  const updateSearchInput = (event) => {
    setSearch(event.target.value);
  };

  const searchProducts = () => {
    navigate(`/?search=${search}`);
    dispatch(setSearchQuery(search));
  };

  return (
    <>
      <div className='bg-[rgb(8,79,45)] text-white px-3.75 flex items-center justify-between fixed top-0 left-0 right-0 h-15 z-50'>
        <div className='w-52 max-[800px]:w-auto'>
          <Link
            to='/'
            className='inline-block py-1.5 px-[9.5px] rounded-xs cursor-pointer no-underline border border-transparent hover:border-white transition-colors'
          >
            <img
              className='h-6.5 mt-px block max-[675px]:hidden'
              src='images/logo-white.png'
            />
            <img
              className='h-6.5 mt-px hidden max-[675px]:block'
              src='images/mobile-logo-white.png'
            />
          </Link>
        </div>

        <div className='flex-1 max-w-212.5 mx-2.5 bg-white rounded-[5px]'>
          <form
            className='flex'
            onSubmit={(event) => {
              event.preventDefault();
              searchProducts();
            }}
          >
            <input
              className='flex-1 w-0 text-[16px] h-9.5 pl-3.75 border-none rounded-l-[5px] rounded-r-none text-black'
              type='text'
              placeholder='Search'
              value={search}
              onChange={updateSearchInput}
            />

            <button
              className='bg-[rgb(186,255,190)] border-none w-11.25 h-10 rounded-[5px] shrink-0 flex items-center justify-center'
              type='submit'
            >
              <img
                className='h-5'
                src='images/icons/search-icon.png'
                alt='search'
              />
            </button>
          </form>
        </div>

        <div className='w-45 shrink-0 flex justify-end'>
          <Link
            className='flex items-center px-3.25 text-white no-underline border border-transparent hover:border-white rounded-xs'
            to='/orders'
          >
            <span className='block text-[15px] font-bold'>Orders</span>
          </Link>

          <Link className='relative flex items-center ...' to='/checkout'>
            <img
              className='w-9.5'
              src='images/icons/cart-icon.png'
              alt='cart'
            />

            <div className='absolute top-0.5 right-1/2 w-6.5 text-center text-[rgb(8,79,45)] text-[14px] font-bold'>
              {totalQuantity}
            </div>

            <div className='ml-1.25 text-[15px] font-bold'>Cart</div>
          </Link>
        </div>
      </div>
      <div className='h-15'></div>
    </>
  );
};
