import React, { useState } from 'react';
import { Activity, Target, Calendar, TrendingUp, Plus, Dumbbell, Timer, Flame, Brain, Droplets, UtensilsCrossed, BookOpen, User, ShoppingCart } from 'lucide-react';
import Dashboard from './components/Dashboard';
import WorkoutTracker from './components/WorkoutTracker';
import ProgressView from './components/ProgressView';
import GoalsView from './components/GoalsView';
import SignIn from './components/SignIn';
import Meditation from './components/Meditation';
import WaterIntake from './components/WaterIntake';
import FoodPage from './components/FoodPage';
import Journal from './components/Journal';
import Shop from './components/Shop';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  if (!isSignedIn) {
    return <SignIn onSignIn={(userData) => { setIsSignedIn(true); setUser(userData); }} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'workout':
        return <WorkoutTracker />;
      case 'progress':
        return <ProgressView />;
      case 'goals':
        return <GoalsView />;
      case 'meditation':
        return <Meditation />;
      case 'water':
        return <WaterIntake />;
      case 'food':
        return <FoodPage />;
      case 'journal':
        return <Journal />;
      case 'shop':
        return <Shop />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">DHYAN</h1>
            </div>
            <nav className="hidden lg:flex space-x-2">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`flex items-center space-x-1 px-2 py-2 rounded-lg transition-colors text-sm ${
                  activeTab === 'dashboard'
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Activity className="w-4 h-4" />
                <span>Dashboard</span>
              </button>
              <button
                onClick={() => setActiveTab('workout')}
                className={`flex items-center space-x-1 px-2 py-2 rounded-lg transition-colors text-sm ${
                  activeTab === 'workout'
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Dumbbell className="w-4 h-4" />
                <span>Workout</span>
              </button>
              <button
                onClick={() => setActiveTab('meditation')}
                className={`flex items-center space-x-1 px-2 py-2 rounded-lg transition-colors text-sm ${
                  activeTab === 'meditation'
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Brain className="w-4 h-4" />
                <span>Meditation</span>
              </button>
              <button
                onClick={() => setActiveTab('water')}
                className={`flex items-center space-x-1 px-2 py-2 rounded-lg transition-colors text-sm ${
                  activeTab === 'water'
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Droplets className="w-4 h-4" />
                <span>Water</span>
              </button>
              <button
                onClick={() => setActiveTab('food')}
                className={`flex items-center space-x-1 px-2 py-2 rounded-lg transition-colors text-sm ${
                  activeTab === 'food'
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <UtensilsCrossed className="w-4 h-4" />
                <span>Food</span>
              </button>
              <button
                onClick={() => setActiveTab('progress')}
                className={`flex items-center space-x-1 px-2 py-2 rounded-lg transition-colors text-sm ${
                  activeTab === 'progress'
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <TrendingUp className="w-4 h-4" />
                <span>Progress</span>
              </button>
              <button
                onClick={() => setActiveTab('goals')}
                className={`flex items-center space-x-1 px-2 py-2 rounded-lg transition-colors text-sm ${
                  activeTab === 'goals'
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Target className="w-4 h-4" />
                <span>Goals</span>
              </button>
              <button
                onClick={() => setActiveTab('journal')}
                className={`flex items-center space-x-1 px-2 py-2 rounded-lg transition-colors text-sm ${
                  activeTab === 'journal'
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Journal</span>
              </button>
              <button
                onClick={() => setActiveTab('shop')}
                className={`flex items-center space-x-1 px-2 py-2 rounded-lg transition-colors text-sm ${
                  activeTab === 'shop'
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Shop</span>
              </button>
            </nav>
            <div className="flex items-center space-x-3">
              <div className="hidden md:flex items-center space-x-2">
                <User className="w-5 h-5 text-gray-300" />
                <span className="text-gray-300 text-sm">{user?.name}</span>
              </div>
              <button
                onClick={() => { setIsSignedIn(false); setUser(null); }}
                className="text-gray-300 hover:text-white text-sm"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20 lg:pb-8">
        {renderContent()}
      </main>

      {/* Mobile Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-black/20 backdrop-blur-lg border-t border-white/10 z-50">
        <div className="grid grid-cols-5 gap-1 py-2 px-2">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-colors ${
              activeTab === 'dashboard' ? 'text-purple-400' : 'text-gray-400'
            }`}
          >
            <Activity className="w-5 h-5" />
            <span className="text-xs">Dashboard</span>
          </button>
          <button
            onClick={() => setActiveTab('workout')}
            className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-colors ${
              activeTab === 'workout' ? 'text-purple-400' : 'text-gray-400'
            }`}
          >
            <Dumbbell className="w-5 h-5" />
            <span className="text-xs">Workout</span>
          </button>
          <button
            onClick={() => setActiveTab('meditation')}
            className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-colors ${
              activeTab === 'meditation' ? 'text-purple-400' : 'text-gray-400'
            }`}
          >
            <Brain className="w-5 h-5" />
            <span className="text-xs">Meditation</span>
          </button>
          <button
            onClick={() => setActiveTab('water')}
            className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-colors ${
              activeTab === 'water' ? 'text-purple-400' : 'text-gray-400'
            }`}
          >
            <Droplets className="w-5 h-5" />
            <span className="text-xs">Water</span>
          </button>
          <button
            onClick={() => setActiveTab('food')}
            className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-colors ${
              activeTab === 'food' ? 'text-purple-400' : 'text-gray-400'
            }`}
          >
            <UtensilsCrossed className="w-5 h-5" />
            <span className="text-xs">Food</span>
          </button>
        </div>
        <div className="grid grid-cols-4 gap-1 py-2 px-2 border-t border-white/10">
          <button
            onClick={() => setActiveTab('progress')}
            className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-colors ${
              activeTab === 'progress' ? 'text-purple-400' : 'text-gray-400'
            }`}
          >
            <TrendingUp className="w-5 h-5" />
            <span className="text-xs">Progress</span>
          </button>
          <button
            onClick={() => setActiveTab('goals')}
            className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-colors ${
              activeTab === 'goals' ? 'text-purple-400' : 'text-gray-400'
            }`}
          >
            <Target className="w-5 h-5" />
            <span className="text-xs">Goals</span>
          </button>
          <button
            onClick={() => setActiveTab('journal')}
            className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-colors ${
              activeTab === 'journal' ? 'text-purple-400' : 'text-gray-400'
            }`}
          >
            <BookOpen className="w-5 h-5" />
            <span className="text-xs">Journal</span>
          </button>
          <button
            onClick={() => setActiveTab('shop')}
            className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-colors ${
              activeTab === 'shop' ? 'text-purple-400' : 'text-gray-400'
            }`}
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="text-xs">Shop</span>
          </button>
        </div>
      </nav>
    </div>
  );
}

export default App;