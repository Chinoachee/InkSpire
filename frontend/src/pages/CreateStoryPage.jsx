import React, { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Heading,
  Alert,
  useColorMode,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { createStory } from '../services/storyService';

const CreateStoryPage = () => {
  const [storyData, setStoryData] = useState({ title: '', initialText: '' });
  const [error, setError] = useState(null);
  const { token } = useSelector((state) => state.auth);
  const { colorMode } = useColorMode();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStoryData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createStory({ ...storyData, token });
      // Дополнительные действия после успешного создания истории
    } catch (err) {
      setError(err.message);
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
      <Box
        bg={colorMode === 'light' ? 'white' : 'gray.700'}
        p={8}
        rounded="lg"
        shadow="lg"
        w="600px"
      >
        <Heading textAlign="center" mb={6}>
          Create a New Story
        </Heading>
        {error && (
          <Alert status="error" mb={4}>
            {error}
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <FormControl mb={4}>
            <FormLabel>Title</FormLabel>
            <Input
              name="title"
              value={storyData.title}
              onChange={handleChange}
              placeholder="Enter story title"
              required
            />
          </FormControl>
          <FormControl mb={6}>
            <FormLabel>Initial Text</FormLabel>
            <Textarea
              name="initialText"
              value={storyData.initialText}
              onChange={handleChange}
              placeholder="Enter the beginning of your story"
              required
            />
          </FormControl>
          <Button type="submit" colorScheme="blue" width="full">
            Create Story
          </Button>
        </form>
      </Box>
    </Flex>
  );
};

export default CreateStoryPage;
