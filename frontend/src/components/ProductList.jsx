import React from "react";
import ProductItem from "./ProductItem";
import "./ProductList.css";   // ✅ fixed import

export default function ProductList({ products, onDelete, onEdit }) {
  if (!products.length) {
    return <p>No products found.</p>;
  }
  return (
    <div className="product-list">
      {products.map((p) => (
        <ProductItem
          key={p._id}
          product={p}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}
