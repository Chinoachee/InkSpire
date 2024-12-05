import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProfile } from '../services/profileService';
import {
    Box,
    Heading,
    Text,
    VStack,
    Spinner,
    List,
    ListItem,
    Flex,
    Button
} from '@chakra-ui/react';

const UserProfilePage = () => {
    const { login } = useParams();
    const [user, setUser] = useState(null);
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await getProfile(login);
                if (data) {
                    setUser(data.user);
                    setStories(data.stories);
                } else {
                    setError('User not found.');
                }
            } catch (err) {
                setError('An error occurred while fetching the profile.');
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [login]);

    if (loading) {
        return (
            <Flex justifyContent="center" alignItems="center" height="100vh">
                <Spinner size="xl" />
            </Flex>
        );
    }

    if (error) {
        return (
            <Box textAlign="center" mt="10">
                <Text fontSize="xl" color="red.500">{error}</Text>
            </Box>
        );
    }

    return (
        <Box maxW="800px" mx="auto" p="6">
            <VStack spacing="6" align="stretch">
                <Box bg="white" shadow="md" borderRadius="md" p="6">
                    <Heading size="lg">Profile</Heading>
                    <Text fontSize="md" color="gray.600">
                        Login: {user.login}
                    </Text>
                </Box>

                <Box>
                    <Heading size="md" mb="4">Stories</Heading>
                    {stories.length > 0 ? (
                        <List spacing="4">
                        {stories.map((story) => (
                            <ListItem
                                key={story.id}
                                bg="gray.50"
                                p="4"
                                borderRadius="md"
                                shadow="sm"
                            >
                                <Heading size="sm">Название: {story.title}</Heading>
                                <Text mt="2" fontSize="sm" color="gray.600">
                                    {story.description || 'No description available'}
                                </Text>
                                <Box mt="4">
                                    <Button
                                        colorScheme="blue"
                                        size="sm"
                                        onClick={() => console.log(`Read story ${story.id}`)}
                                    >
                                        Прочитать
                                    </Button>
                                </Box>
                            </ListItem>
                        ))}
                    </List>
                    ) : (
                        <Text color="gray.500">No stories available.</Text>
                    )}
                </Box>
            </VStack>
        </Box>
    );
};

export default UserProfilePage;
