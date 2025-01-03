import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import InterestFilterForm from '../../microservices/feeds/components/InterestFilterForm';
import InterestFilterList from '../../microservices/feeds/components/InterestFilterList';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/*Añadir todas las rutas de los microservicios aquí*/} 
        <Route path="/" element={<Home />} />
        {/*FEEDS*/} 
        <Route path="/interest-filters/new" element={<InterestFilterForm />} />
        <Route path="/interest-filters/:userId" element={<InterestFilterList />} />
      </Routes>
    </Router>
  );
};

export default App;
