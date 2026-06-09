import React, { useState } from 'react';
import './ContactPage.css';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "Where do you ship from?",
      a: "All orders are hand-inspected and shipped directly from our primary research laboratory in Bengaluru, India."
    },
    {
      q: "How long does domestic delivery take?",
      a: "We offer complimentary express shipping across India. Shipments to major metros (Mumbai, Delhi, Bengaluru, Chennai) arrive in 2-3 business days. Other regions take 3-5 business days."
    },
    {
      q: "Are the formulations completely natural?",
      a: "Evaqure focuses on clinical biocompatible skincare. We blend active organic botanical extracts (like South Indian Rice Extract and Matcha Green Tea) with high-efficacy, dermatologically-safe actives (like Niacinamide, Ceramides, and Peptides) to deliver maximum results without barrier irritation."
    },
    {
      q: "What is the shelf life of the products?",
      a: "Since we prioritize fresh active botanical ingredients and avoid heavy synthetic stabilizers, our products have a shelf life of 12 months from manufacture, and are best enjoyed within 6 months of opening."
    }
  ];

  return (
    <div className="contact-page container">
      <div className="contact-layout">
        {/* Left Column: Info & Locations */}
        <div className="contact-info-col reveal-left">
          <span className="section-subtitle">Client Services</span>
          <h1>Get in Touch</h1>
          <p>
            Our concierge team is available to assist you with personalized skincare curations, tracking order shipments, or scheduling private appointments at one of our showrooms.
          </p>

          <div className="contact-details-grid">
            <div className="boutique-card reveal reveal-delay-1">
              <h3>Direct Contacts</h3>
              <p>Client Concierge: care@evaqure.com</p>
              <p>Bespoke Inquiries: private@evaqure.com</p>
              <p>Tel: +91 80 4960 1200</p>
            </div>

            <div className="boutique-card reveal reveal-delay-2">
              <h3>Bengaluru Laboratory</h3>
              <p>12 Rajajinagar Industrial Area</p>
              <p>Bengaluru, KA 560010</p>
              <p>Mon &mdash; Sat, 09:00 &mdash; 18:00</p>
            </div>

            <div className="boutique-card reveal reveal-delay-3">
              <h3>Mumbai Space</h3>
              <p>Juhu Tara Road, Juhu</p>
              <p>Mumbai, MH 400049</p>
              <p>By Appointment Only</p>
            </div>

            <div className="boutique-card reveal reveal-delay-4">
              <h3>New Delhi Atelier</h3>
              <p>One Style Mile, Mehrauli</p>
              <p>New Delhi, DL 110030</p>
              <p>Mon &mdash; Sat, 11:00 &mdash; 19:00</p>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="contact-form-col reveal-right">
          <h2>Private Inquiry</h2>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: 'var(--space-xl) 0' }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent-dark)" strokeWidth="1.5" style={{ marginBottom: 'var(--space-md)' }}>
                <circle cx="12" cy="12" r="10" />
                <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <h3>Message Received</h3>
              <p style={{ marginTop: 'var(--space-xs)' }}>
                Thank you for reaching out. A client services representative will contact you within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">How can we assist you?</label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                />
              </div>
              <button type="submit" className="btn-primary" style={{ marginTop: 'var(--space-sm)' }}>
                Submit Inquiry
              </button>
            </form>
          )}
        </div>
      </div>

      {/* FAQ Accordion */}
      <section className="faq-section reveal">
        <span className="section-subtitle" style={{ display: 'block', textAlign: 'center', marginBottom: 'var(--space-xs)' }}>
          Assistance Directory
        </span>
        <h2>Frequently Asked Questions</h2>
        
        <div className="faq-accordion">
          {faqs.map((faq, index) => (
            <div className="accordion-item" key={index}>
              <button className="accordion-header" onClick={() => toggleFaq(index)}>
                {faq.q}
                <span>{openFaq === index ? '−' : '+'}</span>
              </button>
              <div
                className={`accordion-content ${openFaq === index ? 'open' : ''}`}
                style={{ maxHeight: openFaq === index ? '150px' : '0' }}
              >
                <p>{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
export default ContactPage;
