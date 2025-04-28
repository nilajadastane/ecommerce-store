import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
      <Link to="/" style={{ marginRight: "10px" }}>🏠 Home</Link>
      <Link to="/products" style={{ marginRight: "10px" }}>🛍️ Products</Link>
      <Link to="/cart" style={{ marginRight: "10px" }}>🛒 Cart</Link>

      {isAuthenticated ? (
        <button onClick={handleLogout} style={{ marginLeft: "10px" }}>
          🚪 Logout
        </button>
      ) : (
        <>
          <Link to="/login" style={{ marginLeft: "10px" }}>🔐 Login</Link>
          <Link to="/register" style={{ marginLeft: "10px" }}>📝 Register</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
