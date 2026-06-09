import React from 'react';
const CLOUDINARY_BASE = "https://res.cloudinary.com/dtx3jvozs/image/upload/f_auto,q_auto/Evaqure";

const heritageImage = `${CLOUDINARY_BASE}/heritage_image.png`;
const honestImpressions = `${CLOUDINARY_BASE}/honest_impressions.png`;
const modelImage = `${CLOUDINARY_BASE}/model.png`;
import './AboutPage.css';

export const AboutPage: React.FC = () => {
  return (
    <div className="about-page container">
      {/* Editorial Hero Title */}
      <section className="about-hero reveal">
        <span className="section-subtitle" style={{ marginBottom: 'var(--space-xs)', display: 'block' }}>
          Our Heritage
        </span>
        <h1>Scientific Precision. Botanical Integrity.</h1>
        <p>
          Established in 2024, Evaqure is a luxury dermatological house founded on the principles of slow formulation, botanical purity, and advanced cellular science.
        </p>
      </section>

      {/* Split Section 1 */}
      <section className="about-split-section">
        <div className="about-text-content reveal-left">
          <span className="section-subtitle">Generational Sourcing</span>
          <h2>Ethical Indian Cultivation</h2>
          <p>
            We believe that the finest skincare formulations begin with the soil. We trace our active botanical ingredients to their origin: our nourishing organic Rice Extract is grown in sustainable estates in South India, our wild Centella Asiatica is ethically harvested from the Western Ghats, and our pure Betaine is extracted from organic beets.
          </p>
          <p>
            By supporting local farming cooperatives and utilizing advanced clean extraction methods, we deliver premium skin nutrition that respects both nature and the skin barrier.
          </p>
        </div>
        <div className="about-image-container reveal-right">
          <img
            src={heritageImage}
            alt="Evaqure Skincare Heritage"
          />
        </div>
      </section>

      {/* Founder's Vision Section */}
      <section className="founder-vision-section">
        <div className="founder-vision-container">
          <div className="founder-portrait-column reveal-left">
            <div className="founder-image-frame">
              <img src={modelImage} alt="Khushnuma Rayeen, Founder of Evaqure" />
              <div className="frame-accent-border"></div>
            </div>
          </div>
          <div className="founder-letter-column reveal-right">
            <span className="section-subtitle">Founder's Journal</span>
            <h2>"Skincare is an act of preservation, not correction."</h2>
            <div className="founder-letter-body">
              <p>
                Evaqure was born out of a simple realization: in a world of complex skincare, the most powerful formulations are those that respect the skin's natural intelligence.
              </p>
              <p>
                Growing up, I watched the women in my family extract pure botanical essences from rice water and wild herbs. Years later, my goal was to bridge this heritage of raw botanical purity with the highest standards of modern dermatological science.
              </p>
              <p>
                Our formulas are created slowly, with absolute intention. We do not design products to provide temporary fixes, but to nourish and build your skin's cellular resilience for a lifetime.
              </p>
            </div>
            <div className="founder-signature-block">
              <div className="founder-signature">Khushnuma Rayeen</div>
              <div className="founder-meta">
                <span className="founder-name-label">Khushnuma Rayeen</span>
                <span className="founder-title-label">Founder & Formulator</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Split Section 2 */}
      <section className="about-split-section reverse">
        <div className="about-image-container reveal-left">
          <img
            src={honestImpressions}
            alt="Evaqure Skincare Packaging"
          />
        </div>
        <div className="about-text-content reveal-right">
          <span className="section-subtitle">Conscious Luxury</span>
          <h2>Honest Intentions</h2>
          <p>
            Evaqure rejects synthetic fillers, parabens, and harsh artificial fragrances. We design our formulas to support long-term skin barrier health, serving as permanent additions to a balanced, daily self-care ritual.
          </p>
          <p>
            Our frosted glass packaging is premium, reusable, and infinitely recyclable, encased in minimal FSC-certified paper packaging that is fully biodegradable.
          </p>
        </div>
      </section>
    </div>
  );
};
export default AboutPage;
