import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useCart } from '../context/CartContext';
import { createPaymentIntent, createOrder } from '../services/orderService';
import { STRIPE_PUBLISHABLE_KEY } from '../utils/constants';
import './Checkout.css';

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = ({ cart, total, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [shippingAddress, setShippingAddress] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'US'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError('');

    try {
      // Create payment intent
      const { clientSecret } = await createPaymentIntent({
        items: cart.map(item => ({
          productId: item.productId,
          quantity: item.quantity
        })),
        shippingAddress
      });

      // Confirm payment
      const { error: paymentError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: shippingAddress.name,
            address: {
              line1: shippingAddress.address,
              city: shippingAddress.city,
              state: shippingAddress.state,
              postal_code: shippingAddress.zip,
              country: shippingAddress.country
            }
          }
        }
      });

      if (paymentError) {
        setError(paymentError.message);
        setLoading(false);
        return;
      }

      if (paymentIntent.status === 'succeeded') {
        // Create order
        await createOrder({
          items: cart.map(item => ({
            productId: item.productId,
            quantity: item.quantity
          })),
          shippingAddress,
          paymentMethod: 'card',
          stripePaymentId: paymentIntent.id
        });

        onSuccess();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Payment failed');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="checkout-form">
      <div className="checkout-section">
        <h2>Shipping Address</h2>
        <div className="form-row">
          <input
            type="text"
            placeholder="Full Name"
            value={shippingAddress.name}
            onChange={(e) => setShippingAddress({ ...shippingAddress, name: e.target.value })}
            required
          />
        </div>
        <div className="form-row">
          <input
            type="text"
            placeholder="Address"
            value={shippingAddress.address}
            onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
            required
          />
        </div>
        <div className="form-row">
          <input
            type="text"
            placeholder="City"
            value={shippingAddress.city}
            onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="State"
            value={shippingAddress.state}
            onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="ZIP Code"
            value={shippingAddress.zip}
            onChange={(e) => setShippingAddress({ ...shippingAddress, zip: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="checkout-section">
        <h2>Payment Information</h2>
        <div className="card-element-container">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
              },
            }}
          />
        </div>
      </div>

      {error && <div className="error">{error}</div>}

      <div className="checkout-summary">
        <div className="summary-row">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <button type="submit" className="btn-primary" disabled={!stripe || loading}>
          {loading ? 'Processing...' : `Pay $${total.toFixed(2)}`}
        </button>
      </div>
    </form>
  );
};

const Checkout = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [orderSuccess, setOrderSuccess] = useState(false);

  useEffect(() => {
    if (cart.length === 0 && !orderSuccess) {
      navigate('/cart');
    }
  }, [cart, navigate, orderSuccess]);

  const handleOrderSuccess = () => {
    clearCart();
    setOrderSuccess(true);
    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  if (orderSuccess) {
    return (
      <div className="checkout-page">
        <div className="container">
          <div className="order-success">
            <h1>Order Placed Successfully!</h1>
            <p>Thank you for your purchase. You will receive a confirmation email shortly.</p>
            <p>Redirecting to home page...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="container">
        <h1>Checkout</h1>
        <div className="checkout-layout">
          <div className="checkout-main">
            <Elements stripe={stripePromise}>
              <CheckoutForm
                cart={cart}
                total={getCartTotal()}
                onSuccess={handleOrderSuccess}
              />
            </Elements>
          </div>
          <div className="checkout-sidebar">
            <h2>Order Summary</h2>
            {cart.map(item => (
              <div key={item.productId} className="checkout-item">
                <img src={item.image} alt={item.name} />
                <div>
                  <h4>{item.name}</h4>
                  <p>Qty: {item.quantity} × ${item.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
            <div className="checkout-total">
              <strong>Total: ${getCartTotal().toFixed(2)}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

