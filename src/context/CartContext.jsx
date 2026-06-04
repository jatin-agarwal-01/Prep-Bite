import { createContext, useContext, useReducer, useState, useCallback } from 'react';

const CartContext = createContext(null);

// Load from localStorage
const loadCart = () => {
  try {
    const saved = localStorage.getItem('prepbiteCart');
    return saved ? JSON.parse(saved) : [];
  } catch { return []; }
};

const saveCart = (items) => {
  localStorage.setItem('prepbiteCart', JSON.stringify(items));
};

// Load streak data
const loadStreak = () => {
  try {
    const saved = localStorage.getItem('prepbiteStreak');
    return saved ? JSON.parse(saved) : { count: 0, lastCookDate: null, prepCoins: 0, totalCooked: 0 };
  } catch { return { count: 0, lastCookDate: null, prepCoins: 0, totalCooked: 0 }; }
};

const cartReducer = (state, action) => {
  let newItems;
  switch (action.type) {
    case 'ADD_ITEM':
      newItems = [...state, action.payload];
      saveCart(newItems);
      return newItems;
    case 'REMOVE_ITEM':
      newItems = state.filter((_, i) => i !== action.index);
      saveCart(newItems);
      return newItems;
    case 'CLEAR':
      saveCart([]);
      return [];
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [items, dispatch] = useReducer(cartReducer, [], loadCart);
  const [toasts, setToasts] = useState([]);
  const [streak, setStreak] = useState(loadStreak);

  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500);
  }, []);

  const addItem = useCallback((item) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
    showToast(`${item.name} added to cart!`);
  }, [showToast]);

  const removeItem = useCallback((index) => {
    dispatch({ type: 'REMOVE_ITEM', payload: null, index });
  }, []);

  const clearCart = useCallback(() => dispatch({ type: 'CLEAR' }), []);

  const getTotal = () => items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const getItemCount = () => items.reduce((sum, item) => sum + item.quantity, 0);

  // Streak: mark cook done
  const markCooked = useCallback(() => {
    const today = new Date().toDateString();
    setStreak(prev => {
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      let newCount = prev.lastCookDate === yesterday ? prev.count + 1 : 1;
      if (prev.lastCookDate === today) return prev; // already cooked today
      const coinsEarned = newCount % 5 === 0 ? 50 : 10;
      const updated = {
        count: newCount,
        lastCookDate: today,
        prepCoins: prev.prepCoins + coinsEarned,
        totalCooked: prev.totalCooked + 1,
      };
      localStorage.setItem('prepbiteStreak', JSON.stringify(updated));
      showToast(`+${coinsEarned} PrepCoins earned! 🔥 ${newCount} day streak!`);
      return updated;
    });
  }, [showToast]);

  const redeemCoins = useCallback((coins) => {
    setStreak(prev => {
      if (prev.prepCoins < coins) return prev;
      const updated = { ...prev, prepCoins: prev.prepCoins - coins };
      localStorage.setItem('prepbiteStreak', JSON.stringify(updated));
      showToast(`${coins} PrepCoins redeemed! ₹${coins / 10} discount applied.`);
      return updated;
    });
  }, [showToast]);

  return (
    <CartContext.Provider value={{
      items, addItem, removeItem, clearCart,
      getTotal, getItemCount,
      toasts, showToast,
      streak, markCooked, redeemCoins,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
