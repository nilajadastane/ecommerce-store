// src/services/productService.js
import axios from 'axios';

const API = 'http://localhost:8080/api/products';

export const getAllProducts = async () => {
  return axios.get(API);
};
