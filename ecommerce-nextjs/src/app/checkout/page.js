import CheckoutClient from '@/components/CheckoutClient';

export default function CheckoutPage() {
  return (
    <div className='max-w-6xl mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-6'>Review your order</h1>
      <CheckoutClient />
    </div>
  );
}
