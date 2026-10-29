import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

const CartContext = createContext();

const CART_STORAGE_KEY = 'amrit_mati_cart_v1';
const FREE_SHIPPING_THRESHOLD = 999;
const STANDARD_SHIPPING_FEE = 75;

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [
        // Realistic initial demo item so first-time visitors immediately see the cart experience
        {
          productId: 'sehore-sharbati-atta',
          variantId: '5kg',
          name: 'Sehore Sharbati Whole Wheat Atta',
          packLabel: '5 kg Family Pack',
          price: 440,
          mrp: 525,
          weightKg: 5,
          image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=300&q=80',
          quantity: 1
        }
      ];
    } catch (e) {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activePage, setActivePage] = useState('home'); // 'home', 'shop', 'bundles', 'sourcing', 'quality', 'recipes'
  const [selectedProductForModal, setSelectedProductForModal] = useState(null);
  const [selectedLabReportProduct, setSelectedLabReportProduct] = useState(null);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isOrderTrackingOpen, setIsOrderTrackingOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // Sync with localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Could not save cart to localStorage', e);
    }
  }, [cart]);

  // Toast notification helper
  const addToast = (message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart operations
  const addToCart = (product, variant, quantity = 1, showDrawer = true) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.productId === product.id && item.variantId === variant.id
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity
        };
        return updated;
      } else {
        return [
          ...prevCart,
          {
            productId: product.id,
            variantId: variant.id,
            name: product.name,
            packLabel: variant.label,
            price: variant.price,
            mrp: variant.mrp || Math.round(variant.price * 1.2),
            weightKg: variant.weightKg || 1,
            image: product.images ? product.images[0] : product.image,
            quantity: quantity
          }
        ];
      }
    });

    addToast(`Added ${quantity}× ${product.name} (${variant.label}) to cart!`);

    // Subtle celebration for bundle or multiple items
    if (quantity > 1 || product.id.includes('bundle')) {
      try {
        confetti({
          particleCount: 35,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#B8944E', '#173F2C', '#E5DCCB']
        });
      } catch (err) {}
    }

    if (showDrawer) {
      setIsCartOpen(true);
    }
  };

  const addCustomBundleToCart = (bundleName, items, bundlePrice, originalPrice) => {
    const bundleItem = {
      productId: `custom-bundle-${Date.now()}`,
      variantId: 'custom-pantry-pack',
      name: `Amrit Mati Custom Pantry (${items.length} items)`,
      packLabel: items.map(i => `${i.name} (${i.pack})`).join(', '),
      price: bundlePrice,
      mrp: originalPrice,
      weightKg: items.reduce((acc, i) => acc + (parseFloat(i.pack) || 1), 0),
      image: items[0].image,
      quantity: 1
    };

    setCart(prev => [...prev, bundleItem]);
    addToast(`Custom Pantry Box added to your cart! Saved ₹${originalPrice - bundlePrice}`);
    setIsCartOpen(true);

    try {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#B8944E', '#173F2C', '#7A1F28']
      });
    } catch (err) {}
  };

  const updateQuantity = (productId, variantId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId, variantId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.productId === productId && item.variantId === variantId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const removeFromCart = (productId, variantId) => {
    const item = cart.find(i => i.productId === productId && i.variantId === variantId);
    setCart((prev) =>
      prev.filter(
        (item) => !(item.productId === productId && item.variantId === variantId)
      )
    );
    if (item) {
      addToast(`Removed ${item.name} from cart`, 'info');
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  // Financial calculations
  const rawSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalMrp = cart.reduce((sum, item) => sum + item.mrp * item.quantity, 0);

  let discountAmount = 0;
  if (appliedCoupon) {
    discountAmount = Math.round((rawSubtotal * appliedCoupon.percent) / 100);
  }

  const subtotalAfterDiscount = Math.max(0, rawSubtotal - discountAmount);
  const isFreeShipping = subtotalAfterDiscount >= FREE_SHIPPING_THRESHOLD || subtotalAfterDiscount === 0;
  const shippingFee = subtotalAfterDiscount === 0 ? 0 : isFreeShipping ? 0 : STANDARD_SHIPPING_FEE;
  const grandTotal = subtotalAfterDiscount + shippingFee;
  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotalAfterDiscount);
  const freeShippingProgress = Math.min(100, Math.round((subtotalAfterDiscount / FREE_SHIPPING_THRESHOLD) * 100));
  const totalSavings = (totalMrp - rawSubtotal) + discountAmount;

  const applyCoupon = (code) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'AMRIT10' || cleanCode === 'WELCOME10') {
      setAppliedCoupon({ code: cleanCode, percent: 10, label: '10% Welcome Discount applied' });
      addToast('Coupon AMRIT10 applied: 10% OFF your order!');
      return { success: true, message: '10% discount applied!' };
    } else if (cleanCode === 'FREESHIP') {
      setAppliedCoupon({ code: cleanCode, percent: 5, label: 'Free Shipping Special Voucher' });
      addToast('Voucher FREESHIP applied!');
      return { success: true, message: 'Discount applied!' };
    } else {
      return { success: false, message: 'Invalid or expired coupon code. Try AMRIT10' };
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    addToast('Coupon removed', 'info');
  };

  // Navigation helpers
  const navigateTo = (page, product = null) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (product) {
      setSelectedProductForModal(product);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        setIsCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        toggleCart: () => setIsCartOpen(prev => !prev),
        addToCart,
        addCustomBundleToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        rawSubtotal,
        totalMrp,
        discountAmount,
        subtotalAfterDiscount,
        isFreeShipping,
        shippingFee,
        grandTotal,
        totalItemsCount,
        amountToFreeShipping,
        freeShippingProgress,
        totalSavings,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        toasts,
        addToast,
        removeToast,
        activePage,
        setActivePage,
        navigateTo,
        selectedProductForModal,
        setSelectedProductForModal,
        selectedLabReportProduct,
        setSelectedLabReportProduct,
        isCheckoutModalOpen,
        setIsCheckoutModalOpen,
        isOrderTrackingOpen,
        setIsOrderTrackingOpen,
        isSearchOpen,
        setIsSearchOpen,
        FREE_SHIPPING_THRESHOLD
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
