import React, { useState } from "react";
import "./EditModal.css";

export default function EditModal({ product, onClose, onSave }) {
  const [form, setForm] = useState({
    name: product.name,
    price: product.price,
    description: product.description,
    categroy: product.categroy,
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name required";
    if (!form.price || Number(form.price) <= 0) errs.price = "Price > 0";
    if (!form.description || form.description.trim().length < 5)
      errs.description = "Description too short";
    return errs;
  };

  const handleSave = async () => {
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) return;
    await onSave(product._id, {
      name: form.name.trim(),
      price: Number(form.price),
      description: form.description.trim(),
      categroy: form.categroy,
    });
  };

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div className="modal" onMouseDown={(e) => e.stopPropagation()}>
        <h3>Edit product</h3>
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
            {[
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
            ].map((c) => (
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
            rows="3"
          />
          {errors.description && (
            <small className="err">{errors.description}</small>
          )}
        </label>

        <div className="modal-actions">
          <button className="ghost" onClick={onClose}>
            Cancel
          </button>
          <button onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
}
