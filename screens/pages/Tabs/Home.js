import React, { useState, useEffect } from "react";
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
  Button,
  Badge,
  Center,
  Spinner,
} from "native-base";
import { Pressable, Linking } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  fetchProfile,
  fetchViolations,
  searchState,
} from "../../../store/slices/violationSlice";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Ionicons } from "@expo/vector-icons";

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
      uri: "https://doeresults.gitam.edu/photo/img.aspx?id=2024070037",
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
    error,
    searchStore,
    profile,
    violationsCount,
    image,
  } = useSelector((state) => state.violations);
  console.log("searchStore: ", searchStore);
  const [search, setSearch] = useState("");
  const handleSearch = () => {
    dispatch(searchState(search));
    dispatch(fetchProfile(search));
    setSearch(search);
  };
  const handleClear = () => {
    dispatch(searchState());
    setSearch();
  };
  const [filteredViolations, setFilteredViolations] = useState([]);
  const [isFilterLoading, setIsFilterLoading] = useState(false);
  const cache = {};
  const applyFilters = (query, filter = "all", cacheKey = "default") => {
    setIsFilterLoading(true);
    let updatedViolations = violations.filter((violation) => {
      const matchesSearch = Object.values(violation).some((value) =>
        value.toString().toLowerCase().includes(query.toLowerCase())
      );
      const matchesFilter =
        filter === "all"
          ? parseInt(violation.totalFines) > 0
          : filter === "paid"
          ? violation.status.toLowerCase() === "paid"
          : filter === "unpaid"
          ? violation.status.toLowerCase() === "unpaid"
          : true;
      return matchesSearch && matchesFilter;
    });
    if (filter === "all") {
      updatedViolations.sort((a, b) => b.totalFines - a.totalFines);
    } else if (filter === "paid" || filter === "unpaid") {
      updatedViolations.sort((a, b) => a.name.localeCompare(b.name));
    }
    cache[cacheKey] = updatedViolations;
    setFilteredViolations(updatedViolations);
    setTimeout(() => {
      setIsFilterLoading(false);
    }, 500);
  };
  useEffect(() => {
    applyFilters(search);
  }, [search, violations]);
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
            placeholder="ID / Registration / Vehicle number"
            variant="unstyled"
            fontSize="md"
            value={search}
            onChangeText={(value) => setSearch(value)}
          />
          {searchStore ? (
            <Ionicons
              name="close-circle-outline"
              size={26}
              color="black"
              onPress={() => handleClear()}
            />
          ) : (
            <Pressable>
              <AntDesign
                name="search1"
                size={28}
                color="#A69E91"
                onPress={() => handleSearch()}
              />
            </Pressable>
          )}
        </HStack>
      </Box>
      <Box paddingX="4" paddingY="4" top={10}>
        {searchStore ? (
          isLoading ? (
            <Spinner size="lg" color="blue.500" />
          ) : profile ? (
            <Box
              padding="6"
              shadow="9"
              bg={"#fff"}
              borderRadius={"xl"}
              minWidth={"sm"}
              maxWidth={"sm"}
            >
              <HStack space={"lg"}>
                <Image
                  source={{
                    uri: image,
                  }}
                  alt="Profile Image"
                  size="lg"
                  borderRadius="xl"
                />
                <VStack space={"2"}>
                  <Text color={"#007367"} fontWeight={"bold"} fontSize="lg">
                    {profile?.stdprofile?.[0]?.name || "Name not available"}
                  </Text>
                  <Text fontWeight={"semibold"} fontSize="md">
                    {profile?.role || "Role not available"}
                  </Text>
                  <HStack
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    space={2}
                  >
                    <Text fontWeight={"semibold"} fontSize="md">
                      {profile?.stdprofile?.[0]?.regdno ||
                        "Registration number not available"}
                    </Text>
                    <Badge colorScheme="success" _text={{ fontSize: "md" }}>
                      {profile?.stdprofile?.[0]?.status === "A"
                        ? "Active"
                        : "Inactive"}
                    </Badge>
                  </HStack>
                </VStack>
              </HStack>
              <VStack space={1.5} marginTop={"6"}>
                {[
                  { key: "Name", value: profile?.stdprofile?.[0]?.name },
                  { key: "Role", value: profile?.role },
                  { key: "Batch", value: profile?.stdprofile?.[0]?.batch },
                  { key: "Email", value: profile?.stdprofile?.[0]?.emailid },
                  { key: "Mobile", value: profile?.stdprofile?.[0]?.mobile },
                ].map((item, index) => (
                  <Box
                    key={index}
                    flexDirection={"row"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                  >
                    <Text fontSize={"md"}>{item.key}</Text>
                    <Text
                      fontSize={"md"}
                      color={
                        item.key === "Role"
                          ? "#007367"
                          : item.key === "Name"
                          ? "#000000"
                          : "#706F6F"
                      }
                      paddingLeft={4}
                    >
                      {item.value || "Not available"}
                    </Text>
                  </Box>
                ))}
              </VStack>
              <HStack
                justifyContent="space-between"
                space={4}
                mt={4}
                alignItems="center"
                width="100%"
              >
                <Pressable
                  onPress={() => navigation.navigate("Violation")}
                  style={{
                    borderWidth: 1,
                    borderColor: "#37474F",
                    borderRadius: 20,
                    paddingVertical: 10,
                    paddingHorizontal: 15,
                    alignItems: "center",
                    justifyContent: "center",
                    flex: 1,
                    marginRight: 8,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "bold",
                      color: "#37474F",
                    }}
                  >
                    Violations {violationsCount}
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => navigation.navigate("AddViolations")}
                  style={{
                    backgroundColor: "#007367",
                    borderRadius: 20,
                    paddingVertical: 10,
                    paddingHorizontal: 15,
                    alignItems: "center",
                    justifyContent: "center",
                    flex: 1,
                  }}
                >
                  <Text
                    style={{ fontSize: 20, fontWeight: "bold", color: "#fff" }}
                  >
                    Add Violation
                  </Text>
                </Pressable>
              </HStack>
            </Box>
          ) : (
            <Text>No results found.</Text>
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
  );
}
