import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="bg-secondary text-white py-5 mt-12">
    <div className="max-w-6xl mx-auto px-5 flex flex-col md:flex-row items-center justify-between gap-3">
      <div>
        <h4 className="text-sm font-semibold text-gray-300 mb-1">Contributors</h4>
        <p className="text-sm text-gray-400">
          <a href="https://github.com/jatin-agarwal-01" target="_blank" rel="noopener" className="hover:text-primary transition-colors">Jatin Agarwal</a>
          {' · '}
          <a href="https://github.com/khushi380" target="_blank" rel="noopener" className="hover:text-primary transition-colors">Khushi Singh</a>
        </p>
      </div>
      <p className="text-gray-400 text-sm font-semibold">© 2026 PrepBite. All rights reserved.</p>
      <div className="text-right">
        <h3 className="text-primary font-bold text-lg">PrepBite</h3>
        <p className="text-gray-400 text-sm">Smart Meal Kits for Smart People</p>
      </div>
    </div>
  </footer>
);

export default Footer;
