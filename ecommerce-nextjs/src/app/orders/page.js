import Link from 'next/link';

export default function OrdersPage() {
  return (
    <div className='text-center p-10'>
      <h1 className='text-2xl font-bold mb-4'>Thank you for your order!</h1>
      <p className='mb-6'>Your order has been placed successfully.</p>
      <Link href='/' className='text-blue-600 underline'>
        Continue Shopping!
      </Link>
    </div>
  );
}
