import { useState } from 'react';
import { Link } from 'react-router-dom';
import { meals } from '../data/meals';
import { FiX, FiSearch, FiArrowRight } from 'react-icons/fi';

const allIngredients = ['Noodles', 'Rice', 'Pasta', 'Paneer', 'Cabbage', 'Carrot', 'Onion', 'Tomato', 'Capsicum', 'Garlic', 'Ginger', 'Egg', 'Tofu', 'Spinach', 'Potato', 'Cauliflower', 'Mushroom', 'Soy Sauce', 'Vinegar'];

// Simple matching: score each meal by how many ingredients the user has
const matchMeals = (userIngredients) => {
  if (userIngredients.length === 0) return [];

  const keywords = userIngredients.map(i => i.toLowerCase());

  return meals
    .map(meal => {
      const mealIngredientNames = meal.ingredients.map(i => i.name.toLowerCase());
      const matched = mealIngredientNames.filter(name =>
        keywords.some(k => name.includes(k) || k.includes(name.split(' ')[0]))
      );
      const missing = meal.ingredients.length - matched.length;
      return { ...meal, matched: matched.length, missing, score: matched.length };
    })
    .filter(m => m.score > 0)
    .sort((a, b) => b.score - a.score);
};

const LeftoverRescuePage = () => {
  const [input, setInput] = useState('');
  const [selected, setSelected] = useState([]);
  const [results, setResults] = useState(null);

  const suggestions = allIngredients.filter(i =>
    i.toLowerCase().includes(input.toLowerCase()) && !selected.includes(i)
  );

  const addIngredient = (item) => {
    setSelected(prev => [...prev, item]);
    setInput('');
    setResults(null);
  };

  const removeIngredient = (item) => {
    setSelected(prev => prev.filter(i => i !== item));
    setResults(null);
  };

  const handleSearch = () => {
    const matched = matchMeals(selected);
    setResults(matched);
  };

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1 className="text-3xl font-bold">Leftover Rescue 🥦</h1>
        <p className="text-white/90 mt-1">Tell us what you have — we'll tell you what to cook</p>
      </div>

      <div className="max-w-2xl mx-auto px-5 py-10">
        {/* Explainer */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-8">
          <h3 className="font-bold text-secondary mb-2">How It Works</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Add the ingredients you already have at home. We'll suggest which PrepBite kit needs the fewest extra ingredients to complete a delicious meal — saving you money and reducing waste!
          </p>
        </div>

        {/* Input */}
        <div className="bg-white rounded-xl p-6 shadow-card mb-6">
          <h3 className="font-bold text-secondary mb-3">What ingredients do you have?</h3>

          {/* Selected tags */}
          {selected.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {selected.map(item => (
                <span key={item} className="flex items-center gap-1.5 bg-primary text-white text-sm px-3 py-1 rounded-full font-medium">
                  {item}
                  <button onClick={() => removeIngredient(item)} className="hover:bg-white/20 rounded-full">
                    <FiX className="text-xs" />
                  </button>
                </span>
              ))}
            </div>
          )}

          {/* Search input */}
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              className="input pl-9"
              placeholder="Type an ingredient (e.g. Rice, Noodles...)"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && input.trim()) addIngredient(input.trim());
              }}
            />
          </div>

          {/* Suggestions */}
          {input && suggestions.length > 0 && (
            <div className="mt-1 border border-gray-100 rounded-lg shadow-sm overflow-hidden">
              {suggestions.slice(0, 5).map(s => (
                <button
                  key={s}
                  onClick={() => addIngredient(s)}
                  className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-green-50 hover:text-primary transition-colors border-b last:border-0"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          <div className="mt-4 flex flex-wrap gap-2">
            <p className="text-xs text-gray-400 w-full mb-1">Quick add:</p>
            {allIngredients.slice(0, 8).filter(i => !selected.includes(i)).map(i => (
              <button key={i} onClick={() => addIngredient(i)} className="text-xs bg-gray-100 hover:bg-primary hover:text-white text-gray-600 px-3 py-1.5 rounded-full transition-all">
                + {i}
              </button>
            ))}
          </div>

          <button
            onClick={handleSearch}
            disabled={selected.length === 0}
            className="btn btn-primary w-full mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Find Matching Kits
          </button>
        </div>

        {/* Results */}
        {results !== null && (
          <div className="animate-fade-in">
            {results.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <p className="text-lg mb-2">No matches found 😕</p>
                <p className="text-sm">Try adding more ingredients</p>
              </div>
            ) : (
              <div className="space-y-4">
                <h3 className="font-bold text-secondary text-lg">🎯 Best Matches for You</h3>
                {results.map(meal => (
                  <div key={meal.id} className="bg-white rounded-xl p-5 shadow-card border-l-4 border-primary">
                    <div className="flex justify-between items-start gap-3">
                      <div className="flex-1">
                        <h4 className="font-bold text-secondary">{meal.name}</h4>
                        <p className="text-gray-500 text-sm mb-2">{meal.description}</p>
                        <div className="flex gap-3 text-sm">
                          <span className="text-primary font-semibold">✅ {meal.matched} ingredients you have</span>
                          <span className="text-orange-500 font-semibold">🛒 {meal.missing} more needed</span>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-primary font-bold text-lg">₹{meal.basePrice}</p>
                        <Link to={`/customize?meal=${meal.id}`} className="btn btn-sm btn-primary mt-2 flex items-center gap-1">
                          Get Kit <FiArrowRight className="text-xs" />
                        </Link>
                      </div>
                    </div>
                    {/* Match bar */}
                    <div className="mt-3 bg-gray-100 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all duration-500"
                        style={{ width: `${(meal.matched / meal.ingredients.length) * 100}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-400 mt-1">{Math.round((meal.matched / meal.ingredients.length) * 100)}% match</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LeftoverRescuePage;
