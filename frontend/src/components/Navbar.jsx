import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import SearchBar from './SearchBar';
import './Navbar.css';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { getCartItemCount } = useCart();
  const navigate = useNavigate();
  const [showAccountMenu, setShowAccountMenu] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setShowAccountMenu(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-text">ARWIN</span>
        </Link>

        <div className="navbar-search">
          <SearchBar />
        </div>

        <div className="navbar-right">
          <div className="navbar-account" onMouseEnter={() => setShowAccountMenu(true)} onMouseLeave={() => setShowAccountMenu(false)}>
            <div className="account-link">
              <span className="account-line1">Hello, {isAuthenticated ? user?.name || 'User' : 'Sign in'}</span>
              <span className="account-line2">Account & Lists</span>
            </div>
            {showAccountMenu && (
              <div className="account-menu">
                {isAuthenticated ? (
                  <>
                    <div className="account-menu-user">
                      <strong>{user?.name}</strong>
                    </div>
                    <Link to="/admin" className="account-menu-item" onClick={() => setShowAccountMenu(false)}>
                      {user?.role === 'admin' && 'Admin Dashboard'}
                    </Link>
                    <div className="account-menu-item" onClick={handleLogout}>
                      Sign Out
                    </div>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="account-menu-item" onClick={() => setShowAccountMenu(false)}>
                      Sign In
                    </Link>
                    <Link to="/signup" className="account-menu-item" onClick={() => setShowAccountMenu(false)}>
                      Create Account
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>

          <Link to="/orders" className="navbar-link">
            <span className="link-line1">Returns</span>
            <span className="link-line2">& Orders</span>
          </Link>

          <Link to="/cart" className="navbar-cart">
            <span className="cart-icon">🛒</span>
            <span className="cart-count">{getCartItemCount()}</span>
            <span className="cart-text">Cart</span>
          </Link>
        </div>
      </div>

      <div className="navbar-bottom">
        <div className="navbar-bottom-container">
          <Link to="/products?category=gadgets" className="navbar-bottom-link">
            Gadgets
          </Link>
          <Link to="/products?category=home-appliances" className="navbar-bottom-link">
            Home Appliances
          </Link>
          <Link to="/products?subcategory=mobile" className="navbar-bottom-link">
            Mobile
          </Link>
          <Link to="/products?subcategory=laptop" className="navbar-bottom-link">
            Laptops
          </Link>
          <Link to="/products?subcategory=watch" className="navbar-bottom-link">
            Watches
          </Link>
          <Link to="/products?subcategory=headphones" className="navbar-bottom-link">
            Headphones
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

