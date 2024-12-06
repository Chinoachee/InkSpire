import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import { getStory } from '../services/storyService';

const StoryPage = () => {
  const { storyId } = useParams(); // Получаем ID из URL
  const [story, setStory] = useState(null); // Состояние для истории
  const [loading, setLoading] = useState(true); // Состояние загрузки
  const [error, setError] = useState(null); // Состояние ошибки
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const data = await getStory(storyId); // Асинхронно получаем данные
        console.log(data);
        setStory(data); // Устанавливаем историю в состояние
      } catch (err) {
        console.error(err);
        setError('Failed to load story'); // Устанавливаем сообщение об ошибке
      } finally {
        setLoading(false); // Завершаем загрузку
      }
    };

    fetchStory(); // Вызываем асинхронную функцию
  }, [storyId]); // Зависимость - ID истории

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Box maxW="800px" mx="auto" p={6} bg="gray.50" rounded="lg" shadow="md">
      <Heading mb={4} size="lg" textAlign="center">
        {story.title || 'Story Title'}
      </Heading>
      <Text fontSize="md" color="gray.700" mb={6}>
        {story.initialText || 'Here is the text of the story. This is where the full content will appear.'}
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
