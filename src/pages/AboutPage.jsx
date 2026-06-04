import { Link } from 'react-router-dom';

const values = [
  { icon: '🌱', title: 'Sustainability', desc: 'Zero waste, zero compromise on quality' },
  { icon: '💚', title: 'Affordability', desc: 'Great meals at student-friendly prices' },
  { icon: '⚡', title: 'Convenience', desc: 'Cook fresh meals in just 10 minutes' },
  { icon: '🎯', title: 'Quality', desc: 'Fresh ingredients, every single time' },
];

const AboutPage = () => (
  <div className="animate-fade-in">
    <div className="page-header">
      <h1 className="text-3xl font-bold">About PrepBite</h1>
    </div>

    <div className="max-w-3xl mx-auto px-5 py-10 space-y-8">
      {/* Intro */}
      <div className="bg-white rounded-xl p-6 shadow-card">
        <p className="text-gray-600 text-lg leading-relaxed mb-4">PrepBite is a smart meal kit platform designed to make cooking easier, faster, and more affordable for students and working professionals.</p>
        <p className="text-gray-600 leading-relaxed mb-4">We focus on eliminating ingredient waste by delivering exact quantities needed for each recipe. Our goal is to create a sustainable and convenient cooking experience.</p>
        <p className="text-gray-600 leading-relaxed">PrepBite combines affordability, customization, and efficiency to redefine everyday cooking.</p>
      </div>

      {/* Mission & Commitment */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { title: 'Our Mission', text: 'To revolutionize the way people cook by providing fresh, pre-measured meal kits that save time, money, and reduce food waste.' },
          { title: 'Our Commitment', text: 'We are committed to quality, sustainability, and customer satisfaction. Every meal kit is prepared with care and attention to detail.' },
        ].map(b => (
          <div key={b.title} className="bg-gray-50 rounded-xl p-6 border-l-4 border-primary">
            <h2 className="font-bold text-xl text-secondary mb-3">{b.title}</h2>
            <p className="text-gray-600 leading-relaxed">{b.text}</p>
          </div>
        ))}
      </div>

      {/* Vision */}
      <div className="bg-gradient-to-br from-primary to-primary-dark text-white rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-3">Our Vision</h2>
        <p className="text-white/90 text-lg">To make home cooking smarter, waste-free, and accessible to everyone.</p>
      </div>

      {/* Values */}
      <div className="bg-white rounded-xl p-6 shadow-card">
        <h2 className="text-2xl font-bold text-secondary text-center mb-6">Our Core Values</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {values.map(v => (
            <div key={v.title} className="text-center p-5 bg-gray-50 rounded-xl border-t-4 border-primary">
              <h3 className="font-bold text-secondary mb-1">{v.icon} {v.title}</h3>
              <p className="text-gray-500 text-sm">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <p className="text-gray-600 text-lg mb-4">Join thousands of people experiencing smarter cooking</p>
        <Link to="/meals" className="btn btn-primary">Browse Our Meals</Link>
      </div>
    </div>
  </div>
);

export default AboutPage;
