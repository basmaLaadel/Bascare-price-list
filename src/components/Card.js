import React from 'react';

const Card = ({ product, onCardClick }) => {
  return (
    <div className="card" onClick={() => onCardClick(product)}>
      <div className="card-image-wrapper">
        <img src={product.image} alt={product.name} className="card-image" />
        <div className="card-overlay">
          <button className="view-btn">View Details</button>
        </div>
      </div>
      <div className="card-content">
        <h3 className="card-name">{product.name}</h3>
        <p className="card-description">{product.description}</p>
        <span className="card-category">{product.category}</span>
      </div>
    </div>
  );
};

export default Card;
