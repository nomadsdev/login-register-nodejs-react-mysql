import { useState } from 'react';
import './App.css';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Login from './App/Login';
import Register from './App/Register';
import Home from './App/Home';

function App() {  
  return (
    <>
      <Router>
        <div>
          <nav className='flex justify-center p-4 bg-gray-50'>
            <ul className='flex gap-5'>
              <li>
                <Link to="/login" className='bg-blue-200 text-blue-500 px-5 py-1 rounded-full'>Login</Link>
              </li>
              <li>
                <Link to="/register" className='bg-green-200 text-green-500 px-5 py-1 rounded-full'>Register</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;