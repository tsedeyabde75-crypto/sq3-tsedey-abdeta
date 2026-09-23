import React, { useState, useEffect } from 'react';

export default function DishForm({ initialData, onSubmit, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Ethiopian',
    price: '',
    description: '',
    image: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      id: initialData?.id || Date.now().toString(),
      price: Number(formData.price)
    });
  };

  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
      <div style={{ backgroundColor: 'var(--bg-card)', padding: '2rem', borderRadius: '8px', width: '100%', maxWidth: '500px', border: '1px solid var(--border-color)' }}>
        <h3>{initialData ? 'Edit Dish' : 'Add New Dish'}</h3>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.25rem' }}>Name</label>
            <input name="name" value={formData.name} onChange={handleChange} required style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.25rem' }}>Category</label>
            <select name="category" value={formData.category} onChange={handleChange} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
              <option value="Ethiopian">Ethiopian</option>
              <option value="Pizza">Pizza</option>
              <option value="Burgers">Burgers</option>
              <option value="Drinks">Drinks</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.25rem' }}>Price (ETB)</label>
            <input type="number" name="price" value={formData.price} onChange={handleChange} required style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.25rem' }}>Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} rows="3" style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.25rem' }}>Image URL</label>
            <input name="image" value={formData.image} onChange={handleChange} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
          </div>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
            <button type="button" onClick={onClose} style={{ padding: '0.5rem 1rem', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'transparent', cursor: 'pointer' }}>Cancel</button>
            <button type="submit" className="add-to-cart-btn" style={{ padding: '0.5rem 1rem' }}>Save Dish</button>
          </div>
        </form>
      </div>
    </div>
  );
}