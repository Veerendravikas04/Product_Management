import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";
import EditModal from "./components/EditModal";
import api from "./api/axios";
import "./App.css";

export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("id");
  const [searchTerm, setSearchTerm] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await api.get("/product");
      setProducts(res.data);
    } catch (err) {
      console.error("Fetch products error:", err);
      alert(
        "Failed to load products. Is the backend running at http://localhost:8080 ?"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAdd = async (data) => {
    try {
      const res = await api.post("/product", data);
      setProducts((prev) => [res.data, ...prev]);
    } catch (err) {
      console.error(err);
      alert("Failed to add product. Check console for details.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    try {
      await api.delete(`/product/${id}`);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error(err);
      alert("Delete failed.");
    }
  };

  const handleUpdate = async (id, updated) => {
    try {
      const res = await api.put(`/product/${id}`, updated);
      setProducts((prev) => prev.map((p) => (p._id === id ? res.data : p)));
      setEditingProduct(null);
    } catch (err) {
      console.error(err);
      alert("Update failed.");
    }
  };

  const sortProducts = (list) => {
    if (sortOption === "id") {
      return [...list].sort((a, b) => a._id.localeCompare(b._id));
    }
    if (sortOption === "low") {
      return [...list].sort((a, b) => a.price - b.price);
    }
    if (sortOption === "high") {
      return [...list].sort((a, b) => b.price - a.price);
    }
    return list;
  };

  const visible = sortProducts(
    products.filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="container">
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="main-grid">
        <div className="left-col">
          <h2>Add product</h2>
          <ProductForm onAdd={handleAdd} />
        </div>
        <div className="right-col">
          <div className="list-controls">
            <h2>Products</h2>
            <div>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="id">ID</option>
                <option value="low">Low → High</option>
                <option value="high"> High → Low</option>
              </select>
              <button onClick={fetchProducts} style={{ marginLeft: 8 }}>
                Refresh
              </button>
            </div>
          </div>

          {loading ? (
            <p>Loading products...</p>
          ) : (
            <ProductList
              products={visible}
              onDelete={handleDelete}
              onEdit={(p) => setEditingProduct(p)}
            />
          )}
        </div>
      </div>

      {editingProduct && (
        <EditModal
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onSave={handleUpdate}
        />
      )}
    </div>
  );
}
