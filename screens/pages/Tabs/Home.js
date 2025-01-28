import React from "react";
import {
  Box,
  Text,
  FlatList,
  Image,
  HStack,
  Input,
  VStack,
  KeyboardAvoidingView,
  View,
  ScrollView,
} from "native-base";
import {
  Pressable,
  Linking,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import GatepassCard from "../SearchCards/gatepassCard";
import SkeletonCard from "../SearchCards/skeletonCard";
import ViolationsCard from "../SearchCards/violationCard";
import VisitorDetailsCard from "../SearchCards/visitorsCard";
import useSearch from "../../../hooks/useSearch";
const featuredData = [
  {
    name: "Violation",
    img: {
      uri: "http://172.17.58.151:9000/auth/getImage/violationnew.png",
    },
  },
  {
    name: "Visitors",
    img: {
      uri: "http://172.17.58.151:9000/auth/getImage/visitornew.png",
    },
  },
  {
    name: "Gate-Pass",
    img: {
      uri: "http://172.17.58.151:9000/auth/getImage/gatepassnew.png",
    },
  },
  {
    name: "CCTV",
    img: { uri: "http://172.17.58.151:9000/auth/getImage/cctvnew.png" },
  },
  {
    name: "Material-Pass",
    img: {
      uri: "http://172.17.58.151:9000/auth/getImage/materialpassnew.png",
    },
  },
  {
    name: "Leaves",
    img: { uri: "http://172.17.58.151:9000/auth/getImage/leavesnew.png" },
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
      uri: "http://172.17.58.151:9000/auth/getImage/firenew.png",
    },
    phone: "104",
  },
  {
    name: "Police",
    img: {
      uri: "http://172.17.58.151:9000/auth/getImage/policenew.png",
    },
    phone: "100",
  },
];
export default function Home() {
  const navigation = useNavigation();
  const {
    search,
    setSearch,
    isSearchTriggered,
    handleSearch,
    handleClear,
    isLoading,
    cardData,
    cardType,
  } = useSearch();
  const handleRoute = (item) => navigation.navigate({ name: item.name });
  const handleEmergencyRoute = (item) => {
    const phoneNumber = `tel:${item.phone}`;
    Linking.openURL(phoneNumber).catch((err) =>
      console.error("Error opening dialer:", err)
    );
  };
  const renderCard = (cardType, cardData) => {
    switch (cardType) {
      case "Violations":
        return <ViolationsCard />;
      case "GatePass":
        return <GatepassCard data={cardData} />;
      case "VisitorManagement":
        return <VisitorDetailsCard data={cardData} />;
      default:
        return (
          <View justifyContent="center" alignItems="center">
            <Text fontSize={18}>No results found.</Text>
          </View>
        );
    }
  };
  const FeaturedCard = ({ item }) => (
    <Pressable
      onPress={() => handleRoute(item)}
      flex={1}
      margin="8"
      marginBottom="8"
    >
      <Box
        bg="white"
        borderRadius="xl"
        alignItems="center"
        justifyContent="center"
        shadow="3"
        padding="2"
        minWidth="12"
        minHeight="20"
      >
        <Image
          source={item.img}
          alt={item.name}
          size="12"
          resizeMode="contain"
        />
      </Box>
      <Text
        fontSize="sm"
        fontWeight="bold"
        color="black"
        mt="1"
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
        minWidth="16"
        minHeight="16"
      >
        <Image
          source={item.img}
          alt={item.name}
          size="10"
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

  const FeaturedAndEmergencyCards = ({ featuredData, emergencyData }) => (
    <>
      <FlatList
        data={featuredData}
        renderItem={({ item }) => <FeaturedCard item={item} />}
        keyExtractor={(item) => item.name}
        numColumns={3}
        scrollEnabled={false}
        contentContainerStyle={{ paddingBottom: 16 }}
        columnWrapperStyle={{ justifyContent: "space-between" }}
      />
      <Box
        paddingX="3"
        paddingY="4"
        top={2}
        backgroundColor="#95E1D975"
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
    </>
  );

  const SearchResults = ({ isLoading, cardType, cardData }) =>
    isLoading ? <SkeletonCard /> : renderCard(cardType, cardData);
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
              </VStack>
            </HStack>
            <HStack top={12} justifyContent="center">
              <Text
                fontSize={18}
                color="white"
                fontWeight="thin"
                textAlign="left"
              >
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
                placeholder="ID / Registration / Vehicle number"
                variant="unstyled"
                fontSize="md"
                value={search}
                onChangeText={(value) => setSearch(value)}
              />
              {search ? (
                <HStack space={3}>
                  <Ionicons
                    name="close-circle-outline"
                    size={26}
                    color="black"
                    onPress={handleClear}
                  />
                  <Ionicons
                    name="search-outline"
                    size={26}
                    color="black"
                    onPress={handleSearch}
                  />
                </HStack>
              ) : (
                <Pressable onPress={handleSearch}>
                  <Ionicons name="search-outline" size={26} color="black" />
                </Pressable>
              )}
            </HStack>
          </Box>
          <ScrollView
            style={{ flex: 1, zIndex: -1 }}
            contentContainerStyle={{ paddingBottom: 38 }}
          >
            <Box paddingX="4" paddingY="2" top={10}>
              {isSearchTriggered && search.length > 0 ? (
                <SearchResults
                  isLoading={isLoading}
                  cardType={cardType}
                  cardData={cardData}
                />
              ) : (
                <FeaturedAndEmergencyCards
                  featuredData={featuredData}
                  emergencyData={emergencyData}
                />
              )}
            </Box>
          </ScrollView>
        </Box>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
