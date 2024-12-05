import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login, register } from '../services/authService';
import jwtDecode from 'jwt-decode';

const initialState = () => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const user = jwtDecode(token);
      return { user, token, status: 'succeeded', error: null };
    } catch (e) {
      console.error('Invalid token:', e);
      localStorage.removeItem('token');
    }
  }
  return { user: null, token: null, status: 'idle', error: null };
};

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const data = await login(email, password);
      const token = data.token;
      const user = jwtDecode(token);
      localStorage.setItem('token', token);
      return { user: { username: user.login }, token };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ login, password, email }, { rejectWithValue }) => {
    try {
      const data = await register(login, password, email);
      const token = data.token;
      const user = jwtDecode(token);
      if (token) {
        localStorage.setItem('token', token);
      }
      return { user, token };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
  }
);

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

export const { logout } = authSlice.actions;
export default authSlice.reducer;
