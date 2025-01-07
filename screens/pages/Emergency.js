// import { View, Text } from "react-native";
import React, { useState } from "react";
import { Box, Text, FlatList, Image, Pressable, VStack } from "native-base";

import police from "../../assets/police.png";
import hospital from "../../assets/hospital.png";
import fire from "../../assets/fire-station.png";
import call from "../../assets/call-directory.png";
import disha from "../../assets/disha.png";

const icons = [
  {
    name: "Police",
    img: police,
  },
  {
    name: "Hospital",
    img: hospital,
  },
  {
    name: "Fire Station",
    img: fire,
  },
  {
    name: "Call Directory",
    img: call,
  },
  {
    name: "Disha",
    img: disha,
  },
];

export default function Emergency() {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const renderItem = ({ item, index }) => (
    <Pressable
      onPressIn={() => setSelectedIndex(index)}
      onPressOut={() => setSelectedIndex(null)}
      //   onPress={() => handleRoute(item)}
      flex={1}
      margin="2"
    >
      <Box
        bg={selectedIndex === index ? "gray.200" : "white"}
        borderRadius="md"
        p="6"
        alignItems="center"
        shadow="2"
        style={{ flexBasis: "48%" }}
      >
        <Image
          source={item.img}
          alt={item.name}
          size={"sm"}
          borderRadius="md"
          style={{ objectFit: "contain" }}
        />
        <VStack mt="2" space="1" alignItems="left">
          <Text fontSize="md" fontWeight="bold" color="black">
            {item.name}
          </Text>
        </VStack>
      </Box>
    </Pressable>
  );

  return (
    <Box flex={1} paddingTop={6}>
      <FlatList
        data={icons}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 80 }}
      />
    </Box>
  );
}
