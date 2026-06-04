import { Link } from 'react-router-dom';
import { meals } from '../data/meals';
import MealCard from '../components/meals/MealCard';
import { FiArrowRight } from 'react-icons/fi';

const steps = [
  { n: 1, label: 'Choose your meal kit' },
  { n: 2, label: 'Customize preferences' },
  { n: 3, label: 'Receive exact ingredients' },
  { n: 4, label: 'Cook and enjoy in 10 minutes' },
];

const features = [
  'Pre-measured ingredients',
  'Cleaned and ready-to-cook vegetables',
  'Customizable spice levels',
  'Flexible serving sizes',
  'Affordable student-friendly pricing',
  'Zero ingredient waste',
];

const HomePage = () => (
  <div className="animate-fade-in">
    {/* Hero */}
    <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-20 text-center">
      <div className="max-w-3xl mx-auto px-5">
        <h2 className="text-4xl md:text-5xl font-bold mb-3">Cook Fresh Meals in Just 10 Minutes</h2>
        <p className="text-white/90 font-bold mb-2">Trusted by students who want to cook smarter.</p>
        <p className="text-white/90 text-lg mb-8 leading-relaxed">
          PrepBite delivers pre-measured, customizable meal kits so you can cook delicious meals without wasting time, money, or ingredients.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link to="/meals" className="btn bg-white text-primary border-white hover:bg-gray-100 hover:border-gray-100">Browse Meals</Link>
          <Link to="/meals" className="btn border-white text-white hover:bg-white hover:text-primary">Get Started</Link>
        </div>
      </div>
    </section>

    {/* New Features Banner */}
    <section className="bg-secondary text-white py-6">
      <div className="max-w-6xl mx-auto px-5 text-center">
        <p className="text-sm font-semibold text-primary mb-2 uppercase tracking-wider">New Features</p>
        <div className="flex flex-wrap justify-center gap-4 text-sm">
          {['🔥 Meal Streaks & PrepCoins', '🤝 Cook Together Mode', '🥦 Leftover Rescue', '💰 Budget Meal Planner', '🏠 Hostel/PG Plan'].map(f => (
            <span key={f} className="bg-white/10 px-3 py-1.5 rounded-full">{f}</span>
          ))}
        </div>
      </div>
    </section>

    {/* Explore Cuisines */}
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-5 text-center">
        <h2 className="section-heading">Explore Global Cuisines</h2>
        <p className="text-gray-500 max-w-2xl mx-auto mb-2">Discover curated cuisine experiences including Italian, Indo-Chinese, Korean, and Healthy Cooking Series.</p>
        <p className="text-gray-500 max-w-2xl mx-auto mb-8">Each cuisine course includes guided recipes and specially designed meal kits to help you explore authentic flavors.</p>
        <Link to="/cuisines" className="btn btn-primary">View Cuisine Courses</Link>
      </div>
    </section>

    {/* Why PrepBite */}
    <section className="py-16 bg-gray-50">
      <div className="max-w-3xl mx-auto px-5">
        <h2 className="section-heading">The Smarter Way to Cook</h2>
        <div className="text-gray-600 text-lg leading-relaxed space-y-4 text-center">
          <p>Buying full ingredient packets for a single recipe often leads to unnecessary spending and food waste. Ordering food daily may be convenient, but it is expensive and not always healthy.</p>
          <p><strong className="text-secondary">PrepBite changes the way you cook.</strong></p>
          <p>We provide exact ingredient quantities for every meal so you can enjoy fresh home-cooked food without waste, extra cost, or preparation stress.</p>
          <p className="text-xl font-bold text-primary">Cook fresh. Spend less. Waste nothing.</p>
        </div>
      </div>
    </section>

    {/* What We Offer */}
    <section className="py-16 bg-accent">
      <div className="max-w-4xl mx-auto px-5">
        <h2 className="section-heading">Everything You Need. Nothing You Don't.</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {features.map(f => (
            <li key={f} className="bg-white p-4 rounded-lg border-l-4 border-primary shadow-sm font-medium text-gray-700">
              ✓ {f}
            </li>
          ))}
        </ul>
      </div>
    </section>

    {/* Popular Meals */}
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-5">
        <h2 className="section-heading">Explore Our Meal Kits</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {meals.slice(0, 5).map(meal => <MealCard key={meal.id} meal={meal} />)}
        </div>
      </div>
    </section>

    {/* Price Comparison */}
    <section className="py-16 bg-gradient-to-br from-gray-50 to-accent">
      <div className="max-w-4xl mx-auto px-5 text-center">
        <h2 className="section-heading">Why Spend ₹250 When You Can Spend ₹120?</h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-6">
          <div className="bg-white rounded-xl p-8 shadow-card flex-1 max-w-xs">
            <p className="text-gray-500 mb-2">Average restaurant meal:</p>
            <p className="text-5xl font-bold text-danger">₹250</p>
          </div>
          <div className="text-2xl font-bold text-gray-300">vs</div>
          <div className="bg-white rounded-xl p-8 shadow-card flex-1 max-w-xs">
            <p className="text-gray-500 mb-2">PrepBite meal kit:</p>
            <p className="text-5xl font-bold text-primary">₹120</p>
          </div>
        </div>
        <p className="text-gray-600 text-lg mb-2">Save up to ₹130 per meal while enjoying freshly cooked food at home.</p>
        <p className="text-primary font-semibold text-lg">Affordable for students. Practical for professionals.</p>
      </div>
    </section>

    {/* How It Works Preview */}
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-5 text-center">
        <h2 className="section-heading">Simple. Fast. Convenient.</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {steps.map(s => (
            <div key={s.n} className="bg-gray-50 rounded-xl p-6 hover:bg-accent transition-colors hover:-translate-y-1 duration-300">
              <div className="w-9 h-9 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm mx-auto mb-3">{s.n}</div>
              <p className="text-gray-700 font-medium text-sm">{s.label}</p>
            </div>
          ))}
        </div>
        <Link to="/how-it-works" className="btn btn-primary">Learn More <FiArrowRight className="ml-1" /></Link>
      </div>
    </section>

    {/* Final CTA */}
    <section className="py-16 bg-gradient-to-br from-green-700 to-primary-dark text-white text-center">
      <div className="max-w-2xl mx-auto px-5">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Cook Smarter?</h2>
        <p className="text-white/90 text-lg mb-8">Experience a smarter way of cooking with zero waste and full flavor.</p>
        <Link to="/meals" className="btn bg-white text-primary-dark border-white hover:bg-gray-100 text-lg px-8 py-4">
          Browse Meals
        </Link>
      </div>
    </section>
  </div>
);

export default HomePage;
