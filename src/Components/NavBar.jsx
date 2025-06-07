import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ onLogout = () => {} }) => {
  const handleLogoutClick = (event) => {
    event.preventDefault(); // Prevent default link behavior
    console.log("Logout clicked"); // Debug
    onLogout(); // Trigger logout
  };

  return (
    <header>
      <h1>Eco Thread Exchange</h1>
      <nav>
       
        <Link to="/items">Items</Link>
        <Link to="/my-items">My Items</Link>
        <Link to="/trades">Trades</Link>
        <Link to="/newlogin" >
          Logout
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;