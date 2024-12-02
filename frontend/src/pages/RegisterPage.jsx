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
import { registerUser } from '../store/authSlice';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth);
  const { colorMode } = useColorMode();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    dispatch(registerUser({ username, email, password }));
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
          Create an Account
        </Heading>
        {error && (
          <Alert status="error" mb={4}>
            {error}
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <FormControl mb={4}>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              focusBorderColor="teal.400"
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              focusBorderColor="teal.400"
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              focusBorderColor="teal.400"
            />
          </FormControl>
          <FormControl mb={6}>
            <FormLabel>Confirm Password</FormLabel>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              focusBorderColor="teal.400"
            />
          </FormControl>
          <Button
            type="submit"
            colorScheme="teal"
            width="full"
            isLoading={status === 'loading'}
          >
            Register
          </Button>
        </form>
        <Text mt={4} textAlign="center">
          Already have an account?{' '}
          <Text as="a" href="/login" color="teal.500" fontWeight="bold">
            Login here
          </Text>
        </Text>
      </Box>
    </Flex>
  );
};

export default RegisterPage;
