import { SearchBar } from './components/SearchBar';
import { Tabs } from './components/Tabs';

const App = () => {
  return (
    <div className='h-screen text-white w-full bg-gray-950'>
      <SearchBar />
      <Tabs />
    </div>
  );
};

export default App;
