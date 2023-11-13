import { Buffer } from 'buffer';
import "./Home.css";
import MainHeader from "../../components/MainHeader";
import Footer from "../../components/Footer";
import Login from "../../components/Login";
import Signup from "../../components/Signup";
import Products from "../../components/products";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import { setToken } from '../../redux/actions/authActions';


const Home = () => {
  global.Buffer = global.Buffer || Buffer;
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/fetch-products`);
      const products = response.data;
      setProducts(products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  
  const userToken = useSelector((state) => state.auth.token);


  const addToCart = async (productId) => {
    try {
      const token = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      };
      console.log(token);
  
      await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/add-to-cart`, { productId }, token);
      console.log('Product added to cart');
      
       toast.success('Product added to cart');
      
    } catch (error) {
      console.error('Error adding product to cart:', error);
      // Handle the error
    }
  };
  

  console.log(products);
  const categories = [...new Set(products.map((product) => product.category))];



  return (
    <>
      <MainHeader />

      <div className="Product-row">
        {categories.map((category) => (
          <div key={category}>
            <h2>{category}</h2>
            <div className="slidable-card-container">
              {products
                .filter((product) => product.category === category)
                .map((product, index) => (
                  <div key={index} className="slidable-card">
                   <div className='img-div'>
                     <img src={`${process.env.REACT_APP_SERVER_URL}/${product.imageUrl}`} alt={product.name} />
                     </div>
                    <div className="card-details">
                      <h4 className="card-title">{product.name}</h4>
                      <h3 className="card-title">Rs. {product.price}</h3>
                      <button className="card-button btn"  onClick={() => addToCart(product._id, product)}>Add to Cart</button>
                      

                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
        <ToastContainer />
      </div>
    </>
  );
};

export default Home;
