// Home.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BookIcon from '../assets/icons/book-svgrepo-com.svg';
import SBookIcon from '../assets/icons/shadowbook-svgrepo-com.svg';
import Chat from '../components/Chat';
import MoodTracker from '../components/MoodTracker';

function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="home-container flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 via-indigo-100 to-purple-50 p-6">
      <div className="text-center max-w-2xl mb-12 animate-fadeIn">
        <h1 className="text-5xl md:text-6xl font-extrabold text-blue-900 mb-6">
          Discover Your Path to Self-Discovery
        </h1>
        <p className="text-lg md:text-xl text-gray-700">
          Take control of your personal growth journey. Explore tools designed to help you find balance, insight, and healing.
        </p>
      </div>

      {/* Card Grid with Rounded Styles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl">
        <Link
          to="/workbook"
          className="flex flex-col items-center p-6 bg-white rounded-3xl shadow-lg hover:shadow-2xl transform transition-transform hover:-translate-y-1 duration-300 text-center"
        >
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-full flex items-center justify-center mb-4">
            <img src={BookIcon} alt="Workbook Icon" className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-semibold text-blue-800 mb-2">
            Addiction Recovery Workbook
          </h2>
          <p className="text-gray-600 text-base">
            Engage in exercises that support addiction recovery and foster positive change.
          </p>
        </Link>

        <Link
          to="/shadow-workbook"
          className="flex flex-col items-center p-6 bg-white rounded-3xl shadow-lg hover:shadow-2xl transform transition-transform hover:-translate-y-1 duration-300 text-center"
        >
          <div className="w-16 h-16 bg-gradient-to-r from-gray-700 to-gray-900 text-white rounded-full flex items-center justify-center mb-4">
            <img src={SBookIcon} alt="Shadow Workbook Icon" className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Shadow Work Workbook
          </h2>
          <p className="text-gray-600 text-base">
            Reflect on repressed emotions and uncover new insights about yourself.
          </p>
        </Link>
      </div>

      <div className="my-12 w-full max-w-md">
        <MoodTracker />
      </div>

      <footer className="mt-16 text-center text-gray-500 text-sm max-w-md">
        Start your journey today. Personal growth is a continuous and empowering journey.
      </footer>

      <button
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-6 right-6 p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg transform hover:scale-110 transition duration-300"
      >
        💬
      </button>

      {isChatOpen && <Chat closeChat={() => setIsChatOpen(false)} />}
    </div>
  );
}

export default Home;
