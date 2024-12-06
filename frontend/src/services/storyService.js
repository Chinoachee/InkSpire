import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5157/api/stories' });

export const createStory = async ({ title, initialText, token }) => {
  const { data } = await API.post(
    '/',
    { title, initialText },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return data;
};

export const getStory = async(storyId) => {
  const { data } = await API.get(`?storyId=${storyId}`);
  return data;
}