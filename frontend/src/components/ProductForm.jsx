import React, { useState } from "react";
import "./ProductForm.css";

const emptyForm = { name: "", price: "", description: "", categroy: "OTHERs" };

export default function ProductForm({ onAdd }) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  const categories = [
    "ELECTRONICS",
    "FASHION",
    "GROCERY",
    "HOME_APPLIANCES",
    "BEAUTY_AND_HEALTH",
    "SPORTS_AND_OUTDOORS",
    "BOOKS_AND_STATIONERY",
    "TOYS_AND_GAMES",
    "AUTOMOTIVE",
    "FURNITURE",
    "JEWELRY_AND_ACCESSORIES",
    "PET_SUPPLIES",
    "OTHERs",
  ];

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required.";
    if (!form.price || Number(form.price) <= 0)
      errs.price = "Enter a valid price.";
    if (!form.description || form.description.trim().length < 5)
      errs.description = "Description is too short.";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) return;
    // convert proper types
    await onAdd({
      name: form.name.trim(),
      price: Number(form.price),
      description: form.description.trim(),
      categroy: form.categroy,
    });
    setForm(emptyForm);
  };

  return (
    <form className="product-form">
      <label>
        Name
        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        {errors.name && <small className="err">{errors.name}</small>}
      </label>

      <label>
        Price
        <input
          type="number"
          step="0.01"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />
        {errors.price && <small className="err">{errors.price}</small>}
      </label>

      <label>
        Category
        <select
          value={form.categroy}
          onChange={(e) => setForm({ ...form, categroy: e.target.value })}
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>

      <label>
        Description
        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          rows="4"
        />
        {errors.description && (
          <small className="err">{errors.description}</small>
        )}
      </label>

      <div className="form-actions">
        <button onClick={handleSubmit} type="button">
          Add Product
        </button>
      </div>
    </form>
  );
}
