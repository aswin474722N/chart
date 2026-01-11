export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
export const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '';

export const CATEGORIES = {
  GADGETS: 'gadgets',
  HOME_APPLIANCES: 'home-appliances'
};

export const SUBCATEGORIES = {
  MOBILE: 'mobile',
  LAPTOP: 'laptop',
  WATCH: 'watch',
  HEADPHONES: 'headphones',
  AIRBUDS: 'airbuds',
  POWER_BANK: 'power-bank',
  FRIDGE: 'fridge',
  TV: 'tv',
  WASHING_MACHINE: 'washing-machine',
  HEATER: 'heater',
  WATER_FILTER: 'water-filter'
};

export const CATEGORY_LABELS = {
  [CATEGORIES.GADGETS]: 'Gadgets',
  [CATEGORIES.HOME_APPLIANCES]: 'Home Appliances'
};

export const SUBCATEGORY_LABELS = {
  [SUBCATEGORIES.MOBILE]: 'Mobile Phones',
  [SUBCATEGORIES.LAPTOP]: 'Laptops',
  [SUBCATEGORIES.WATCH]: 'Watches',
  [SUBCATEGORIES.HEADPHONES]: 'Headphones',
  [SUBCATEGORIES.AIRBUDS]: 'Airbuds',
  [SUBCATEGORIES.POWER_BANK]: 'Power Banks',
  [SUBCATEGORIES.FRIDGE]: 'Fridges',
  [SUBCATEGORIES.TV]: 'TVs',
  [SUBCATEGORIES.WASHING_MACHINE]: 'Washing Machines',
  [SUBCATEGORIES.HEATER]: 'Heaters',
  [SUBCATEGORIES.WATER_FILTER]: 'Water Filters'
};

