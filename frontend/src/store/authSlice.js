import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login, register } from '../services/authService';
import jwtDecode from 'jwt-decode';
import {
  getTokenFromLocalStorage,
  saveTokenToLocalStorage,
  removeTokenFromLocalStorage,
} from '../utils/tokenUtils';

const initialState = {
  user: getTokenFromLocalStorage(),
  token: localStorage.getItem('token') || null,
  status: 'idle',
  error: null,
};

//Работает
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const data = await login(email, password);
      saveTokenToLocalStorage(data.token);
      return { user: jwtDecode(data.token), token: data.token };
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
      saveTokenToLocalStorage(data.token);
      return { user: jwtDecode(data.token), token: data.token };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      removeTokenFromLocalStorage();
    },
  },
  extraReducers: (builder) => {
    builder
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
