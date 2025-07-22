import React from 'react';
import { TrendingUp, Calendar, Award, Target, Flame, Clock } from 'lucide-react';

const ProgressView = () => {
  const weeklyData = [
    { day: 'Mon', calories: 320, duration: 45 },
    { day: 'Tue', calories: 280, duration: 30 },
    { day: 'Wed', calories: 420, duration: 60 },
    { day: 'Thu', calories: 350, duration: 40 },
    { day: 'Fri', calories: 480, duration: 70 },
    { day: 'Sat', calories: 520, duration: 80 },
    { day: 'Sun', calories: 300, duration: 35 },
  ];

  const achievements = [
    { title: '7-Day Streak', description: 'Worked out for 7 consecutive days', icon: Award, earned: true },
    { title: 'Calorie Crusher', description: 'Burned 500+ calories in a single workout', icon: Flame, earned: true },
    { title: 'Early Bird', description: 'Completed 5 morning workouts', icon: Clock, earned: false },
    { title: 'Goal Getter', description: 'Achieved all weekly goals', icon: Target, earned: false },
  ];

  const maxCalories = Math.max(...weeklyData.map(d => d.calories));

  return (
    <div className="space-y-8">
      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-white">+15%</p>
            <p className="text-gray-300 text-sm">Weekly Improvement</p>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-white">12</p>
            <p className="text-gray-300 text-sm">Days Active</p>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
              <Flame className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-white">2,847</p>
            <p className="text-gray-300 text-sm">Total Calories</p>
          </div>
        </div>
      </div>

      {/* Weekly Chart */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
        <h3 className="text-xl font-semibold text-white mb-6">Weekly Activity</h3>
        <div className="space-y-6">
          {/* Calories Chart */}
          <div>
            <h4 className="text-white font-medium mb-4 flex items-center space-x-2">
              <Flame className="w-4 h-4 text-orange-400" />
              <span>Calories Burned</span>
            </h4>
            <div className="flex items-end justify-between h-32 space-x-2">
              {weeklyData.map((data, index) => (
                <div key={index} className="flex flex-col items-center space-y-2 flex-1">
                  <div className="w-full bg-white/10 rounded-t-lg relative overflow-hidden">
                    <div
                      className="bg-gradient-to-t from-orange-500 to-red-500 rounded-t-lg transition-all duration-500"
                      style={{ height: `${(data.calories / maxCalories) * 100}px` }}
                    />
                  </div>
                  <span className="text-gray-400 text-xs">{data.day}</span>
                  <span className="text-white text-xs font-medium">{data.calories}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Duration Chart */}
          <div>
            <h4 className="text-white font-medium mb-4 flex items-center space-x-2">
              <Clock className="w-4 h-4 text-blue-400" />
              <span>Workout Duration (minutes)</span>
            </h4>
            <div className="flex items-end justify-between h-32 space-x-2">
              {weeklyData.map((data, index) => (
                <div key={index} className="flex flex-col items-center space-y-2 flex-1">
                  <div className="w-full bg-white/10 rounded-t-lg relative overflow-hidden">
                    <div
                      className="bg-gradient-to-t from-blue-500 to-cyan-500 rounded-t-lg transition-all duration-500"
                      style={{ height: `${(data.duration / 80) * 100}px` }}
                    />
                  </div>
                  <span className="text-gray-400 text-xs">{data.day}</span>
                  <span className="text-white text-xs font-medium">{data.duration}m</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
        <h3 className="text-xl font-semibold text-white mb-6">Achievements</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border transition-all duration-300 ${
                achievement.earned
                  ? 'bg-gradient-to-r from-yellow-600/20 to-orange-600/20 border-yellow-400/30'
                  : 'bg-white/5 border-white/10'
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  achievement.earned
                    ? 'bg-gradient-to-r from-yellow-500 to-orange-500'
                    : 'bg-gray-600'
                }`}>
                  <achievement.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className={`font-medium ${achievement.earned ? 'text-yellow-400' : 'text-gray-400'}`}>
                    {achievement.title}
                  </h4>
                  <p className="text-gray-300 text-sm">{achievement.description}</p>
                </div>
                {achievement.earned && (
                  <div className="text-yellow-400 text-sm font-medium">Earned!</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Monthly Summary */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
        <h3 className="text-xl font-semibold text-white mb-6">Monthly Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <p className="text-3xl font-bold text-white mb-2">24</p>
            <p className="text-gray-300 text-sm">Workouts Completed</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-white mb-2">18h 45m</p>
            <p className="text-gray-300 text-sm">Total Exercise Time</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-white mb-2">8,420</p>
            <p className="text-gray-300 text-sm">Calories Burned</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-white mb-2">85%</p>
            <p className="text-gray-300 text-sm">Goal Achievement</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressView;