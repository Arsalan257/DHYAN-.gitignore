import React from 'react';
import { Calendar, Flame, Target, TrendingUp, Clock, Zap } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { label: 'Calories Burned', value: '2,847', icon: Flame, color: 'from-orange-500 to-red-500' },
    { label: 'Workout Time', value: '2h 15m', icon: Clock, color: 'from-blue-500 to-cyan-500' },
    { label: 'Goals Achieved', value: '8/10', icon: Target, color: 'from-green-500 to-emerald-500' },
    { label: 'Streak Days', value: '12', icon: Zap, color: 'from-purple-500 to-pink-500' },
  ];

  const recentWorkouts = [
    { name: 'Upper Body Strength', duration: '45 min', calories: 320, date: 'Today' },
    { name: 'HIIT Cardio', duration: '30 min', calories: 280, date: 'Yesterday' },
    { name: 'Leg Day', duration: '60 min', calories: 420, date: '2 days ago' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="text-center">
        <h2 className="text-4xl font-bold text-white mb-2">Welcome back!</h2>
        <p className="text-gray-300 text-lg">Ready to crush your fitness goals today?</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-gray-300 text-sm">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
        <h3 className="text-xl font-semibold text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105">
            Start Workout
          </button>
          <button className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105">
            Log Exercise
          </button>
          <button className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-lg font-medium hover:from-green-700 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105">
            Set New Goal
          </button>
        </div>
      </div>

      {/* Recent Workouts */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white">Recent Workouts</h3>
          <button className="text-purple-400 hover:text-purple-300 text-sm font-medium">View All</button>
        </div>
        <div className="space-y-4">
          {recentWorkouts.map((workout, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Flame className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-medium">{workout.name}</h4>
                  <p className="text-gray-400 text-sm">{workout.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white font-medium">{workout.duration}</p>
                <p className="text-gray-400 text-sm">{workout.calories} cal</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress Chart Placeholder */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
        <h3 className="text-xl font-semibold text-white mb-4">Weekly Progress</h3>
        <div className="h-64 bg-white/5 rounded-lg flex items-center justify-center border border-white/10">
          <div className="text-center">
            <TrendingUp className="w-12 h-12 text-purple-400 mx-auto mb-2" />
            <p className="text-gray-300">Progress chart coming soon</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;