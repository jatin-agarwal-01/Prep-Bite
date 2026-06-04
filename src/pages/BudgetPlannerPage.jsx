import { useState } from 'react';
import { Link } from 'react-router-dom';
import { meals } from '../data/meals';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const generatePlan = (budget) => {
  const plan = {};
  let remaining = budget;

  for (const day of days) {
    const affordable = meals.filter(m => m.basePrice <= remaining);
    if (affordable.length === 0) {
      plan[day] = null;
    } else {
      const pick = affordable[Math.floor(Math.random() * affordable.length)];
      plan[day] = pick;
      remaining -= pick.basePrice;
    }
  }

  return { plan, totalSpent: budget - remaining, remaining };
};

const BudgetPlannerPage = () => {
  const [budget, setBudget] = useState(700);
  const [plan, setPlan] = useState(null);
  const [generated, setGenerated] = useState(false);

  const handleGenerate = () => {
    const result = generatePlan(budget);
    setPlan(result);
    setGenerated(true);
  };

  const handleRegenerate = () => {
    const result = generatePlan(budget);
    setPlan(result);
  };

  const totalMeals = plan ? Object.values(plan.plan).filter(Boolean).length : 0;

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1 className="text-3xl font-bold">Budget Meal Planner 💰</h1>
        <p className="text-white/90 mt-1">Set your weekly budget — we'll plan your meals</p>
      </div>

      <div className="max-w-2xl mx-auto px-5 py-10">
        {/* Explainer */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-8">
          <h3 className="font-bold text-secondary mb-1">How It Works</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Set your weekly meal budget. PrepBite will automatically suggest the best combination of meal kits to maximize your meals within that budget — no overspending, no skipping meals!
          </p>
        </div>

        {/* Budget Selector */}
        <div className="bg-white rounded-xl p-6 shadow-card mb-6">
          <h3 className="font-bold text-secondary mb-4">Set Your Weekly Budget</h3>

          <div className="text-center mb-5">
            <span className="text-6xl font-bold text-primary">₹{budget}</span>
            <p className="text-gray-400 text-sm mt-1">per week</p>
          </div>

          <input
            type="range"
            min={200}
            max={2000}
            step={50}
            value={budget}
            onChange={e => { setBudget(Number(e.target.value)); setGenerated(false); }}
            className="w-full accent-primary mb-3"
          />
          <div className="flex justify-between text-xs text-gray-400">
            <span>₹200</span><span>₹2000</span>
          </div>

          {/* Quick presets */}
          <div className="flex flex-wrap gap-2 mt-4">
            {[400, 600, 800, 1000, 1500].map(b => (
              <button
                key={b}
                onClick={() => { setBudget(b); setGenerated(false); }}
                className={`text-sm px-4 py-2 rounded-full border-2 font-medium transition-all ${budget === b ? 'bg-primary text-white border-primary' : 'border-gray-200 text-gray-600 hover:border-primary hover:text-primary'}`}
              >
                ₹{b}
              </button>
            ))}
          </div>

          <button onClick={handleGenerate} className="btn btn-primary w-full mt-5">
            Generate Weekly Plan
          </button>
        </div>

        {/* Plan Output */}
        {generated && plan && (
          <div className="animate-fade-in space-y-4">
            {/* Summary */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white rounded-xl p-4 text-center shadow-card">
                <p className="text-2xl font-bold text-primary">{totalMeals}</p>
                <p className="text-gray-500 text-xs">Meals Planned</p>
              </div>
              <div className="bg-white rounded-xl p-4 text-center shadow-card">
                <p className="text-2xl font-bold text-secondary">₹{plan.totalSpent}</p>
                <p className="text-gray-500 text-xs">Total Spend</p>
              </div>
              <div className="bg-white rounded-xl p-4 text-center shadow-card">
                <p className={`text-2xl font-bold ${plan.remaining > 0 ? 'text-green-600' : 'text-danger'}`}>₹{plan.remaining}</p>
                <p className="text-gray-500 text-xs">Remaining</p>
              </div>
            </div>

            {/* Day-by-day Plan */}
            <div className="bg-white rounded-xl p-5 shadow-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-secondary">Your Weekly Meal Plan</h3>
                <button onClick={handleRegenerate} className="text-primary text-sm font-semibold hover:underline">
                  🔄 Regenerate
                </button>
              </div>

              <div className="space-y-2">
                {days.map(day => {
                  const meal = plan.plan[day];
                  return (
                    <div key={day} className={`flex items-center gap-4 p-3 rounded-xl ${meal ? 'bg-green-50 border border-green-100' : 'bg-gray-50 border border-gray-100'}`}>
                      <div className="w-24 flex-shrink-0">
                        <p className="font-semibold text-secondary text-sm">{day}</p>
                      </div>
                      {meal ? (
                        <>
                          <div className="flex-1">
                            <p className="font-medium text-secondary text-sm">{meal.name}</p>
                            <p className="text-gray-400 text-xs">{meal.prepTime} · {meal.calories} kcal</p>
                          </div>
                          <p className="text-primary font-bold text-sm flex-shrink-0">₹{meal.basePrice}</p>
                        </>
                      ) : (
                        <p className="text-gray-400 text-sm italic">Budget exhausted for this day</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Savings Note */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
              💡 <strong>Smart Tip:</strong> Cooking {totalMeals} meals with PrepBite saves you approx. <strong>₹{totalMeals * 130}</strong> compared to ordering food outside!
            </div>

            {/* CTA */}
            <div className="text-center">
              <Link to="/meals" className="btn btn-primary">Order These Kits Now</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BudgetPlannerPage;
