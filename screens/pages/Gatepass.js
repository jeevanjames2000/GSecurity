import React, { useCallback, useState } from "react";
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
  Skeleton,
} from "native-base";
import { TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { debounce } from "lodash";
const GatePass = () => {
  const navigation = useNavigation();
  const { isOpen, onOpen, onClose } = useDisclose();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPass, setSelectedPass] = useState(null);
  const dummypasses = [
    {
      id: 1,
      pass_type: "Courtney Henry",
      vehicle_num: "ABC-1234",
      date: "2025-01-09",
      status: "pending",
      time: "2:00 pm",
    },
    {
      id: 2,
      pass_type: "Wade Warren",
      vehicle_num: "XYZ-5678",
      date: "2025-01-10",
      status: "approved",
      time: "10:30 am",
    },
    {
      id: 3,
      pass_type: "Jenny Wilson",
      vehicle_num: "LMN-3456",
      date: "2025-01-11",
      status: "rejected",
      time: "3:45 pm",
    },
    {
      id: 4,
      pass_type: "Darlene Robertson",
      vehicle_num: "DEF-7890",
      date: "2025-01-12",
      status: "pending",
      time: "5:15 pm",
    },
    {
      id: 5,
      pass_type: "Jerome Bell",
      vehicle_num: "GHI-1234",
      date: "2025-01-13",
      status: "approved",
      time: "8:00 am",
    },
    {
      id: 6,
      pass_type: "Leslie Alexander",
      vehicle_num: "JKL-5678",
      date: "2025-01-14",
      status: "rejected",
      time: "12:45 pm",
    },
    {
      id: 7,
      pass_type: "Esther Howard",
      vehicle_num: "MNO-9012",
      date: "2025-01-15",
      status: "pending",
      time: "4:30 pm",
    },
    {
      id: 8,
      pass_type: "Jacob Jones",
      vehicle_num: "PQR-3456",
      date: "2025-01-16",
      status: "approved",
      time: "9:00 am",
    },
    {
      id: 9,
      pass_type: "Cody Fisher",
      vehicle_num: "STU-7890",
      date: "2025-01-17",
      status: "pending",
      time: "1:30 pm",
    },
    {
      id: 10,
      pass_type: "Savannah Nguyen",
      vehicle_num: "VWX-0123",
      date: "2025-01-18",
      status: "rejected",
      time: "6:15 pm",
    },
  ];
  const handleApprove = (id) => {};
  const handleCancel = (id) => {};
  const handleView = (item) => {
    setSelectedPass(item);
    setModalVisible(true);
  };
  const filterOptions = [
    { label: "All", value: null },
    { label: "Pending", value: "pending" },
    { label: "Approved", value: "approved" },
    { label: "Rejected", value: "rejected" },
  ];
  const [filter, setFilter] = useState(null);
  const [filteredPasses, setFilteredPasses] = useState(dummypasses);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const cache = React.useRef({});
  const debouncedApplyFilters = useCallback(
    debounce((query, filter) => {
      applyFilters(query, filter);
    }, 500),
    []
  );
  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setIsLoading(true);
    debouncedApplyFilters(query, filter);
  };
  const applyFilters = (query, status) => {
    setIsLoading(true);
    const cacheKey = `${query}-${status || "all"}`;
    if (cache.current[cacheKey]) {
      setFilteredPasses(cache.current[cacheKey]);
      setIsLoading(false);
      return;
    }
    const updatedPasses = dummypasses.filter((pass) => {
      const matchesSearch = Object.values(pass).some((value) =>
        value.toString().toLowerCase().includes(query.toLowerCase())
      );
      const matchesStatus = status
        ? pass.status === status.toLowerCase()
        : true;
      return matchesSearch && matchesStatus;
    });
    cache.current[cacheKey] = updatedPasses;
    setFilteredPasses(updatedPasses);
    setTimeout(() => {
      setIsLoading(false);
    }, 200);
  };
  const handleSortChange = (value) => {
    setFilter(value);
    applyFilters(searchQuery, value);
    onClose();
  };
  const Passes = ({ item }) => (
    <Box
      bg="white"
      borderRadius="lg"
      p={3}
      mb={2}
      shadow={2}
      borderLeftWidth={2}
      borderColor={item.status === "pending" ? "orange.400" : "green.400"}
    >
      <TouchableOpacity onPress={() => handleView(item)}>
        <HStack justifyContent="space-between" alignItems="center">
          <VStack flex={1}>
            <Text fontSize="lg" fontWeight="bold" color="gray.800">
              Pass Type:{" "}
              <Text fontSize="md" fontWeight="medium" color="gray.600">
                {item.pass_type}
              </Text>
            </Text>
            <Text fontSize="lg" fontWeight="bold" color="gray.800">
              Vehicle Number:{" "}
              <Text fontSize="md" fontWeight="medium" color="gray.600">
                {item.vehicle_num}
              </Text>
            </Text>
            <Text fontSize="lg" fontWeight="bold" color="gray.800">
              Issued Date:{" "}
              <Text fontSize="md" fontWeight="medium" color="gray.600">
                {item.date}
              </Text>
            </Text>
          </VStack>
          <VStack
            flexDirection={"row"}
            gap={4}
            alignItems="center"
            justifyContent={"center"}
            top={-25}
          >
            <Text
              fontSize={"sm"}
              fontWeight={"normal"}
              color={"gray.600"}
              alignItems="center"
              justifyContent="center"
            >
              {item.time}{" "}
            </Text>
            {item.status === "pending" ? (
              <Ionicons name="time" size={26} color="orange" />
            ) : item.status === "approved" ? (
              <Ionicons name="checkmark-done-circle" size={26} color="green" />
            ) : (
              <Ionicons name="close-circle" size={26} color="red" />
            )}
          </VStack>
        </HStack>
      </TouchableOpacity>
    </Box>
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
          <Text
            fontSize={30}
            color="white"
            fontWeight="bold"
            textAlign="center"
            flex={1}
          >
            Gate-Pass
          </Text>
          <Ionicons
            name="arrow-back"
            size={30}
            position="absolute"
            left={0}
            color="white"
            onPress={() => navigation.goBack()}
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
            data={filteredPasses}
            renderItem={({ item }) => <Passes item={item} />}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ paddingBottom: 20 }}
            showsVerticalScrollIndicator={false}
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
                  color={
                    {
                      Pending: "orange.400",
                      Approved: "green.600",
                      Rejected: "red.500",
                    }[option.label] || "gray.700"
                  }
                >
                  {option.label}
                </Text>
              </Actionsheet.Item>
            ))}
          </Actionsheet.Content>
        </Actionsheet>
        {}
      </View>
      <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>GatePass Details</Modal.Header>
          <Modal.Body>
            {selectedPass && (
              <VStack space={2}>
                <Text fontWeight="bold">
                  Pass Type: {selectedPass.pass_type}
                </Text>
                <Text>Vehicle Number: {selectedPass.vehicle_num}</Text>
                <Text>Date: {selectedPass.date}</Text>
                <Text>Status: {selectedPass.status}</Text>
              </VStack>
            )}
          </Modal.Body>
          <Modal.Footer>
            {selectedPass?.status === "pending" ? (
              <>
                <Button
                  onPress={() => {
                    handleApprove(selectedPass.id);
                    setModalVisible(false);
                  }}
                  colorScheme="green"
                  mr={2}
                >
                  Approve
                </Button>
                <Button
                  onPress={() => {
                    handleCancel(selectedPass.id);
                    setModalVisible(false);
                  }}
                  colorScheme="red"
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button
                onPress={() => {
                  handleCancel(selectedPass.id);
                  setModalVisible(false);
                }}
                colorScheme="red"
              >
                Cancel
              </Button>
            )}
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Box>
  );
};
export default GatePass;
