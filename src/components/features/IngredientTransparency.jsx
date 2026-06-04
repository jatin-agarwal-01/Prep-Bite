const IngredientTransparency = ({ meal }) => {
  const total = meal.ingredients.reduce((s, i) => s + i.calories, 0);

  return (
    <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-5 animate-fade-in">
      <h4 className="font-bold text-primary-dark mb-3 flex items-center gap-2">
        🧪 Ingredient Breakdown — {meal.name}
      </h4>
      <div className="space-y-2">
        {meal.ingredients.map((ing) => (
          <div key={ing.name} className="flex items-center justify-between bg-white rounded-lg px-3 py-2 text-sm shadow-sm">
            <span className="font-medium text-secondary w-1/2">{ing.name}</span>
            <span className="text-gray-400 w-1/4 text-center">{ing.weight}</span>
            <span className="text-primary font-semibold w-1/4 text-right">{ing.calories} kcal</span>
          </div>
        ))}
      </div>
      <div className="mt-3 flex justify-between items-center bg-primary text-white rounded-lg px-4 py-2 font-bold text-sm">
        <span>Total Calories</span>
        <span>{total} kcal</span>
      </div>
    </div>
  );
};

export default IngredientTransparency;
