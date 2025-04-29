import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-white font-bold text-2xl">
          MyStore
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="text-white hover:text-gray-300">
            Home
          </Link>
          <Link to="/products" className="text-white hover:text-gray-300">
            Products
          </Link>
          <Link to="/cart" className="text-white hover:text-gray-300 relative flex items-center">
            <FaShoppingCart className="text-lg" />
            <span className="ml-1">Cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
          {!isAuthenticated ? (
            <Link to="/login" className="text-white hover:text-gray-300">
              Login
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="text-white hover:text-gray-300"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white md:hidden focus:outline-none"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Items */}
      {isOpen && (
        <div className="md:hidden flex flex-col space-y-2 px-4 pt-2 pb-4">
          <Link to="/" className="text-white hover:text-gray-300" onClick={() => setIsOpen(false)}>
            Home
          </Link>
          <Link to="/products" className="text-white hover:text-gray-300" onClick={() => setIsOpen(false)}>
            Products
          </Link>
          <Link to="/cart" className="text-white hover:text-gray-300" onClick={() => setIsOpen(false)}>
            Cart ({cartCount})
          </Link>
          {!isAuthenticated ? (
            <Link to="/login" className="text-white hover:text-gray-300" onClick={() => setIsOpen(false)}>
              Login
            </Link>
          ) : (
            <button onClick={() => { handleLogout(); setIsOpen(false); }} className="text-white hover:text-gray-300">
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
