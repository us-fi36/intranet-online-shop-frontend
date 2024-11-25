import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Login from './components/Login';
import Register from './components/Register';
import Cart from './components/Cart';
import Order from './components/Order';
import PageContainer from './container/PageContainer';


const App = () => {
  return (
    <div>
      <PageContainer>
        <Router>
          <Navbar />

          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/orders" element={<Order />} />

          </Routes>
        </Router>
      </PageContainer>
    </div>
  );
};

export default App;
