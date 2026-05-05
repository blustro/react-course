import './App.css';

import { HomePage } from './pages/home/HomePage';

import { Routes, Route } from 'react-router';
import { CheckoutPage } from './pages/checkout/CheckoutPage';
import { OrdersPage } from './pages/orders/OrdersPage';
import { TrackingPage } from './pages/TrackingPage';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCart } from './store/cartSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path='checkout' element={<CheckoutPage />} />
      <Route path='orders' element={<OrdersPage />} />
      <Route path='tracking/:orderId/:productId' element={<TrackingPage />} />
    </Routes>
  );
}

export default App;
