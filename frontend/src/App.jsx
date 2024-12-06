import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from './store/authSlice';
import { getTokenFromLocalStorage } from './utils/tokenUtils';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CreateStoryPage from './pages/CreateStoryPage';
import UserProfilePage from './pages/UserProfilePage';
import StoryPage from './pages/StoryPage';

const App = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!getTokenFromLocalStorage()) {
      dispatch(logout());
    }
  }, [dispatch]);

  const isAuthenticated = Boolean(token);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/create"
          element={
            isAuthenticated ? <CreateStoryPage /> : <Navigate to="/login" />
          }
        />
        <Route path="/profile/:login" element={<UserProfilePage />} />
        <Route path="/story/:storyId" element={<StoryPage />} />
      </Routes>
    </>
  );
};

export default App;
