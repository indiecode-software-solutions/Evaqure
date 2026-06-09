import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Product } from '../constants/products';

export type Page = 'home' | 'shop' | 'product-detail' | 'about' | 'contact' | 'wishlist' | 'checkout';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor: string;
  selectedSize?: string;
}

interface AppContextType {
  activePage: Page;
  selectedProductId: string | null;
  cart: CartItem[];
  wishlist: string[];
  quickViewProduct: Product | null;
  isCartOpen: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  navigateTo: (page: Page, productId?: string | null) => void;
  addToCart: (product: Product, quantity: number, color: string, size?: string) => void;
  removeFromCart: (productId: string, color: string, size?: string) => void;
  updateCartQuantity: (productId: string, color: string, size: string | undefined, quantity: number) => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  setQuickViewProduct: (product: Product | null) => void;
  setCartOpen: (open: boolean) => void;
  cartCount: number;
  cartTotal: number;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  clearCart: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activePage, setActivePage] = useState<Page>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [quickViewProduct, setQuickViewProductState] = useState<Product | null>(null);
  const [isCartOpen, setCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Listen for history state changes to support browser navigation (Back/Forward) and direct URL access
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      let targetPage: Page = 'home';
      let targetProductId: string | null = null;

      if (path === '/shop') {
        targetPage = 'shop';
      } else if (path === '/story') {
        targetPage = 'about';
      } else if (path === '/contact') {
        targetPage = 'contact';
      } else if (path === '/wishlist') {
        targetPage = 'wishlist';
      } else if (path === '/checkout') {
        targetPage = 'checkout';
      } else if (path.startsWith('/product/')) {
        targetPage = 'product-detail';
        targetProductId = path.replace('/product/', '');
      }

      setActivePage((prev) => (prev !== targetPage ? targetPage : prev));
      setSelectedProductId((prev) => (prev !== targetProductId ? targetProductId : prev));
      setCartOpen(false);
      setQuickViewProductState(null);
    };

    // Initialize page based on URL path on load
    handlePopState();

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Auto scroll to top on page navigation
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activePage, selectedProductId]);

  const navigateTo = (page: Page, productId: string | null = null) => {
    // 1. Update state immediately for instant responsive rendering
    setActivePage(page);
    setSelectedProductId(productId);
    setCartOpen(false);
    setQuickViewProductState(null);

    // 2. Sync history path to browser URL bar
    let path = '/';
    if (page === 'shop') path = '/shop';
    else if (page === 'about') path = '/story';
    else if (page === 'contact') path = '/contact';
    else if (page === 'wishlist') path = '/wishlist';
    else if (page === 'checkout') path = '/checkout';
    else if (page === 'product-detail' && productId) path = `/product/${productId}`;

    if (window.location.pathname !== path) {
      window.history.pushState({ page, productId }, '', path);
    }
  };

  const addToCart = (product: Product, quantity: number, color: string, size?: string) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedColor === color &&
          item.selectedSize === size
      );

      if (existingIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingIndex].quantity += quantity;
        return newCart;
      }

      return [...prevCart, { product, quantity, selectedColor: color, selectedSize: size }];
    });
    setCartOpen(true); // Open drawer automatically
  };

  const removeFromCart = (productId: string, color: string, size?: string) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) =>
          !(item.product.id === productId && item.selectedColor === color && item.selectedSize === size)
      )
    );
  };

  const updateCartQuantity = (productId: string, color: string, size: string | undefined, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, color, size);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId && item.selectedColor === color && item.selectedSize === size
          ? { ...item, quantity }
          : item
      )
    );
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prevWishlist) =>
      prevWishlist.includes(productId)
        ? prevWishlist.filter((id) => id !== productId)
        : [...prevWishlist, productId]
    );
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const setQuickViewProduct = (product: Product | null) => {
    setQuickViewProductState(product);
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

  return (
    <AppContext.Provider
      value={{
        activePage,
        selectedProductId,
        cart,
        wishlist,
        quickViewProduct,
        isCartOpen,
        searchQuery,
        setSearchQuery,
        navigateTo,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        toggleWishlist,
        isInWishlist,
        setQuickViewProduct,
        setCartOpen,
        cartCount,
        cartTotal,
        selectedCategory,
        setSelectedCategory,
        clearCart,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
