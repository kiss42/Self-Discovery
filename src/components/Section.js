import React from 'react';

function Section({ title, exercises = [], pages = [] }) {
  const itemsToRender = exercises.length > 0 ? exercises : pages;

  return (
    <div className="section p-4">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      {itemsToRender.length > 0 ? (
        itemsToRender.map((item, index) => (
          <div key={index} className="mb-6">
            <h3 className="text-xl font-medium">{item.title}</h3>
            <p className="text-gray-600">{item.description || item.instructions}</p>
            {item.prompt && <p className="italic text-gray-700 mb-2">Prompt: {item.prompt}</p>}

            {/* Render fields */}
            {item.fields && item.fields.length > 0 && (
              <div>
                {item.fields.map((field, idx) => (
                  <div key={idx} className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">{field.label || field.name}</label>
                    {field.type === "text" && <input type="text" className="w-full p-2 border border-gray-300 rounded" />}
                    {field.type === "dropdown" && (
                      <select className="w-full p-2 border border-gray-300 rounded">
                        {field.options.map((option, optIdx) => (
                          <option key={optIdx} value={option}>{option}</option>
                        ))}
                      </select>
                    )}
                    {field.type === "yes_no" && (
                      <div className="flex items-center space-x-4">
                        <label className="flex items-center">
                          <input type="radio" name={field.name} value="Yes" className="mr-2" />
                          <span>Yes</span>
                        </label>
                        <label className="flex items-center">
                          <input type="radio" name={field.name} value="No" className="mr-2" />
                          <span>No</span>
                        </label>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))
      ) : (
        <p className="text-gray-500">No items available.</p>
      )}
    </div>
  );
}

export default Section;
