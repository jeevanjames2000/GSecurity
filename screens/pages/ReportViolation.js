import React, { useState, useCallback, useMemo } from "react";
import {
  Box,
  Text,
  FlatList,
  VStack,
  HStack,
  Modal,
  Button,
  Pressable,
  Input,
  Image,
  View,
  Actionsheet,
  useDisclose,
  Badge,
} from "native-base";
import { TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import AntDesign from "@expo/vector-icons/AntDesign";
import { searchState } from "../../store/slices/violationSlice";
const studentInfo = {
  "Contact number": "+91 7845129630",
  Department: "CSE, Engineering",
  Campus: "Vishakapatnam",
  Email: "abdefg@gitam.edu",
};
const ReportViolation = () => {
  const studKeys = Object.keys(studentInfo);
  const studValeus = Object.values(studentInfo);
  const navigation = useNavigation();
  const { isOpen, onOpen, onClose } = useDisclose();
  const [sortOption, setSortOption] = useState("all");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredViolations, setFilteredViolations] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const dispatch = useDispatch();
  const { violations, isLoading, error, searchStore } = useSelector(
    (state) => state.home
  );
  const [search, setSearch] = useState("");
  const handleSearch = (query) => {
    dispatch(searchState(query));
    setSearch(query);
  };
  const fetchViolations = async () => {
    if (isFetching) return;
    setIsFetching(true);
    try {
      const response = await fetch(
        "http://172.17.58.151:9000/auth/getViolations",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch violations");
      }
      const data = await response.json();
      setFilteredViolations(data);
    } catch (error) {
      console.error("Error fetching violations:", error);
    } finally {
      setIsFetching(false);
    }
  };
  useFocusEffect(
    useCallback(() => {
      fetchViolations();
    }, [])
  );

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedItem(null);
  };
  const cache = useMemo(() => ({}), []);
  const filterOptions = [
    { label: "All", value: "all" },
    { label: "Paid", value: "paid" },
    { label: "UnPaid", value: "unpaid" },
  ];
  const handleSortChange = (value) => {
    setSortOption(value);
    const cacheKey = `${searchQuery}-${value}`;
    if (cache[cacheKey]) {
      setFilteredViolations(cache[cacheKey]);
      setIsLoading(false);
    } else {
      applyFilters(searchQuery, value, cacheKey);
    }
    onClose();
  };
  const ModalContent = ({ selectedItem }) => {
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const imageUrls = selectedItem.pics.split(",");
    const renderItem = ({ item, index }) =>
      item ? (
        <Image
          source={{ uri: item }}
          alt="report violation images"
          style={{
            width: 300,
            height: 300,
            borderRadius: 10,
            marginHorizontal: 5,
          }}
          resizeMode="cover"
        />
      ) : (
        <View
          flexDirection={"row"}
          justifyContent={"center"}
          flex={1}
          alignItems={"center"}
        >
          <Text justifyContent="center" alignItems="center" color="red.400">
            No images found!
          </Text>
        </View>
      );
    const onScrollEnd = (event) => {
      const contentOffsetX = event.nativeEvent.contentOffset.x;
      const index = Math.floor(contentOffsetX / 300);
      setActiveImageIndex(index);
    };
    return (
      <>
        <Text fontSize="lg" fontWeight="bold" color="gray.800">
          Name:{" "}
          <Text fontSize="md" fontWeight="medium" color="gray.600">
            {selectedItem.name}
          </Text>
        </Text>
        <Text fontSize="lg" fontWeight="bold" color="gray.800">
          Vehicle Number:{" "}
          <Text fontSize="md" fontWeight="medium" color="gray.600">
            {selectedItem.vehicle_number}
          </Text>
        </Text>
        <Text fontSize="lg" fontWeight="bold" color="gray.800">
          Violation:{" "}
          <Text fontSize="md" fontWeight="medium" color="gray.600">
            {selectedItem.violation_type}
          </Text>
        </Text>
        <Text fontSize="lg" fontWeight="bold" color="gray.800">
          Total Fine:{" "}
          <Text fontSize="md" fontWeight="medium" color="red.500">
            ₹{selectedItem.totalFines}
          </Text>
        </Text>
        <Text fontSize="lg" fontWeight="bold" color="gray.800">
          Violation Images:
        </Text>
        <FlatList
          data={imageUrls}
          horizontal
          renderItem={renderItem}
          keyExtractor={(item, index) => `${item}-${index}`}
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={onScrollEnd}
          contentContainerStyle={{
            paddingVertical: 10,
          }}
        />
      </>
    );
  };
  const clearSearch = () => {
    setSearchQuery("");
    setFilteredViolations(violations);
  };
  return (
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
          <TouchableOpacity
            onPress={() => navigation.navigate("AddViolations")}
          >
            <Image
              source={{
                uri: "http://172.17.58.151:9000/auth/getImage/add (2).png",
              }}
              alt="Add Icon"
              style={{
                width: 30,
                height: 30,
              }}
            />
          </TouchableOpacity>
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
            placeholder="IDs / Registration / Vehicle number"
            variant="unstyled"
            fontSize="md"
            value={search}
            onChangeText={(value) => handleSearch(value)}
          />
          {searchStore ? (
            <Pressable>
              <Text>Clear</Text>
            </Pressable>
          ) : (
            <Pressable>
              <AntDesign name="search1" size={28} color="#A69E91" />
            </Pressable>
          )}
        </HStack>
      </Box>
      <View style={{ flex: 1, position: "relative", top: 30 }} p={4}>
        {searchStore ? (
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
                  uri: "http://172.17.58.151:9000/auth/getImage/progfile_sec.jpg",
                }}
                alt="Alternate Text"
                size="lg"
                borderRadius={"xl"}
              />
              <VStack space={"2"}>
                <Text color={"#007367"} fontWeight={"bold"} fontSize="lg">
                  Jacob West
                </Text>
                <Text fontWeight={"semibold"} fontSize="md">
                  Employee
                </Text>
                <HStack
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  space={2}
                >
                  <Text fontWeight={"semibold"} fontSize="md">
                    20250001
                  </Text>
                  <Badge colorScheme="success" _text={{ fontSize: "md" }}>
                    Active
                  </Badge>
                </HStack>
              </VStack>
            </HStack>
            <VStack space={1.5} marginTop={"6"}>
              {[0, 1, 2, 3, 4].map((each) => (
                <Box
                  key={each}
                  flexDirection={"row"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  <Text fontSize={"md"}>{studKeys[each]}</Text>
                  <Text
                    fontSize={"md"}
                    color={
                      studKeys[each] === "Role"
                        ? "#007367"
                        : studKeys[each] === "Name"
                        ? "#000000"
                        : "#706F6F"
                    }
                    paddingLeft={4}
                  >
                    {studValeus[each]}
                  </Text>
                </Box>
              ))}
            </VStack>
            <HStack justifyContent={"space-evenly"} space={2} mt={4}>
              <Button
                variant="outline"
                borderColor={"#37474F"}
                borderRadius={"2xl"}
                _text={{
                  fontSize: "lg",
                  fontWeight: "bold",
                  color: "#37474F",
                }}
              >
                Violations (3)
              </Button>
              <Button
                variant="solid"
                bg={"#007367"}
                borderRadius={"2xl"}
                _text={{ fontSize: "lg", fontWeight: "bold", color: "#fff" }}
              >
                Add Violation
              </Button>
            </HStack>
          </Box>
        ) : (
          <Box flex={1} justifyContent="center" alignItems="center">
            <Image
              source={{
                uri: "https://example.com/search-placeholder.png",
              }}
              alt="Search Illustration"
              size="xl"
              mb={4}
            />
            <Text
              fontSize="lg"
              fontWeight="bold"
              color="gray.700"
              textAlign="center"
            >
              Start Your Search
            </Text>
            <Text fontSize="md" color="gray.500" textAlign="center" mt={2}>
              Enter keywords in the search bar above to find the information you
              need.
            </Text>
          </Box>
        )}
        <TouchableOpacity
          style={{
            zIndex: 1000,
            position: "absolute",
            bottom: 48,
            right: 15,
            backgroundColor: "#007367",
            borderRadius: 50,
            paddingVertical: 8,
            paddingHorizontal: 15,
            flexDirection: "row",
            alignItems: "center",
          }}
          onPress={onOpen}
        >
          <Ionicons name="filter-outline" size={22} color="white" />
          <Text color="white" style={{ marginLeft: 5, fontSize: 16 }}>
            Filter
          </Text>
        </TouchableOpacity>
        <Actionsheet isOpen={isOpen} onClose={onClose}>
          <Actionsheet.Content>
            {filterOptions.map((option, index) => (
              <Actionsheet.Item
                key={index}
                onPress={() => handleSortChange(option.value)}
                borderBottomWidth={index !== filterOptions.length - 1 ? 1 : 0}
                borderBottomColor="gray.300"
                py={3}
              >
                <Text
                  fontSize="md"
                  fontWeight="bold"
                  color={
                    {
                      UnPaid: "red.400",
                      Paid: "green.600",
                      All: "gray.500",
                    }[option.label] || "gray.700"
                  }
                  borderBottomColor={"black"}
                >
                  {option.label}
                </Text>
              </Actionsheet.Item>
            ))}
            {}
          </Actionsheet.Content>
        </Actionsheet>
      </View>
      <Modal isOpen={isModalVisible} onClose={handleCloseModal}>
        <Modal.Content maxHeight="100%" width={"100%"} top={10}>
          <Modal.CloseButton />
          <Modal.Header>Violation Details</Modal.Header>
          <Modal.Body>
            {selectedItem && <ModalContent selectedItem={selectedItem} />}
          </Modal.Body>
          <Modal.Footer>
            <View flexDirection={"row"} gap={2}>
              <Button
                size={"md"}
                height="10"
                width="100"
                colorScheme={"orange"}
                onPress={handleCloseModal}
              >
                Print
              </Button>
              <Button
                size={"md"}
                height="10"
                width="100"
                colorScheme={"red"}
                onPress={handleCloseModal}
              >
                Close
              </Button>
            </View>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Box>
  );
};
export default ReportViolation;
