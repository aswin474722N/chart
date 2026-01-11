import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Get to Know Us</h3>
          <Link to="/about">About Us</Link>
          <Link to="/careers">Careers</Link>
          <Link to="/press">Press Releases</Link>
        </div>
        <div className="footer-section">
          <h3>Make Money with Us</h3>
          <Link to="/sell">Sell products</Link>
          <Link to="/affiliate">Become an Affiliate</Link>
        </div>
        <div className="footer-section">
          <h3>Let Us Help You</h3>
          <Link to="/help">Help</Link>
          <Link to="/shipping">Shipping & Delivery</Link>
          <Link to="/returns">Returns & Replacements</Link>
        </div>
        <div className="footer-section">
          <h3>Connect with Us</h3>
          <Link to="/facebook">Facebook</Link>
          <Link to="/twitter">Twitter</Link>
          <Link to="/instagram">Instagram</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Amazon E-Commerce. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

