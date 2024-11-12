import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Section from './Section';
import shadowWorkData from '../data/shadowWork.json';
import html2pdf from 'html2pdf.js';

function getRandomActivity(data) {
  if (!data || data.length === 0) return null;
  const randomSection = data[Math.floor(Math.random() * data.length)];
  const randomPage = randomSection.pages[Math.floor(Math.random() * randomSection.pages.length)];
  const randomPrompt = randomPage.prompts[Math.floor(Math.random() * randomPage.prompts.length)];
  return { ...randomSection, pages: [{ ...randomPage, prompt: randomPrompt }] };
}

function ShadowWorkbookContainer() {
  const [activity, setActivity] = useState(null);
  const activityRef = useRef();

  useEffect(() => {
    setActivity(getRandomActivity(shadowWorkData));
  }, []);

  const handleSaveAsPDF = () => {
    const options = {
      margin: 1,
      filename: `Shadow-Workbook-Entry.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().from(activityRef.current).set(options).save();
  };

  return (
    <div className="workbook-container flex flex-col items-center bg-gradient-to-r from-purple-50 via-indigo-100 to-purple-50 min-h-screen py-10">
      <Link to="/" className="text-indigo-600 hover:underline mb-4">&larr; Back to Home</Link>
      <h1 className="text-4xl font-bold text-indigo-800 mb-6">Shadow Work Workbook</h1>
      <div ref={activityRef} className="w-full max-w-3xl p-6 bg-white shadow-md rounded-lg space-y-4">
        {activity ? (
          <Section key={activity.id} title={activity.title} pages={activity.pages} />
        ) : (
          <p className="text-center text-gray-500">No activity available. Please try again later.</p>
        )}
      </div>
      <button 
        onClick={handleSaveAsPDF}
        className="mt-8 px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300"
      >
        Save Entry as PDF
      </button>
    </div>
  );
}

export default ShadowWorkbookContainer;
