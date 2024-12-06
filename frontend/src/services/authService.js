import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5157/api/users' });

export const login = async (email, password) => {
  const { data } = await API.post('/authorization', { email, password });
  return data;
};

export const register = async (login, password, email) => {
  const { data } = await API.post('/registration', { login, password, email });
  return data;
};
