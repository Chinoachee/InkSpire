import axios from 'axios';

const API_URL = 'http://localhost:5157/api/stories'; // Базовый URL для API

/**
 * Создание новой истории.
 * @param {string} title - Название истории.
 * @param {string} initialText - Содержание истории.
 * @param {string} token - JWT токен для авторизации.
 * @returns {Promise} - Результат операции.
 */
export const createStory = async ({ title, initialText, token }) => {
  try {
    const response = await axios.post(
      API_URL,
      { title, initialText }, // Отправляем только необходимые данные
      {
        headers: {
          Authorization: `Bearer ${token}`, // Токен передаётся в заголовке
        },
      }
    );
    return response.data; // Возвращаем результат
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to create story');
  }
};
