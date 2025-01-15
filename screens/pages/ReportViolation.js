import React, { useState, useCallback } from "react";
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
  Skeleton,
  IconButton,
} from "native-base";
import { TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
const ReportViolation = () => {
  const navigation = useNavigation();
  const { isOpen, onOpen, onClose } = useDisclose();
  const [sortOption, setSortOption] = useState("all");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [violations, setViolations] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredViolations, setFilteredViolations] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fetchViolations = async () => {
    if (isFetching) return;
    setIsFetching(true);
    setIsLoading(true);
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
      setViolations(data);
      setFilteredViolations(data);
    } catch (error) {
      console.error("Error fetching violations:", error);
    } finally {
      setIsFetching(false);
      setIsLoading(false);
    }
  };
  useFocusEffect(
    useCallback(() => {
      fetchViolations();
    }, [])
  );
  const handleItemPress = (item) => {
    setSelectedItem(item);
    setIsModalVisible(true);
  };
  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedItem(null);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setIsLoading(true);
    applyFilters(query, sortOption);
  };
  const applyFilters = (query, filter) => {
    setIsLoading(true);
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
    setFilteredViolations(updatedViolations);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };
  const filterOptions = [
    { label: "Paid", value: "paid" },
    { label: "UnPaid", value: "unpaid" },
    { label: "All", value: "all" },
  ];
  const Passes = ({ item }) => (
    <Box
      bg="white"
      borderRadius="lg"
      p={3}
      mb={2}
      shadow={2}
      borderWidth={0.5}
      borderColor={
        item.status.toLowerCase() === "paid"
          ? "green.400"
          : item.status.toLowerCase() === "unpaid"
          ? "red.400"
          : "orange.400"
      }
    >
      <TouchableOpacity onPress={() => handleItemPress(item)}>
        <HStack justifyContent="space-between" alignItems="flex-start">
          <VStack flex={1} space={2}>
            <HStack justifyContent="space-between" alignItems="center">
              <Text fontSize="lg" fontWeight="bold" color="gray.800">
                Name:{" "}
                <Text fontSize="md" fontWeight="medium" color="gray.600">
                  {item.name}
                </Text>
              </Text>
              <Text
                fontSize={15}
                fontWeight="bold"
                color={
                  item.status.toLowerCase() === "paid" ? "green.500" : "red.500"
                }
              >
                ₹{item.totalFines}
              </Text>
            </HStack>
            <Text fontSize="lg" fontWeight="bold" color="gray.800">
              Vehicle Number:{" "}
              <Text fontSize="md" fontWeight="medium" color="gray.600">
                {item.vehicle_number}
              </Text>
            </Text>
            <Text fontSize="lg" fontWeight="bold" color="gray.800">
              Violation:{" "}
              <Text fontSize="md" fontWeight="medium" color="gray.600">
                {item.violation_type}
              </Text>
            </Text>
          </VStack>
        </HStack>
      </TouchableOpacity>
    </Box>
  );
  const handleSortChange = (value) => {
    setSortOption(value);
    applyFilters(searchQuery, value);
    onClose();
  };
  const ModalContent = ({ selectedItem }) => {
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const imageUrls = selectedItem.pics.split(",");
    const renderItem = ({ item, index }) =>
      item ? (
        <Image
          source={{ uri: item }}
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
          keyExtractor={(item) => item.Id}
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
            Violations
          </Text>
          <Ionicons
            name="arrow-back"
            size={30}
            position="absolute"
            left={0}
            color="white"
            onPress={() => navigation.goBack()}
          />
          <Ionicons
            name="person-add-outline"
            size={30}
            position="absolute"
            right={0}
            color="white"
            onPress={() => navigation.navigate("AddViolations")}
          />
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
            value={searchQuery}
            onChangeText={handleSearchChange}
          />
          {searchQuery ? (
            <Pressable onPress={clearSearch}>
              <IconButton
                icon={<MaterialIcons name="cancel" size={24} color="gray" />}
                onPress={clearSearch}
              />
            </Pressable>
          ) : (
            <Pressable>
              <Image
                source={{
                  uri: "http://172.17.58.151:9000/auth/getImage/search.png",
                }}
                alt="Search Icon"
                size={8}
              />
            </Pressable>
          )}
        </HStack>
      </Box>
      <View style={{ flex: 1, position: "relative", top: 30 }} p={4}>
        {isLoading ? (
          <VStack space={2}>
            {new Array(10).fill().map((_, index) => (
              <HStack
                key={index}
                justifyContent="space-between"
                alignItems="center"
                p={3}
                bg="white"
                borderRadius={10}
                borderWidth={0.5}
                borderColor="gray.200"
              >
                <VStack space={2} flex={1}>
                  <Skeleton
                    h={6}
                    w="60%"
                    startColor="gray.300"
                    endColor="gray.100"
                    borderRadius={5}
                  />
                  <Skeleton
                    h={8}
                    w="90%"
                    startColor="gray.300"
                    endColor="gray.100"
                    borderRadius={5}
                  />
                </VStack>
              </HStack>
            ))}
          </VStack>
        ) : (
          <FlatList
            data={filteredViolations}
            renderItem={({ item }) => <Passes item={item} />}
            keyExtractor={(item) => item.Id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
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
                  color={option.label === "unPaid" ? "red.500" : "green.800"}
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
