import React from "react";

function OrderItem({ product }) {
  return (
    <div className="item">
      <div className="product-info">
        <img
          src={product.details.mainImage.secure_url}
          alt="product image"
          className="img-fluid"
        />
        <div className="product-details">
          <h2>{product.details.name}</h2>
          <span>Color:black</span>
        </div>
      </div>
      <div className="quantity">
        <button></button>
        <span>{product.quantity}</span>
        <button></button>
      </div>
      <div className="price">${product.details.price}</div>
      <div className="subtotal">${product.quantity * product.details.price}</div>
    </div>
  );
}

export default OrderItem;
