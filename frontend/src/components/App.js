import React from 'react';
import './App.css';
import BattleForm from './BattleForm';
import Login from './Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className='app-container'>
      <Router>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<BattleForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
