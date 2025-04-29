import React,{useState, useEffect} from "react";
import axios from "axios";
//import { useNavigate } from "react-router-dom"; 
import { useAuth } from "../context/AuthContext";
import { getAllProducts } from "../services/productService";


const ProductList  = () => {
    
    const [products, setProducts] = useState([]);
   // const [error, setError] = useState("");
    const {token} = useAuth(); 
    //console.log("Token being sent:", token); 
    useEffect(() => {
        fetchProducts();
    } , []);
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
            const response = await axios.post(
                `http://localhost:8080/api/cart/add`,
                null,// we are not using request body; instead we pass query params
                { 
                    params: {
                        productId: productId,
                        quantity: 1 
                    }, 
                    headers: { Authorization: `Bearer ${token}` },
                
                
             });
                
            } catch (err) {
            setError("Failed to add product to cart");
            }
    }

    return (
        <div>
            <h1 className="text-3xl font-bold underline">Hello Tailwind!</h1>
          <h2>Products</h2>
          {products.map((p) => (
            <div key={p.id}>
              <h4>{p.name}</h4>
              <p>${p.price}</p>
              <button onClick={() => handleAddToCart(p.id)}>Add to Cart</button>
            </div>
          ))}
        </div>
      );
};
export default ProductList;