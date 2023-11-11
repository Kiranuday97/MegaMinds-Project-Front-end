import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import './admin.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch the product data from the backend
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleEditProduct = (productId) => {
    // Implement your edit product logic here
    console.log('Edit product:', productId);
  };

  const handleRemoveProduct = (productId) => {
    // Implement your remove product logic here
    console.log('Remove product:', productId);
  };

  return (
    <div className="admin-page">
      <div className="admin-container">
        <h2>Product List</h2>
        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>
                  <button onClick={() => handleEditProduct(product._id)}>Edit</button>
                  <button onClick={() => handleRemoveProduct(product._id)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
