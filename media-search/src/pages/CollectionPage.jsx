import { useSelector } from 'react-redux';
import CollectionCard from '../components/CollectionCard';

const CollectionPage = () => {
  const collection = useSelector((state) => state.collection.items);

  return (
    <div className='flex justify-start w-full flex-wrap gap-6 overflow-auto px-10'>
      {collection.map((item, index) => {
        return (
          <div key={index}>
            <CollectionCard item={item} />
          </div>
        );
      })}
    </div>
  );
};

export default CollectionPage;
