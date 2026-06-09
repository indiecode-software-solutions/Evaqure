import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { PRODUCTS } from '../constants/products';
import { ProductCard } from '../components/ProductCard';
import './Homepage.css';
const CLOUDINARY_BASE = "https://res.cloudinary.com/dtx3jvozs/image/upload/f_auto,q_auto/Evaqure";

const labProductsImage = `${CLOUDINARY_BASE}/lab_products.png`;
const modelImage = `${CLOUDINARY_BASE}/model.png`;
const serum1 = `${CLOUDINARY_BASE}/serum_1.png`;
const heroImage = `${CLOUDINARY_BASE}/hero_banner.png`;
const moisturizerBanner = `${CLOUDINARY_BASE}/moisturizer_banner.png`;
const toner1 = `${CLOUDINARY_BASE}/toner_1.png`;
const heritageImage = `${CLOUDINARY_BASE}/heritage_image.png`;
const moment1 = `${CLOUDINARY_BASE}/Moment_1.png`;
const moment2 = `${CLOUDINARY_BASE}/Moment_2.png`;
const moment3 = `${CLOUDINARY_BASE}/Moment_3.png`;
const moment4 = `${CLOUDINARY_BASE}/Moment_4.png`;
const moment5 = `${CLOUDINARY_BASE}/Moment_5.png`;
const moment6 = `${CLOUDINARY_BASE}/Moment_6.png`;
const moment7 = `${CLOUDINARY_BASE}/Moment_7.png`;

