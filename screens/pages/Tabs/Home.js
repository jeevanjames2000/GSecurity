import React, { useState } from "react";
import { Box, Text, FlatList, Image, HStack, Input } from "native-base";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import violations from "../../../assets/newIcons/group.png";
import pay from "../../../assets/newIcons/bribe.png";
import emergency from "../../../assets/newIcons/ambulance.png";
import Fire from "../../../assets/newIcons/fire-extinguisher.png";
import cctc from "../../../assets/newIcons/cctv.png";
import disha from "../../../assets/newIcons/dishaimg.png";
import parking from "../../../assets/newIcons/parking.png";
import police from "../../../assets/newIcons/police-station (1).png";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function Home() {
  const navigation = useNavigation();
  const [selectedIndex, setSelectedIndex] = useState(null);
  // console.log(AsyncStorage.removeItem("token"));
  const featuredData = [
    {
      name: "Report Violation",
      img: {
        uri: "http://172.17.58.151:9000/auth/getImage/group.png",
      },
    },
    {
      name: "Fines",
      img: {
        uri: "http://172.17.58.151:9000/auth/getImage/bribe.png",
      },
    },
    {
      name: "Parking",
      img: {
        uri: "http://172.17.58.151:9000/auth/getImage/parking.png",
      },
    },
    {
      name: "Cctv",
      img: { uri: "http://172.17.58.151:9000/auth/getImage/cctv.png" },
    },
  ];
  const emergencyData = [
    {
      name: "Ambulance",
      img: {
        uri: "http://172.17.58.151:9000/auth/getImage/ambulance.png",
      },
    },
    {
      name: "Disha",
      img: {
        uri: "http://172.17.58.151:9000/auth/getImage/dishaimg.png",
      },
    },
    {
      name: "Fire",
      img: {
        uri: "http://172.17.58.151:9000/auth/getImage/fire-extinguisher.png",
      },
    },
    {
      name: "Police",
      img: {
        uri: "http://172.17.58.151:9000/auth/getImage/police-station.png",
      },
    },
  ];
  const handleRoute = (item) => navigation.navigate({ name: item.name });
  const handleCamera = () => navigation.navigate("Camera");
  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    navigation.reset({
      index: 0,
      routes: [{ name: "Splash" }],
    });
  };
  const Card = ({ item }) => (
    <Pressable onPress={() => handleRoute(item)} flex={1} margin="2">
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
        <Image
          source={item.img}
          alt={item.name}
          size="sm"
          resizeMode="contain"
        />
      </Box>
      <Text
        fontSize="sm"
        fontWeight="bold"
        color="black"
        mt="2"
        textAlign="center"
      >
        {item.name}
      </Text>
    </Pressable>
  );
  return (
    <Box flex={1} backgroundColor="#f5f5f5">
      {}
      <Box backgroundColor="#007367" paddingY="4" paddingX="4">
        <HStack
          alignItems="center"
          justifyContent="center"
          position="relative"
          top={10}
        >
          <Text
            fontSize={30}
            color="white"
            fontWeight="bold"
            textAlign="center"
            flex={1}
          >
            G Security
          </Text>
          <Pressable
            onPress={handleLogout}
            position="absolute"
            right={0}
            paddingX="4"
          >
            <Image
              source={require("../../../assets/newIcons/exit (1).png")}
              alt="Logout Icon"
              size={6}
            />
          </Pressable>
        </HStack>
        <HStack
          backgroundColor="white"
          borderRadius="20"
          alignItems="center"
          paddingX="4"
          paddingY="2"
          mt="4"
          shadow="2"
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
      <Box paddingX="4" paddingY="4" top={10}>
        <Text fontSize="lg" fontWeight="bold" color="black" mb="4">
          Featured
        </Text>
        <FlatList
          data={featuredData}
          renderItem={({ item }) => <Card item={item} />}
          keyExtractor={(item) => item.name}
          numColumns={3}
          contentContainerStyle={{ paddingBottom: 16 }}
          columnWrapperStyle={{ justifyContent: "space-between" }}
        />
      </Box>
      <Box
        paddingX="3"
        paddingY="4"
        top={10}
        backgroundColor="#ddd"
        borderRadius={10}
      >
        <Text fontSize="lg" fontWeight="bold" color="black" mb="4">
          Emergency
        </Text>
        <HStack justifyContent="space-between" flexWrap="wrap">
          {emergencyData.map((item, index) => (
            <Card key={index} item={item} />
          ))}
        </HStack>
      </Box>
    </Box>
  );
}
