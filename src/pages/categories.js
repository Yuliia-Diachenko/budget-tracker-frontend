import axios from 'axios';
import { useState, useEffect } from 'react';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({ name: '', type: 'expense' });

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axios.get('/api/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/categories', formData);
      const response = await axios.get('/api/categories');
      setCategories(response.data);
      setFormData({ name: '', type: 'expense' });
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  return (
    <div>
      <h1>Categories</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Category Name"
          required
        />
        <select
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          required
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <button type="submit">Add Category</button>
      </form>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            {category.name} - {category.type}
          </li>
        ))}
      </ul>
    </div>
  );
}
