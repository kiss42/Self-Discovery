// MoodTracker.js
import React, { useState, useEffect } from 'react';

const MoodTracker = () => {
  const [mood, setMood] = useState('');
  const [moodHistory, setMoodHistory] = useState([]);

  // Load mood history from localStorage on component mount
  useEffect(() => {
    const savedMoodHistory = JSON.parse(localStorage.getItem('moodHistory')) || [];
    setMoodHistory(savedMoodHistory);
  }, []);

  // Save mood history to localStorage whenever it updates
  useEffect(() => {
    localStorage.setItem('moodHistory', JSON.stringify(moodHistory));
  }, [moodHistory]);

  const handleMoodSubmit = () => {
    if (mood) {
      const newMoodEntry = {
        date: new Date().toLocaleDateString(),
        mood,
      };
      setMoodHistory([newMoodEntry, ...moodHistory]);
      setMood(''); // Reset mood input after submission
    }
  };

  return (
    <div className="mood-tracker-container p-4 bg-white shadow-md rounded-lg w-full max-w-md">
      <h2 className="text-xl font-semibold mb-3">Mood Tracker</h2>
      <select
        value={mood}
        onChange={(e) => setMood(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-lg mb-3"
      >
        <option value="">How are you feeling today?</option>
        <option value="😊 Happy">😊 Happy</option>
        <option value="😔 Sad">😔 Sad</option>
        <option value="😠 Angry">😠 Angry</option>
        <option value="😨 Anxious">😨 Anxious</option>
        <option value="😌 Relaxed">😌 Relaxed</option>
      </select>
      <button
        onClick={handleMoodSubmit}
        className="w-full p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Save Mood
      </button>

      {/* Mood History Section */}
      <div className="mood-history mt-4">
        <h3 className="text-lg font-semibold mb-2">Mood History</h3>
        <ul className="space-y-2">
          {moodHistory.map((entry, index) => (
            <li key={index} className="flex justify-between items-center p-2 border border-gray-200 rounded-lg">
              <span>{entry.date}</span>
              <span>{entry.mood}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MoodTracker;
