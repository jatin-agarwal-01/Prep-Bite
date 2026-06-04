import { Link } from 'react-router-dom';
import { FiClock, FiZap } from 'react-icons/fi';

const MealCard = ({ meal }) => (
  <div className="card p-6 text-center flex flex-col gap-3">
    <div className="text-4xl mb-1">🍽️</div>
    <h3 className="text-lg font-bold text-secondary">{meal.name}</h3>
    <p className="text-2xl font-bold text-primary">₹{meal.basePrice}</p>
    <div className="flex items-center justify-center gap-1.5 text-gray-500 text-sm">
      <FiClock className="text-xs" /> {meal.prepTime} prep
    </div>
    {meal.description && (
      <p className="text-gray-500 text-sm leading-relaxed">{meal.description}</p>
    )}
    <Link
      to={`/customize?meal=${meal.id}`}
      className="btn btn-outline btn-sm mt-auto"
    >
      Customize Kit
    </Link>
  </div>
);

export default MealCard;
