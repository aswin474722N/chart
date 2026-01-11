# Amazon-Like E-Commerce Platform

A full-stack e-commerce platform built with React and Node.js/Express, featuring Amazon-style UI, authentication, shopping cart, Stripe payments, and admin dashboard.

## Features

- ✅ User Authentication (Signup/Login with JWT)
- ✅ Amazon-style UI Design
- ✅ Product Catalog (70+ products across multiple categories)
- ✅ Shopping Cart (Add/Remove items)
- ✅ Search Functionality
- ✅ Category Filtering
- ✅ Product Details Page
- ✅ Stripe Payment Integration
- ✅ Order Management
- ✅ Admin Dashboard
- ✅ Product Management (CRUD)
- ✅ Order Management (Admin)
- ✅ Responsive Design

## Product Categories

### Gadgets
- Mobile Phones (10 products)
- Laptops (10 products)
- Watches (10 products)
- Headphones (3 products)
- Airbuds (10 products)
- Power Banks (5 products)

### Home Appliances
- Fridges (5 products)
- TVs (5 products)
- Washing Machines (5 products)
- Heaters (5 products)
- Water Filters (5 products)

## Tech Stack

### Frontend
- React 18
- React Router DOM
- Axios
- Stripe.js
- Vite

### Backend
- Node.js
- Express
- JWT (jsonwebtoken)
- bcryptjs
- Stripe
- JSON file-based storage

## Project Structure

```
chart/
├── backend/              # Express API
│   ├── config/         # Configuration files
│   ├── controllers/     # Business logic
│   ├── data/            # JSON database files
│   ├── middleware/      # Auth & validation
│   ├── models/          # Data models
│   ├── routes/          # API routes
│   └── server.js        # Server entry point
├── frontend/            # React application
│   ├── public/
│   └── src/
│       ├── components/ # Reusable components
│       ├── context/    # React Context
│       ├── pages/      # Page components
│       ├── services/   # API services
│       └── utils/      # Utilities
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file in backend directory:
```env
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
PORT=5000
FRONTEND_URL=http://localhost:5173
```

4. Start the backend server:
```bash
npm start
# or for development with auto-reload
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file in frontend directory (optional):
```env
VITE_API_URL=http://localhost:5000/api
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
```

4. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## Usage

### Creating an Admin User

To create an admin user, you can either:
1. Manually edit `backend/data/users.json` and set `role: "admin"` for a user
2. Or modify the signup controller to allow admin creation

### Stripe Setup

1. Sign up for a Stripe account at https://stripe.com
2. Get your API keys from the Stripe Dashboard
3. Add them to your `.env` files (backend and frontend)
4. For testing, use Stripe test mode keys (starting with `sk_test_` and `pk_test_`)

### Testing Payments

Use Stripe test card numbers:
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`
- Use any future expiry date and any CVC

## API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Products
- `GET /api/products` - Get all products (supports query params: category, subcategory, search)
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (Admin only)
- `PUT /api/products/:id` - Update product (Admin only)
- `DELETE /api/products/:id` - Delete product (Admin only)

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:productId` - Update cart item quantity
- `DELETE /api/cart/:productId` - Remove item from cart
- `DELETE /api/cart` - Clear cart

### Orders
- `POST /api/orders/create-payment-intent` - Create Stripe payment intent
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get order by ID

### Admin
- `GET /api/admin/dashboard` - Get dashboard stats
- `GET /api/admin/orders` - Get all orders
- `PUT /api/admin/orders/:id/status` - Update order status
- `GET /api/admin/users` - Get all users

## Features in Detail

### Authentication
- JWT-based authentication
- Password hashing with bcrypt
- Protected routes (frontend & backend)
- Session persistence

### Shopping Cart
- Add/remove items
- Quantity updates
- Cart persistence (localStorage + backend)
- Real-time cart updates

### Search & Filter
- Real-time search across product name, description, category
- Category filtering (Gadgets/Home Appliances)
- Subcategory filtering
- Search results highlighting

### Payments
- Stripe Checkout integration
- Secure payment processing
- Order creation after successful payment
- Order history for users

### Admin Dashboard
- Dashboard statistics
- Product CRUD operations
- Order management
- User management
- Analytics overview

## Development

### Running in Development Mode

Backend:
```bash
cd backend
npm run dev
```

Frontend:
```bash
cd frontend
npm run dev
```

### Building for Production

Backend:
```bash
cd backend
npm start
```

Frontend:
```bash
cd frontend
npm run build
npm run preview
```

## Notes

- The application uses JSON files for data storage (can be upgraded to MongoDB/PostgreSQL)
- Product images use placeholder services (Unsplash)
- Stripe is configured for test mode by default
- All passwords are hashed using bcrypt
- JWT tokens expire after 7 days

## License

This project is for educational purposes.

