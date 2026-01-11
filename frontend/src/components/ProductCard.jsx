import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = async () => {
    await addToCart(product.id, 1);
  };

  return (
    <div className="product-card">
      <Link to={`/products/${product.id}`} className="product-link">
        <div className="product-image-container">
          <img src={product.image} alt={product.name} className="product-image" />
        </div>
        <div className="product-info">
          <h3 className="product-name">{product.name}</h3>
          <div className="product-rating">
            {'★'.repeat(Math.floor(product.rating))}
            <span className="rating-text">({product.reviews})</span>
          </div>
          <div className="product-price">${product.price.toFixed(2)}</div>
          {product.stock > 0 ? (
            <div className="product-stock">In Stock</div>
          ) : (
            <div className="product-stock out-of-stock">Out of Stock</div>
          )}
        </div>
      </Link>
      <button className="product-add-to-cart" onClick={handleAddToCart} disabled={product.stock === 0}>
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;

