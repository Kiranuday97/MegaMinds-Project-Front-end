import React, { useState } from 'react';
import axios from 'axios';

const AddProductForm = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('image', image);

    try {
      // Send the product data and image to the backend
      await axios.post('http://localhost:4000/api/add-product', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setName('');
      setPrice('');
      setImage(null);
      setCategory('');

      alert('Product added successfully!');
    } catch (error) {
      console.error('Error adding product:', error);
      alert('An error occurred while adding the product. Please try again.');
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    const reader = new FileReader();
    // reader.onload = (event) => {
    //   const base64Image = event.target.result;
    //   console.log(base64Image.byteLength);
    // };
    reader.readAsDataURL(file);
  };

  return (
    <div className="admin-page">
      <div className="admin-container">
        <h2>Add Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="admin-container">
            <label htmlFor="name">Product Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="price">Product Price:</label>
            <input
              type="number"
              id="price"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="image">Product Image:</label>
            <input
              type="file"
              name="image"
              id="image"
              onChange={handleImageChange}
              
              required
            />
          </div>
          <div>
            <label htmlFor="category">Product Category:</label>
            <select
              id="category"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select a category</option>
              <option value="Proteins and Supplements">Proteins and Supplements</option>
              <option value="Equipment">Equipment</option>
              <option value="Accessories">Accessories</option>
            </select>
          </div>

          <button type="submit">Add Product</button>
        </form>
      </div>
      
    </div>
  );
};

export default AddProductForm;
