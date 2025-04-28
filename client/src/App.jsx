import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Cart from "./components/Cart";
import Home from "./pages/Home";
import Products from "./components/ProductList";
import { AuthProvider } from "./context/AuthContext"; 
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
