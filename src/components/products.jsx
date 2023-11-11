import React from 'react';

const SlidableCard = ({ category, products }) => {
  return (
    <div className="Product-row">
      <h2>{category}</h2>
      <div className="slidable-card-container">
        {products.map((product) => (
          <div key={product._id} className="slidable-card">
            <img src={product.image} alt={product.title} className="card-image" />
            <div className="card-details">
              <h4 className="card-title">{product.title}</h4>
              <button className="card-button">Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SlidableCard;
