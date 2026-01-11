# Quick Setup Guide

## Step-by-Step Setup

### 1. Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file
cat > .env << EOF
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
PORT=5000
FRONTEND_URL=http://localhost:5173
EOF

# Start backend server
npm start
```

### 2. Frontend Setup

```bash
# Navigate to frontend (in a new terminal)
cd frontend

# Install dependencies
npm install

# Create .env file (optional)
cat > .env << EOF
VITE_API_URL=http://localhost:5000/api
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
EOF

# Start frontend server
npm run dev
```

### 3. Access the Application

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

### 4. Create Your First Account

1. Go to http://localhost:5173
2. Click "Sign up" or navigate to /signup
3. Create an account
4. Start shopping!

### 5. Create an Admin User (Optional)

To create an admin user, edit `backend/data/users.json` and add:
```json
{
  "id": "admin_1",
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "hashed_password_here",
  "role": "admin",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "cart": []
}
```

Or modify the signup controller to allow admin creation.

### 6. Stripe Setup

1. Sign up at https://stripe.com
2. Get test API keys from Dashboard
3. Add to `.env` files
4. Use test card: `4242 4242 4242 4242`

## File Structure Summary

### Backend Files Created:
- `backend/package.json` - Backend dependencies
- `backend/server.js` - Express server
- `backend/config/database.js` - JSON database handler
- `backend/models/User.js` - User model
- `backend/models/Product.js` - Product model
- `backend/models/Order.js` - Order model
- `backend/middleware/auth.js` - JWT authentication
- `backend/middleware/validation.js` - Input validation
- `backend/controllers/authController.js` - Auth logic
- `backend/controllers/productController.js` - Product CRUD
- `backend/controllers/cartController.js` - Cart operations
- `backend/controllers/orderController.js` - Order processing
- `backend/controllers/adminController.js` - Admin operations
- `backend/routes/auth.js` - Auth routes
- `backend/routes/products.js` - Product routes
- `backend/routes/cart.js` - Cart routes
- `backend/routes/orders.js` - Order routes
- `backend/routes/admin.js` - Admin routes
- `backend/data/products.json` - 70+ products
- `backend/data/users.json` - User storage
- `backend/data/orders.json` - Order storage

### Frontend Files Created:
- `frontend/package.json` - Frontend dependencies
- `frontend/vite.config.js` - Vite configuration
- `frontend/index.html` - HTML entry
- `frontend/src/main.jsx` - React entry
- `frontend/src/App.jsx` - Main app with routing
- `frontend/src/index.css` - Global styles
- `frontend/src/utils/constants.js` - Constants
- `frontend/src/services/api.js` - API client
- `frontend/src/services/authService.js` - Auth API
- `frontend/src/services/productService.js` - Product API
- `frontend/src/services/cartService.js` - Cart API
- `frontend/src/services/orderService.js` - Order API
- `frontend/src/services/adminService.js` - Admin API
- `frontend/src/context/AuthContext.jsx` - Auth state
- `frontend/src/context/CartContext.jsx` - Cart state
- `frontend/src/components/Navbar.jsx` - Amazon-style navbar
- `frontend/src/components/Navbar.css` - Navbar styles
- `frontend/src/components/Footer.jsx` - Footer
- `frontend/src/components/Footer.css` - Footer styles
- `frontend/src/components/ProductCard.jsx` - Product card
- `frontend/src/components/ProductCard.css` - Card styles
- `frontend/src/components/SearchBar.jsx` - Search component
- `frontend/src/components/CategoryFilter.jsx` - Category filter
- `frontend/src/components/CategoryFilter.css` - Filter styles
- `frontend/src/components/ProtectedRoute.jsx` - Route protection
- `frontend/src/pages/Home.jsx` - Homepage
- `frontend/src/pages/Home.css` - Home styles
- `frontend/src/pages/Login.jsx` - Login page
- `frontend/src/pages/Signup.jsx` - Signup page
- `frontend/src/pages/Auth.css` - Auth styles
- `frontend/src/pages/Products.jsx` - Product listing
- `frontend/src/pages/Products.css` - Products styles
- `frontend/src/pages/ProductDetail.jsx` - Product details
- `frontend/src/pages/ProductDetail.css` - Detail styles
- `frontend/src/pages/Cart.jsx` - Shopping cart
- `frontend/src/pages/Cart.css` - Cart styles
- `frontend/src/pages/Checkout.jsx` - Checkout with Stripe
- `frontend/src/pages/Checkout.css` - Checkout styles
- `frontend/src/pages/AdminDashboard.jsx` - Admin dashboard
- `frontend/src/pages/AdminProducts.jsx` - Product management
- `frontend/src/pages/AdminOrders.jsx` - Order management
- `frontend/src/pages/Admin.css` - Admin styles

## Features Implemented

✅ User Authentication (Signup/Login)
✅ Amazon-style UI with proper colors
✅ 70+ Products across categories
✅ Add to Cart / Remove from Cart
✅ Search functionality
✅ Category filtering
✅ Product details page
✅ Shopping cart page
✅ Stripe payment integration
✅ Order creation
✅ Admin dashboard
✅ Product management (CRUD)
✅ Order management
✅ Responsive design

## Next Steps

1. Set up Stripe account and add API keys
2. Create an admin user
3. Test the full user flow
4. Customize products and categories as needed

