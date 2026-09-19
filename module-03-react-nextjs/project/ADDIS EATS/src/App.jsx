import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Updated import path matching your new folder structure
import Layout from './components/layout/Layout';

import Home from './features/home/Home';
import Menu from './features/menu/Menu';
import DishDetail from './features/menu/DishDetail';
import Cart from './features/cart/Cart';
import Checkout from './features/checkout/Checkout';
import NotFound from './features/common/NotFound';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Application Layout Wrapper */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="menu" element={<Menu />} />
          <Route path="menu/:id" element={<DishDetail />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          
          {/* Catch-all 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
