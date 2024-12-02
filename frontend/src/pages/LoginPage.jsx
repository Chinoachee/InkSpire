import React, { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Text,
  Alert,
  useColorMode,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../store/authSlice';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth);
  const { colorMode } = useColorMode();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <Flex
      align="center"
      justify="center"
      minH="100vh"
      bg={colorMode === 'light' ? 'gray.100' : 'gray.900'}
      color={colorMode === 'light' ? 'black' : 'white'}
    >
      <Box
        bg={colorMode === 'light' ? 'white' : 'gray.700'}
        p={8}
        rounded="lg"
        shadow="lg"
        w="400px"
      >
        <Heading textAlign="center" mb={6}>
          Welcome Back
        </Heading>
        {error && (
          <Alert status="error" mb={4}>
            {error}
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <FormControl mb={4}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              focusBorderColor="blue.400"
            />
          </FormControl>
          <FormControl mb={6}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              focusBorderColor="blue.400"
            />
          </FormControl>
          <Button
            type="submit"
            colorScheme="blue"
            width="full"
            isLoading={status === 'loading'}
          >
            Login
          </Button>
        </form>
        <Text mt={4} textAlign="center">
          Don't have an account?{' '}
          <Text as="a" href="/register" color="blue.500" fontWeight="bold">
            Register here
          </Text>
        </Text>
      </Box>
    </Flex>
  );
};

export default LoginPage;
