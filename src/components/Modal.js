import React from 'react';

const Modal = ({ product, isOpen, onClose }) => {
  if (!isOpen || !product) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="modal-body">
          <div className="modal-image-section">
            <img src={product.image} alt={product.name} className="modal-image" />
          </div>
          <div className="modal-info-section">
            <h2 className="modal-name">{product.name}</h2>
            <p className="modal-description">{product.description}</p>
            <div className="modal-sizes">
              <h3>Available Sizes & Prices</h3>
              <div className="sizes-list">
                {product.sizes.map((size, index) => (
                  <div key={index} className="size-option">
                    <span className="size-name">{size.name}</span>
                    <span className="size-price">${size.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
