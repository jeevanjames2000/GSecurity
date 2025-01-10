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
} from "native-base";
import { TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";
const ReportViolation = () => {
  const navigation = useNavigation();
  const { isOpen, onOpen, onClose } = useDisclose();
  const [sortOption, setSortOption] = useState("");

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [violations, setViolations] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const handleItemPress = (item) => {
    setSelectedItem(item);
    setIsModalVisible(true);
  };
  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedItem(null);
  };
  const handleSortChange = (value) => {
    setSortOption(value);
    onClose();
  };
  const filterOptions = [
    { label: "Fines", value: "fines" },
    { label: "Violation type", value: "violationType" },
  ];
  const Passes = ({ item }) => (
    <Box
      bg="white"
      borderRadius="lg"
      p={3}
      mb={2}
      shadow={2}
      borderWidth={0.5}
      borderColor={item.status === "pending" ? "orange.400" : "green.400"}
      // onTouchEnd={() => handleItemPress(item)}
    >
      <TouchableOpacity onPress={() => handleItemPress(item)}>
        <HStack justifyContent="space-between" alignItems="center">
          <VStack flex={1}>
            <Text fontSize="lg" fontWeight="bold" color="gray.800">
              Name:{" "}
              <Text fontSize="md" fontWeight="medium" color="gray.600">
                {item.name}
              </Text>
            </Text>
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
          <HStack space={4}>
            <Text fontSize={15} fontWeight={"bold"} color={"red.500"}>
              ₹{item.totalFines}
            </Text>
          </HStack>
        </HStack>
      </TouchableOpacity>
    </Box>
  );
  const fetchViolations = async () => {
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
    } catch (error) {
      console.error("Error fetching violations:", error);
    } finally {
    }
  };
  useFocusEffect(
    useCallback(() => {
      fetchViolations();
    }, [])
  );
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
      <View style={{ flex: 1, position: "relative", top: 30 }} p={4}>
        <FlatList
          data={violations}
          renderItem={({ item }) => <Passes item={item} />}
          keyExtractor={(item) => item.Id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
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
                  color={option.label === "Fines" ? "red.500" : "green.800"}
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
