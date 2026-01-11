import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProducts } from '../services/productService';
import ProductCard from '../components/ProductCard';
import CategoryFilter from '../components/CategoryFilter';
import './Products.css';

const Products = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const category = searchParams.get('category');
  const subcategory = searchParams.get('subcategory');
  const search = searchParams.get('search');

  useEffect(() => {
    loadProducts();
  }, [category, subcategory, search]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError('');
      const params = {};
      if (category) params.category = category;
      if (subcategory) params.subcategory = subcategory;
      if (search) params.search = search;

      const { products: productsData } = await getProducts(params);
      setProducts(productsData);
    } catch (err) {
      setError('Failed to load products');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="products-page">
      <div className="container">
        <div className="products-layout">
          <aside className="products-sidebar">
            <CategoryFilter />
          </aside>
          <main className="products-main">
            <div className="products-header">
              <h1>
                {search ? `Search Results for "${search}"` : 
                 subcategory ? `${subcategory.charAt(0).toUpperCase() + subcategory.slice(1)}` :
                 category ? `${category.charAt(0).toUpperCase() + category.slice(1)}` :
                 'All Products'}
              </h1>
              <p className="products-count">{products.length} products found</p>
            </div>

            {loading ? (
              <div className="loading">Loading products...</div>
            ) : error ? (
              <div className="error">{error}</div>
            ) : products.length === 0 ? (
              <div className="no-products">
                <p>No products found. Try adjusting your filters.</p>
              </div>
            ) : (
              <div className="products-grid">
                {products.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Products;

