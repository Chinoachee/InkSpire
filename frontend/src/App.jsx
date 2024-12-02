import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import CreateStoryPage from './pages/CreateStoryPage';
import Header from './components/Header'
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from './store/authSlice';
import jwtDecode from 'jwt-decode';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        jwtDecode(token);
      } catch (e) {
        console.error('Invalid token:', e);
        dispatch(logout());
      }
    }
  }, [dispatch]);

  const { token } = useSelector((state) => state.auth);
  const isAuthenticated = Boolean(token);
  return (
    <>
    <Header />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element= {<RegisterPage/>} />
      <Route
        path="/create"
        element={
          isAuthenticated ? <CreateStoryPage /> : <Navigate to="/login" />
        }
      />
    </Routes>
    </>
  );
};

export default App;