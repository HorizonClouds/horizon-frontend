import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      {/*Añadir un apartado por cada microservicio*/} 
      <Link to="/">Home</Link>
      <Link to="/interest-filters/new">Create Filter</Link>
    </nav>
  );
};

export default Navbar;
