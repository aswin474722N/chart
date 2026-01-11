import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CATEGORIES, SUBCATEGORIES, CATEGORY_LABELS, SUBCATEGORY_LABELS } from '../utils/constants';
import './CategoryFilter.css';

const CategoryFilter = () => {
  const [searchParams] = useSearchParams();
  const currentCategory = searchParams.get('category');
  const currentSubcategory = searchParams.get('subcategory');

  const gadgetsSubcategories = [
    SUBCATEGORIES.MOBILE,
    SUBCATEGORIES.LAPTOP,
    SUBCATEGORIES.WATCH,
    SUBCATEGORIES.HEADPHONES,
    SUBCATEGORIES.AIRBUDS,
    SUBCATEGORIES.POWER_BANK
  ];

  const homeAppliancesSubcategories = [
    SUBCATEGORIES.FRIDGE,
    SUBCATEGORIES.TV,
    SUBCATEGORIES.WASHING_MACHINE,
    SUBCATEGORIES.HEATER,
    SUBCATEGORIES.WATER_FILTER
  ];

  const buildUrl = (params) => {
    const newParams = new URLSearchParams(searchParams);
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }
    });
    return `/products?${newParams.toString()}`;
  };

  return (
    <div className="category-filter">
      <h3>Shop by Category</h3>
      
      <div className="filter-section">
        <h4>Main Categories</h4>
        <Link
          to={buildUrl({ category: CATEGORIES.GADGETS, subcategory: '' })}
          className={`filter-link ${currentCategory === CATEGORIES.GADGETS ? 'active' : ''}`}
        >
          {CATEGORY_LABELS[CATEGORIES.GADGETS]}
        </Link>
        <Link
          to={buildUrl({ category: CATEGORIES.HOME_APPLIANCES, subcategory: '' })}
          className={`filter-link ${currentCategory === CATEGORIES.HOME_APPLIANCES ? 'active' : ''}`}
        >
          {CATEGORY_LABELS[CATEGORIES.HOME_APPLIANCES]}
        </Link>
      </div>

      {currentCategory === CATEGORIES.GADGETS && (
        <div className="filter-section">
          <h4>Gadgets</h4>
          {gadgetsSubcategories.map(sub => (
            <Link
              key={sub}
              to={buildUrl({ category: CATEGORIES.GADGETS, subcategory: sub })}
              className={`filter-link ${currentSubcategory === sub ? 'active' : ''}`}
            >
              {SUBCATEGORY_LABELS[sub]}
            </Link>
          ))}
        </div>
      )}

      {currentCategory === CATEGORIES.HOME_APPLIANCES && (
        <div className="filter-section">
          <h4>Home Appliances</h4>
          {homeAppliancesSubcategories.map(sub => (
            <Link
              key={sub}
              to={buildUrl({ category: CATEGORIES.HOME_APPLIANCES, subcategory: sub })}
              className={`filter-link ${currentSubcategory === sub ? 'active' : ''}`}
            >
              {SUBCATEGORY_LABELS[sub]}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryFilter;

