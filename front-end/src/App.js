import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

function App() {
  const [items, setItems] = useState([]);
  const [text, setText] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [updatedText, setUpdatedText] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get('/items');
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      const response = await axios.post('/items', { text });
      setItems([...items, response.data.item]);
      setText('');
    } catch (error) {
      console.error('Error creating item:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/items/${id}`);
      setItems(items.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const openModal = (id, text) => {
    setSelectedItemId(id);
    setUpdatedText(text);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/items/${selectedItemId}`, { text: updatedText });
      setItems(items.map((item) => (item.id === selectedItemId ? { ...item, text: updatedText } : item)));
      closeModal();
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  return (
    <div style={{ maxWidth: '100vw', textAlign: 'center'}}>
      <h1 style={{ textAlign: 'center' }}>Backend Workshop</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input type="text" value={text} onChange={handleChange} style={{ marginRight: '10px' }} />
        <button type="submit">Add Item</button>
      </form>
      <ul style={{ maxWidth: '50vw', marginLeft: '25vw', textAlign: 'center'}}>
        {items.map((item) => (
          <li key={item.id} style={{ marginBottom: '10px', alignItems: 'center' }}>
            <span style={{ margin: '10px'}}>{item.text}</span>
            <button onClick={() => handleDelete(item.id)} style={{ marginRight: '10px' }}>Delete</button>
            <button onClick={() => openModal(item.id, item.text)} style={{ marginRight: '10px' }}>Update</button>
          </li>
        ))}
      </ul>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Update Item Modal"
        style={{
          overlay: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
          content: { width: '300px', margin: '100px auto' },
        }}
        appElement={document.getElementById('root')} // Set the app element here
      >
        <h2>Update Item</h2>
        <input type="text" value={updatedText} onChange={(e) => setUpdatedText(e.target.value)} />
        <button onClick={handleUpdate} style={{ marginTop: '10px' }}>Update</button>
        <button onClick={closeModal} style={{ marginLeft: '10px' }}>Cancel</button>
      </Modal>
    </div>
  );
}

export default App;
