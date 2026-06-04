import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FiMenu, FiX, FiShoppingCart } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { getItemCount } = useCart();
  const count = getItemCount();

  const linkClass = ({ isActive }) =>
    `font-medium transition-colors duration-200 hover:text-primary relative ${
      isActive ? 'text-primary after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-primary' : 'text-gray-700'
    }`;

  const links = [
    { to: '/', label: 'Home' },
    { to: '/meals', label: 'Browse Meals' },
    { to: '/cuisines', label: 'Cuisines' },
    { to: '/how-it-works', label: 'How It Works' },
    { to: '/about', label: 'About' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-b from-white to-green-50 border-b-4 border-primary shadow-md">
      <div className="max-w-6xl mx-auto px-5 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-primary hover:scale-105 transition-transform">
          PrepBite
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <li key={l.to}>
              <NavLink to={l.to} className={linkClass} end={l.to === '/'}>
                {l.label}
              </NavLink>
            </li>
          ))}
          <li>
            <Link to="/cart" className="relative flex items-center gap-1.5 font-semibold text-gray-700 hover:text-primary transition-colors">
              <FiShoppingCart className="text-lg" />
              Cart
              {count > 0 && (
                <span className="absolute -top-2 -right-3 bg-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {count}
                </span>
              )}
            </Link>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-gray-700 hover:text-primary transition-colors"
          onClick={() => setOpen(v => !v)}
          aria-label="Toggle menu"
        >
          {open ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-b-4 border-primary shadow-lg px-5 py-4 flex flex-col gap-3 animate-fade-in">
          {links.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) => `py-1.5 font-medium ${isActive ? 'text-primary' : 'text-gray-700'}`}
              onClick={() => setOpen(false)}
              end={l.to === '/'}
            >
              {l.label}
            </NavLink>
          ))}
          <Link to="/cart" className="py-1.5 font-semibold text-gray-700 flex items-center gap-2" onClick={() => setOpen(false)}>
            <FiShoppingCart /> Cart {count > 0 && <span className="bg-primary text-white text-xs px-1.5 py-0.5 rounded-full">{count}</span>}
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
