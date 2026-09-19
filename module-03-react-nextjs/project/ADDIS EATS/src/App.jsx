
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Menu from './features/menu/Menu';
import Home from './features/home/Home';

export default function App() {
  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/menu" element={<Menu />} />
          <Route path="/cart" element={<div style={{ padding: '3rem', textAlign: 'center' }}>Cart Implementation Coming in Stage 3</div>} />
          <Route path="/checkout" element={<div style={{ padding: '3rem', textAlign: 'center' }}>Checkout Implementation Coming in Stage 3</div>} />
        </Routes>
      </main>
    </Router>
  );
}