import React from "react";
import "./ProductItem.css";

export default function ProductItem({ product, onDelete, onEdit }) {
  return (
    <div className="product-item">
      <div className="product-main">
        <div className="product-head">
          <h3>{product.name}</h3>
          <div className="price">₹{product.price}</div>
        </div>
        <p className="cat">{product.categroy}</p>
        <p className="desc">{product.description}</p>
      </div>
      <div className="product-actions">
        <button className="ghost" onClick={() => onEdit(product)}>
          Edit
        </button>
        <button onClick={() => onDelete(product._id)}>Delete</button>
      </div>
    </div>
  );
}
