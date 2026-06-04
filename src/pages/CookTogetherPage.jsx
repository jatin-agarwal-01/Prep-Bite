import { useState } from 'react';
import { meals } from '../data/meals';
import { generateSessionCode } from '../utils/helpers';
import { FiUsers, FiLink, FiCheck, FiVideo } from 'react-icons/fi';

const CookTogetherPage = () => {
  const [mode, setMode] = useState(''); // 'create' | 'join'
  const [selectedMeal, setSelectedMeal] = useState('');
  const [sessionCode, setSessionCode] = useState('');
  const [joinCode, setJoinCode] = useState('');
  const [joined, setJoined] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCreate = () => {
    if (!selectedMeal) return;
    const code = generateSessionCode();
    setSessionCode(code);
    setMode('created');
  };

  const handleJoin = () => {
    if (joinCode.trim().length < 4) return;
    setJoined(true);
    setMode('joined');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(sessionCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const meal = meals.find(m => m.id === selectedMeal);

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1 className="text-3xl font-bold">Cook Together Mode 🤝</h1>
        <p className="text-white/90 mt-1">Order the same kit and cook simultaneously with a friend</p>
      </div>

      <div className="max-w-2xl mx-auto px-5 py-10">
        {/* Explainer */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-8 text-center">
          <FiUsers className="text-4xl text-primary mx-auto mb-3" />
          <h3 className="font-bold text-secondary text-lg mb-2">How Cook Together Works</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            You and a friend order the same meal kit. One person creates a session, shares the code, and you both cook simultaneously — perfect for couples, hostel friends, or long-distance cooking dates!
          </p>
        </div>

        {mode === '' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button onClick={() => setMode('create')} className="card p-8 text-center hover:border-primary border-2 border-transparent cursor-pointer group">
              <div className="text-4xl mb-3">➕</div>
              <h3 className="font-bold text-secondary text-lg mb-1 group-hover:text-primary">Create Session</h3>
              <p className="text-gray-500 text-sm">Start a new cooking session and invite a friend</p>
            </button>
            <button onClick={() => setMode('join')} className="card p-8 text-center hover:border-primary border-2 border-transparent cursor-pointer group">
              <div className="text-4xl mb-3">🔗</div>
              <h3 className="font-bold text-secondary text-lg mb-1 group-hover:text-primary">Join Session</h3>
              <p className="text-gray-500 text-sm">Enter a code to join your friend's session</p>
            </button>
          </div>
        )}

        {mode === 'create' && (
          <div className="bg-white rounded-xl p-6 shadow-card">
            <h3 className="font-bold text-xl text-secondary mb-4">Create a Cook Together Session</h3>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-600 mb-2">Select Meal Kit</label>
              <select
                className="input"
                value={selectedMeal}
                onChange={e => setSelectedMeal(e.target.value)}
              >
                <option value="">-- Choose a meal --</option>
                {meals.map(m => <option key={m.id} value={m.id}>{m.name} — ₹{m.basePrice}</option>)}
              </select>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setMode('')} className="btn btn-outline flex-1">Back</button>
              <button onClick={handleCreate} disabled={!selectedMeal} className="btn btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed">
                Generate Session Code
              </button>
            </div>
          </div>
        )}

        {mode === 'created' && meal && (
          <div className="bg-white rounded-xl p-6 shadow-card space-y-5">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <FiCheck className="text-primary text-2xl" />
              </div>
              <h3 className="font-bold text-xl text-secondary">Session Created!</h3>
              <p className="text-gray-500 text-sm mt-1">Share this code with your friend</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-5 text-center">
              <p className="text-sm text-gray-500 mb-2">Your Session Code</p>
              <p className="text-5xl font-bold text-primary tracking-widest mb-3">{sessionCode}</p>
              <button onClick={handleCopy} className="btn btn-sm btn-outline flex items-center gap-2 mx-auto">
                {copied ? <><FiCheck /> Copied!</> : <><FiLink /> Copy Code</>}
              </button>
            </div>

            <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
              <h4 className="font-bold text-secondary mb-1">🍽️ Cooking: {meal.name}</h4>
              <p className="text-gray-500 text-sm">Both of you order this kit and start cooking together once your friend joins!</p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
              <FiVideo className="inline mr-2" />
              <strong>Tip:</strong> Open a video call with your friend while cooking for the full Cook Together experience!
            </div>

            <button onClick={() => { setMode(''); setSessionCode(''); setSelectedMeal(''); }} className="btn btn-outline w-full">
              Start New Session
            </button>
          </div>
        )}

        {mode === 'join' && (
          <div className="bg-white rounded-xl p-6 shadow-card">
            <h3 className="font-bold text-xl text-secondary mb-4">Join a Cook Together Session</h3>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-600 mb-2">Enter Session Code</label>
              <input
                className="input text-center text-2xl font-bold tracking-widest uppercase"
                type="text"
                value={joinCode}
                onChange={e => setJoinCode(e.target.value.toUpperCase())}
                placeholder="ABCDEF"
                maxLength={6}
              />
            </div>
            <div className="flex gap-3">
              <button onClick={() => setMode('')} className="btn btn-outline flex-1">Back</button>
              <button onClick={handleJoin} disabled={joinCode.length < 4} className="btn btn-primary flex-1 disabled:opacity-50">
                Join Session
              </button>
            </div>
          </div>
        )}

        {mode === 'joined' && (
          <div className="bg-white rounded-xl p-6 shadow-card text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <FiUsers className="text-primary text-2xl" />
            </div>
            <h3 className="font-bold text-xl text-secondary">You've Joined the Session!</h3>
            <p className="text-gray-500">Session Code: <strong className="text-primary">{joinCode}</strong></p>
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-left">
              <p className="font-semibold text-primary-dark mb-1">✅ Next Steps:</p>
              <ol className="text-sm text-gray-600 space-y-1 list-decimal pl-4">
                <li>Order the same meal kit as your friend</li>
                <li>Start a video call together</li>
                <li>Cook simultaneously and enjoy!</li>
              </ol>
            </div>
            <button onClick={() => { setMode(''); setJoinCode(''); setJoined(false); }} className="btn btn-outline w-full">
              Leave Session
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CookTogetherPage;
