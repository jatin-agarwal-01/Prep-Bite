import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FiTrash2, FiShoppingBag } from 'react-icons/fi';

const CartPage = () => {
  const { items, removeItem, clearCart, getTotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="animate-fade-in">
        <div className="page-header"><h1 className="text-3xl font-bold">Your Cart</h1></div>
        <div className="max-w-2xl mx-auto px-5 py-16 text-center">
          <FiShoppingBag className="text-6xl text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg mb-2">Your cart is currently empty.</p>
          <p className="text-gray-400 mb-6">Browse our meal kits to get started.</p>
          <Link to="/meals" className="btn btn-primary">Browse Meals</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="page-header"><h1 className="text-3xl font-bold">Your Cart</h1></div>
      <div className="max-w-2xl mx-auto px-5 py-10">
        <div className="bg-gray-50 rounded-xl p-6">
          <div className="space-y-3 mb-4">
            {items.map((item, i) => (
              <div key={item.id} className="bg-white rounded-lg p-4 border-l-4 border-primary shadow-sm flex justify-between items-center gap-4">
                <div className="flex-1">
                  <h3 className="font-bold text-secondary">{item.name}</h3>
                  <p className="text-gray-400 text-sm">{item.customization}</p>
                  <p className="text-primary font-semibold mt-1">₹{item.price} × {item.quantity}</p>
                </div>
                <button onClick={() => removeItem(i)} className="text-danger hover:bg-red-50 p-2 rounded-lg transition-colors">
                  <FiTrash2 />
                </button>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="bg-gradient-to-br from-primary to-primary-dark text-white rounded-xl p-4 text-right mb-4">
            <p className="text-white/80 text-sm">Total Amount:</p>
            <p className="text-3xl font-bold">₹{getTotal()}</p>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button onClick={() => { clearCart(); }} className="btn btn-outline flex-1">Clear Cart</button>
            <Link to="/checkout" className="btn btn-primary flex-1">Proceed to Checkout</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
