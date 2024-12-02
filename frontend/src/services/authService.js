import axios from 'axios';

const API_URL = 'http://localhost:5157/api/users'; // Замените на ваш API-адрес

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/authorization`, {
      email,
      password,
    });
    return response.data; // Возвращаем токен или пользовательские данные
  } catch (error) {
    throw error.response?.data?.message || 'Login failed';
  }
};
export const register = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/registration`, {
      email,
      password,
    });
    return response.data; // Предполагаем, что сервер возвращает данные пользователя или сообщение об успешной регистрации
  } catch (error) {
    throw error.response?.data?.message || 'Registration failed';
  }
};