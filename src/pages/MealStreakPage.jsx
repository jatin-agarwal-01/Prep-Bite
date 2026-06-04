import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FiAward, FiTrendingUp, FiGift } from 'react-icons/fi';

const milestones = [
  { streak: 3, reward: '30 PrepCoins', icon: '🥉' },
  { streak: 5, reward: '50 PrepCoins', icon: '🥈' },
  { streak: 7, reward: '100 PrepCoins', icon: '🥇' },
  { streak: 14, reward: '250 PrepCoins + Free Kit', icon: '🏆' },
  { streak: 30, reward: '1 Month Free Subscription', icon: '👑' },
];

const MealStreakPage = () => {
  const { streak, markCooked, redeemCoins } = useCart();

  const progress = ((streak.count % 5) / 5) * 100;
  const nextMilestone = milestones.find(m => m.streak > streak.count) || milestones[milestones.length - 1];

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1 className="text-3xl font-bold">Meal Streak & PrepCoins 🔥</h1>
        <p className="text-white/90 mt-1">Cook every day, earn coins, unlock rewards</p>
      </div>

      <div className="max-w-2xl mx-auto px-5 py-10 space-y-6">
        {/* Streak Card */}
        <div className="bg-gradient-to-br from-orange-400 to-red-500 text-white rounded-2xl p-8 text-center shadow-lg">
          <div className="text-7xl mb-2">🔥</div>
          <p className="text-xl font-semibold text-white/90 mb-1">Current Streak</p>
          <p className="text-8xl font-bold">{streak.count}</p>
          <p className="text-white/80 mt-1">day{streak.count !== 1 ? 's' : ''} in a row</p>
          {streak.lastCookDate && (
            <p className="text-white/70 text-sm mt-2">Last cooked: {streak.lastCookDate}</p>
          )}
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-4 text-center shadow-card">
            <FiAward className="text-primary text-2xl mx-auto mb-1" />
            <p className="text-2xl font-bold text-secondary">{streak.prepCoins}</p>
            <p className="text-gray-500 text-xs">PrepCoins</p>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-card">
            <FiTrendingUp className="text-primary text-2xl mx-auto mb-1" />
            <p className="text-2xl font-bold text-secondary">{streak.totalCooked}</p>
            <p className="text-gray-500 text-xs">Total Cooked</p>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-card">
            <FiGift className="text-primary text-2xl mx-auto mb-1" />
            <p className="text-2xl font-bold text-secondary">₹{Math.floor(streak.prepCoins / 10)}</p>
            <p className="text-gray-500 text-xs">Value Saved</p>
          </div>
        </div>

        {/* Progress to next milestone */}
        <div className="bg-white rounded-xl p-6 shadow-card">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-secondary">Next Milestone</h3>
            <span className="text-2xl">{nextMilestone.icon}</span>
          </div>
          <p className="text-gray-500 text-sm mb-3">
            {nextMilestone.streak - streak.count} more day{nextMilestone.streak - streak.count !== 1 ? 's' : ''} to earn <strong className="text-primary">{nextMilestone.reward}</strong>
          </p>
          <div className="bg-gray-100 rounded-full h-3 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-green-400 rounded-full transition-all duration-700"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-gray-400 mt-1">{streak.count % 5}/5 days to next reward</p>
        </div>

        {/* Mark Cooked Today */}
        <div className="bg-white rounded-xl p-6 shadow-card">
          <h3 className="font-bold text-secondary mb-2">Did you cook today? 👨‍🍳</h3>
          <p className="text-gray-500 text-sm mb-4">Mark your cook to maintain your streak and earn PrepCoins!</p>
          <button
            onClick={markCooked}
            className="btn btn-primary w-full text-lg"
          >
            ✅ Mark Today as Cooked (+10 PrepCoins)
          </button>
        </div>

        {/* Redeem Coins */}
        {streak.prepCoins >= 50 && (
          <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-6">
            <h3 className="font-bold text-amber-800 mb-2">🎁 Redeem PrepCoins</h3>
            <p className="text-amber-700 text-sm mb-4">
              You have <strong>{streak.prepCoins}</strong> PrepCoins = <strong>₹{Math.floor(streak.prepCoins / 10)}</strong> discount
            </p>
            <div className="flex gap-3">
              {streak.prepCoins >= 50 && (
                <button onClick={() => redeemCoins(50)} className="btn btn-sm bg-amber-500 text-white border-amber-500 hover:bg-amber-600 flex-1">
                  Redeem 50 coins (₹5 off)
                </button>
              )}
              {streak.prepCoins >= 100 && (
                <button onClick={() => redeemCoins(100)} className="btn btn-sm bg-amber-500 text-white border-amber-500 hover:bg-amber-600 flex-1">
                  Redeem 100 coins (₹10 off)
                </button>
              )}
            </div>
          </div>
        )}

        {/* Milestones */}
        <div className="bg-white rounded-xl p-6 shadow-card">
          <h3 className="font-bold text-secondary mb-4">All Milestones</h3>
          <div className="space-y-3">
            {milestones.map(m => (
              <div key={m.streak} className={`flex items-center gap-4 p-3 rounded-lg ${streak.count >= m.streak ? 'bg-green-50 border border-green-200' : 'bg-gray-50'}`}>
                <span className="text-2xl">{m.icon}</span>
                <div className="flex-1">
                  <p className="font-semibold text-secondary text-sm">{m.streak} Day Streak</p>
                  <p className="text-primary text-xs">{m.reward}</p>
                </div>
                {streak.count >= m.streak && <span className="text-primary font-bold text-sm">✅ Achieved!</span>}
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Link to="/meals" className="btn btn-primary">Start Cooking Now</Link>
        </div>
      </div>
    </div>
  );
};

export default MealStreakPage;
