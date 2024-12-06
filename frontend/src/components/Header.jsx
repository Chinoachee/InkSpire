import React from 'react';
import { Box, Flex, Button, Heading, Spacer, Text } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <Box bg="teal.500" p={4} color="white" shadow="md">
      <Flex align="center">
        <Heading size="lg" cursor="pointer" onClick={() => navigate('/')}>
          InkSpire
        </Heading>
        <Spacer />
        <Flex align="center">
          {user ? (
            <>
              <Text mr={4}>Welcome, {user.login}!</Text>
              <Button colorScheme="teal" variant="outline" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                colorScheme="teal"
                variant="outline"
                mr={2}
                onClick={() => navigate('/login')}
              >
                Login
              </Button>
              <Button colorScheme="teal" variant="solid" onClick={() => navigate('/register')}>
                Register
              </Button>
            </>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
