import React from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  VStack,
  Grid,
  GridItem,
  useColorMode,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';

const HomePage = () => {
  const { user } = useSelector((state) => state.auth);
  const { colorMode, toggleColorMode } = useColorMode();

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
          <Heading size="lg">Welcome, {user?.username || 'Guest'}!</Heading>
          <Button onClick={toggleColorMode} colorScheme="teal">
            Toggle Theme
          </Button>
        </Flex>
        <Text fontSize="lg" mb={8}>
          InkSpire — это платформа для совместного создания и редактирования историй в реальном времени.
          Погрузись в мир креативного письма!
        </Text>
        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
          <GridItem>
            <Box
              bg="teal.400"
              color="white"
              p={6}
              rounded="lg"
              shadow="md"
              _hover={{ bg: 'teal.500' }}
            >
              <Heading size="md" mb={4}>
                Создать историю
              </Heading>
              <Text mb={4}>
                Начни писать новую историю или совместно работай с другими авторами.
              </Text>
              <Button colorScheme="whiteAlpha" variant="outline" href="/create">
                Начать
              </Button>
            </Box>
          </GridItem>
          <GridItem>
            <Box
              bg="purple.400"
              color="white"
              p={6}
              rounded="lg"
              shadow="md"
              _hover={{ bg: 'purple.500' }}
            >
              <Heading size="md" mb={4}>
                Мои истории
              </Heading>
              <Text mb={4}>
                Просмотри свои проекты и продолжай работать над ними.
              </Text>
              <Button colorScheme="whiteAlpha" variant="outline" href="/stories">
                Открыть
              </Button>
            </Box>
          </GridItem>
          <GridItem>
            <Box
              bg="blue.400"
              color="white"
              p={6}
              rounded="lg"
              shadow="md"
              _hover={{ bg: 'blue.500' }}
            >
              <Heading size="md" mb={4}>
                Популярные истории
              </Heading>
              <Text mb={4}>
                Ознакомься с популярными историями на платформе.
              </Text>
              <Button colorScheme="whiteAlpha" variant="outline" href="/explore">
                Исследовать
              </Button>
            </Box>
          </GridItem>
        </Grid>
      </Box>
    </Flex>
  );
};

export default HomePage;
