import React, { useState } from 'react';

function App() {
  const [items, setItems] = useState([]);
  const [text, setText] = useState('');

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    setItems([...items, { id: Date.now(), text }]);
    setText('');
  };

  const handleDelete = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div>
      <h1>CRUD Workshop</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={text} onChange={handleChange} />
        <button type="submit">Add Item</button>
      </form>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.text}
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
