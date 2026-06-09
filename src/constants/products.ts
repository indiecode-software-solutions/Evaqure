const CLOUDINARY_BASE = "https://res.cloudinary.com/dtx3jvozs/image/upload/f_auto,q_auto/Evaqure";

const serum1 = `${CLOUDINARY_BASE}/serum_1.png`;
const serum2 = `${CLOUDINARY_BASE}/serum_2.png`;
const serum3 = `${CLOUDINARY_BASE}/serum_3.png`;
const serum4 = `${CLOUDINARY_BASE}/serum_4.png`;
const serum5 = `${CLOUDINARY_BASE}/serum_5.png`;
const serum6 = `${CLOUDINARY_BASE}/serum_6.png`;
const moisturizer1 = `${CLOUDINARY_BASE}/moisturizer_1.png`;
const moisturizer2 = `${CLOUDINARY_BASE}/moisturizer_2.png`;
const moisturizer3 = `${CLOUDINARY_BASE}/moisturizer_3.png`;
const toner1 = `${CLOUDINARY_BASE}/toner_1.png`;
const toner2 = `${CLOUDINARY_BASE}/toner_2.png`;
const toner3 = `${CLOUDINARY_BASE}/toner_3.png`;

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  reviewsCount: number;
  description: string;
  details: string[];
  images: string[];
  colors: { name: string; value: string }[];
  sizes?: string[];
  inStock: boolean;
  featured?: boolean;
  bestSeller?: boolean;
}

