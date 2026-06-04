import { useCart } from '../../context/CartContext';
import { FiCheckCircle, FiX } from 'react-icons/fi';

const Toast = () => {
  const { toasts } = useCart();
  if (!toasts.length) return null;

  return (
    <div className="fixed top-5 right-5 z-[9999] flex flex-col gap-2">
      {toasts.map(t => (
        <div key={t.id} className="flex items-center gap-3 bg-primary text-white px-5 py-3.5 rounded-lg shadow-lg font-semibold text-sm max-w-xs animate-slide-in">
          <FiCheckCircle className="text-lg flex-shrink-0" />
          {t.message}
        </div>
      ))}
    </div>
  );
};

export default Toast;
