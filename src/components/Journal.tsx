import React, { useState } from 'react';
import { BookOpen, Plus, Edit, Trash2, Calendar, Heart, Smile, Meh, Frown } from 'lucide-react';

const Journal = () => {
  const [entries, setEntries] = useState([
    {
      id: 1,
      date: '2024-01-15',
      mood: 'happy',
      title: 'Great workout today!',
      content: 'Had an amazing workout session this morning. Felt really energized and managed to complete all my sets. The new meditation routine is really helping with my focus.',
      tags: ['workout', 'meditation', 'energy'],
    },
    {
      id: 2,
      date: '2024-01-14',
      mood: 'neutral',
      title: 'Rest day reflections',
      content: 'Taking a rest day today. Sometimes I feel guilty about not working out, but I know recovery is just as important. Used the time to meal prep for the week.',
      tags: ['rest', 'meal-prep', 'recovery'],
    },
    {
      id: 3,
      date: '2024-01-13',
      mood: 'motivated',
      title: 'New goals set',
      content: 'Set some new fitness goals for this month. Want to increase my water intake and try more meditation sessions. Feeling really motivated to make positive changes.',
      tags: ['goals', 'motivation', 'planning'],
    },
  ]);

  const [showAddEntry, setShowAddEntry] = useState(false);
  const [editingEntry, setEditingEntry] = useState<any>(null);
  const [newEntry, setNewEntry] = useState({
    title: '',
    content: '',
    mood: 'neutral',
    tags: '',
  });

  const moods = [
    { value: 'happy', label: 'Happy', icon: Smile, color: 'text-green-400' },
    { value: 'motivated', label: 'Motivated', icon: Heart, color: 'text-purple-400' },
    { value: 'neutral', label: 'Neutral', icon: Meh, color: 'text-gray-400' },
    { value: 'sad', label: 'Sad', icon: Frown, color: 'text-blue-400' },
  ];

  const getMoodIcon = (mood: string) => {
    const moodData = moods.find(m => m.value === mood);
    return moodData || moods[2]; // Default to neutral
  };

  const addEntry = () => {
    if (newEntry.title && newEntry.content) {
      const entry = {
        id: entries.length + 1,
        date: new Date().toISOString().split('T')[0],
        title: newEntry.title,
        content: newEntry.content,
        mood: newEntry.mood,
        tags: newEntry.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      };
      setEntries([entry, ...entries]);
      setNewEntry({ title: '', content: '', mood: 'neutral', tags: '' });
      setShowAddEntry(false);
    }
  };

  const updateEntry = () => {
    if (editingEntry && editingEntry.title && editingEntry.content) {
      setEntries(entries.map(entry => 
        entry.id === editingEntry.id 
          ? {
              ...editingEntry,
              tags: typeof editingEntry.tags === 'string' 
                ? editingEntry.tags.split(',').map((tag: string) => tag.trim()).filter((tag: string) => tag)
                : editingEntry.tags
            }
          : entry
      ));
      setEditingEntry(null);
    }
  };

  const deleteEntry = (id: number) => {
    setEntries(entries.filter(entry => entry.id !== id));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getMoodStats = () => {
    const moodCounts = entries.reduce((acc, entry) => {
      acc[entry.mood] = (acc[entry.mood] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return moods.map(mood => ({
      ...mood,
      count: moodCounts[mood.value] || 0,
      percentage: entries.length > 0 ? ((moodCounts[mood.value] || 0) / entries.length) * 100 : 0,
    }));
  };

  const moodStats = getMoodStats();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-bold text-white mb-2">Wellness Journal</h2>
          <p className="text-gray-300">Reflect on your journey and track your progress</p>
        </div>
        <button
          onClick={() => setShowAddEntry(true)}
          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>New Entry</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-white">{entries.length}</p>
            <p className="text-gray-300 text-sm">Total Entries</p>
          </div>
        </div>

        {moodStats.slice(0, 3).map((mood, index) => (
          <div key={mood.value} className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <mood.icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-white">{mood.count}</p>
              <p className="text-gray-300 text-sm">{mood.label} Days</p>
            </div>
          </div>
        ))}
      </div>

      {/* Mood Distribution */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
        <h3 className="text-xl font-semibold text-white mb-6">Mood Distribution</h3>
        <div className="space-y-4">
          {moodStats.map((mood) => (
            <div key={mood.value} className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 w-24">
                <mood.icon className={`w-5 h-5 ${mood.color}`} />
                <span className="text-white text-sm">{mood.label}</span>
              </div>
              <div className="flex-1 bg-white/10 rounded-full h-2">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
                  style={{ width: `${mood.percentage}%` }}
                />
              </div>
              <span className="text-gray-300 text-sm w-12">{mood.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Journal Entries */}
      <div className="space-y-6">
        {entries.map((entry) => {
          const moodData = getMoodIcon(entry.mood);
          return (
            <div key={entry.id} className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <moodData.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{entry.title}</h3>
                    <p className="text-gray-400 text-sm flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDate(entry.date)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setEditingEntry({ ...entry, tags: entry.tags.join(', ') })}
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteEntry(entry.id)}
                    className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <p className="text-gray-300 mb-4 leading-relaxed">{entry.content}</p>

              {entry.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {entry.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-purple-600/20 text-purple-400 rounded-full text-xs"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {entries.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No entries yet</h3>
            <p className="text-gray-500">Start your wellness journey by writing your first entry</p>
          </div>
        )}
      </div>

      {/* Add Entry Modal */}
      {showAddEntry && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-xl p-6 w-full max-w-2xl border border-white/20 max-h-[80vh] overflow-y-auto">
            <h3 className="text-xl font-semibold text-white mb-6">New Journal Entry</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Title</label>
                <input
                  type="text"
                  value={newEntry.title}
                  onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
                  placeholder="How are you feeling today?"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Mood</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {moods.map((mood) => (
                    <button
                      key={mood.value}
                      onClick={() => setNewEntry({ ...newEntry, mood: mood.value })}
                      className={`p-3 rounded-lg border transition-all duration-300 flex flex-col items-center space-y-1 ${
                        newEntry.mood === mood.value
                          ? 'bg-purple-600/30 border-purple-400'
                          : 'bg-white/5 border-white/10 hover:bg-white/10'
                      }`}
                    >
                      <mood.icon className={`w-6 h-6 ${mood.color}`} />
                      <span className="text-white text-sm">{mood.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Content</label>
                <textarea
                  value={newEntry.content}
                  onChange={(e) => setNewEntry({ ...newEntry, content: e.target.value })}
                  rows={6}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 resize-none"
                  placeholder="Write about your day, thoughts, or feelings..."
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Tags (comma separated)</label>
                <input
                  type="text"
                  value={newEntry.tags}
                  onChange={(e) => setNewEntry({ ...newEntry, tags: e.target.value })}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
                  placeholder="workout, meditation, goals"
                />
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={addEntry}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
              >
                Save Entry
              </button>
              <button
                onClick={() => {
                  setShowAddEntry(false);
                  setNewEntry({ title: '', content: '', mood: 'neutral', tags: '' });
                }}
                className="flex-1 bg-white/10 text-white py-2 rounded-lg font-medium hover:bg-white/20 transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Entry Modal */}
      {editingEntry && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-xl p-6 w-full max-w-2xl border border-white/20 max-h-[80vh] overflow-y-auto">
            <h3 className="text-xl font-semibold text-white mb-6">Edit Entry</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Title</label>
                <input
                  type="text"
                  value={editingEntry.title}
                  onChange={(e) => setEditingEntry({ ...editingEntry, title: e.target.value })}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Mood</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {moods.map((mood) => (
                    <button
                      key={mood.value}
                      onClick={() => setEditingEntry({ ...editingEntry, mood: mood.value })}
                      className={`p-3 rounded-lg border transition-all duration-300 flex flex-col items-center space-y-1 ${
                        editingEntry.mood === mood.value
                          ? 'bg-purple-600/30 border-purple-400'
                          : 'bg-white/5 border-white/10 hover:bg-white/10'
                      }`}
                    >
                      <mood.icon className={`w-6 h-6 ${mood.color}`} />
                      <span className="text-white text-sm">{mood.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Content</label>
                <textarea
                  value={editingEntry.content}
                  onChange={(e) => setEditingEntry({ ...editingEntry, content: e.target.value })}
                  rows={6}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 resize-none"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Tags (comma separated)</label>
                <input
                  type="text"
                  value={editingEntry.tags}
                  onChange={(e) => setEditingEntry({ ...editingEntry, tags: e.target.value })}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
                />
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={updateEntry}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
              >
                Update Entry
              </button>
              <button
                onClick={() => setEditingEntry(null)}
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

export default Journal;