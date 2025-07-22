import React, { useState, useEffect } from 'react';
import { Play, Pause, Square, Brain, Clock, Volume2, VolumeX, RotateCcw } from 'lucide-react';

const Meditation = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSession, setCurrentSession] = useState<any>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(0);

  const meditationSessions = [
    {
      id: 1,
      title: 'Morning Mindfulness',
      duration: 300, // 5 minutes
      description: 'Start your day with clarity and focus',
      category: 'Mindfulness',
      difficulty: 'Beginner',
      color: 'from-orange-500 to-yellow-500',
    },
    {
      id: 2,
      title: 'Deep Breathing',
      duration: 600, // 10 minutes
      description: 'Calm your mind with focused breathing',
      category: 'Breathing',
      difficulty: 'Beginner',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      id: 3,
      title: 'Body Scan Relaxation',
      duration: 900, // 15 minutes
      description: 'Release tension throughout your body',
      category: 'Relaxation',
      difficulty: 'Intermediate',
      color: 'from-green-500 to-emerald-500',
    },
    {
      id: 4,
      title: 'Loving Kindness',
      duration: 720, // 12 minutes
      description: 'Cultivate compassion and self-love',
      category: 'Compassion',
      difficulty: 'Intermediate',
      color: 'from-pink-500 to-rose-500',
    },
    {
      id: 5,
      title: 'Sleep Preparation',
      duration: 1200, // 20 minutes
      description: 'Prepare your mind for restful sleep',
      category: 'Sleep',
      difficulty: 'Advanced',
      color: 'from-purple-500 to-indigo-500',
    },
    {
      id: 6,
      title: 'Stress Relief',
      duration: 480, // 8 minutes
      description: 'Let go of stress and anxiety',
      category: 'Stress Relief',
      difficulty: 'Beginner',
      color: 'from-red-500 to-pink-500',
    },
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsPlaying(false);
            setCompletedSessions(count => count + 1);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startSession = (session: any) => {
    setCurrentSession(session);
    setTimeLeft(session.duration);
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const stopSession = () => {
    setIsPlaying(false);
    setCurrentSession(null);
    setTimeLeft(0);
  };

  const resetSession = () => {
    if (currentSession) {
      setTimeLeft(currentSession.duration);
      setIsPlaying(false);
    }
  };

  const getProgressPercentage = () => {
    if (!currentSession) return 0;
    return ((currentSession.duration - timeLeft) / currentSession.duration) * 100;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-4xl font-bold text-white mb-2">Meditation</h2>
        <p className="text-gray-300 text-lg">Find peace and clarity through mindful practice</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-white">{completedSessions}</p>
            <p className="text-gray-300 text-sm">Sessions Completed</p>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-white">{Math.floor(completedSessions * 8.5)}m</p>
            <p className="text-gray-300 text-sm">Total Time</p>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-white">7</p>
            <p className="text-gray-300 text-sm">Day Streak</p>
          </div>
        </div>
      </div>

      {/* Current Session Player */}
      {currentSession && (
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 animate-fadeIn">
          <div className="text-center mb-8">
            <div className={`w-32 h-32 mx-auto mb-6 bg-gradient-to-r ${currentSession.color} rounded-full flex items-center justify-center relative overflow-hidden`}>
              <div className="absolute inset-0 bg-black/20 rounded-full" />
              <div 
                className="absolute inset-0 bg-white/20 rounded-full transition-all duration-1000"
                style={{
                  background: `conic-gradient(from 0deg, rgba(255,255,255,0.3) ${getProgressPercentage()}%, transparent ${getProgressPercentage()}%)`
                }}
              />
              <Brain className="w-12 h-12 text-white relative z-10" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">{currentSession.title}</h3>
            <p className="text-gray-300 mb-4">{currentSession.description}</p>
            <div className="text-4xl font-bold text-white mb-6">{formatTime(timeLeft)}</div>
          </div>

          <div className="flex justify-center space-x-4 mb-6">
            <button
              onClick={togglePlayPause}
              className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 ${
                isPlaying 
                  ? 'bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700' 
                  : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700'
              }`}
            >
              {isPlaying ? <Pause className="w-8 h-8 text-white" /> : <Play className="w-8 h-8 text-white ml-1" />}
            </button>
            <button
              onClick={resetSession}
              className="w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full flex items-center justify-center hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-110"
            >
              <RotateCcw className="w-6 h-6" />
            </button>
            <button
              onClick={stopSession}
              className="w-16 h-16 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-full flex items-center justify-center hover:from-red-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-110"
            >
              <Square className="w-6 h-6" />
            </button>
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="w-16 h-16 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full flex items-center justify-center hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-110"
            >
              {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
            </button>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-white/10 rounded-full h-2 mb-4">
            <div
              className={`h-2 rounded-full bg-gradient-to-r ${currentSession.color} transition-all duration-1000`}
              style={{ width: `${getProgressPercentage()}%` }}
            />
          </div>
        </div>
      )}

      {/* Session Library */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
        <h3 className="text-xl font-semibold text-white mb-6">Meditation Library</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {meditationSessions.map((session) => (
            <div
              key={session.id}
              className="bg-white/5 rounded-lg p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:scale-105 cursor-pointer"
              onClick={() => startSession(session)}
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${session.color} rounded-lg flex items-center justify-center mb-4 mx-auto`}>
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-white font-semibold text-center mb-2">{session.title}</h4>
              <p className="text-gray-300 text-sm text-center mb-3">{session.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="text-purple-400">{session.category}</span>
                <span className="text-gray-400">{Math.floor(session.duration / 60)}m</span>
              </div>
              <div className="mt-2 text-center">
                <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                  session.difficulty === 'Beginner' ? 'bg-green-600/20 text-green-400' :
                  session.difficulty === 'Intermediate' ? 'bg-yellow-600/20 text-yellow-400' :
                  'bg-red-600/20 text-red-400'
                }`}>
                  {session.difficulty}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Sessions */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
        <h3 className="text-xl font-semibold text-white mb-6">Quick Sessions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 3, 5, 10].map((minutes) => (
            <button
              key={minutes}
              onClick={() => startSession({
                id: `quick-${minutes}`,
                title: `${minutes} Minute Meditation`,
                duration: minutes * 60,
                description: 'Quick mindfulness session',
                category: 'Quick',
                difficulty: 'Beginner',
                color: 'from-purple-500 to-pink-500',
              })}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105"
            >
              {minutes}m
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Meditation;