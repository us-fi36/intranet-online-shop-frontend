import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';


const App = () => {
  return (
    <Router>
      <Navbar />
      Hello world
      <Routes>

      </Routes>
    </Router>
  );
};

export default App;
