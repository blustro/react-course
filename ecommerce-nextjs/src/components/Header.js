'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartTotalQuantity } from '../store/cartSlice';
import { setSearchQuery, setSelectedCategory } from '../store/productSlice';
import CategoryDrawer from './CategoryDrawer';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';

export const Header = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const pathname = usePathname();

  const isHomePage = pathname === '/';

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const totalQuantity = useSelector(selectCartTotalQuantity);

  const searchText = searchParams.get('search');
  const [search, setSearch] = useState(searchText || '');

  const updateSearchInput = (event) => {
    setSearch(event.target.value);
  };

  const searchProducts = () => {
    router.push(`/?search=${search}`);
    dispatch(setSearchQuery(search));
    dispatch(setSelectedCategory('All'));
  };

  return (
    <header>
      <div className='bg-[rgb(8,79,45)] text-white px-3.75 flex items-center justify-between fixed top-0 left-0 right-0 h-15 z-50'>
        {/* Left Section: Logo */}
        <div className='flex items-center w-52 max-[800px]:w-auto'>
          <Link
            href='/'
            className='inline-block py-1.5 px-[9.5px] rounded-xs cursor-pointer no-underline border border-transparent hover:border-white transition-colors'
          >
            <Image
              className='h-6.5 mt-px block max-[675px]:hidden'
              src='/images/logo-white.png'
              alt='logo'
              width={409}
              height={60}
              priority
              loading='eager'
            />
            <Image
              className='h-6.5 mt-px hidden max-[675px]:block'
              src='/images/mobile-logo-white.png'
              alt='logo-mobile'
              width={52}
              height={60}
            />
          </Link>
        </div>

        {/* Center Section: Search Bar */}
        <nav className='flex-1 max-w-212.5 mx-2.5 bg-white rounded-[5px]'>
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
              <Image
                className='h-5'
                src='/images/icons/search-icon.png'
                alt='search'
                width={20}
                height={20}
              />
            </button>
          </form>
        </nav>

        {/* Right Section: Orders & Cart */}
        <div className='w-55 shrink-0 flex justify-end gap-4'>
          <Link
            className='flex items-center px-3.25 text-white no-underline border border-transparent hover:border-white rounded-xs'
            href='/orders'
          >
            <span className='block text-[15px] font-bold'>Orders</span>
          </Link>

          <Link className='relative flex items-center ...' href='/checkout'>
            <Image
              className='w-9.5 h-9.5'
              src='/images/icons/cart-icon.png'
              alt='cart'
              width={38}
              height={38}
              aria-label='cart'
            />

            <div className='absolute top-0.5 right-1/2 w-6.5 text-center text-[rgb(8,79,45)] text-[14px] font-bold'>
              {totalQuantity}
            </div>

            <div className='ml-1.25 text-[15px] font-bold'>Cart</div>
          </Link>

          {/* Hamburger Menu Button */}
          {isHomePage && (
            <button
              className='flex flex-col gap-1.5 p-2 rounded-xs border border-transparent hover:border-white transition-colors cursor-pointer'
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
              aria-label='Hamburger Menu'
            >
              <div className='w-6 h-0.5 bg-white'></div>
              <div className='w-6 h-0.5 bg-white'></div>
              <div className='w-6 h-0.5 bg-white'></div>
            </button>
          )}
        </div>
      </div>

      {/* Spacer for fixed header */}
      <div className='h-15'></div>

      <CategoryDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </header>
  );
};
