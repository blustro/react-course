import axiosInstance from '@/utils/axios';
import ProductList from '@/components/ProductList';

async function getProducts() {
  const res = await axiosInstance.get('/products');
  return res.data;
}

export default async function HomePage() {
  const initialProducts = await getProducts();

  return (
    <main className='p-4'>
      <h1 className='sr-only'>Modern E-Commerce Store - Browse Our Products</h1>
      <ProductList initialData={initialProducts} />
    </main>
  );
}
