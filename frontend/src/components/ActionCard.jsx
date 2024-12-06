import React from 'react';
import { Box, Button, Heading, Text } from '@chakra-ui/react';

const ActionCard = ({ title, description, buttonText, onClick, bgColor }) => (
  <Box
    bg={bgColor}
    color="white"
    p={6}
    rounded="lg"
    shadow="md"
    _hover={{ bg: `${bgColor.slice(0, -1)}500` }}
  >
    <Heading size="md" mb={4}>
      {title}
    </Heading>
    <Text mb={4}>{description}</Text>
    <Button colorScheme="whiteAlpha" variant="outline" onClick={onClick}>
      {buttonText}
    </Button>
  </Box>
);

export default ActionCard;
