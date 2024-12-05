import axios from 'axios';

const API_URL = 'http://localhost:5157/api/stories'; // Базовый URL для API

export const createStory = async ({ title, initialText, token }) => {
  try {
    const response = await axios.post(
      API_URL,
      { title, initialText },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to create story');
  }
};
