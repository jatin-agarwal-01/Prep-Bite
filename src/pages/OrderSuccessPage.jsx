import { Link } from 'react-router-dom';
import { FiCheckCircle } from 'react-icons/fi';

const OrderSuccessPage = () => (
  <div className="animate-fade-in min-h-[60vh] flex items-center justify-center px-5">
    <div className="text-center max-w-md">
      <FiCheckCircle className="text-7xl text-primary mx-auto mb-6" />
      <h2 className="text-3xl font-bold text-secondary mb-3">Order Placed Successfully!</h2>
      <p className="text-gray-500 text-lg mb-2">Your PrepBite meal kit will be delivered soon.</p>
      <p className="text-gray-400 mb-2">Thank you for choosing a smarter way to cook.</p>
      <p className="text-primary font-semibold mb-8">🔥 Your cooking streak has been updated!</p>
      <Link to="/" className="btn btn-primary text-lg px-8">Back to Home</Link>
    </div>
  </div>
);

export default OrderSuccessPage;
