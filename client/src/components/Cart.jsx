import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Cart = () => {
  const { token } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState("");

  const fetchCart = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(response.data);
    } catch (err) {
      setError("Failed to fetch cart items");
    }
  };

  const handleRemove = async (productId) => {
    try {
      await axios.delete(`http://localhost:8080/api/cart/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCart(); // Refresh cart after removal
    } catch (err) {
      setError("Failed to remove product from cart");
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div>
      <h2>Your Cart</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cartItems.map((item) => (
          <div key={item.id}>
            <h4>{item.product.name}</h4>
            <p>Qty: {item.quantity}</p>
            <p>Price: ${item.product.price}</p>
            <button onClick={() => handleRemove(item.product.id)}>Remove</button>
          </div>
        ))
      )}
    </div>
  );
};

export default Cart;
