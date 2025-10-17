import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import ProductCard from './components/productcard';
import Cart from './pages/cart';
import Header from './components/header';
import Checkout from './pages/checkout';
import Footer from './components/footer';
import PaymentSuccess from './pages/paymentSuccessful';

function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductCard/>} />
        <Route path="/cart" element={<Cart />} />
        <Route path='/paymentSuccess' element={<PaymentSuccess/>}/>
        <Route path="/checkout" element={<Checkout/>}/>
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;