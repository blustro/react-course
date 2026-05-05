import { Product } from './Product';

export const ProductsGrid = ({ products }) => {
  return (
    <div
      className='grid grid-cols-8 
      max-[2000px]:grid-cols-7 
      max-[1600px]:grid-cols-6 
      max-[1300px]:grid-cols-5 
      max-[1000px]:grid-cols-4 
      max-[800px]:grid-cols-3 
      max-[575px]:grid-cols-2 
      max-[450px]:grid-cols-1'
    >
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
};
