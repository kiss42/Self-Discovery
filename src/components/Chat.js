// Chat.js
import React, { useState } from 'react';
import { Mistral } from "@mistralai/mistralai";

function Chat({ closeChat }) {
  const [userMessage, setUserMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([{ role: 'bot', content: 'Hello! I’m here to listen and support you. How are you feeling today?' }]);
  const [isLoading, setIsLoading] = useState(false);
  const [retryTimeout, setRetryTimeout] = useState(null);

  const apiKey = process.env.REACT_APP_MISTRAL_API_KEY;
  const client = new Mistral({ apiKey });

  const sendMessage = async () => {
    if (!userMessage) return;

    setIsLoading(true);

    try {
      const chatResponse = await client.chat.complete({
        model: 'mistral-large-latest',
        messages: [
          { role: 'system', content: 'Act as a compassionate wellness coach.' },
          { role: 'user', content: userMessage },
        ],
      });

      const botMessage = chatResponse.choices[0].message.content || 'No response from server.';
      setChatHistory((prevChat) => [
        ...prevChat,
        { role: 'user', content: userMessage },
        { role: 'bot', content: botMessage },
      ]);
      setUserMessage('');
    } catch (error) {
      setChatHistory((prevChat) => [
        ...prevChat,
        { role: 'bot', content: 'Error: Could not reach server.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white shadow-lg rounded-lg w-80 h-112 flex flex-col">
      <div className="flex items-center justify-between p-3 bg-blue-700 text-white rounded-t-lg">
        <h2 className="text-lg font-semibold">Chat with Your Wellness Coach</h2>
        <button onClick={closeChat} className="text-white text-2xl hover:text-gray-300">&times;</button>
      </div>
      {/* Chat history container with scrollable area */}
      <div className="flex-grow p-4 overflow-y-auto space-y-4 max-h-72">
        {chatHistory.map((message, index) => (
          <div key={index} className="mb-2">
            <p
              className={`px-3 py-2 rounded-lg inline-block ${
                message.role === 'user'
                  ? 'bg-blue-500 text-white self-end'
                  : 'bg-gray-200 text-gray-800 self-start'
              }`}
            >
              <span className="font-semibold">{message.role === 'user' ? 'You' : 'Coach'}:</span> {message.content}
            </p>
          </div>
        ))}
        {isLoading && <p className="text-left text-gray-500 italic">Coach is typing...</p>}
      </div>
      <div className="p-3 flex items-center space-x-2 border-t border-gray-300 bg-white rounded-b-lg">
        <input
          type="text"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          className="flex-grow p-2 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={sendMessage}
          className={`px-4 py-2 rounded-full text-white transition duration-200 ${
            isLoading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
          disabled={isLoading}
        >
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  );
}

export default Chat;
