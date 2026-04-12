import { SearchBar } from '../components/SearchBar';
import { Tabs } from '../components/Tabs';
import { ResultGrid } from '../components/ResultGrid';

export const HomePage = () => {
  return (
    <div>
      <SearchBar />
      <Tabs />
      <ResultGrid />
    </div>
  );
};

export default HomePage;