export const PRODUCTS: Product[] = [
  {
    id: "eq-01",
    name: "Hydra Glow Serum",
    category: "Serums",
    price: 349.00,
    rating: 4.9,
    reviewsCount: 142,
    description: "A powerful skin-refining serum formulated to visibly brighten skin tone, reduce the appearance of enlarged pores, and support a balanced, glowing complexion daily. Panthenol deeply hydrates while Zinc PCA regulates oil.",
    details: [
      "Key Actives: Niacinamide 10%, Zinc PCA 1%, Panthenol",
      "Purpose: Brightening, oil balance, pore appearance reduction, and daily glow",
      "Skin Types: Suitable for all skin types, including sensitive and congested",
      "Directions: Apply 3-4 drops onto damp, cleansed face and neck morning and night",
      "Free from synthetic fragrances, silicones, and parabens"
    ],
    images: [
      serum1
    ],
    colors: [
      { name: "Clear Gel", value: "#f6f8fa" }
    ],
    inStock: true,
    featured: true,
    bestSeller: true
  },
  {
    id: "eq-02",
    name: "Daily Balance Moisturizer",
    category: "Moisturizers",
    price: 399.00,
    rating: 4.8,
    reviewsCount: 96,
    description: "A lightweight everyday moisturizer designed to maintain healthy skin hydration without feeling heavy. It locks in moisture, supports the skin barrier, and improves skin softness.",
    details: [
      "Key Ingredients: Hyaluronic Acid, Ceramides, Panthenol (Vitamin B5), Glycerin",
      "Purpose: Lock in moisture, support skin barrier, reduce dryness, and improve softness",
      "Directions: Apply a dime-sized amount to clean face and neck morning and evening.",
      "Texture: Lightweight cream-gel, fast-absorbing and non-greasy"
    ],
    images: [
      moisturizer1
    ],
    colors: [
      { name: "Soft White Cream", value: "#ffffff" }
    ],
    sizes: ["50ml", "100ml"],
    inStock: true,
    featured: true,
    bestSeller: true
  },
  {
    id: "eq-04",
    name: "Rice Milky Essence Toner",
    category: "Toners",
    price: 349.00,
    rating: 4.9,
    reviewsCount: 88,
    description: "A nourishing milky essence toner infused with rice extract and skin-supporting ingredients to deliver long-lasting hydration, enhance radiance, and strengthen the skin barrier. Inspired by modern Korean skincare formulations, this lightweight essence toner helps replenish moisture after cleansing while preparing skin for the rest of your routine.",
    details: [
      "Tagline: Hydrate. Brighten. Nourish.",
      "What It Does: Deeply hydrates skin, improves skin softness, enhances natural glow, supports skin barrier health, reduces dullness, prepares skin for serums and moisturizers.",
      "Key Ingredients: Rice Extract (amino acids, vitamins, antioxidants), Niacinamide (even skin tone, barrier support), Ceramide NP (moisture retention), Panthenol (Vitamin B5) (soothing hydration).",
      "Suitable For: Normal Skin, Dry Skin, Combination Skin, Sensitive Skin, Dehydrated Skin, Dull Skin.",
      "Texture: Milky essence texture, lightweight consistency, fast absorbing, non-sticky finish, comfortable layering."
    ],
    images: [
      toner1
    ],
    colors: [
      { name: "Milky White Fluid", value: "#fcfaf7" }
    ],
    inStock: true,
    featured: true
  },
  {
    id: "eq-07",
    name: "Clarifying BHA Serum",
    category: "Serums",
    price: 379.00,
    rating: 4.8,
    reviewsCount: 92,
    description: "A target treatment formulated to clear congestion, regulate excess oil, and reduce breakouts. Salicylic Acid gently exfoliates inside pores while Zinc and Tea Tree soothe redness and promote recovery.",
    details: [
      "Key Actives: Salicylic Acid 2%, Zinc PCA, Tea Tree Extract",
      "Purpose: Acne-prone skin, congestion, excess oil, breakout control",
      "Directions: Apply 2-3 drops to clean skin in the evening. Spot treat or apply all over face.",
      "pH-balanced for maximum BHA clearing efficiency",
      "Cruelty-free & Vegan formulation"
    ],
    images: [
      serum2
    ],
    colors: [
      { name: "Clear Fluid", value: "#fbfcfc" }
    ],
    inStock: true,
    featured: true
  },
  {
    id: "eq-08",
    name: "Radiance Serum",
    category: "Serums",
    price: 399.00,
    rating: 4.9,
    reviewsCount: 110,
    description: "An advanced, stable Vitamin C formula designed to brighten dull skin, even out tone, and provide robust environmental defense. Ferulic Acid and Vitamin E double the antioxidant efficacy.",
    details: [
      "Key Actives: Vitamin C 15%, Ferulic Acid, Vitamin E, Hyaluronic Acid",
      "Purpose: Brightens dull skin, evens skin tone, antioxidant protection, improves glow",
      "Directions: Apply 3-4 drops in the morning to dry face and neck before moisturizer and SPF.",
      "Lightweight, fast-absorbing fluid with zero sticky residue",
      "Cruelty-free & Vegan formulation"
    ],
    images: [
      serum3
    ],
    colors: [
      { name: "Pale Golden", value: "#fef9e7" }
    ],
    inStock: true,
    featured: true,
    bestSeller: true
  },
  {
    id: "eq-09",
    name: "Peptide Repair Serum",
    category: "Serums",
    price: 449.00,
    rating: 5.0,
    reviewsCount: 64,
    description: "An exceptional restorative concentrate formulated with a powerful 6-peptide complex. It targets deep skin repair, firms sagging tissue, minimizes fine lines, and strengthens the skin barrier.",
    details: [
      "Key Actives: 6 Peptide Complex, Hyaluronic Acid, Centella Asiatica, Allantoin",
      "Purpose: Skin repair, barrier support, fine lines, elasticity improvement",
      "Directions: Apply 1-2 pumps onto clean skin both morning and evening.",
      "Cruelty-free & Vegan formulation",
      "Made in France"
    ],
    images: [
      serum4
    ],
    colors: [
      { name: "Silky Milky Gel", value: "#fafcfb" }
    ],
    inStock: true,
    featured: true
  },
  {
    id: "eq-10",
    name: "Barrier Recovery Serum",
    category: "Serums",
    price: 479.00,
    rating: 4.9,
    reviewsCount: 84,
    description: "Designed for compromised, sensitive, dehydrated, or over-exfoliated skin. This ceramide-rich formula replenishes essential lipids, reduces redness, and strengthens barrier function.",
    details: [
      "Key Actives: Ceramide NP, Cholesterol, Panthenol (Vitamin B5), Squalane",
      "Purpose: Repair skin barrier, reduce dryness/tightness, soothe irritation, reduce redness",
      "Directions: Apply 2-3 drops to clean face and neck morning and evening. Follow with moisturizer.",
      "Frosted blue glass bottle visually communicates calmness and barrier protection",
      "Fragrance-free, Non-comedogenic & Dermatologically Tested"
    ],
    images: [
      serum5
    ],
    colors: [
      { name: "Frosted Ocean Blue", value: "#3a7d8c" }
    ],
    inStock: true,
    featured: true
  },
  {
    id: "eq-11",
    name: "Retinol Renewal Night Serum",
    category: "Serums",
    price: 499.00,
    rating: 4.8,
    reviewsCount: 105,
    description: "A powerful night treatment designed to smooth fine lines, improve skin texture, and promote healthy cell turnover. Bakuchiol enhances tolerance while Peptides support skin firmness.",
    details: [
      "Key Actives: Retinol 0.3%, Bakuchiol, Peptide Complex, Squalane",
      "Purpose: Smooth fine lines, improve skin texture, refine pores, increase firmness",
      "Directions (Night Only): Apply 2-3 pumps avoiding the eye area. Follow with moisturizer. Use sunscreen daily.",
      "Soft blush pink frosted bottle with rose-gold accent pump",
      "Fragrance-free, Non-comedogenic & Dermatologically Tested"
    ],
    images: [
      serum6
    ],
    colors: [
      { name: "Frosted Blush Pink", value: "#ecd0ce" }
    ],
    inStock: true,
    featured: true,
    bestSeller: true
  },
  {
    id: "eq-12",
    name: "Ceramide Barrier Cream",
    category: "Moisturizers",
    price: 479.00,
    rating: 4.9,
    reviewsCount: 78,
    description: "A rich moisturizer formulated to restore and strengthen a compromised skin barrier while delivering long-lasting hydration.",
    details: [
      "Key Ingredients: Ceramide NP, Cholesterol, Fatty Acids, Panthenol, Squalane",
      "Purpose: Repair damaged skin barrier, reduce dryness and flaking, calm irritation, improve moisture retention",
      "Directions: Smooth over face and neck morning and evening. Ideal for dry/sensitive skin.",
      "Texture: Rich cream with a cushiony, deeply moisturizing feel"
    ],
    images: [
      moisturizer2
    ],
    colors: [
      { name: "Rich Cream", value: "#fdfdfb" }
    ],
    inStock: true,
    featured: true,
    bestSeller: true
  },
  {
    id: "eq-13",
    name: "Peptide Firming Cream",
    category: "Moisturizers",
    price: 799.00,
    rating: 5.0,
    reviewsCount: 42,
    description: "A peptide-powered moisturizer designed to improve skin firmness, elasticity, and overall skin resilience.",
    details: [
      "Key Ingredients: 6 Peptide Complex, Hyaluronic Acid, Niacinamide, Shea Butter, Squalane",
      "Purpose: Improve skin firmness, support collagen production, smooth fine lines, enhance elasticity",
      "Directions: Massage onto face and neck daily after serums.",
      "Texture: Rich cream, silky finish, deeply nourishing, non-greasy"
    ],
    images: [
      moisturizer3
    ],
    colors: [
      { name: "Nourishing Cream", value: "#fffdf9" }
    ],
    inStock: true,
    featured: true,
    bestSeller: true
  },
  {
    id: "eq-14",
    name: "Pore Refining Toner",
    category: "Toners",
    price: 299.00,
    rating: 4.8,
    reviewsCount: 62,
    description: "A lightweight daily toner formulated to help control excess oil, minimize the appearance of pores, and maintain a balanced complexion without stripping the skin. Designed for oily and combination skin types, this refreshing toner removes residual impurities while preparing the skin for the next steps in your routine.",
    details: [
      "Tagline: Clarify. Balance. Refine.",
      "What It Does: Balances excess oil production, minimizes the appearance of pores, helps reduce shine, refreshes and clarifies skin, supports a smoother-looking complexion, prepares skin for serums and moisturizers.",
      "Key Ingredients: Niacinamide (improves texture, refines pores), Zinc PCA (assists with oil control), Green Tea Extract (antioxidants, soothes skin), Panthenol (lightweight hydration).",
      "Suitable For: Oily Skin, Combination Skin, Acne-Prone Skin, Enlarged Pores, Humid Climates, Teen & Adult Skin.",
      "Texture: Clear water-like texture, ultra-lightweight, fast absorbing, non-sticky finish, refreshing feel.",
      "How To Use: Apply after cleansing. Pour onto a cotton pad or palms. Sweep or pat across face and neck. Allow absorption. Follow with serum and moisturizer.",
      "Highlights: Oil Balancing Formula, Pore Refining Complex, Non-Comedogenic, Alcohol Free, Fragrance Free, Dermatologist Tested, Daily Use Safe."
    ],
    images: [
      toner2
    ],
    colors: [
      { name: "Clear Essence", value: "#fcfdfe" }
    ],
    inStock: true
  },
  {
    id: "eq-15",
    name: "Hydrating Water Toner",
    category: "Toners",
    price: 249.00,
    rating: 4.9,
    reviewsCount: 94,
    description: "A crystal-clear hydration toner formulated to instantly replenish moisture, refresh tired skin, and support healthy hydration levels throughout the day. Designed for all skin types, this lightweight toner delivers essential hydration without heaviness, making it ideal for layering and daily use.",
    details: [
      "Tagline: Hydrate. Refresh. Balance.",
      "What It Does: Replenishes moisture after cleansing, refreshes dehydrated skin, improves skin comfort, supports healthy hydration levels, helps reduce tightness, enhances absorption of serums and moisturizers.",
      "Key Ingredients: Hyaluronic Acid (draws moisture), Glycerin (humectant, retains moisture), Aloe Vera Extract (soothing hydration), Betaine (moisture balance, softness).",
      "Suitable For: All Skin Types, Dry Skin, Combination Skin, Sensitive Skin, Dehydrated Skin, Daily Use.",
      "Texture: Water-light texture, crystal clear formula, fast absorbing, weightless finish, excellent for layering.",
      "How To Use: Apply after cleansing. Pour into palms or onto a cotton pad. Pat gently across face and neck. Layer multiple times for extra hydration if desired. Follow with serum and moisturizer.",
      "Highlights: Hyaluronic Acid Powered, Alcohol Free, Fragrance Free, Dermatologist Tested, Daily Hydration Formula, Non-Sticky Finish, Suitable For Sensitive Skin."
    ],
    images: [
      toner3
    ],
    colors: [
      { name: "Crystal Clear", value: "#ffffff" }
    ],
    inStock: true
  }
];
