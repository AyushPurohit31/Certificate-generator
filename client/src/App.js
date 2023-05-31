import React, { useState } from 'react';

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send a POST request to the backend API to generate and send the e-certificate
    fetch('http://localhost:5000/api/generate-certificate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email }),
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        alert('E-certificate sent successfully!');
        setName('');
        setEmail('');
      } else {
        alert('Failed to send the e-certificate. Please try again.');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  return (
    <div>
      <h1>E-Certificate Generator</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <br />
        <button type="submit">Generate and Send</button>
      </form>
    </div>
  );
}

export default App;
