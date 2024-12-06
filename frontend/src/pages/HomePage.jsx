import React from 'react';
import { Box, Button, Flex, Heading, Grid, useColorMode } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ActionCard from '../components/ActionCard';

const HomePage = () => {
  const { user } = useSelector((state) => state.auth);
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();

  const isAuthenticated = Boolean(user);

  const handleNavigation = () => {
    if (!isAuthenticated || !user?.login) {
      alert('Login to proceed.');
      return;
    }
    navigate(`/profile/${user.login}`);
  };

  return (
    <Flex
      align="center"
      justify="center"
      minH="100vh"
      bg={colorMode === 'light' ? 'gray.100' : 'gray.900'}
      color={colorMode === 'light' ? 'black' : 'white'}
    >
      <Box bg={colorMode === 'light' ? 'white' : 'gray.700'} p={8} rounded="lg" shadow="lg" w="80%">
        <Flex justify="space-between" align="center" mb={8}>
          <Heading size="lg">Welcome, {user?.login || 'Guest'}!</Heading>
          <Button onClick={toggleColorMode} colorScheme="teal">
            Toggle Theme
          </Button>
        </Flex>
        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
          <ActionCard
            title="Create Story"
            description="Start writing a new story or collaborate with others."
            buttonText="Start"
            onClick={() =>
              isAuthenticated
                ? navigate('/create')
                : alert('Please login to create a story.')
            }
            bgColor="teal.400"
          />
          <ActionCard
            title="My Stories"
            description="View your projects and continue working on them."
            buttonText="Open"
            onClick={handleNavigation}
            bgColor="purple.400"
          />
          <ActionCard
            title="Explore Stories"
            description="Check out popular stories on the platform."
            buttonText="Explore"
            onClick={() => navigate('/explore')}
            bgColor="blue.400"
          />
        </Grid>
      </Box>
    </Flex>
  );
};

export default HomePage;
