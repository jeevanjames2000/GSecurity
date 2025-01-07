import React, { useState } from "react";
import {
  Box,
  Text,
  FlatList,
  Image,
  Pressable,
  HStack,
  Input,
  ScrollView,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import violations from "../../../assets/newIcons/group.png";
import pay from "../../../assets/newIcons/bribe.png";
import emergency from "../../../assets/newIcons/ambulance.png";
import Fire from "../../../assets/newIcons/fire-extinguisher.png";
import cctc from "../../../assets/newIcons/cctv.png";
import disha from "../../../assets/newIcons/dishaimg.png";
import parking from "../../../assets/newIcons/parking.png";
import police from "../../../assets/newIcons/police-station (1).png";

export default function Home() {
  const navigation = useNavigation();
  const [selectedIndex, setSelectedIndex] = useState(null);
  const featuredData = [
    {
      name: "Report Violation",
      img: violations,
    },

    {
      name: "Fines",
      img: pay,
    },
    {
      name: "Parking",
      img: parking,
    },
    {
      name: "Cctv",
      img: cctc,
    },
  ];
  const emergencyData = [
    { name: "Ambulance", img: emergency },
    {
      name: "Disha",
      img: disha,
    },
    { name: "Fire", img: Fire },
    { name: "Police", img: police },
  ];
  const handleRoute = (item) => {
    navigation.navigate({ name: item.name });
  };
  const renderItem = ({ item, index }) => (
    <Pressable
      onPressIn={() => setSelectedIndex(index)}
      onPressOut={() => setSelectedIndex(null)}
      onPress={() => handleRoute(item)}
      flex={1}
      margin="2"
    >
      <Box
        bg="white"
        borderRadius="xl"
        alignItems="center"
        justifyContent="center"
        shadow="3"
        padding="2"
        minWidth="80px"
        minHeight="80px"
      >
        <Image source={item.img} alt={item.name} size="sm" resizeMode="cover" />
      </Box>
      <Text
        fontSize="sm"
        fontWeight="bold"
        color="black"
        mt="2"
        textAlign={"center"}
      >
        {item.name}
      </Text>
    </Pressable>
  );

  const handleCamera = () => {
    navigation.navigate("Camera");
  };

  return (
    <Box flex={1} backgroundColor="#f5f5f5">
      {}
      <Box backgroundColor="#007367" paddingY="4" paddingX="4">
        <Text
          fontSize={30}
          color="white"
          fontWeight="bold"
          textAlign="center"
          zIndex={1000}
          top={10}
        >
          G Security
        </Text>

        <HStack
          backgroundColor="white"
          borderRadius="20"
          alignItems="center"
          paddingX="4"
          paddingY="2"
          mt="4"
          shadow="2"
          zIndex={1000}
          top={60}
        >
          <Input
            flex={1}
            placeholder="Search by ID / Vehicle number"
            variant="unstyled"
            fontSize="md"
          />
          <Pressable onPress={handleCamera}>
            <Image
              source={require("../../../assets/qr-code (1).png")}
              alt="Search Icon"
              size="sm"
            />
          </Pressable>
        </HStack>
      </Box>
      {}
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Box paddingX="4" paddingY="4" top={10}>
          <Text fontSize="lg" fontWeight="bold" color="black" mb="4">
            Featured
          </Text>
          <FlatList
            data={featuredData}
            renderItem={renderItem}
            keyExtractor={(item) => item.name}
            numColumns={3}
            contentContainerStyle={{ paddingBottom: 16 }}
            columnWrapperStyle={{ justifyContent: "space-between" }}
          />
        </Box>
        {}
        <Box
          paddingX="3"
          paddingY="4"
          top={10}
          backgroundColor={"#ddd"}
          borderRadius={10}
        >
          <Text fontSize="lg" fontWeight="bold" color="black" mb="4">
            Emergency
          </Text>
          <FlatList
            data={emergencyData}
            renderItem={renderItem}
            keyExtractor={(item) => item.name}
            numColumns={4}
            contentContainerStyle={{ paddingBottom: 16 }}
            columnWrapperStyle={{ justifyContent: "space-between" }}
          />
        </Box>
      </ScrollView>
    </Box>
  );
}
