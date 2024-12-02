import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login, register} from '../services/authService';

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async({ email, password}, {rejectWithValue}) => {
        try{
            const data = await login(email,password);
            return data;
        }catch(error){
            return rejectWithValue(error.response?.data?.message || 'Login failed');
        }
    }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ login, email, password }, { rejectWithValue }) => {
    try {
      const data = await register(login,password, email );
      return data; // Сервер должен возвращать объект с информацией о пользователе
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
  }
);


const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null, // Информация о пользователе
    token: null, // JWT-токен
    status: 'idle', // idle | loading | succeeded | failed
    error: null, // Сообщение об ошибке
  },
  reducers: {
    logout: (state) => {
      // Обнуляем данные при выходе
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Обработка логина
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload.token;
        state.user = action.payload.user;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Unknown error';
      })

      // Обработка регистрации
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user; // Сохраняем данные пользователя
        state.token = action.payload.token; // Сохраняем токен, если возвращается
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Registration failed';
      });
  },
});


export const { logout } = authSlice.actions;
export default authSlice.reducer;