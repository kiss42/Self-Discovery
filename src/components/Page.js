import React from 'react';

function Page({ title, instructions, fields = [], prompts = [] }) {
  // Select a random prompt if multiple prompts are available
  const randomPrompt = prompts.length > 0 ? prompts[Math.floor(Math.random() * prompts.length)] : null;

  return (
    <div className="page p-4 bg-gray-100 border border-gray-300 rounded-lg shadow-sm">
      <h3 className="text-xl font-medium mb-3 text-gray-700">{title}</h3>
      <p className="text-sm mb-4 text-gray-600">{instructions}</p>

      {/* Display only one random prompt */}
      {randomPrompt && (
        <p className="text-gray-600 text-sm italic mb-4">Prompt: "{randomPrompt}"</p>
      )}

      {/* Render fields with special handling for specific instructions */}
      {fields.length > 0 && (
        <div>
          {fields.map((field) => (
            <div key={field.name} className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">{field.label || field.name}</label>

              {/* Custom rendering for "Personal Risk Factors" section */}
              {title === "Exercise 1.2: Personal Risk Factors" ? (
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input type="radio" name={field.name} value="Yes" className="mr-2" />
                    <span className="text-gray-600">Yes</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name={field.name} value="No" className="mr-2" />
                    <span className="text-gray-600">No</span>
                  </label>
                </div>
              ) : instructions === "Take a few deep breaths and observe your body sensations. How does your body feel?" ? (
                // Unique fields for the "Mindfulness Practices" question
                field.name === "See" ? (
                  <select className="w-full p-2 border border-gray-300 rounded-lg">
                    <option value="">Select an option</option>
                    <option value="Clear">Clear</option>
                    <option value="Blurry">Blurry</option>
                    <option value="Bright">Bright</option>
                    <option value="Dark">Dark</option>
                  </select>
                ) : field.name === "Feel" ? (
                  <div className="flex items-center">
                    <input
                      type="range"
                      min="0"
                      max="10"
                      className="mr-2"
                    />
                    <span>Intensity</span>
                  </div>
                ) : field.name === "Hear" ? (
                  <select className="w-full p-2 border border-gray-300 rounded-lg">
                    <option value="">Select an option</option>
                    <option value="Loud">Loud</option>
                    <option value="Quiet">Quiet</option>
                    <option value="Muffled">Muffled</option>
                    <option value="Clear">Clear</option>
                  </select>
                ) : field.name === "Smell" ? (
                  <select className="w-full p-2 border border-gray-300 rounded-lg">
                    <option value="">Select an option</option>
                    <option value="Strong">Strong</option>
                    <option value="Faint">Faint</option>
                    <option value="Pleasant">Pleasant</option>
                    <option value="Unpleasant">Unpleasant</option>
                  </select>
                ) : field.name === "Taste" ? (
                  <div className="flex space-x-2">
                    <button type="button" className="text-2xl" aria-label="Happy">😊</button>
                    <button type="button" className="text-2xl" aria-label="Neutral">😐</button>
                    <button type="button" className="text-2xl" aria-label="Unpleasant">😟</button>
                  </div>
                ) : (
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder={`Enter ${field.name.toLowerCase()}...`}
                  />
                )
              ) : (
                // Default input based on type for all other fields
                field.type === 'checkbox' && field.options ? (
                  <div>
                    {field.options.map((option, index) => (
                      <div key={index} className="flex items-center mb-2">
                        <input type="checkbox" className="mr-2" id={`${field.name}-${index}`} />
                        <label htmlFor={`${field.name}-${index}`} className="text-gray-600">{option}</label>
                      </div>
                    ))}
                  </div>
                ) : (
                  <input
                    type={field.type}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder={`Enter ${field.name.toLowerCase()}...`}
                  />
                )
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Page;
