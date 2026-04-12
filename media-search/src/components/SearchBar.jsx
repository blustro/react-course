import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setQuery } from '../redux/features/searchSlice';

export const SearchBar = () => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(setQuery(text));
    setText('');
  };

  return (
    <div>
      <form
        className='flex bg-gray-900 gap-5 p-10'
        onSubmit={(e) => {
          submitHandler(e);
        }}
      >
        <input
          required
          className='w-full border-2 px-4 py-2 text-xl rounded outline-none'
          type='text'
          placeholder='Search anything...'
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <button className='active: scale-95 cursor-pointer border-2 px-6 py-3 text-xl'>
          Search
        </button>
      </form>
    </div>
  );
};
