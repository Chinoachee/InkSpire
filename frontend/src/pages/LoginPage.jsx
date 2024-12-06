import React, { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Alert,
  useColorMode,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';


const LoginPage = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth);
  const { colorMode } = useColorMode();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(credentials));
    if (localStorage.getItem('token') != null) {
      navigate('/'); // Перенаправление на другую страницу
    } else {
      alert('Login failed'); // Вывод сообщения об ошибке
    }
  };

  return (
    <Flex
      align="center"
      justify="center"
      minH="100vh"
      bg={colorMode === 'light' ? 'gray.100' : 'gray.900'}
      color={colorMode === 'light' ? 'black' : 'white'}
    >
      <Box bg={colorMode === 'light' ? 'white' : 'gray.700'} p={8} rounded="lg" shadow="lg" w="400px">
        <Heading textAlign="center" mb={6}>
          Welcome Back
        </Heading>
        {error && <Alert status="error" mb={4}>{error}</Alert>}
        <form onSubmit={handleSubmit}>
          <FormControl mb={4}>
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              type="email"
              value={credentials.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </FormControl>
          <FormControl mb={6}>
            <FormLabel>Password</FormLabel>
            <Input
              name="password"
              type="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </FormControl>
          <Button type="submit" colorScheme="blue" width="full" isLoading={status === 'loading'}>
            Login
          </Button>
        </form>
      </Box>
    </Flex>
  );
};

export default LoginPage;
