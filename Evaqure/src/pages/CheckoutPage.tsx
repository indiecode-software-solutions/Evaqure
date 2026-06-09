import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import './CheckoutPage.css';

export const CheckoutPage: React.FC = () => {
  const { cart, cartTotal, clearCart, navigateTo } = useApp();

  // Form Fields State
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [phone, setPhone] = useState('');
  
  // Payment State
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod'>('upi');
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  
  // Checkout Status State
  const [isOrdering, setIsOrdering] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

  // Validation errors
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const tempErrors: { [key: string]: string } = {};
    if (!email) tempErrors.email = 'Email address is required';
    else if (!/\S+@\S+\.\S+/.test(email)) tempErrors.email = 'Invalid email address';
    
    if (!firstName) tempErrors.firstName = 'First name is required';
    if (!lastName) tempErrors.lastName = 'Last name is required';
    if (!address) tempErrors.address = 'Shipping address is required';
    if (!city) tempErrors.city = 'City is required';
    if (!state) tempErrors.state = 'State is required';
    if (!pincode) tempErrors.pincode = 'PIN Code is required';
    else if (!/^\d{6}$/.test(pincode)) tempErrors.pincode = 'PIN Code must be exactly 6 digits';
    
    if (!phone) tempErrors.phone = 'Phone number is required';
    else if (!/^\d{10}$/.test(phone)) tempErrors.phone = 'Phone number must be exactly 10 digits';

    if (paymentMethod === 'upi') {
      if (!upiId) tempErrors.upiId = 'UPI ID is required';
      else if (!upiId.includes('@')) tempErrors.upiId = 'Invalid UPI ID format (must contain @)';
    } else if (paymentMethod === 'card') {
      if (!cardNumber) tempErrors.cardNumber = 'Card number is required';
      else if (cardNumber.replace(/\s/g, '').length < 16) tempErrors.cardNumber = 'Card number must be 16 digits';
      
      if (!cardExpiry) tempErrors.cardExpiry = 'Expiry date is required';
      else if (!/^\d{2}\/\d{2}$/.test(cardExpiry)) tempErrors.cardExpiry = 'Use MM/YY format';
      
      if (!cardCvv) tempErrors.cardCvv = 'CVV is required';
      else if (cardCvv.length < 3) tempErrors.cardCvv = 'Invalid CVV';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsOrdering(true);
    // Simulate payment transaction wait
    setTimeout(() => {
      setIsOrdering(false);
      const generatedId = 'EQ-' + Math.floor(100000 + Math.random() * 900000);
      setOrderId(generatedId);
    }, 2000);
  };

  const handleFinishCheckout = () => {
    clearCart();
    navigateTo('home');
  };

  if (cart.length === 0 && !orderId) {
    return (
      <div className="checkout-empty-page container">
        <div className="checkout-empty-content">
          <h2>Checkout</h2>
          <p>Your shopping bag is empty. Add some products before checking out.</p>
          <button className="btn-primary" onClick={() => navigateTo('shop')}>
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page container">
      {/* Editorial Title */}
      <div className="checkout-header-block">
        <span className="section-subtitle">Secure Transaction</span>
        <h1>Evaqure Checkout</h1>
      </div>

      <div className="checkout-layout-grid">
        {/* Left Column: Form details */}
        <div className="checkout-form-panel">
          <form onSubmit={handlePlaceOrder} noValidate>
            {/* Step 1: Customer Info */}
            <div className="checkout-form-section">
              <h3 className="section-step-title"><span>01</span> Contact Details</h3>
              <div className="form-row-single">
                <label htmlFor="checkout-email">Email Address</label>
                <input
                  id="checkout-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={errors.email ? 'input-error' : ''}
                  placeholder="name@domain.com"
                  required
                />
                {errors.email && <span className="error-text">{errors.email}</span>}
              </div>
            </div>

            {/* Step 2: Shipping Address */}
            <div className="checkout-form-section">
              <h3 className="section-step-title"><span>02</span> Delivery Address</h3>
              
              <div className="form-row-double">
                <div>
                  <label htmlFor="checkout-first-name">First Name</label>
                  <input
                    id="checkout-first-name"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className={errors.firstName ? 'input-error' : ''}
                    placeholder="First Name"
                    required
                  />
                  {errors.firstName && <span className="error-text">{errors.firstName}</span>}
                </div>
                <div>
                  <label htmlFor="checkout-last-name">Last Name</label>
                  <input
                    id="checkout-last-name"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className={errors.lastName ? 'input-error' : ''}
                    placeholder="Last Name"
                    required
                  />
                  {errors.lastName && <span className="error-text">{errors.lastName}</span>}
                </div>
              </div>

              <div className="form-row-single">
                <label htmlFor="checkout-address">Street Address</label>
                <input
                  id="checkout-address"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className={errors.address ? 'input-error' : ''}
                  placeholder="Apartment, building, and street address"
                  required
                />
                {errors.address && <span className="error-text">{errors.address}</span>}
              </div>

              <div className="form-row-triple">
                <div>
                  <label htmlFor="checkout-city">City</label>
                  <input
                    id="checkout-city"
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className={errors.city ? 'input-error' : ''}
                    placeholder="City"
                    required
                  />
                  {errors.city && <span className="error-text">{errors.city}</span>}
                </div>
                <div>
                  <label htmlFor="checkout-state">State</label>
                  <input
                    id="checkout-state"
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className={errors.state ? 'input-error' : ''}
                    placeholder="State"
                    required
                  />
                  {errors.state && <span className="error-text">{errors.state}</span>}
                </div>
                <div>
                  <label htmlFor="checkout-pincode">PIN Code</label>
                  <input
                    id="checkout-pincode"
                    type="text"
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className={errors.pincode ? 'input-error' : ''}
                    placeholder="6 digits"
                    required
                  />
                  {errors.pincode && <span className="error-text">{errors.pincode}</span>}
                </div>
              </div>

              <div className="form-row-single">
                <label htmlFor="checkout-phone">Mobile Number</label>
                <input
                  id="checkout-phone"
                  type="text"
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={errors.phone ? 'input-error' : ''}
                  placeholder="10 digit number"
                  required
                />
                {errors.phone && <span className="error-text">{errors.phone}</span>}
              </div>
            </div>

            {/* Step 3: Payment Options */}
            <div className="checkout-form-section">
              <h3 className="section-step-title"><span>03</span> Payment Curation</h3>
              
              <div className="payment-options-grid">
                <button
                  type="button"
                  className={`payment-option-card ${paymentMethod === 'upi' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('upi')}
                >
                  <span className="payment-dot"></span>
                  UPI / Instant Transfer
                </button>
                <button
                  type="button"
                  className={`payment-option-card ${paymentMethod === 'card' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('card')}
                >
                  <span className="payment-dot"></span>
                  Credit / Debit Card
                </button>
                <button
                  type="button"
                  className={`payment-option-card ${paymentMethod === 'cod' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('cod')}
                >
                  <span className="payment-dot"></span>
                  Cash on Delivery (COD)
                </button>
              </div>

              <div className="payment-details-panel">
                {paymentMethod === 'upi' && (
                  <div className="payment-upi-details">
                    <label htmlFor="checkout-upi-id">UPI ID</label>
                    <input
                      id="checkout-upi-id"
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className={errors.upiId ? 'input-error' : ''}
                      placeholder="username@bank"
                    />
                    {errors.upiId && <span className="error-text">{errors.upiId}</span>}
                    <p className="payment-hint">Pay securely via your UPI app (GPay, PhonePe, BHIM, etc.)</p>
                  </div>
                )}

                {paymentMethod === 'card' && (
                  <div className="payment-card-details">
                    <div className="form-row-single">
                      <label htmlFor="checkout-card-number">Card Number</label>
                      <input
                        id="checkout-card-number"
                        type="text"
                        maxLength={19}
                        value={cardNumber}
                        onChange={(e) => {
                          // Format card numbers with spaces
                          const val = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
                          const matches = val.match(/\d{4,16}/g);
                          const match = (matches && matches[0]) || '';
                          const parts = [];
                          for (let i = 0, len = match.length; i < len; i += 4) {
                            parts.push(match.substring(i, i + 4));
                          }
                          setCardNumber(parts.length > 0 ? parts.join(' ') : val);
                        }}
                        className={errors.cardNumber ? 'input-error' : ''}
                        placeholder="4444 4444 4444 4444"
                      />
                      {errors.cardNumber && <span className="error-text">{errors.cardNumber}</span>}
                    </div>
                    <div className="form-row-double">
                      <div>
                        <label htmlFor="checkout-card-expiry">Expiry Date</label>
                        <input
                          id="checkout-card-expiry"
                          type="text"
                          maxLength={5}
                          value={cardExpiry}
                          onChange={(e) => {
                            let val = e.target.value.replace(/[^0-9]/g, '');
                            if (val.length >= 2) {
                              val = val.substring(0, 2) + '/' + val.substring(2, 4);
                            }
                            setCardExpiry(val);
                          }}
                          className={errors.cardExpiry ? 'input-error' : ''}
                          placeholder="MM/YY"
                        />
                        {errors.cardExpiry && <span className="error-text">{errors.cardExpiry}</span>}
                      </div>
                      <div>
                        <label htmlFor="checkout-card-cvv">CVV</label>
                        <input
                          id="checkout-card-cvv"
                          type="password"
                          maxLength={3}
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value.replace(/[^0-9]/g, ''))}
                          className={errors.cardCvv ? 'input-error' : ''}
                          placeholder="3 digits"
                        />
                        {errors.cardCvv && <span className="error-text">{errors.cardCvv}</span>}
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'cod' && (
                  <div className="payment-cod-details">
                    <p>No upfront payment needed. Pay in cash or cards to the delivery partner upon arrival.</p>
                    <p className="payment-hint">A verification code might be sent to your phone before dispatch.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Submission CTA */}
            <button
              type="submit"
              className="btn-primary checkout-submit-btn"
              disabled={isOrdering}
            >
              {isOrdering ? 'Processing Order...' : `Place Secure Order • ₹${cartTotal.toLocaleString('en-IN')}`}
            </button>
          </form>
        </div>

        {/* Right Column: Order Summary details */}
        <div className="checkout-summary-panel">
          <div className="summary-sticky-card">
            <h3>Your Curation</h3>
            
            <div className="checkout-items-list">
              {cart.map((item, idx) => (
                <div className="checkout-item-summary-card" key={idx}>
                  <div className="checkout-item-summary-thumb">
                    <img src={item.product.images[0]} alt={item.product.name} />
                    <span className="checkout-item-summary-qty">{item.quantity}</span>
                  </div>
                  <div className="checkout-item-summary-info">
                    <h4>{item.product.name}</h4>
                    <span className="checkout-item-summary-meta">
                      Color: {item.selectedColor}
                      {item.selectedSize && ` / Size: ${item.selectedSize}`}
                    </span>
                  </div>
                  <span className="checkout-item-summary-price">
                    ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>

            <div className="checkout-calculation-table">
              <div className="calculation-row">
                <span>Bag Subtotal</span>
                <span>₹{cartTotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="calculation-row">
                <span>Shipping</span>
                <span className="complimentary-badge">Complimentary</span>
              </div>
              <div className="calculation-row">
                <span>GST (Estimated)</span>
                <span>Included</span>
              </div>
              <div className="calculation-row grand-total">
                <span>Total Amount</span>
                <span>₹{cartTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>
            
            <div className="checkout-brand-seal">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <div>
                <h5>Evaqure Secure Guarantee</h5>
                <p>SSL Encryption & PCI-DSS Compliant transactions.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal Overlay */}
      {orderId && (
        <div className="order-success-overlay">
          <div className="order-success-modal">
            <div className="success-icon-badge">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                <path d="M22 4L12 14.01l-3-3" />
              </svg>
            </div>
            <h2>Order Placed Successfully</h2>
            <p className="order-success-id">Order Reference: <strong>{orderId}</strong></p>
            <p className="order-success-desc">
              Your skincare curation has been securely processed. A confirmation email and tracking link will be sent to <strong>{email}</strong> shortly.
            </p>
            <div className="order-delivery-eta">
              <h5>Estimated Delivery</h5>
              <p>Within 2–4 Business Days (Express Courier)</p>
            </div>
            <button className="btn-primary" onClick={handleFinishCheckout}>
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
