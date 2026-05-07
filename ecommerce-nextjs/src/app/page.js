import axiosInstance from '@/utils/axios';
import ProductList from '@/components/ProductList';

async function getProducts() {
  const res = await axiosInstance.get('/products');
  return res.data;
}

export default async function HomePage() {
  const initialProducts = await getProducts();

  return (
    <div className='p-4'>
      <ProductList initialData={initialProducts} />
    </div>
  );
}
