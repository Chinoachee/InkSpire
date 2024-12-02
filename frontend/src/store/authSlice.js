import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login, register } from '../services/authService';

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

const authSlice = createSlice({
    name: 'auth', // Имя среза (slice). Будет использоваться в action.type, например: 'auth/logout'.
    initialState: { // Начальное состояние для этого slice.
      user: null,        // Информация о пользователе (например, имя, email).
      token: null,       // JWT-токен или иной маркер авторизации.
      status: 'idle',    // Состояние запроса ('idle', 'loading', 'succeeded', 'failed').
      error: null,       // Ошибки, если что-то пошло не так.
    },
    reducers: { // Список синхронных функций для изменения состояния.
      logout: (state) => {
        // Обнуляем данные при выходе из системы.
        state.user = null;
        state.token = null;
      },
    },
    extraReducers: (builder) => { // Для обработки асинхронных экшенов (thunks).
      builder
        .addCase(loginUser.pending, (state) => {
          state.status = 'loading'; // При начале логина устанавливаем статус "loading".
          state.error = null;       // Сбрасываем предыдущие ошибки.
        })
        .addCase(loginUser.fulfilled, (state, action) => {
          state.status = 'succeeded'; // Успешный логин.
          state.token = action.payload.token; // Сохраняем токен.
          state.user = action.payload.user;   // Сохраняем данные пользователя.
        })
        .addCase(loginUser.rejected, (state, action) => {
          state.status = 'failed'; // Ошибка логина.
          state.error = action.payload || 'Unknown error'; // Сохраняем сообщение об ошибке.
        });
    },
  });

export const { logout } = authSlice.actions;
export default authSlice.reducer;