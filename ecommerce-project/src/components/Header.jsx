import { Link, useNavigate, useSearchParams } from 'react-router';
import './header.css';
import { useState } from 'react';

export const Header = ({ cart }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const searchText = searchParams.get('search');

  const [search, setSearch] = useState(searchText || '');

  const updateSearchInput = (event) => {
    setSearch(event.target.value);
  };

  const searchProducts = () => {
    navigate(`/?search=${search}`);
  };

  let totalQuantity = 0;

  cart.forEach((cartItem) => {
    totalQuantity += cartItem.quantity;
  });
  return (
    <>
      <title>Tracking Orders</title>

      <div className='header'>
        <div className='left-section'>
          <Link to='/' className='header-link'>
            <img className='logo' src='images/logo-white.png' />
            <img className='mobile-logo' src='images/mobile-logo-white.png' />
          </Link>
        </div>

        <div className='middle-section'>
          <form
            className='search-form'
            onSubmit={(event) => {
              event.preventDefault();
              searchProducts();
            }}
          >
            <input
              className='search-bar'
              type='text'
              placeholder='Search'
              value={search}
              onChange={updateSearchInput}
            />

            <button className='search-button' type='submit'>
              <img
                className='search-icon'
                src='images/icons/search-icon.png'
                alt='search'
              />
            </button>
          </form>
        </div>

        <div className='right-section'>
          <Link className='orders-link header-link' to='/orders'>
            <span className='orders-text'>Orders</span>
          </Link>

          <Link className='cart-link header-link' to='/checkout'>
            <img className='cart-icon' src='images/icons/cart-icon.png' />
            <div className='cart-quantity'>{totalQuantity}</div>
            <div className='cart-text'>Cart</div>
          </Link>
        </div>
      </div>
    </>
  );
};
