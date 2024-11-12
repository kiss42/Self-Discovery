import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Section from './Section';
import addictionRecoveryData from '../data/addictionRecovery.json';
import html2pdf from 'html2pdf.js';

function WorkbookContainer() {
  const [activities, setActivities] = useState([]);
  const activityRef = useRef();

  useEffect(() => {
    // Safely map over addictionRecoveryData and check if it exists
    setActivities(
      (addictionRecoveryData || []).map((section) => ({
        ...section,
        exercises: (section.exercises || []).map((exercise) => ({
          ...exercise,
          prompt: (exercise.prompts || [])[Math.floor(Math.random() * (exercise.prompts?.length || 1))]
        }))
      }))
    );
  }, []);

  const handleSaveAsPDF = () => {
    // Get current date in YYYY-MM-DD format
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0]; // e.g., "2024-11-12"

    const options = {
      margin: 1,
      filename: `Workbook-Entry-${formattedDate}.pdf`, // Add date to filename
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().from(activityRef.current).set(options).save();
  };

  return (
    <div className="workbook-container flex flex-col items-center bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-100 min-h-screen py-10">
      <Link to="/" className="text-blue-600 hover:underline mb-4">&larr; Back to Home</Link>
      <h1 className="text-4xl font-bold text-blue-800 mb-6">Addiction Recovery Workbook</h1>
      <div ref={activityRef} className="w-full max-w-3xl space-y-4">
        {activities.length > 0 ? (
          activities.map((activity) => (
            <div key={activity.id} className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition duration-300">
              <Section title={activity.title} exercises={activity.exercises || []} />
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No activities available.</p>
        )}
      </div>
      <button 
        onClick={handleSaveAsPDF}
        className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
      >
        Save Entry as PDF
      </button>
    </div>
  );
}

export default WorkbookContainer;
