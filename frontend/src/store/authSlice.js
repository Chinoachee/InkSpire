import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login, register } from '../services/authService';
import jwtDecode from 'jwt-decode';

// Восстановление состояния из localStorage
const initialState = () => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const user = jwtDecode(token); // Декодируем токен
      return { user, token, status: 'succeeded', error: null };
    } catch (e) {
      console.error('Invalid token:', e);
      localStorage.removeItem('token'); // Удаляем токен, если он некорректный
    }
  }
  return { user: null, token: null, status: 'idle', error: null };
};

// Асинхронный экшен для авторизации
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const data = await login(email, password); // Используем authService
      const token = data.token;
      const user = jwtDecode(token); // Декодируем токен
      localStorage.setItem('token', token); // Сохраняем токен
      return { user: { username: user.login }, token }; // Возвращаем пользователя и токен
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

// Асинхронный экшен для регистрации
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ login, password, email }, { rejectWithValue }) => {
    try {
      const data = await register(login, password, email); // Используем authService
      const token = data.token;
      const user = jwtDecode(token);
      if (token) {
        localStorage.setItem('token', token); // Сохраняем токен
      }
      return { user, token };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
  }
);

// Создание authSlice
const authSlice = createSlice({
  name: 'auth',
  initialState: initialState(), // Используем функцию для восстановления
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token'); // Удаляем токен из localStorage
    },
  },
  extraReducers: (builder) => {
    builder
      // Обработка авторизации
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Login failed';
      })

      // Обработка регистрации
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Registration failed';
      });
  },
});

// Экспортируем экшены и редьюсер
export const { logout } = authSlice.actions;
export default authSlice.reducer;
