import axios from 'axios';

const API_URL = 'http://localhost:5157/api/users'; 

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/authorization`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Login failed';
  }
};

export const register = async (login, password, email) => {
  try {
    const response = await axios.post(`${API_URL}/registration`, {
      login,
      password,
      email,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Registration failed';
  }
};
