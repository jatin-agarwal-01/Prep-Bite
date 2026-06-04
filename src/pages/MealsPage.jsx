import { useState } from 'react';
import { meals } from '../data/meals';
import MealCard from '../components/meals/MealCard';

const filters = ['all', 'italian', 'indochinese', 'korean', 'healthy'];

const MealsPage = () => {
  const [active, setActive] = useState('all');

  const filtered = active === 'all' ? meals : meals.filter(m => m.cuisine === active);

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1 className="text-3xl font-bold">Browse Meal Kits</h1>
        <p className="text-white/90 mt-1">Choose from a wide range of affordable and customizable meal kits.</p>
      </div>

      <div className="max-w-6xl mx-auto px-5 py-10">
        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`px-4 py-2 rounded-full text-sm font-semibold border-2 transition-all duration-200 capitalize ${
                active === f
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-primary hover:text-primary'
              }`}
            >
              {f === 'indochinese' ? 'Indo-Chinese' : f === 'all' ? 'All Kits' : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(meal => <MealCard key={meal.id} meal={meal} />)}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-400 text-lg">No kits found for this category.</div>
        )}
      </div>
    </div>
  );
};

export default MealsPage;