export const Homepage: React.FC = () => {
  const { navigateTo, setSelectedCategory } = useApp();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Classics Auto-Slider State
  const [sliderIndex, setSliderIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const bestSellers = PRODUCTS.filter((p) => p.bestSeller);

  const visibleCount = windowWidth > 992 ? 3 : windowWidth > 576 ? 2 : 1;
  const extendedBestSellers = [...bestSellers, ...bestSellers.slice(0, visibleCount)];

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setSliderIndex((prev) => prev + 1);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  // Handle wrapping around without reverse transition animation
  useEffect(() => {
    if (sliderIndex === bestSellers.length) {
      const resetTimer = setTimeout(() => {
        setIsTransitioning(false);
        setSliderIndex(0);
      }, 600);
      return () => clearTimeout(resetTimer);
    }
  }, [sliderIndex, bestSellers.length]);

  const testimonials = [
    {
      quote: "Evaqure has completely transformed my skin health. The texture of the Daily Balance Moisturizer is like silk, and the Hydra Glow Serum gives a truly radiant glow.",
      author: "Aanya Sharma, Mumbai"
    },
    {
      quote: "The Rice Milky Essence Toner feels incredibly nourishing, leaving my skin balanced and hydrated without any tightness. The ultimate dermatological luxury.",
      author: "Diya Patel, Bengaluru"
    }
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <div className="homepage">
      {/* Premium Hero Banner */}
      <section className="hero-banner">
        <div className={`hero-slide ${currentSlide === 0 ? 'active' : ''}`}>
          <img
            src={modelImage}
            alt="Evaqure Skincare Model Background"
            className="hero-bg-image"
          />
        </div>

        <div className={`hero-slide ${currentSlide === 1 ? 'active' : ''}`}>
          <img
            src={heroImage}
            alt="Evaqure Skincare Atmosphere Background"
            className="hero-bg-image"
          />
        </div>

        <div className={`hero-slide ${currentSlide === 2 ? 'active' : ''}`}>
          <img
            src={labProductsImage}
            alt="Evaqure Skincare Collection Background"
            className="hero-bg-image"
          />
        </div>
        <div className="hero-overlay" />
        <div className="container">
          <div className="hero-content">
            <span className="hero-subtitle">La Maison Evaqure</span>
            <h1 className="hero-title">
              Cellular Science. <span>Sartorial</span> Skincare.
            </h1>
            <p className="hero-description">
              Explore an editorial collection of active botanical serums, nourishing restorative creams, and balancing essence toners. Crafted by hand. Defined by dermatological luxury.
            </p>
            <div className="hero-actions">
              <button className="btn-primary" onClick={() => navigateTo('shop')}>
                Explore Shop
              </button>
              <button className="btn-secondary" onClick={() => navigateTo('about')}>
                Our Heritage
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="home-section container">
        <div className="section-header">
          <span className="section-subtitle">Curated Chapters</span>
          <h2 className="section-title">Shop by Category</h2>
        </div>

        <div className="categories-grid">
          {/* Serums */}
          <div className="category-card" onClick={() => { setSelectedCategory('Serums'); navigateTo('shop'); }}>
            <img
              src={serum1}
              alt="Serums Collection"
              className="category-card-image"
            />
            <div className="category-card-overlay" />
            <div className="category-card-content">
              <h3>Serums</h3>
              <span className="btn-underline">Discover</span>
            </div>
          </div>

          {/* Moisturizers */}
          <div className="category-card" onClick={() => { setSelectedCategory('Moisturizers'); navigateTo('shop'); }}>
            <img
              src={moisturizerBanner}
              alt="Moisturizers Collection"
              className="category-card-image"
            />
            <div className="category-card-overlay" />
            <div className="category-card-content">
              <h3>Moisturizers</h3>
              <span className="btn-underline">Discover</span>
            </div>
          </div>

          {/* Toners */}
          <div className="category-card" onClick={() => { setSelectedCategory('Toners'); navigateTo('shop'); }}>
            <img
              src={toner1}
              alt="Toners Collection"
              className="category-card-image"
            />
            <div className="category-card-overlay" />
            <div className="category-card-content">
              <h3>Toners</h3>
              <span className="btn-underline">Discover</span>
            </div>
          </div>
        </div>
      </section>



      {/* Brand Story Section */}
      <section className="home-section container">
        <div className="brand-story-wrapper">
          <div className="brand-story-text">
            <span className="section-subtitle">Our Heritage</span>
            <h2 className="section-title" style={{ fontSize: '2.5rem', marginBottom: 'var(--space-sm)' }}>
              Botanical alchemy, guided by cellular science.
            </h2>
            <p>
              Evaqure is born from a desire to escape the synthetic cycles of modern cosmetics. We partner exclusively with sustainable organic growers across India—sourcing pure Rice Extract from South India and wild Centella Asiatica from the Western Ghats—to formulate treatments that truly restore.
            </p>
            <p>
              Each formulation is developed in quiet intervals to preserve active enzyme structures, ensuring that every application is a fresh, biocompatible ritual for your skin.
            </p>
            <button
              className="btn-underline"
              onClick={() => navigateTo('about')}
              style={{ alignSelf: 'flex-start', marginTop: 'var(--space-md)' }}
            >
              Read the Manifesto
            </button>
          </div>
          <div className="brand-story-media">
            <img
              src={heritageImage}
              alt="Evaqure Skincare Heritage"
            />
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="home-section container">
        <div className="section-header">
          <span className="section-subtitle">Most Coveted</span>
          <h2 className="section-title">House Classics</h2>
        </div>

        <div className="classics-carousel-container">
          <div
            className="classics-slider-track"
            style={{
              transform: `translateX(-${sliderIndex * (100 / visibleCount)}%)`,
              transition: isTransitioning ? 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none'
            }}
          >
            {extendedBestSellers.map((product, idx) => (
              <div className="classics-slider-item" key={`${product.id}-clone-${idx}`}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="home-section container" style={{ backgroundColor: 'var(--color-bg-offset)', border: 'none' }}>
        <div className="testimonial-carousel">
          <div className="testimonial-slide">
            <span className="section-subtitle">Patron Reflections</span>
            <blockquote className="testimonial-quote">
              "{testimonials[currentTestimonial].quote}"
            </blockquote>
            <cite className="testimonial-author">
              {testimonials[currentTestimonial].author}
            </cite>
            <button
              onClick={nextTestimonial}
              style={{
                marginTop: 'var(--space-md)',
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--color-accent-dark)',
              }}
            >
              Next Reflection &rarr;
            </button>
          </div>
        </div>
      </section>

      {/* Instagram Gallery */}
      <section className="home-section" style={{ borderBottom: 'none', paddingBottom: 0 }}>
        <div className="container" style={{ marginBottom: 'var(--space-xl)' }}>
          <div className="section-header" style={{ marginBottom: 'var(--space-lg)' }}>
            <span className="section-subtitle">Social Canvas</span>
            <h2 className="section-title">Shared Moments</h2>
          </div>
        </div>

        <div className="moments-marquee-container">
          <div className="moments-marquee-track">
            {/* First Set of 7 Moments */}
            <div className="moments-marquee-item">
              <img src={moment1} alt="Shared Moment 1" />
              <div className="moments-marquee-item-overlay">@evaqure</div>
            </div>
            <div className="moments-marquee-item">
              <img src={moment2} alt="Shared Moment 2" />
              <div className="moments-marquee-item-overlay">@evaqure</div>
            </div>
            <div className="moments-marquee-item">
              <img src={moment3} alt="Shared Moment 3" />
              <div className="moments-marquee-item-overlay">@evaqure</div>
            </div>
            <div className="moments-marquee-item">
              <img src={moment4} alt="Shared Moment 4" />
              <div className="moments-marquee-item-overlay">@evaqure</div>
            </div>
            <div className="moments-marquee-item">
              <img src={moment5} alt="Shared Moment 5" />
              <div className="moments-marquee-item-overlay">@evaqure</div>
            </div>
            <div className="moments-marquee-item">
              <img src={moment6} alt="Shared Moment 6" />
              <div className="moments-marquee-item-overlay">@evaqure</div>
            </div>
            <div className="moments-marquee-item">
              <img src={moment7} alt="Shared Moment 7" />
              <div className="moments-marquee-item-overlay">@evaqure</div>
            </div>

            {/* Cloned Set of 7 Moments for Seamless Loop */}
            <div className="moments-marquee-item">
              <img src={moment1} alt="Shared Moment 1" />
              <div className="moments-marquee-item-overlay">@evaqure</div>
            </div>
            <div className="moments-marquee-item">
              <img src={moment2} alt="Shared Moment 2" />
              <div className="moments-marquee-item-overlay">@evaqure</div>
            </div>
            <div className="moments-marquee-item">
              <img src={moment3} alt="Shared Moment 3" />
              <div className="moments-marquee-item-overlay">@evaqure</div>
            </div>
            <div className="moments-marquee-item">
              <img src={moment4} alt="Shared Moment 4" />
              <div className="moments-marquee-item-overlay">@evaqure</div>
            </div>
            <div className="moments-marquee-item">
              <img src={moment5} alt="Shared Moment 5" />
              <div className="moments-marquee-item-overlay">@evaqure</div>
            </div>
            <div className="moments-marquee-item">
              <img src={moment6} alt="Shared Moment 6" />
              <div className="moments-marquee-item-overlay">@evaqure</div>
            </div>
            <div className="moments-marquee-item">
              <img src={moment7} alt="Shared Moment 7" />
              <div className="moments-marquee-item-overlay">@evaqure</div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Full Banner Section */}
      <section className="newsletter-banner">
        <div className="container">
          <div className="newsletter-banner-content">
            <span className="section-subtitle">Exclusive Society</span>
            <h2>Join the Inner Circle</h2>
            <p>
              Gain priority notification of new capsule releases, private collection launches, and direct updates from our laboratory.
            </p>
            <form onSubmit={handleSubscribe} className="newsletter-form-home">
              <input
                type="email"
                placeholder={subscribed ? "Subscription confirmed" : "Your email address"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={subscribed}
                required
              />
              <button type="submit" className="btn-primary" disabled={subscribed}>
                {subscribed ? "Subscribed" : "Subscribe"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Homepage;
