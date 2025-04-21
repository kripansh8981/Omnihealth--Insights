// Footer.jsx in /components

import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p className="footer-text">© {new Date().getFullYear()} OmniHealth Insights. All rights reserved.</p>
        <div className="footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Use</a>
          <a href="/contact">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

