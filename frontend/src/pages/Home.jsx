import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../services/productService';
import ProductCard from '../components/ProductCard';
import './Home.css';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeaturedProducts();
  }, []);

  const loadFeaturedProducts = async () => {
    try {
      setLoading(true);
      const { products } = await getProducts({ limit: 8 });
      setFeaturedProducts(products);
    } catch (error) {
      console.error('Failed to load products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      <div className="home-hero">
        <div className="hero-content">
          <h1>Welcome to Amazon E-Commerce</h1>
          <p>Discover amazing products at great prices</p>
          <Link to="/products" className="btn-primary">
            Shop Now
          </Link>
        </div>
      </div>

      <div className="container">
        <div className="home-section">
          <h2>Featured Products</h2>
          {loading ? (
            <div className="loading">Loading products...</div>
          ) : (
            <div className="products-grid">
              {featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>

        <div className="home-categories">
          <h2>Shop by Category</h2>
          <div className="categories-grid">
            <Link to="/products?category=gadgets" className="category-card">
              <h3>Gadgets</h3>
              <p>Mobile, Laptops, Watches & More</p>
            </Link>
            <Link to="/products?category=home-appliances" className="category-card">
              <h3>Home Appliances</h3>
              <p>Fridges, TVs, Washing Machines & More</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

