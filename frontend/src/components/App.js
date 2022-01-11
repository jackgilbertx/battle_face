import React from 'react';
import './App.css';
import GetQuoteForm from './GetQuoteForm';
import Login from './Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className='app-container'>
      <Router>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<GetQuoteForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
