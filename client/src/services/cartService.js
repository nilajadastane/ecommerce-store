 const addToCart = async (productId, quantity, token) => {
    return axios.post('http://localhost:8080/api/cart', {
        productId,
        quantity
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
};