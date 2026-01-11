# Quick Start Guide

## Prerequisites
- Node.js (v16 or higher) - [Download](https://nodejs.org/)
- npm (comes with Node.js)

## Step 1: Install Backend Dependencies

Open a terminal in the project root and run:

```bash
cd backend
npm install
```

## Step 2: Create Backend Environment File

Create a `.env` file in the `backend` folder:

**Windows (PowerShell):**
```powershell
cd backend
@"
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
PORT=5000
FRONTEND_URL=http://localhost:5173
"@ | Out-File -FilePath .env -Encoding utf8
```

**Windows (CMD) or Mac/Linux:**
```bash
cd backend
cat > .env << EOF
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
PORT=5000
FRONTEND_URL=http://localhost:5173
EOF
```

Or manually create `backend/.env` with:
```
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
PORT=5000
FRONTEND_URL=http://localhost:5173
```

## Step 3: Start Backend Server

In the `backend` folder, run:

```bash
npm start
```

Or for development with auto-reload:
```bash
npm run dev
```

You should see:
```
Server is running on port 5000
Environment: development
```

**Keep this terminal open!**

## Step 4: Install Frontend Dependencies

Open a **NEW terminal** (keep backend running) and run:

```bash
cd frontend
npm install
```

## Step 5: Create Frontend Environment File (Optional)

Create a `.env` file in the `frontend` folder:

**Windows (PowerShell):**
```powershell
cd frontend
@"
VITE_API_URL=http://localhost:5000/api
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
"@ | Out-File -FilePath .env -Encoding utf8
```

**Windows (CMD) or Mac/Linux:**
```bash
cd frontend
cat > .env << EOF
VITE_API_URL=http://localhost:5000/api
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
EOF
```

Or manually create `frontend/.env` with:
```
VITE_API_URL=http://localhost:5000/api
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
```

## Step 6: Start Frontend Server

In the `frontend` folder, run:

```bash
npm run dev
```

You should see:
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
```

## Step 7: Access the Application

Open your browser and go to:
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000/api/health

## Quick Test

1. Go to http://localhost:5173
2. Click "Sign up" to create an account
3. Browse products
4. Add items to cart
5. Test the checkout (use Stripe test card: `4242 4242 4242 4242`)

## Troubleshooting

### Port Already in Use
If port 5000 or 5173 is already in use:
- Backend: Change `PORT=5000` in `backend/.env` to another port (e.g., `PORT=5001`)
- Frontend: Vite will automatically use the next available port

### Module Not Found Errors
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Backend Not Starting
- Make sure you're in the `backend` folder
- Check that `.env` file exists
- Verify Node.js version: `node --version` (should be v16+)

### Frontend Not Connecting to Backend
- Verify backend is running on port 5000
- Check `VITE_API_URL` in `frontend/.env`
- Check browser console for errors

### Stripe Errors
- For testing, you can use dummy keys (the app will work but payments won't process)
- To enable payments, sign up at https://stripe.com and get test keys

## Running Both Servers

You need **2 terminals**:

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

## Production Build

To build for production:

**Frontend:**
```bash
cd frontend
npm run build
npm run preview
```

**Backend:**
```bash
cd backend
npm start
```

