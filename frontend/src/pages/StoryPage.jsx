import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';

const StoryPage = ({ title, content }) => {
  const navigate = useNavigate();

  return (
    <Box maxW="800px" mx="auto" p={6} bg="gray.50" rounded="lg" shadow="md">
      <Heading mb={4} size="lg" textAlign="center">
        {title || 'Story Title'}
      </Heading>
      <Text fontSize="md" color="gray.700" mb={6}>
        {content || 'Here is the text of the story. This is where the full content will appear.'}
      </Text>
      <Flex justifyContent="space-between">
        <Button colorScheme="teal" onClick={() => navigate(-1)}>
          Back
        </Button>
        <Button colorScheme="blue" onClick={() => alert('Branch creation feature coming soon!')}>
          Create Branch
        </Button>
      </Flex>
    </Box>
  );
};

export default StoryPage;
