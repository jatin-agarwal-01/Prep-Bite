import { Link } from 'react-router-dom';
import { cuisines } from '../data/cuisines';

const CuisinesPage = () => (
  <div className="animate-fade-in">
    <div className="page-header">
      <h1 className="text-3xl font-bold">Explore Global Cuisines</h1>
      <p className="text-white/90 mt-1">Learn, cook, and experience different food cultures with PrepBite cuisine courses.</p>
    </div>

    <div className="max-w-6xl mx-auto px-5 py-10">
      <div className="text-center mb-10">
        <h2 className="section-heading">More Than Meal Kits — Discover World Cuisines</h2>
        <p className="text-gray-500 max-w-xl mx-auto">Learn global flavors through curated, beginner-friendly cuisine experiences. Build confidence and cook with consistency at home.</p>
      </div>

      {cuisines.map((c, i) => (
        <div key={c.id} className={`py-14 border-b border-green-50 ${i % 2 === 1 ? 'bg-green-50/40' : ''}`}>
          <div className="max-w-6xl mx-auto px-5">
            <h2 className="text-2xl font-bold text-primary-dark mb-3">{c.name}</h2>
            <p className="text-gray-500 leading-relaxed mb-6 max-w-3xl">{c.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {c.meals.map(m => (
                <div key={m.name} className="card p-5">
                  <h3 className="font-bold text-secondary mb-1">{m.name}</h3>
                  <p className="text-primary font-semibold text-sm mb-1">{m.price} | {m.time}</p>
                  <p className="text-gray-500 text-sm">{m.desc}</p>
                </div>
              ))}
            </div>
            <Link to={`/meals?cuisine=${c.id}`} className="btn btn-outline btn-sm">Explore {c.name.split(' ')[0]} Kits</Link>
          </div>
        </div>
      ))}

      {/* Why Join */}
      <div className="py-14">
        <h2 className="section-heading">Why Join a Cuisine Series?</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
          {['Explore international flavors', 'Learn cooking basics step-by-step', 'Get perfectly measured ingredients', 'Improve kitchen confidence', 'Affordable and beginner-friendly'].map(f => (
            <li key={f} className="bg-white p-4 rounded-lg border-l-4 border-primary shadow-sm font-medium text-gray-700">✓ {f}</li>
          ))}
        </ul>
      </div>

      {/* CTA */}
      <div className="text-center bg-gradient-to-br from-primary to-primary-dark text-white rounded-2xl p-12">
        <h2 className="text-3xl font-bold mb-3">Start Your Culinary Journey</h2>
        <p className="text-white/90 text-lg mb-6">Discover new flavors and enjoy fresh homemade meals with PrepBite Cuisine Series.</p>
        <Link to="/meals" className="btn bg-white text-primary-dark border-white hover:bg-gray-100">Browse Meal Kits</Link>
      </div>
    </div>
  </div>
);

export default CuisinesPage;
