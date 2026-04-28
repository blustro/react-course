import './App.css';

import { HomePage } from './pages/home/HomePage';

import { Routes, Route } from 'react-router';
import { CheckoutPage } from './pages/checkout/CheckoutPage';
import { OrdersPage } from './pages/orders/OrdersPage';
import { TrackingPage } from './pages/TrackingPage';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { fetchCart } from './store/cartSlice';

function App() {
  const [cart, setCart] = useState([]);

  const loadCart = async () => {
    const response = await axios.get('/api/cart-items?expand=product');
    setCart(response.data);
  };

  useEffect(() => {
    setTimeout(() => loadCart(), 0);
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  return (
    <Routes>
      <Route index element={<HomePage cart={cart} loadCart={loadCart} />} />
      <Route
        path='checkout'
        element={<CheckoutPage cart={cart} loadCart={loadCart} />}
      />
      <Route
        path='orders'
        element={<OrdersPage cart={cart} loadCart={loadCart} />}
      />
      <Route path='tracking/:orderId/:productId' element={<TrackingPage />} />
    </Routes>
  );
}

export default App;
