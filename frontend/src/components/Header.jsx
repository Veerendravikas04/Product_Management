import React from "react";
import "./Header.css";

export default function Header({ searchTerm, setSearchTerm }) {
  return (
    <header className="app-header">
      <div className="container-inner">
        <h1 className="logo">UniCart — Products</h1>
        <div className="search-wrap">
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products by name..."
            className="search-input"
          />
        </div>
      </div>
    </header>
  );
}
