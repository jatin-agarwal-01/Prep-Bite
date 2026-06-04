import { useState } from 'react';
import { meals } from '../data/meals';
import { useCart } from '../context/CartContext';
import { FiUsers, FiPackage, FiCheck } from 'react-icons/fi';

const HostelPlanPage = () => {
  const [step, setStep] = useState(1);
  const [groupSize, setGroupSize] = useState(10);
  const [selectedMeals, setSelectedMeals] = useState([]);
  const [splitMethod, setSplitMethod] = useState('equal');
  const [hostelName, setHostelName] = useState('');
  const [ordered, setOrdered] = useState(false);
  const { showToast } = useCart();

  const toggleMeal = (id) => {
    setSelectedMeals(prev =>
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  const selectedMealObjects = meals.filter(m => selectedMeals.includes(m.id));
  const totalCost = selectedMealObjects.reduce((s, m) => s + m.basePrice * groupSize, 0);
  const perPersonCost = Math.ceil(totalCost / groupSize);
  const bulkDiscount = Math.floor(totalCost * 0.1); // 10% bulk discount
  const finalTotal = totalCost - bulkDiscount;

  const handleOrder = () => {
    setOrdered(true);
    showToast(`Group order placed for ${groupSize} people! 🎉`);
  };

  if (ordered) {
    return (
      <div className="animate-fade-in min-h-[60vh] flex items-center justify-center px-5">
        <div className="text-center max-w-md">
          <div className="text-7xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold text-secondary mb-3">Group Order Placed!</h2>
          <p className="text-gray-500 mb-2">Order for <strong>{groupSize} people</strong> from <strong>{hostelName || 'your hostel'}</strong></p>
          <p className="text-primary font-bold text-xl mb-2">Total: ₹{finalTotal}</p>
          <p className="text-gray-400 text-sm mb-6">Per person: ₹{Math.ceil(finalTotal / groupSize)}</p>
          <p className="text-green-600 font-semibold mb-6">✅ You saved ₹{bulkDiscount} with bulk discount!</p>
          <button onClick={() => { setOrdered(false); setStep(1); setSelectedMeals([]); }} className="btn btn-primary">
            Place Another Order
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1 className="text-3xl font-bold">Hostel / PG Group Plan 🏠</h1>
        <p className="text-white/90 mt-1">Bulk meal kit orders for hostels — one order, split billing</p>
      </div>

      <div className="max-w-2xl mx-auto px-5 py-10">
        {/* Explainer */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-8">
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { icon: '👥', label: 'Group of 10–20', desc: 'Students together' },
              { icon: '📦', label: 'One Bulk Order', desc: 'Delivered to gate' },
              { icon: '💰', label: '10% Bulk Discount', desc: 'Split equally' },
            ].map(item => (
              <div key={item.label}>
                <div className="text-3xl mb-1">{item.icon}</div>
                <p className="font-bold text-secondary text-sm">{item.label}</p>
                <p className="text-gray-500 text-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-8">
          {[1, 2, 3].map(s => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${step >= s ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>
                {step > s ? <FiCheck /> : s}
              </div>
              <div className="flex-1 h-0.5 bg-gray-200 last:hidden">
                <div className={`h-full bg-primary transition-all ${step > s ? 'w-full' : 'w-0'}`} />
              </div>
            </div>
          ))}
        </div>

        {/* Step 1: Group Details */}
        {step === 1 && (
          <div className="bg-white rounded-xl p-6 shadow-card space-y-5">
            <h3 className="font-bold text-xl text-secondary">Step 1: Group Details</h3>

            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">Hostel / PG Name</label>
              <input className="input" placeholder="e.g. Sunrise Boys Hostel" value={hostelName} onChange={e => setHostelName(e.target.value)} />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Group Size: <span className="text-primary font-bold">{groupSize} people</span>
              </label>
              <input
                type="range"
                min={5}
                max={25}
                value={groupSize}
                onChange={e => setGroupSize(Number(e.target.value))}
                className="w-full accent-primary"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>5</span><span>25</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">Bill Splitting</label>
              {['equal', 'individual'].map(m => (
                <label key={m} className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer mb-2 border-2 transition-all ${splitMethod === m ? 'border-primary bg-primary/5' : 'border-gray-100'}`}>
                  <input type="radio" name="split" value={m} checked={splitMethod === m} onChange={() => setSplitMethod(m)} className="accent-primary" />
                  <div>
                    <p className="font-medium text-secondary capitalize">{m === 'equal' ? 'Equal Split' : 'Individual Payment'}</p>
                    <p className="text-gray-400 text-xs">{m === 'equal' ? 'Everyone pays the same amount' : 'Each person pays for their own kit'}</p>
                  </div>
                </label>
              ))}
            </div>

            <button onClick={() => setStep(2)} className="btn btn-primary w-full">Next: Select Meals</button>
          </div>
        )}

        {/* Step 2: Select Meals */}
        {step === 2 && (
          <div className="bg-white rounded-xl p-6 shadow-card space-y-4">
            <h3 className="font-bold text-xl text-secondary">Step 2: Select Meal Kits</h3>
            <p className="text-gray-500 text-sm">Select meals for the group. Each meal will be ordered ×{groupSize}.</p>

            <div className="space-y-3">
              {meals.map(m => (
                <label key={m.id} className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer border-2 transition-all ${selectedMeals.includes(m.id) ? 'border-primary bg-primary/5' : 'border-gray-100 hover:border-gray-200'}`}>
                  <input type="checkbox" checked={selectedMeals.includes(m.id)} onChange={() => toggleMeal(m.id)} className="accent-primary w-5 h-5" />
                  <div className="flex-1">
                    <p className="font-semibold text-secondary">{m.name}</p>
                    <p className="text-gray-400 text-xs">{m.prepTime} prep · ₹{m.basePrice}/person</p>
                  </div>
                  <p className="font-bold text-primary">₹{m.basePrice * groupSize}</p>
                </label>
              ))}
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="btn btn-outline flex-1">Back</button>
              <button onClick={() => setStep(3)} disabled={selectedMeals.length === 0} className="btn btn-primary flex-1 disabled:opacity-50">
                Next: Review Order
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Review */}
        {step === 3 && (
          <div className="bg-white rounded-xl p-6 shadow-card space-y-4">
            <h3 className="font-bold text-xl text-secondary">Step 3: Review & Place Order</h3>

            <div className="bg-gray-50 rounded-xl p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Hostel</span>
                <span className="font-semibold">{hostelName || 'Not specified'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Group Size</span>
                <span className="font-semibold">{groupSize} people</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Meals Selected</span>
                <span className="font-semibold">{selectedMeals.length} kits</span>
              </div>
            </div>

            <div className="space-y-2">
              {selectedMealObjects.map(m => (
                <div key={m.id} className="flex justify-between text-sm py-2 border-b border-gray-50">
                  <span>{m.name} ×{groupSize}</span>
                  <span className="font-semibold">₹{m.basePrice * groupSize}</span>
                </div>
              ))}
            </div>

            <div className="bg-gray-50 rounded-xl p-4 space-y-1 text-sm">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal</span>
                <span>₹{totalCost}</span>
              </div>
              <div className="flex justify-between text-green-600 font-semibold">
                <span>Bulk Discount (10%)</span>
                <span>-₹{bulkDiscount}</span>
              </div>
              <div className="flex justify-between font-bold text-secondary text-base border-t pt-2 mt-2">
                <span>Total</span>
                <span className="text-primary">₹{finalTotal}</span>
              </div>
              <div className="flex justify-between text-primary font-semibold">
                <span>Per Person ({splitMethod === 'equal' ? 'equal split' : 'approx'})</span>
                <span>₹{Math.ceil(finalTotal / groupSize)}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(2)} className="btn btn-outline flex-1">Back</button>
              <button onClick={handleOrder} className="btn btn-primary flex-1 flex items-center justify-center gap-2">
                <FiPackage /> Place Group Order
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HostelPlanPage;
