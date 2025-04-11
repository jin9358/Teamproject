import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Menu from "./routes/Menu";
import { CartProvider } from "./components/CartContext";
import Cart from "./components/Cart";
import Footer from './routes/footer';

function App() {
  return (
    <Router> 
      <CartProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/cart" element={<Cart />} /> 
        </Routes>
        <Footer />
      </CartProvider>
    </Router>
  );
}

export default App;