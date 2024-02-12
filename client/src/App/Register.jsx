import React, { useState } from 'react';
import axios from 'axios';

function Register() {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:3001/register', { username, email, password });
      console.log(response.data);
    } catch (error) {
      console.error('Registration error:', error);
      setErrorMessage('Registration failed');
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl mb-4">Register</h2>
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
      <input 
          type="text" 
          placeholder="Username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          className="mb-2 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-400"
      />
      <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-400"
      />
      <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          className="mb-4 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-400"
      />
      <button 
          onClick={handleRegister} 
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Register
        </button>
      </div>
    </div>
  )
}

export default Register