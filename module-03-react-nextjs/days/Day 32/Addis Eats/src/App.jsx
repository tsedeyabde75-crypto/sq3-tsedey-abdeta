import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import DishDetail from "./pages/DishDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login"; // 1. Import Login page
import NotFound from "./pages/NotFound";
import RequireAuth from "./components/RequireAuth";

const SAMPLE_DISHES = [
  { id: "1", name: "Doro Wat", category: "Main", price: 350, description: "Spicy chicken stew served with Injera." },
  { id: "2", name: "Beyaynetu", category: "Vegan", price: 250, description: "Assorted vegetarian platter." },
  { id: "3", name: "Special Tibs", category: "Grill", price: 400, description: "Sautéed beef with spices, onions, and peppers." },
  { id: "4", name: "Shiro Tagelus", category: "Vegan", price: 180, description: "Spiced chickpea powder stew." },
];

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="menu" element={<Menu dishes={SAMPLE_DISHES} />} />
              <Route path="menu/:id" element={<DishDetail dishes={SAMPLE_DISHES} />} />
              <Route path="cart" element={<Cart />} />
              <Route path="login" element={<Login />} /> {/* 2. Add Login Route */}
              <Route
                path="checkout"
                element={
                  <RequireAuth>
                    <Checkout />
                  </RequireAuth>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}