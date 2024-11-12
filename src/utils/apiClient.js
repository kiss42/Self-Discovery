// utils/apiClient.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.REACT_APP_HUGGINGFACE_API_KEY}`, // Use environment variable for the key
  },
});

export const sendMessage = async (message) => {
  try {
    const response = await apiClient.post('', { inputs: message });
    return response.data.generated_text || 'No response from server.';
  } catch (error) {
    console.error('Error communicating with the API:', error);
    throw error;
  }
};

export default apiClient;
