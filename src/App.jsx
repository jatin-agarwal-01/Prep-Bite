import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Toast from './components/shared/Toast';

import HomePage from './pages/HomePage';
import MealsPage from './pages/MealsPage';
import CustomizePage from './pages/CustomizePage';
import CuisinesPage from './pages/CuisinesPage';
import HowItWorksPage from './pages/HowItWorksPage';
import AboutPage from './pages/AboutPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import CookTogetherPage from './pages/CookTogetherPage';
import LeftoverRescuePage from './pages/LeftoverRescuePage';
import MealStreakPage from './pages/MealStreakPage';
import HostelPlanPage from './pages/HostelPlanPage';
import BudgetPlannerPage from './pages/BudgetPlannerPage';

const NotFound = () => (
  <div className="min-h-[60vh] flex items-center justify-center text-center px-5">
    <div>
      <div className="text-8xl font-bold text-gray-100 mb-4">404</div>
      <h2 className="text-2xl font-bold text-secondary mb-2">Page Not Found</h2>
      <a href="/" className="text-primary font-semibold hover:underline">← Back to Home</a>
    </div>
  </div>
);

export default function App() {
  return (
    <BrowserRouter basename="/Prep-Bite/">
      <CartProvider>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/meals" element={<MealsPage />} />
              <Route path="/customize" element={<CustomizePage />} />
              <Route path="/cuisines" element={<CuisinesPage />} />
              <Route path="/how-it-works" element={<HowItWorksPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/order-success" element={<OrderSuccessPage />} />
              <Route path="/cook-together" element={<CookTogetherPage />} />
              <Route path="/leftover-rescue" element={<LeftoverRescuePage />} />
              <Route path="/streak" element={<MealStreakPage />} />
              <Route path="/hostel-plan" element={<HostelPlanPage />} />
              <Route path="/budget-planner" element={<BudgetPlannerPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          <Toast />
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}
