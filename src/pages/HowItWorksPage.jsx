import { Link } from 'react-router-dom';

const steps = [
  { n: 1, title: 'Browse Meals', desc: 'Explore our curated meal kits designed for quick and easy cooking. Choose from a variety of cuisines and flavors that suit your taste.' },
  { n: 2, title: 'Customize Your Kit', desc: 'Choose spice level, servings, and dietary preferences. Personalize your meal to match exactly what you want.' },
  { n: 3, title: 'Receive Ingredients', desc: 'Get perfectly measured ingredients delivered to you. Everything is fresh, cleaned, and ready-to-cook.' },
  { n: 4, title: 'Cook and Enjoy', desc: 'Prepare your meal in just 10 minutes and enjoy fresh homemade food. It\'s that simple!' },
];

const HowItWorksPage = () => (
  <div className="animate-fade-in">
    <div className="page-header">
      <h1 className="text-3xl font-bold">How PrepBite Works</h1>
    </div>

    <div className="max-w-3xl mx-auto px-5 py-10">
      {/* Intro */}
      <div className="bg-white rounded-xl p-6 shadow-card text-center mb-8 border-t-4 border-primary">
        <p className="text-gray-600 text-lg">PrepBite simplifies cooking by providing exactly what you need — no more, no less.</p>
      </div>

      {/* Steps */}
      <div className="space-y-4 mb-10 relative">
        <div className="absolute left-9 top-10 bottom-10 w-0.5 bg-gradient-to-b from-primary to-gray-200 hidden md:block" />
        {steps.map(s => (
          <div key={s.n} className="bg-white rounded-xl p-6 shadow-card flex gap-5 hover:-translate-y-1 transition-all duration-300 hover:shadow-card-hover relative">
            <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary-dark text-white rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0 shadow-green z-10">
              {s.n}
            </div>
            <div>
              <h2 className="font-bold text-xl text-primary-dark mb-2">{s.title}</h2>
              <p className="text-gray-600 leading-relaxed">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Closing */}
      <div className="relative bg-gradient-to-br from-primary to-primary-dark text-white rounded-xl p-8 text-center text-2xl font-bold mb-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
        <span className="relative z-10">Cooking has never been this simple.</span>
      </div>

      {/* CTA */}
      <div className="text-center">
        <p className="text-gray-600 text-lg mb-4">Ready to get started?</p>
        <Link to="/meals" className="btn btn-primary">Browse Our Meals</Link>
      </div>
    </div>
  </div>
);

export default HowItWorksPage;
