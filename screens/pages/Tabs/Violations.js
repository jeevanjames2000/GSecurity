import React from "react";
import {
  Box,
  Text,
  FlatList,
  Image,
  VStack,
  HStack,
  Divider,
} from "native-base";

const Violations = () => {
  // Dummy data for violations
  const violationsData = [
    {
      id: 1,
      name: "Courtney Henry",
      location: "Location",
      info: "Info",
      image: "https://via.placeholder.com/150", // Replace with actual image URLs
    },
    {
      id: 2,
      name: "Courtney Henry",
      location: "Location",
      info: "Info",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      name: "Courtney Henry",
      location: "Location",
      info: "Info",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 4,
      name: "Courtney Henry",
      location: "Location",
      info: "Info",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 5,
      name: "Courtney Henry",
      location: "Location",
      info: "Info",
      image: "https://via.placeholder.com/150",
    },
  ];

  const renderViolation = ({ item }) => (
    <Box
      bg="white"
      borderRadius="lg"
      p={3}
      mb={3}
      shadow={2}
      borderWidth={1}
      borderColor="#007367"
    >
      <HStack alignItems="center" space={3}>
        <Image
          source={{ uri: item.image }}
          alt="Profile Picture"
          size="lg"
          borderRadius="full"
        />
        <VStack flex={1}>
          <Text fontSize="lg" fontWeight="bold" color="#007367">
            {item.name}
          </Text>
          <Text fontSize="md" color="gray.500">
            {item.location}
          </Text>
          <Text fontSize="md" color="gray.500">
            {item.info}
          </Text>
        </VStack>
      </HStack>
    </Box>
  );

  return (
    <Box flex={1} bg="#F3F3F3" p={4}>
      <FlatList
        data={violationsData}
        renderItem={renderViolation}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </Box>
  );
};

export default Violations;
