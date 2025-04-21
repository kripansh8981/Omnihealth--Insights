import React from "react";
import App from "../App";

import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">OmniHealth Insights</div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/modules">Modules</Link></li>
        <li><Link to="/opdqueue">OPD Queue</Link></li>
        <li><Link to="/bedavailability">Bed Availability</Link></li>
        <li><Link to="/admission">Admission</Link></li>
        <li><Link to="/inventory">Inventory</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;


