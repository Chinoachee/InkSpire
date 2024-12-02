import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Heading,
  useToast,
  Flex,
  useColorMode,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { createStory } from '../services/storyService';

const CreateStoryPage = () => {
  const [title, setTitle] = useState('');
  const [initialText, setInitialText] = useState('');
  const [loading, setLoading] = useState(false);
  const { colorMode } = useColorMode();
  const toast = useToast();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const handleCreateStory = async (e) => {
    e.preventDefault();
  
    if (!title || !initialText) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
  
    setLoading(true);
    try {
      await createStory({ title, initialText, token }); // Токен теперь передаётся в заголовке
      toast({
        title: 'Story created successfully!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      setTitle('');
      setInitialText('');
      navigate('/'); // Перенаправляем на главную страницу
    } catch (error) {
      toast({
        title: 'Failed to create story',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
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
        <Heading mb={6} textAlign="center">
          Create a New Story
        </Heading>
        <form onSubmit={handleCreateStory}>
          <FormControl mb={4}>
            <FormLabel>Story Title</FormLabel>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter the title of your story"
              isRequired
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Story Content</FormLabel>
            <Textarea
              value={initialText}
              onChange={(e) => setInitialText(e.target.value)}
              placeholder="Write your story here..."
              rows={8}
              isRequired
            />
          </FormControl>
          <Button
            type="submit"
            colorScheme="teal"
            isLoading={loading}
            width="full"
          >
            Create Story
          </Button>
        </form>
      </Box>
    </Flex>
  );
};

export default CreateStoryPage;
