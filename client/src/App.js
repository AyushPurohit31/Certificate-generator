import React, { useState } from 'react';
import { template1 } from './assets/asset';


function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    if(!name || !email){
      alert("fill the details!")
    }
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
      if (data) {
        alert('E-certificate sent successfully!');
        setName('');
        setEmail('');
      } else {
        alert('Failed to send the e-certificate. Please try again.');
        console.log(data);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  return (
    <div className='h-screen w-full bg-yellow-200 flex flex-col justify-center align-middle'>
      <div className='w-full h-20 mt-5 mb-5 p-5 flex justify-center align-middle'><p className='text-xl font-extrabold'>E-Certificate Generator</p></div>
      <div className='flex justify-center align-middle lg:flex-row flex-col '> 
        <div className='p-5 m-5 h-[60%] w-auto'>
          <form className='flex flex-col items-center' onSubmit={handleSubmit}>
            <label>
              Name:
              <input className='border-2 m-2 rounded-lg p-3' type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <br />
            <label>
              Email:
              <input className='border-2 m-2 rounded-lg p-3' type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <br />
            <button class="text-white border-2 m-2 rounded-lg p-3 bg-slate-600 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 ...">
              generate
            </button>
          </form>
        </div>
        <div className='relative flex justify-center align-middle' id="template1" >
            <img src={template1} alt="template" className='w-[25rem] m-10 flex lg:w-[30rem] sm:w-[27rem]'></img>
            <div className='absolute top-[46%] sm:left-auto  lg:left-[27%] justify-center align-middle text-center shrink w-64 h-14 '>
              <p className='text-lg font-bold uppercase'>{name === '' ? 'Name' : name}</p>
            </div>
        </div>
      </div>
    </div>
  );
}

export default App;
