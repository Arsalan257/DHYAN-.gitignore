import React, { useState } from 'react';
import { Target, Plus, Edit, Trash2, CheckCircle, Circle, Calendar, Flame, Clock } from 'lucide-react';

const GoalsView = () => {
  const [goals, setGoals] = useState([
    {
      id: 1,
      title: 'Burn 500 calories daily',
      type: 'calories',
      target: 500,
      current: 320,
      deadline: '2024-01-31',
      completed: false,
    },
    {
      id: 2,
      title: 'Exercise 5 times per week',
      type: 'frequency',
      target: 5,
      current: 3,
      deadline: '2024-01-31',
      completed: false,
    },
    {
      id: 3,
      title: 'Complete 30-minute workouts',
      type: 'duration',
      target: 30,
      current: 25,
      deadline: '2024-01-31',
      completed: false,
    },
    {
      id: 4,
      title: 'Maintain 7-day streak',
      type: 'streak',
      target: 7,
      current: 7,
      deadline: '2024-01-31',
      completed: true,
    },
  ]);

  const [showAddGoal, setShowAddGoal] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    type: 'calories',
    target: '',
    deadline: '',
  });

  const getGoalIcon = (type: string) => {
    switch (type) {
      case 'calories':
        return Flame;
      case 'duration':
        return Clock;
      case 'frequency':
        return Calendar;
      default:
        return Target;
    }
  };

  const getGoalColor = (type: string) => {
    switch (type) {
      case 'calories':
        return 'from-orange-500 to-red-500';
      case 'duration':
        return 'from-blue-500 to-cyan-500';
      case 'frequency':
        return 'from-green-500 to-emerald-500';
      default:
        return 'from-purple-500 to-pink-500';
    }
  };

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const addGoal = () => {
    if (newGoal.title && newGoal.target && newGoal.deadline) {
      const goal = {
        id: goals.length + 1,
        title: newGoal.title,
        type: newGoal.type,
        target: parseInt(newGoal.target),
        current: 0,
        deadline: newGoal.deadline,
        completed: false,
      };
      setGoals([...goals, goal]);
      setNewGoal({ title: '', type: 'calories', target: '', deadline: '' });
      setShowAddGoal(false);
    }
  };

  const toggleGoalCompletion = (id: number) => {
    setGoals(goals.map(goal =>
      goal.id === id ? { ...goal, completed: !goal.completed } : goal
    ));
  };

  const deleteGoal = (id: number) => {
    setGoals(goals.filter(goal => goal.id !== id));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Fitness Goals</h2>
          <p className="text-gray-300">Track and achieve your fitness objectives</p>
        </div>
        <button
          onClick={() => setShowAddGoal(true)}
          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add Goal</span>
        </button>
      </div>

      {/* Goals Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <div className="text-center">
            <p className="text-2xl font-bold text-white">{goals.length}</p>
            <p className="text-gray-300 text-sm">Total Goals</p>
          </div>
        </div>
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-400">{goals.filter(g => g.completed).length}</p>
            <p className="text-gray-300 text-sm">Completed</p>
          </div>
        </div>
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-400">{goals.filter(g => !g.completed).length}</p>
            <p className="text-gray-300 text-sm">In Progress</p>
          </div>
        </div>
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-400">
              {Math.round((goals.filter(g => g.completed).length / goals.length) * 100)}%
            </p>
            <p className="text-gray-300 text-sm">Success Rate</p>
          </div>
        </div>
      </div>

      {/* Goals List */}
      <div className="space-y-4">
        {goals.map((goal) => {
          const IconComponent = getGoalIcon(goal.type);
          const progressPercentage = getProgressPercentage(goal.current, goal.target);
          
          return (
            <div
              key={goal.id}
              className={`bg-white/10 backdrop-blur-lg rounded-xl p-6 border transition-all duration-300 ${
                goal.completed ? 'border-green-400/30 bg-green-600/10' : 'border-white/20'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${getGoalColor(goal.type)} flex items-center justify-center`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className={`text-lg font-semibold ${goal.completed ? 'text-green-400' : 'text-white'}`}>
                      {goal.title}
                    </h3>
                    <p className="text-gray-400 text-sm">Due: {new Date(goal.deadline).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => toggleGoalCompletion(goal.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      goal.completed ? 'text-green-400 hover:text-green-300' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {goal.completed ? <CheckCircle className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
                  </button>
                  <button className="p-2 text-gray-400 hover:text-white transition-colors">
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => deleteGoal(goal.id)}
                    className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              {!goal.completed && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Progress</span>
                    <span className="text-white">{goal.current} / {goal.target}</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full bg-gradient-to-r ${getGoalColor(goal.type)} transition-all duration-500`}
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-gray-400">{Math.round(progressPercentage)}% complete</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add Goal Modal */}
      {showAddGoal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-slate-800 rounded-xl p-6 w-full max-w-md mx-4 border border-white/20">
            <h3 className="text-xl font-semibold text-white mb-6">Add New Goal</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Goal Title</label>
                <input
                  type="text"
                  value={newGoal.title}
                  onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
                  placeholder="Enter your goal"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Goal Type</label>
                <select
                  value={newGoal.type}
                  onChange={(e) => setNewGoal({ ...newGoal, type: e.target.value })}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-400"
                >
                  <option value="calories">Calories</option>
                  <option value="duration">Duration (minutes)</option>
                  <option value="frequency">Frequency (times)</option>
                  <option value="streak">Streak (days)</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Target Value</label>
                <input
                  type="number"
                  value={newGoal.target}
                  onChange={(e) => setNewGoal({ ...newGoal, target: e.target.value })}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
                  placeholder="Enter target value"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Deadline</label>
                <input
                  type="date"
                  value={newGoal.deadline}
                  onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-400"
                />
              </div>
            </div>
            <div className="flex space-x-3 mt-6">
              <button
                onClick={addGoal}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
              >
                Add Goal
              </button>
              <button
                onClick={() => setShowAddGoal(false)}
                className="flex-1 bg-white/10 text-white py-2 rounded-lg font-medium hover:bg-white/20 transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoalsView;