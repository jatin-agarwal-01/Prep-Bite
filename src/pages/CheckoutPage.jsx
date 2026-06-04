import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FiLock } from 'react-icons/fi';

const CheckoutPage = () => {
  const { items, getTotal, clearCart, markCooked, streak } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({ fullName: '', phoneNumber: '', deliveryAddress: '', city: '', pincode: '' });
  const [payment, setPayment] = useState('Cash on Delivery');
  const [useCoins, setUseCoins] = useState(false);

  if (items.length === 0) return <Navigate to="/cart" replace />;

  const coinsDiscount = useCoins ? Math.min(streak.prepCoins, 100) : 0;
  const total = Math.max(0, getTotal() - Math.floor(coinsDiscount / 10));

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const order = { ...form, payment, items, total, timestamp: new Date().toISOString() };
    const orders = JSON.parse(localStorage.getItem('prepbiteOrders') || '[]');
    orders.push(order);
    localStorage.setItem('prepbiteOrders', JSON.stringify(orders));
    clearCart();
    markCooked();
    navigate('/order-success');
  };

  return (
    <div className="animate-fade-in">
      <div className="page-header"><h1 className="text-3xl font-bold">Checkout</h1></div>

      <div className="max-w-4xl mx-auto px-5 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 shadow-card space-y-4">
            <h2 className="font-bold text-xl text-secondary border-b pb-3">Customer Details</h2>

            {[
              { name: 'fullName', label: 'Full Name', type: 'text' },
              { name: 'phoneNumber', label: 'Phone Number', type: 'tel' },
              { name: 'deliveryAddress', label: 'Delivery Address', type: 'text' },
              { name: 'city', label: 'City', type: 'text' },
              { name: 'pincode', label: 'Pincode', type: 'text' },
            ].map(f => (
              <div key={f.name}>
                <label className="block text-sm font-semibold text-gray-600 mb-1">{f.label} *</label>
                <input
                  className="input"
                  type={f.type}
                  name={f.name}
                  value={form[f.name]}
                  onChange={handleChange}
                  required
                />
              </div>
            ))}

            {/* Payment */}
            <div>
              <h3 className="font-bold text-secondary mb-2">Payment Method</h3>
              {['Cash on Delivery', 'UPI (Prototype)'].map(p => (
                <label key={p} className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer mb-2 border-2 transition-all ${payment === p ? 'border-primary bg-primary/5' : 'border-gray-100 hover:bg-gray-50'}`}>
                  <input type="radio" name="payment" value={p} checked={payment === p} onChange={() => setPayment(p)} className="accent-primary w-4 h-4" />
                  <span className="font-medium text-gray-700">{p}</span>
                </label>
              ))}
            </div>

            {/* PrepCoins */}
            {streak.prepCoins > 0 && (
              <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={useCoins} onChange={e => setUseCoins(e.target.checked)} className="accent-primary w-4 h-4" />
                  <div>
                    <p className="font-bold text-amber-800">Use PrepCoins ({streak.prepCoins} coins)</p>
                    <p className="text-sm text-amber-600">Save ₹{Math.floor(Math.min(streak.prepCoins, 100) / 10)} on this order</p>
                  </div>
                </label>
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <button type="button" onClick={() => navigate('/cart')} className="btn btn-outline flex-1">Back to Cart</button>
              <button type="submit" className="btn btn-primary flex-1 flex items-center justify-center gap-2">
                <FiLock className="text-sm" /> Place Order
              </button>
            </div>
          </form>

          {/* Summary */}
          <div className="bg-white rounded-xl p-6 shadow-card h-fit">
            <h2 className="font-bold text-xl text-secondary border-b pb-3 mb-4">Order Summary</h2>
            <div className="space-y-3 mb-4">
              {items.map((item, i) => (
                <div key={i} className="flex justify-between text-sm py-2 border-b border-gray-50">
                  <span className="text-gray-600">{item.name} (×{item.quantity})</span>
                  <span className="font-semibold">₹{item.price * item.quantity}</span>
                </div>
              ))}
              {coinsDiscount > 0 && (
                <div className="flex justify-between text-sm text-amber-600 font-semibold">
                  <span>PrepCoins discount</span>
                  <span>-₹{Math.floor(coinsDiscount / 10)}</span>
                </div>
              )}
            </div>
            <div className="bg-gradient-to-br from-primary to-primary-dark text-white rounded-xl p-4 text-right">
              <p className="text-white/80 text-sm">Total:</p>
              <p className="text-3xl font-bold">₹{total}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
