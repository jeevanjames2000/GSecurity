import React, { useState } from "react";
import {
  Box,
  Text,
  FlatList,
  Image,
  HStack,
  Input,
  View,
  Avatar,
  VStack,
} from "native-base";
import { Pressable, Linking } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function Home() {
  const navigation = useNavigation();
  const featuredData = [
    {
      name: "Violation",
      img: {
        uri: "http://172.17.58.151:9000/auth/getImage/group.png",
      },
    },
    {
      name: "Visitors",
      img: {
        uri: "http://172.17.58.151:9000/auth/getImage/reception.png",
      },
    },
    {
      name: "Gate-Pass",
      img: {
        uri: "http://172.17.58.151:9000/auth/getImage/toll-road_829376.png",
      },
    },
    {
      name: "CCTV",
      img: { uri: "http://172.17.58.151:9000/auth/getImage/cctv.png" },
    },
    {
      name: "Material-Pass",
      img: { uri: "http://172.17.58.151:9000/auth/getImage/materialpass.png" },
    },
    {
      name: "Leaves",
      img: { uri: "http://172.17.58.151:9000/auth/getImage/leaves.png" },
    },
  ];
  const emergencyData = [
    {
      name: "Ambulance",
      img: {
        uri: "http://172.17.58.151:9000/auth/getImage/ambulance.png",
      },
      phone: "108",
    },
    {
      name: "Disha",
      img: {
        uri: "http://172.17.58.151:9000/auth/getImage/dishaimg.png",
      },
      phone: "181",
    },
    {
      name: "Fire",
      img: {
        uri: "http://172.17.58.151:9000/auth/getImage/fire-extinguisher.png",
      },
      phone: "104",
    },
    {
      name: "Police",
      img: {
        uri: "http://172.17.58.151:9000/auth/getImage/police-station.png",
      },
      phone: "100",
    },
  ];
  const handleRoute = (item) => navigation.navigate({ name: item.name });
  const handleEmergencyRoute = (item) => {
    const phoneNumber = `tel:${item.phone}`;
    Linking.openURL(phoneNumber).catch((err) =>
      console.error("Error opening dialer:", err)
    );
  };
  const handleCamera = () => navigation.navigate("Camera");
  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    navigation.reset({
      index: 0,
      routes: [{ name: "Splash" }],
    });
  };
  const FeaturedCard = ({ item }) => (
    <Pressable
      onPress={() => handleRoute(item)}
      flex={1}
      margin="2"
      marginBottom="8"
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
  const EmergencyCard = ({ item }) => (
    <Pressable onPress={() => handleEmergencyRoute(item)} flex={1} margin="2">
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
  const [isOpen, setIsOpen] = useState(false);
  const handleProfile = () => {
    navigation.navigate("Profile");
    setIsOpen(false);
  };
  return (
    <Box flex={1} backgroundColor="#f5f5f5">
      <Box backgroundColor="#007367" paddingY="4" paddingX="4">
        <HStack
          alignItems="center"
          justifyContent="center"
          position="relative"
          top={10}
        >
          <VStack alignItems="center" flex={1}>
            <Text
              fontSize={30}
              color="white"
              fontWeight="bold"
              textAlign="center"
            >
              G-Security
            </Text>
            <Pressable
              position="absolute"
              right={0}
              onPress={() => navigation.navigate("Profile")}
            >
              <Avatar
                borderColor={"blueGray.200"}
                bg="green.500"
                borderWidth={2}
                alt="Profile icon"
                size="md"
                source={{
                  uri: "http://172.17.58.151:9000/auth/getImage/progfile_sec.jpg",
                }}
              >
                P
              </Avatar>
            </Pressable>
          </VStack>
        </HStack>
        <HStack top={12} justifyContent={"center"}>
          {/* <Text
            fontSize={20}
            color="orange.400"
            fontWeight="bold"
            textAlign="left"
          >
            Welcome!
          </Text> */}
          <Text fontSize={18} color="white" fontWeight="thin" textAlign="left">
            Darlene Robertson
          </Text>
        </HStack>
        <HStack
          backgroundColor="white"
          borderRadius="20"
          alignItems="center"
          paddingX="4"
          paddingY="4"
          mt="4"
          shadow="2"
          top={50}
        >
          <Input
            flex={1}
            placeholder="Search by ID / Vehicle number"
            variant="unstyled"
            fontSize="md"
          />
          <Pressable>
            <Image
              source={{
                uri: "http://172.17.58.151:9000/auth/getImage/search.png",
              }}
              alt="Search Icon"
              size={8}
            />
          </Pressable>
        </HStack>
      </Box>
      <Box paddingX="4" paddingY="4" top={10}>
        <FlatList
          data={featuredData}
          renderItem={({ item }) => <FeaturedCard item={item} />}
          keyExtractor={(item) => item.name}
          numColumns={3}
          contentContainerStyle={{ paddingBottom: 16 }}
          columnWrapperStyle={{ justifyContent: "space-between" }}
        />
      </Box>
      <View paddingX="4">
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
              <EmergencyCard key={index} item={item} />
            ))}
          </HStack>
        </Box>
      </View>
    </Box>
  );
}
