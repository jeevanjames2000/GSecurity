import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  VStack,
  HStack,
  Button,
  Pressable,
  Input,
  Image,
  View,
  KeyboardAvoidingView,
  Skeleton,
  ScrollView,
  Divider,
  Badge,
} from "native-base";
import {
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import {
  searchState,
  profileStore,
  fetchProfile,
  fetchViolations,
  showViolationsPage,
} from "../../store/slices/violationSlice";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import ViolationsTabs from "./utils/ViolationsTabs";
const ReportViolation = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const {
    searchStore,
    violations,
    isLoading,
    profile,
    violationsCount,
    showViolations,
    profileLength,
    image,
    refresh,
  } = useSelector((state) => state.violations);
  const handleSearch = () => {
    dispatch(searchState(search));
    dispatch(fetchProfile(search));
    setSearch(search);
  };

  useEffect(() => {
    dispatch(fetchViolations());
  }, [dispatch, refresh]);

  const handleClear = () => {
    dispatch(profileStore(null));
    dispatch(showViolationsPage(false));
    dispatch(searchState());
    setSearch("");
  };
  const handleTotalViolations = () => {
    dispatch(showViolationsPage(!showViolations));
    navigation.navigate("AddViolations");
  };
  const [filterViolationStatus, setFilterViolationStatus] = useState("all");
  const filteredViloationData = violations?.filter((item) => {
    if (filterViolationStatus === "all") return true;
    return item.status === filterViolationStatus;
  });

  const handleOpenModal = (item) => {
    setSelectedItem(item);
    setIsModalVisible(true);
  };
  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedItem(null);
  };
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        {showViolations ? (
          <ViolationsTabs />
        ) : (
          <Box flex={1} backgroundColor="#f5f5f5">
            <Box backgroundColor="#007367" paddingY="4" paddingX="4">
              <HStack
                alignItems="center"
                justifyContent="space-between"
                position="relative"
                top={10}
                px={2}
              >
                <Ionicons
                  name="arrow-back"
                  size={30}
                  color="white"
                  onPress={() => navigation.goBack()}
                />
                <Text
                  fontSize={30}
                  color="white"
                  fontWeight="bold"
                  textAlign="center"
                  flex={1}
                >
                  Violations
                </Text>
              </HStack>

              <HStack
                backgroundColor="white"
                borderRadius="20"
                alignItems="center"
                paddingX="4"
                paddingY="4"
                mt="2"
                shadow="2"
                top={50}
              >
                <Input
                  flex={1}
                  placeholder="Search by Pass / Vehicle number"
                  variant="unstyled"
                  fontSize="md"
                  value={search}
                  onChangeText={(value) => setSearch(value)}
                />

                {searchStore ? (
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
                ) : (
                  <Ionicons
                    name="search-outline"
                    size={26}
                    color="black"
                    onPress={() => {
                      handleSearch();
                    }}
                  />
                )}
              </HStack>
            </Box>
            <View style={{ flex: 1, position: "relative", top: 30 }} p={4}>
              {isLoading ? (
                <VStack space={2}>
                  {new Array(1).fill().map((_, index) => (
                    <VStack
                      space={4}
                      padding={4}
                      bg="white"
                      borderRadius={10}
                      key={index}
                      shadow={2}
                    >
                      <Skeleton
                        h={10}
                        w="100%"
                        startColor="gray.300"
                        endColor="gray.100"
                        borderRadius={5}
                      />
                      <VStack space={2}>
                        <Skeleton
                          h={5}
                          w="80%"
                          startColor="gray.300"
                          endColor="gray.100"
                          borderRadius={5}
                        />
                        <Skeleton
                          h={5}
                          w="40%"
                          startColor="gray.300"
                          endColor="gray.100"
                          borderRadius={5}
                        />
                        <Skeleton
                          h={5}
                          w="50%"
                          startColor="gray.300"
                          endColor="gray.100"
                          borderRadius={5}
                        />
                      </VStack>
                      <VStack space={2} marginTop={1}>
                        {[...Array(5)].map((_, index) => (
                          <HStack
                            key={index}
                            justifyContent="space-between"
                            alignItems="center"
                            py={1}
                          >
                            <Skeleton
                              h={5}
                              w="30%"
                              startColor="gray.300"
                              endColor="gray.100"
                              borderRadius={5}
                            />
                            <Skeleton
                              h={5}
                              w="60%"
                              startColor="gray.300"
                              endColor="gray.100"
                              borderRadius={5}
                            />
                          </HStack>
                        ))}
                      </VStack>
                      {}
                      <HStack
                        justifyContent="space-between"
                        space={4}
                        marginTop={3}
                      >
                        <Skeleton
                          h={10}
                          w="45%"
                          startColor="gray.300"
                          endColor="gray.100"
                          borderRadius={10}
                        />
                        <Skeleton
                          h={10}
                          w="45%"
                          startColor="gray.300"
                          endColor="gray.100"
                          borderRadius={10}
                        />
                      </HStack>
                    </VStack>
                  ))}
                </VStack>
              ) : !showViolations && profile && profileLength > 0 ? (
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
                        <Badge
                          colorScheme="success"
                          _text={{ fontSize: "md" }}
                          borderRadius={10}
                        >
                          {profile?.stdprofile?.[0]?.status === "A"
                            ? "Active"
                            : "Inactive"}
                        </Badge>
                      </HStack>
                    </VStack>
                  </HStack>
                  <VStack space={1.5} marginTop={"6"}>
                    {[
                      {
                        key: "Name",
                        value: profile?.stdprofile?.[0]?.name,
                      },
                      { key: "Role", value: profile?.role },
                      {
                        key: "Batch",
                        value: profile?.stdprofile?.[0]?.batch,
                      },
                      {
                        key: "Email",
                        value: profile?.stdprofile?.[0]?.emailid,
                      },
                      {
                        key: "Mobile",
                        value: profile?.stdprofile?.[0]?.mobile,
                      },
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
                      onPress={handleTotalViolations}
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
                        style={{
                          fontSize: 20,
                          fontWeight: "bold",
                          color: "#fff",
                        }}
                      >
                        Add Violation
                      </Text>
                    </Pressable>
                  </HStack>
                </Box>
              ) : search.trim() ? (
                <View flex={1} justifyContent="center" alignItems="center">
                  <Text
                    fontSize={18}
                    fontWeight="bold"
                    color="gray.500"
                    textAlign="center"
                  >
                    No Results Found
                  </Text>
                </View>
              ) : (
                <View flex={1} justifyContent="center" alignItems="center">
                  <Image
                    source={{
                      uri: "http://172.17.58.151:9000/auth/getImage/amico.png",
                    }}
                    alt="Profile Image"
                    size="xl"
                    borderRadius="xl"
                  />
                  <Text mt={5}>Search for results</Text>
                </View>
              )}
            </View>

            {/* <TouchableOpacity
              style={{
                position: "absolute",
                right: 25,
                zIndex: 1000,
                bottom: 12,
                backgroundColor: "#007367",
                borderRadius: 50,
                paddingVertical: 10,
                paddingHorizontal: 10,
                flexDirection: "row",
                alignItems: "center",
              }}
              onPress={() => navigation.navigate("Create Pass")}
            >
              <Ionicons name="add-circle-outline" size={30} color="white" />
            </TouchableOpacity> */}
          </Box>
        )}
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
export default ReportViolation;
