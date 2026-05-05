import { Product } from './Product';

export const ProductsGrid = ({ products }) => {
  return (
    <div className='products-grid'>
      {products.map((product) => {
        return <Product key={product.id} product={product} />;
      })}
    </div>
  );
};
