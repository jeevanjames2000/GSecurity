import React, { useCallback, useMemo, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
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
  FormControl,
  useToast,
} from "native-base";
import { TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
const GatePass = () => {
  const toast = useToast();
  const filterOptions = [
    { label: "All", value: "all" },
    { label: "Pending", value: "pending" },
    { label: "Approved", value: "approved" },
    { label: "Rejected", value: "rejected" },
  ];
  const navigation = useNavigation();
  const { isOpen, onOpen, onClose } = useDisclose();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPass, setSelectedPass] = useState(null);
  const [filter, setFilter] = useState("all");
  const [passes, setPasses] = useState([]);
  const [filteredPasses, setFilteredPasses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const cache = useMemo(() => ({}), []);
  const fetchPasses = async () => {
    if (isFetching) return;
    setIsLoading(true);
    setIsFetching(true);
    try {
      const response = await fetch(
        "http://172.17.58.151:9000/gatepass/getAllGatePass"
      );
      const data = await response.json();
      const parsedData = data.map((pass) => ({
        ...pass,
        particulars: Array.isArray(pass.particulars)
          ? pass.particulars
          : JSON.parse(pass.particulars),
      }));
      setPasses(parsedData);
      setFilteredPasses(parsedData);
    } catch (error) {
      console.error("Error fetching passes:", error);
    } finally {
      setIsLoading(false);
      setIsFetching(false);
    }
  };
  useFocusEffect(
    useCallback(() => {
      fetchPasses();
    }, [])
  );
  const handleUpdate = async (id, updatedStatus) => {
    const formData = {
      pass_no: id,
      particulars: JSON.stringify(selectedPass.particulars),
      status: updatedStatus,
    };
    const response = await fetch(
      "http://172.17.58.151:9000/gatepass/updateParticulars",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );
    const responseData = await response.json();
    if (response.ok) {
      fetchPasses();
      toast.show({
        render: () => (
          <Box bg="green.300" px="4" py="2" rounded="md" shadow={2}>
            {responseData.message}
          </Box>
        ),
        placement: "top-right",
      });
    } else {
      const errorMessage =
        responseData.error || "An error occurred. Please try again.";
      toast.show({
        render: () => (
          <Box bg="red.300" px="4" py="2" rounded="md" shadow={2}>
            {errorMessage}
          </Box>
        ),
        placement: "top-right",
      });
    }
  };
  const handleApprove = (id) => {
    handleUpdate(id, "approved");
    setModalVisible(false);
  };
  const handleReject = (id) => {
    handleUpdate(id, "rejected");
    setModalVisible(false);
  };
  const applyFilters = (query, status) => {
    setIsLoading(true);
    const cacheKey = `${query.toLowerCase()}-${status}`;
    if (cache[cacheKey]) {
      setFilteredPasses(cache[cacheKey]);
      setIsLoading(false);
      return;
    }
    const updatedPasses = passes.filter((pass) => {
      const matchesSearch = Object.values(pass)
        .join(" ")
        .toLowerCase()
        .includes(query.toLowerCase());
      const matchesStatus = status === "all" ? true : pass.status === status;
      return matchesSearch && matchesStatus;
    });
    cache[cacheKey] = updatedPasses;
    setFilteredPasses(updatedPasses);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };
  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setIsLoading(true);
    const cacheKey = `${query}-${filter}`;
    if (cache[cacheKey]) {
      setFilteredPasses(cache[cacheKey]);
      setIsLoading(false);
    } else {
      applyFilters(query, filter, cacheKey);
    }
  };
  const handleSortChange = (value) => {
    setFilter(value);
    setIsLoading(true);
    const cacheKey = `${searchQuery}-${value}`;
    if (cache[cacheKey]) {
      setFilteredPasses(cache[cacheKey]);
      setIsLoading(false);
    } else {
      applyFilters(searchQuery, value, cacheKey);
    }
    onClose();
  };
  const handleView = (item) => {
    setSelectedPass(item);
    setModalVisible(true);
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
                {item.vehicle_number}
              </Text>
            </Text>
            <Text fontSize="lg" fontWeight="bold" color="gray.800">
              Issued Date:{" "}
              <Text fontSize="md" fontWeight="medium" color="gray.600">
                {new Date(item.created_time).toLocaleDateString()}
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
            Gate-Pass
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Create Pass")}>
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
            keyExtractor={(item, index) =>
              item?.id?.toString() || index.toString()
            }
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
      </View>
      <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
        <Modal.Content width={"90%"}>
          <Modal.CloseButton />
          <Modal.Header>GatePass Details</Modal.Header>
          <Modal.Body>
            {selectedPass && (
              <VStack space={2} key={selectedPass.id}>
                <Text>
                  <Text fontWeight="bold">Pass No: </Text>
                  {selectedPass.pass_no}
                </Text>
                <Text>
                  <Text fontWeight="bold">Pass Type: </Text>
                  {selectedPass.pass_type}
                </Text>
                <Text>
                  <Text fontWeight="bold">Vehicle Number: </Text>
                  {selectedPass.vehicle_number}
                </Text>
                <Text>
                  <Text fontWeight="bold">Date: </Text>
                  {new Date(selectedPass.created_time).toLocaleDateString()}
                </Text>
                <Text>
                  <Text fontWeight="bold">Status: </Text>
                  {selectedPass.status}
                </Text>
                <FormControl>
                  <FormControl.Label
                    _text={{
                      fontSize: 16,
                      fontWeight: "bold",
                      color: "gray.600",
                    }}
                  >
                    Particulars
                  </FormControl.Label>
                  {selectedPass.particulars.map((item, index) => (
                    <HStack key={index} space={3} alignItems="center" mb={2}>
                      <Input
                        flex={2}
                        bg="#ffff"
                        value={item.particular}
                        p={3}
                        onChangeText={(value) => {
                          const updatedParticulars = [
                            ...selectedPass.particulars,
                          ];
                          updatedParticulars[index].particular = value;
                          setSelectedPass({
                            ...selectedPass,
                            particulars: updatedParticulars,
                          });
                        }}
                      />
                      <Input
                        placeholder="Qty"
                        flex={1}
                        bg="#ffff"
                        p={3}
                        keyboardType="numeric"
                        value={`${item.qty}`}
                        onChangeText={(value) => {
                          const updatedParticulars = [
                            ...selectedPass.particulars,
                          ];
                          updatedParticulars[index].qty = value;
                          setSelectedPass({
                            ...selectedPass,
                            particulars: updatedParticulars,
                          });
                        }}
                      />
                    </HStack>
                  ))}
                </FormControl>
              </VStack>
            )}
          </Modal.Body>
          <Modal.Footer>
            {selectedPass?.status === "pending" ? (
              <>
                <Button
                  onPress={() => {
                    handleApprove(selectedPass.pass_no);
                    setModalVisible(false);
                  }}
                  colorScheme="green"
                  mr={2}
                >
                  Approve
                </Button>
                <Button
                  onPress={() => {
                    handleReject(selectedPass.pass_no);
                  }}
                  colorScheme="red"
                >
                  Reject
                </Button>
              </>
            ) : (
              <Button
                onPress={() => {
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
