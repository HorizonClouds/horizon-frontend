import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import InterestFilterForm from '../../microservices/feeds/components/InterestFilterForm';
import InterestFilterList from '../../microservices/feeds/components/InterestFilterList';
import config from '../../config';

const App = () => {
  return (
    <BrowserRouter basename={config.browserRooterUrl}>
      <Navbar />
      <Routes>
        {/*Añadir todas las rutas de los microservicios aquí*/} 
        <Route path="/" element={<Home />} />
        {/*FEEDS*/} 
        <Route path="/interest-filters/new" element={<InterestFilterForm />} />
        <Route path="/interest-filters/:userId" element={<InterestFilterList />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
