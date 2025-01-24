import React, { useState } from "react";
import {
  Box,
  Text,
  FlatList,
  Image,
  HStack,
  Input,
  VStack,
  Badge,
  Skeleton,
  KeyboardAvoidingView,
  View,
} from "native-base";
import {
  Pressable,
  Linking,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProfile,
  searchState,
  profileStore,
  showViolationsPage,
} from "../../../store/slices/violationSlice";
import { Ionicons } from "@expo/vector-icons";
import GatepassCard from "../SearchCards/gatepassCard";
import SkeletonCard from "../SearchCards/skeletonCard";
import ViolationsCard from "../SearchCards/violationCard";
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
  const dispatch = useDispatch();
  const {
    violations,
    isLoading,
    searchStore,
    profile,
    violationsCount,
    image,
  } = useSelector((state) => state.home);
  const [search, setSearch] = useState("");
  const handleSearch = () => {
    dispatch(profileStore(null));
    dispatch(searchState(search));
    dispatch(fetchProfile(search));
    setSearch(search);
  };
  const handleClear = () => {
    dispatch(searchState());
    dispatch(profileStore(null));
    setSearch();
  };

  const handleShowViolations = () => {
    dispatch(showViolationsPage(true));
    navigation.navigate("Violation");
  };
  const handleRoute = (item) => navigation.navigate({ name: item.name });
  const handleEmergencyRoute = (item) => {
    const phoneNumber = `tel:${item.phone}`;
    Linking.openURL(phoneNumber).catch((err) =>
      console.error("Error opening dialer:", err)
    );
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
            <HStack top={12} justifyContent={"center"}>
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
              {searchStore ? (
                <>
                  <HStack space={3}>
                    <Ionicons
                      name="close-circle-outline"
                      size={26}
                      color="black"
                      onPress={() => {
                        handleClear();
                      }}
                    />

                    <Ionicons
                      name="search-outline"
                      size={26}
                      color="black"
                      onPress={() => {
                        handleSearch();
                      }}
                    />
                  </HStack>
                </>
              ) : (
                <Pressable>
                  <Ionicons
                    name="search-outline"
                    size={26}
                    color="black"
                    onPress={() => {
                      handleSearch();
                    }}
                  />
                </Pressable>
              )}
            </HStack>
          </Box>
          <Box paddingX="4" paddingY="2" top={10}>
            {searchStore ? (
              isLoading ? (
                <SkeletonCard />
              ) : profile?.stdprofile?.length > 0 ? (
                <GatepassCard />
              ) : (
                <View justifyContent="center" alignItems="center">
                  <Text fontSize={18}>No results found.</Text>
                </View>
              )
            ) : (
              <>
                <FlatList
                  data={featuredData}
                  renderItem={({ item }) => <FeaturedCard item={item} />}
                  keyExtractor={(item) => item.name}
                  numColumns={3}
                  contentContainerStyle={{ paddingBottom: 16 }}
                  columnWrapperStyle={{ justifyContent: "space-between" }}
                />
                <Box
                  paddingX="3"
                  paddingY="4"
                  top={10}
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
            )}
          </Box>
        </Box>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
