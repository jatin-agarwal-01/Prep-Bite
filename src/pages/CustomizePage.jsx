import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { getMealById } from '../data/meals';
import { calculatePrice, getCustomizationSummary } from '../utils/helpers';
import { useCart } from '../context/CartContext';
import IngredientTransparency from '../components/features/IngredientTransparency';
import { FiInfo } from 'react-icons/fi';

const defaultCustomizations = {
  spiceLevel: 'Medium',
  dietPreference: 'Vegetarian',
  servings: '1 Person',
  proteinLevel: 'Regular',
};

const RadioGroup = ({ title, name, options, value, onChange }) => (
  <div className="mb-6">
    <h3 className="font-bold text-secondary mb-3">{title}</h3>
    <div className="flex flex-col gap-2">
      {options.map(opt => (
        <label key={opt} className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all border-2 ${value === opt ? 'border-primary bg-primary/5' : 'border-gray-100 bg-white hover:bg-gray-50'}`}>
          <input type="radio" name={name} value={opt} checked={value === opt} onChange={() => onChange(opt)} className="accent-primary w-4 h-4" />
          <span className="font-medium text-gray-700">{opt}</span>
        </label>
      ))}
    </div>
  </div>
);

const CustomizePage = () => {
  const [searchParams] = useSearchParams();
  const mealId = searchParams.get('meal') || 'hakka';
  const meal = getMealById(mealId) || getMealById('hakka');
  const [custom, setCustom] = useState(defaultCustomizations);
  const [showIngredients, setShowIngredients] = useState(false);
  const { addItem } = useCart();

  const finalPrice = calculatePrice(meal.basePrice, custom);

  const update = (key) => (val) => setCustom(prev => ({ ...prev, [key]: val }));

  const handleAddToCart = () => {
    addItem({
      id: `${meal.id}-${Date.now()}`,
      mealId: meal.id,
      name: meal.name,
      basePrice: meal.basePrice,
      price: finalPrice,
      customization: getCustomizationSummary(custom),
      customizations: custom,
      quantity: 1,
    });
  };

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1 className="text-3xl font-bold">Customize Your Meal Kit</h1>
      </div>

      <div className="max-w-xl mx-auto px-5 py-10">
        <div className="bg-gray-50 rounded-xl p-6 shadow-card">
          {/* Selected meal */}
          <div className="bg-white rounded-lg p-4 mb-6 border-l-4 border-primary">
            <p className="text-gray-500 text-sm">Selected Meal</p>
            <p className="font-bold text-xl text-secondary">{meal.name}</p>
          </div>

          {/* Ingredient Transparency Toggle */}
          <button
            onClick={() => setShowIngredients(v => !v)}
            className="flex items-center gap-2 text-primary font-semibold text-sm mb-5 hover:underline"
          >
            <FiInfo /> {showIngredients ? 'Hide' : 'View'} Ingredient Breakdown
          </button>

          {showIngredients && <IngredientTransparency meal={meal} />}

          {/* Customization Options */}
          <RadioGroup title="Spice Level" name="spice" options={['Low', 'Medium', 'High']} value={custom.spiceLevel} onChange={update('spiceLevel')} />
          <RadioGroup title="Diet Preference" name="diet" options={['Vegetarian', 'Non-Vegetarian']} value={custom.dietPreference} onChange={update('dietPreference')} />
          <RadioGroup title="Servings" name="servings" options={['1 Person', '2 Persons', '3 Persons']} value={custom.servings} onChange={update('servings')} />
          <RadioGroup
            title="Protein Level"
            name="protein"
            options={['Regular', 'High Protein']}
            value={custom.proteinLevel}
            onChange={update('proteinLevel')}
          />

          {/* Price */}
          <div className="bg-gradient-to-br from-primary to-primary-dark text-white rounded-xl p-5 mb-6 text-center">
            <p className="text-white/80 text-sm">Base Price: ₹{meal.basePrice}</p>
            <p className="text-white/80 text-sm mt-1">Your Price:</p>
            <p className="text-4xl font-bold">₹{finalPrice}</p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <Link to="/meals" className="btn btn-outline flex-1">Back to Meals</Link>
            <button onClick={handleAddToCart} className="btn btn-primary flex-1">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizePage;
