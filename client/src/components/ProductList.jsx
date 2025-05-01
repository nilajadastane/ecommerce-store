import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getAllProducts } from "../services/productService";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const { token } = useAuth();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await getAllProducts(token);
      setProducts(response.data);
    } catch (err) {
      setError("Failed to fetch products");
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      await axios.post(
        `http://localhost:8080/api/cart/add`,
        null,
        {
          params: { productId, quantity: 1 },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Product added to cart!");
    } catch (err) {
      setError("Failed to add product to cart");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
    <h2 className="text-2xl font-bold mb-6 text-center">Products</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {products.map((p) => (
        <div key={p.id} className="text-center">
          <img src={p.imageUrl  || "/public/imageNotAvailable.png"} alt={p.name} className="mx-auto h-40 w-40 object-contain" />
          <h4 className="mt-2 font-semibold">{p.name}</h4>
          <p>${p.price}</p>
          <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  </div>
  );
  
};

export default ProductList;
