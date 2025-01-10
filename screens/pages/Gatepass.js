import React, { useState } from "react";
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
      pass_type: "John Doe",
      vehicle_num: "XYZ-5678",
      date: "2025-01-10",
      status: "approved",
      time: "3:00 pm",
    },
    {
      id: 3,
      pass_type: "Jane Smith",
      vehicle_num: "LMN-9101",
      date: "2025-01-11",
      status: "denied",
      time: "8:00 am",
    },
    {
      id: 4,
      pass_type: "Courtney Henry",
      vehicle_num: "ABC-1234",
      date: "2025-01-09",
      status: "pending",
      time: "12:00 pm",
    },
    {
      id: 5,
      pass_type: "John Doe",
      vehicle_num: "XYZ-5678",
      date: "2025-01-10",
      status: "approved",
      time: "6:00 pm",
    },
    {
      id: 6,
      pass_type: "Jane Smith",
      vehicle_num: "LMN-9101",
      date: "2025-01-11",
      status: "denied",
      time: "4:00 pm",
    },
    {
      id: 7,
      pass_type: "Courtney Henry",
      vehicle_num: "ABC-1234",
      date: "2025-01-09",
      status: "pending",
      time: "3:00 pm",
    },
    {
      id: 8,
      pass_type: "John Doe",
      vehicle_num: "XYZ-5678",
      date: "2025-01-10",
      status: "approved",
      time: "3:30 pm",
    },
    {
      id: 9,
      pass_type: "Jane Smith",
      vehicle_num: "LMN-9101",
      date: "2025-01-11",
      status: "pending",
      time: "2:00 pm",
    },
  ];
  const handleApprove = (id) => {};
  const handleCancel = (id) => {};
  const handleView = (item) => {
    setSelectedPass(item);
    setModalVisible(true);
  };
  const [sortOption, setSortOption] = useState("");
  const [open, setOpen] = useState(false);
  const handleSortChange = (value) => {
    setSortOption(value);
    onClose();
  };
  const filterOptions = [
    { label: "IssuedDate", value: "date" },
    { label: "Approved", value: "approved" },
    { label: "Pending", value: "pending" },
  ];
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
            ) : (
              <Ionicons name="checkmark-done-circle" size={26} color="green" />
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
            Gate Pass
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
      <View style={{ flex: 1, position: "relative", top: 40 }} p={4}>
        <FlatList
          data={dummypasses}
          renderItem={Passes}
          keyExtractor={(item) => item.id.toString()}
          mt={2}
          contentContainerStyle={{ paddingBottom: 20 }}
          pb={6}
          showsVerticalScrollIndicator={false}
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
                  color={
                    option.label === "Pending"
                      ? "orange.500"
                      : option.label === "Approved"
                      ? "green.600"
                      : "black.200"
                  }
                  borderBottomColor={"black"}
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
