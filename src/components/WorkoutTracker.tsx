import React, { useState } from 'react';
import { Plus, Play, Pause, Square, Timer, Dumbbell, Flame } from 'lucide-react';

const WorkoutTracker = () => {
  const [isWorkoutActive, setIsWorkoutActive] = useState(false);
  const [workoutTime, setWorkoutTime] = useState(0);
  const [selectedExercises, setSelectedExercises] = useState<string[]>([]);

  const exercises = [
    { name: 'Push-ups', category: 'Chest', sets: 3, reps: 15, calories: 50 },
    { name: 'Squats', category: 'Legs', sets: 3, reps: 20, calories: 60 },
    { name: 'Plank', category: 'Core', sets: 3, reps: '60s', calories: 40 },
    { name: 'Burpees', category: 'Full Body', sets: 3, reps: 10, calories: 80 },
    { name: 'Lunges', category: 'Legs', sets: 3, reps: 12, calories: 55 },
    { name: 'Mountain Climbers', category: 'Cardio', sets: 3, reps: 20, calories: 70 },
  ];

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleExercise = (exerciseName: string) => {
    setSelectedExercises(prev =>
      prev.includes(exerciseName)
        ? prev.filter(name => name !== exerciseName)
        : [...prev, exerciseName]
    );
  };

  const startWorkout = () => {
    setIsWorkoutActive(true);
    // In a real app, you'd start a timer here
  };

  const pauseWorkout = () => {
    setIsWorkoutActive(false);
  };

  const endWorkout = () => {
    setIsWorkoutActive(false);
    setWorkoutTime(0);
    setSelectedExercises([]);
  };

  return (
    <div className="space-y-8">
      {/* Workout Timer */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
        <div className="text-center">
          <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <div className="text-center">
              <Timer className="w-8 h-8 text-white mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{formatTime(workoutTime)}</p>
            </div>
          </div>
          <div className="flex justify-center space-x-4">
            {!isWorkoutActive ? (
              <button
                onClick={startWorkout}
                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3 rounded-lg font-medium hover:from-green-700 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
              >
                <Play className="w-5 h-5" />
                <span>Start Workout</span>
              </button>
            ) : (
              <>
                <button
                  onClick={pauseWorkout}
                  className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-6 py-3 rounded-lg font-medium hover:from-yellow-700 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
                >
                  <Pause className="w-5 h-5" />
                  <span>Pause</span>
                </button>
                <button
                  onClick={endWorkout}
                  className="bg-gradient-to-r from-red-600 to-pink-600 text-white px-6 py-3 rounded-lg font-medium hover:from-red-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
                >
                  <Square className="w-5 h-5" />
                  <span>End</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Exercise Selection */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white">Select Exercises</h3>
          <span className="text-purple-400 text-sm">{selectedExercises.length} selected</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {exercises.map((exercise, index) => (
            <div
              key={index}
              onClick={() => toggleExercise(exercise.name)}
              className={`p-4 rounded-lg border cursor-pointer transition-all duration-300 ${
                selectedExercises.includes(exercise.name)
                  ? 'bg-purple-600/30 border-purple-400'
                  : 'bg-white/5 border-white/10 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <Dumbbell className="w-5 h-5 text-white" />
                </div>
                <div className="flex items-center space-x-1 text-orange-400">
                  <Flame className="w-4 h-4" />
                  <span className="text-sm">{exercise.calories}</span>
                </div>
              </div>
              <h4 className="text-white font-medium mb-1">{exercise.name}</h4>
              <p className="text-gray-400 text-sm mb-2">{exercise.category}</p>
              <p className="text-gray-300 text-sm">{exercise.sets} sets × {exercise.reps}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Current Workout */}
      {selectedExercises.length > 0 && (
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <h3 className="text-xl font-semibold text-white mb-6">Current Workout Plan</h3>
          <div className="space-y-4">
            {selectedExercises.map((exerciseName, index) => {
              const exercise = exercises.find(e => e.name === exerciseName);
              return (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="text-white font-medium">{exercise?.name}</h4>
                      <p className="text-gray-400 text-sm">{exercise?.sets} sets × {exercise?.reps}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1 text-orange-400">
                      <Flame className="w-4 h-4" />
                      <span className="text-sm">{exercise?.calories} cal</span>
                    </div>
                    <button className="text-red-400 hover:text-red-300 text-sm">Remove</button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-6 p-4 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg border border-purple-400/30">
            <div className="flex items-center justify-between">
              <span className="text-white font-medium">Total Estimated Calories:</span>
              <span className="text-orange-400 font-bold">
                {selectedExercises.reduce((total, name) => {
                  const exercise = exercises.find(e => e.name === name);
                  return total + (exercise?.calories || 0);
                }, 0)} cal
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkoutTracker;