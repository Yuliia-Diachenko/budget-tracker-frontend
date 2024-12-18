import axios from 'axios';
import { useState, useEffect } from 'react';

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({ amount: '', type: 'expense', category_id: '', description: '' });

  useEffect(() => {
    async function fetchData() {
      const transactionsRes = await axios.get('/api/transactions');
      const categoriesRes = await axios.get('/api/categories');
      setTransactions(transactionsRes.data);
      setCategories(categoriesRes.data);
    }
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/api/transactions', formData);
    const transactionsRes = await axios.get('/api/transactions');
    setTransactions(transactionsRes.data);
    setFormData({ amount: '', type: 'expense', category_id: '', description: '' });
  };

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
  const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
  const balance = totalIncome - totalExpenses;

  return (
    <div>
      <h1>Transactions</h1>
      <div>
        <p>Total Income: {totalIncome}</p>
        <p>Total Expenses: {totalExpenses}</p>
        <p>Balance: {balance}</p>
      </div>
      <form onSubmit={handleSubmit}>
        <input type="number" value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })} placeholder="Amount" required />
        <select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} required>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select value={formData.category_id} onChange={(e) => setFormData({ ...formData, category_id: e.target.value })} required>
          <option value="" disabled>Select Category</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>
        <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Description" required></textarea>
        <button type="submit">Add Transaction</button>
      </form>
      <ul>
        {transactions.map(transaction => (
          <li key={transaction.id}>
            {transaction.amount} - {transaction.type} - {transaction.category.name} - {transaction.description}
          </li>
        ))}
      </ul>
    </div>
  );
}
