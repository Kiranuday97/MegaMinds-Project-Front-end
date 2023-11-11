import React, { useState } from 'react';
import axios from 'axios';
import './sell.css';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';



const AddProductForm = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState('');

  const userToken = useSelector((state) => state.auth.token);


  const HandleSubmit = async (e) => {
    e.preventDefault();


    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('image', image);

    

    try {
      // const token = localStorage.getItem('token');
      // const config = {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // };


      const token = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      };
      console.log(token);
      
      

      await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/add-product`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userToken}`,
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

  return (
    <div className="admin-page">
      <Container>
        <Row>
          <Col md={6}>
        <h2>Add Product</h2>

            <div className="column">
              <Form onSubmit={HandleSubmit}>
                <Form.Group controlId="name">
                  <Form.Label>Product Name:</Form.Label>
                  <Form.Control
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="price">
                  <Form.Label>Product Price:</Form.Label>
                  <Form.Control
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="image">
                  <Form.Label>Product Image:</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="category">
                  <Form.Label>Product Category:</Form.Label>
                  <Form.Control
                    as="select"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="Mobiles">Mobiles</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Appliances">Appliances</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Home">Home</option>
                    <option value="Toys">Toys</option>
                  </Form.Control>
                </Form.Group>

                <Button variant="primary" type="submit">
                  Add Product
                </Button>
              </Form>
            </div>
          </Col>
          <Col md={6} className="d-flex align-items-center justify-content-center">
            <div className="column">
              <Link to="/orders-admin">
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AddProductForm;
