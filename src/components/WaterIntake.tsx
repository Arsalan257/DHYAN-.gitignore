import React, { useState, useEffect } from 'react';
import { Droplets, Plus, Minus, Target, TrendingUp, Award } from 'lucide-react';

const WaterIntake = () => {
  const [dailyIntake, setDailyIntake] = useState(0);
  const [dailyGoal, setDailyGoal] = useState(2000); // ml
  const [weeklyData, setWeeklyData] = useState([
    { day: 'Mon', intake: 1800 },
    { day: 'Tue', intake: 2200 },
    { day: 'Wed', intake: 1900 },
    { day: 'Thu', intake: 2400 },
    { day: 'Fri', intake: 2100 },
    { day: 'Sat', intake: 1700 },
    { day: 'Sun', intake: dailyIntake },
  ]);

  const [recentIntakes, setRecentIntakes] = useState<{ amount: number; time: string }[]>([]);

  const commonAmounts = [250, 500, 750, 1000]; // ml

  const addWater = (amount: number) => {
    const newIntake = dailyIntake + amount;
    setDailyIntake(newIntake);
    
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    setRecentIntakes(prev => [
      { amount, time: timeString },
      ...prev.slice(0, 4) // Keep only last 5 entries
    ]);

    // Update weekly data for today
    setWeeklyData(prev => 
      prev.map((day, index) => 
        index === 6 ? { ...day, intake: newIntake } : day
      )
    );
  };

  const removeWater = (amount: number) => {
    setDailyIntake(prev => Math.max(0, prev - amount));
  };

  const getProgressPercentage = () => {
    return Math.min((dailyIntake / dailyGoal) * 100, 100);
  };

  const getGlassesCount = () => {
    return Math.floor(dailyIntake / 250); // Assuming 250ml per glass
  };

  const getHydrationLevel = () => {
    const percentage = getProgressPercentage();
    if (percentage >= 100) return { level: 'Excellent', color: 'text-green-400', bgColor: 'from-green-500 to-emerald-500' };
    if (percentage >= 75) return { level: 'Good', color: 'text-blue-400', bgColor: 'from-blue-500 to-cyan-500' };
    if (percentage >= 50) return { level: 'Fair', color: 'text-yellow-400', bgColor: 'from-yellow-500 to-orange-500' };
    return { level: 'Low', color: 'text-red-400', bgColor: 'from-red-500 to-pink-500' };
  };

  const hydrationStatus = getHydrationLevel();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-4xl font-bold text-white mb-2">Water Intake</h2>
        <p className="text-gray-300 text-lg">Stay hydrated, stay healthy</p>
      </div>

      {/* Main Water Tracker */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20">
        <div className="text-center mb-8">
          {/* Water Drop Animation */}
          <div className="relative w-48 h-48 mx-auto mb-6">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full opacity-20" />
            <div 
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-500 to-cyan-400 rounded-full transition-all duration-1000 ease-out"
              style={{ height: `${getProgressPercentage()}%` }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Droplets className="w-16 h-16 text-white animate-pulse" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-white mt-20">
                  {dailyIntake}ml
                </div>
                <div className="text-sm text-gray-300">
                  of {dailyGoal}ml
                </div>
              </div>
            </div>
          </div>

          {/* Progress Info */}
          <div className="space-y-2">
            <div className={`text-xl font-semibold ${hydrationStatus.color}`}>
              {hydrationStatus.level} Hydration
            </div>
            <div className="text-gray-300">
              {getGlassesCount()} glasses consumed
            </div>
            <div className="text-gray-300">
              {Math.max(0, dailyGoal - dailyIntake)}ml remaining
            </div>
          </div>
        </div>

        {/* Quick Add Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {commonAmounts.map((amount) => (
            <button
              key={amount}
              onClick={() => addWater(amount)}
              className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-4 rounded-lg font-medium hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105 flex flex-col items-center space-y-2"
            >
              <Droplets className="w-6 h-6" />
              <span>{amount}ml</span>
            </button>
          ))}
        </div>

        {/* Custom Amount */}
        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={() => removeWater(100)}
            className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 transition-colors"
          >
            <Minus className="w-6 h-6" />
          </button>
          <div className="text-white font-medium">Custom Amount</div>
          <button
            onClick={() => addWater(100)}
            className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center hover:bg-green-700 transition-colors"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 bg-gradient-to-r ${hydrationStatus.bgColor} rounded-lg flex items-center justify-center`}>
              <Target className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-white">{Math.round(getProgressPercentage())}%</p>
            <p className="text-gray-300 text-sm">Daily Goal</p>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-white">
              {Math.round(weeklyData.reduce((sum, day) => sum + day.intake, 0) / 7)}ml
            </p>
            <p className="text-gray-300 text-sm">Weekly Average</p>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
              <Award className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-white">5</p>
            <p className="text-gray-300 text-sm">Day Streak</p>
          </div>
        </div>
      </div>

      {/* Recent Intake */}
      {recentIntakes.length > 0 && (
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <h3 className="text-xl font-semibold text-white mb-4">Recent Intake</h3>
          <div className="space-y-3">
            {recentIntakes.map((intake, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                    <Droplets className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-white font-medium">{intake.amount}ml</span>
                </div>
                <span className="text-gray-400 text-sm">{intake.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Weekly Chart */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
        <h3 className="text-xl font-semibold text-white mb-6">Weekly Progress</h3>
        <div className="flex items-end justify-between h-40 space-x-2">
          {weeklyData.map((data, index) => (
            <div key={index} className="flex flex-col items-center space-y-2 flex-1">
              <div className="w-full bg-white/10 rounded-t-lg relative overflow-hidden">
                <div
                  className="bg-gradient-to-t from-blue-500 to-cyan-500 rounded-t-lg transition-all duration-500"
                  style={{ height: `${(data.intake / 3000) * 120}px` }}
                />
              </div>
              <span className="text-gray-400 text-xs">{data.day}</span>
              <span className="text-white text-xs font-medium">{data.intake}ml</span>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-center">
          <div className="text-gray-400 text-sm">Goal: {dailyGoal}ml per day</div>
        </div>
      </div>

      {/* Goal Setting */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
        <h3 className="text-xl font-semibold text-white mb-4">Daily Goal</h3>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setDailyGoal(prev => Math.max(1000, prev - 250))}
            className="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 transition-colors"
          >
            <Minus className="w-5 h-5" />
          </button>
          <div className="flex-1 text-center">
            <div className="text-2xl font-bold text-white">{dailyGoal}ml</div>
            <div className="text-gray-300 text-sm">Daily Target</div>
          </div>
          <button
            onClick={() => setDailyGoal(prev => Math.min(5000, prev + 250))}
            className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center hover:bg-green-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WaterIntake;