import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await fetch(`${API_URL}/api/items`);
      const { items: fetchedItems } = await res.json();
      setItems(Array.isArray(fetchedItems) ? fetchedItems : []);
    } catch (err) {
      console.error('Failed to fetch items:', err);
      setItems([]);
    }
  };

  const addItem = async () => {
    if (!name.trim()) return;

    try {
      const res = await fetch(`${API_URL}/api/items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });

      if (res.ok) {
        setMessage('Item added successfully!');
        setName('');
        fetchItems();
      } else {
        setMessage('Failed to add item.');
      }
    } catch (err) {
      console.error('Add item error:', err);
      setMessage('Error adding item.');
    }
  };

  return (
    <div className="App">
      <h1>Item List</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Item name"
      />
      <button onClick={addItem}>Add Item</button>
      {message && <p>{message}</p>}
      <ul>
        {items.length > 0 ? (
          items.map(({ id, name }) => <li key={id}>{name}</li>)
        ) : (
          <li>No items found</li>
        )}
      </ul>
    </div>
  );
}

export default App;
