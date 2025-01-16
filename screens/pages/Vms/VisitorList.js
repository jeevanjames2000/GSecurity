import React, { useState } from "react";
import {
  ScrollView,
  HStack,
  Text,
  VStack,
  View,
  Input,
  Box,
  Modal,
  Pressable,
  Image,
  Actionsheet,
  useDisclose,
  Center,
  Button,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
const visitorsData = [
  {
    requestId: "REQ001",
    visitorName: "Taru Kumar",
    visitDate: "12 Jan 2025",
    contactNo: "7894561230",
    createdOn: "10 Jan 2025, 2:30 PM",
    status: "Pending",
    otp: "",
    rqName: "John Doe",
    time: "2:30 PM",
  },
  {
    requestId: "REQ002",
    visitorName: "Bangaru Naidu",
    visitDate: "11 Jan 2025",
    contactNo: "9876543210",
    createdOn: "09 Jan 2025, 1:00 PM",
    status: "Approved",
    otp: "",
    rqName: "Jane Smith",
    time: "1:00 PM",
  },
  {
    requestId: "REQ003",
    visitorName: "Meera Sharma",
    visitDate: "14 Jan 2025",
    contactNo: "9658741230",
    createdOn: "12 Jan 2025, 11:00 AM",
    status: "Pending",
    otp: "",
    rqName: "Mark Johnson",
    time: "11:00 AM",
  },
  {
    requestId: "REQ004",
    visitorName: "Rahul Gupta",
    visitDate: "15 Jan 2025",
    contactNo: "8523697410",
    createdOn: "13 Jan 2025, 3:45 PM",
    status: "Rejected",
    otp: "",
    rqName: "Emily Davis",
    time: "3:45 PM",
  },
  {
    requestId: "REQ005",
    visitorName: "Anjali Verma",
    visitDate: "16 Jan 2025",
    contactNo: "9236547891",
    createdOn: "14 Jan 2025, 10:15 AM",
    status: "Approved",
    otp: "",
    rqName: "Chris Lee",
    time: "10:15 AM",
  },
  {
    requestId: "REQ006",
    visitorName: "Vikram Roy",
    visitDate: "18 Jan 2025",
    contactNo: "7854129630",
    createdOn: "16 Jan 2025, 9:20 AM",
    status: "Pending",
    otp: "",
    rqName: "Sara Miller",
    time: "9:20 AM",
  },
  {
    requestId: "REQ007",
    visitorName: "Sonia Khanna",
    visitDate: "19 Jan 2025",
    contactNo: "7891236540",
    createdOn: "17 Jan 2025, 4:00 PM",
    status: "Approved",
    otp: "",
    rqName: "David Brown",
    time: "4:00 PM",
  },
];
const HistoryCard = ({ data, setShowModal, setSelectedVisitor }) => {
  return (
    <Pressable
      onPress={() => {
        setShowModal(true);
        setSelectedVisitor(data);
      }}
    >
      <HStack
        bgColor={"#F0F4F8"}
        paddingY={"2"}
        paddingX={"4"}
        alignItems={"center"}
        justifyContent={"space-between"}
        borderRadius={"lg"}
        marginBottom={"2"}
        borderLeftWidth={2}
        borderColor={
          data.status === "Approved"
            ? "green.500"
            : data.status === "Denied"
            ? "red.500"
            : "orange.400"
        }
        shadow={1}
      >
        <VStack flex={1} alignItems={"flex-start"} space={2}>
          <Text fontSize={"md"} fontWeight={"bold"} color={"black"}>
            RQ Name:{" "}
            <Text fontSize={"md"} fontWeight={"normal"} color={"black"}>
              {data.rqName}
            </Text>
          </Text>
          <Text fontSize={"md"} fontWeight={"bold"} color={"black"}>
            Visitor:{" "}
            <Text fontSize={"md"} fontWeight={"normal"} color={"black"}>
              {data.visitorName}
            </Text>
          </Text>
        </VStack>
        <VStack
          flexDirection={"row"}
          gap={4}
          alignItems={"flex-start"}
          justifyContent={"flex-start"}
        >
          <Text fontSize={"sm"} fontWeight={"normal"} color={"gray.600"}>
            {data.time}{" "}
          </Text>
          {data.status === "Pending" ? (
            <Ionicons name="time" size={26} color="orange" />
          ) : data.status === "Denied" ? (
            <Ionicons name="close-circle" size={26} color="#FF204E" />
          ) : (
            <Ionicons name="checkmark-done-circle" size={26} color="green" />
          )}
        </VStack>
      </HStack>
    </Pressable>
  );
};
const VisitorsList = () => {
  const { isOpen, onOpen, onClose } = useDisclose();
  const navigation = useNavigation();
  const [otp, setOtp] = useState("");
  const [sortOption, setSortOption] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedVisitor, setSelectedVisitor] = useState(null);
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);
  const [filteredVisitors, setFilteredVisitors] = useState(visitorsData);
  const handleSearchChange = (query) => {
    setSearchQuery(query);
    clearTimeout(searchDebounce);
    const searchDebounce = setTimeout(() => {
      applyFilters(query, sortOption);
    }, 300);
  };
  const filterOptions = [
    { label: "All", value: "all" },
    { label: "Approved", value: "approved" },
    { label: "Pending", value: "pending" },
    { label: "Denied", value: "denied" },
  ];
  const applyFilters = (query, filter) => {
    let updatedVisitors = visitorsData.filter((visitor) => {
      const matchesSearch = Object.values(visitor).some((value) =>
        value.toString().toLowerCase().includes(query.toLowerCase())
      );
      const matchesFilter =
        filter === "all" || visitor.status.toLowerCase() === filter;
      return matchesSearch && matchesFilter;
    });
    setFilteredVisitors(updatedVisitors);
  };
  const handleSortChange = (value) => {
    setSortOption(value);
    applyFilters(searchQuery, value);
    onClose();
  };
  return (
    <View style={{ flex: 1 }}>
      <Box backgroundColor="#007367" paddingY="4" paddingX="4">
        <HStack
          alignItems="center"
          justifyContent="space-between"
          position="relative"
          top={10}
          py={3}
        >
          {}
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={30} color="white" />
          </TouchableOpacity>
          {}
          <Text
            fontSize={24}
            color="white"
            fontWeight="bold"
            textAlign="center"
            flex={1}
          >
            Visitor Management
          </Text>
          {}
          <TouchableOpacity onPress={() => navigation.navigate("AddVisitor")}>
            <Image
              source={{
                uri: "http://172.17.58.151:9000/auth/getImage/violation1.png",
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
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 16 }}
        showsVerticalScrollIndicator={false}
        marginTop={"12"}
      >
        {filteredVisitors.map((visitor, i) => (
          <HistoryCard
            key={i}
            data={visitor}
            setShowModal={setShowModal}
            setSelectedVisitor={setSelectedVisitor}
          />
        ))}
      </ScrollView>
      <TouchableOpacity
        style={{
          zIndex: 1000,
          position: "absolute",
          bottom: 10,
          right: 16,
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
        <Text style={{ marginLeft: 5, fontSize: 16, color: "white" }}>
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
                  option.label === "Approved"
                    ? "green.600"
                    : option.label === "Denied"
                    ? "red.500"
                    : "orange.400"
                }
              >
                {option.label}
              </Text>
            </Actionsheet.Item>
          ))}
        </Actionsheet.Content>
      </Actionsheet>
      <Center>
        <Modal size="xl" isOpen={showModal} onClose={() => setShowModal(false)}>
          <Modal.Content maxWidth={["90%", "400px"]} borderRadius="10">
            <Modal.CloseButton />
            <Modal.Header>
              <Text fontSize={["md", "lg"]} fontWeight="bold" color={"#007367"}>
                Visitor Details
              </Text>
            </Modal.Header>
            <Modal.Body>
              <ScrollView>
                <VStack space={4}>
                  {}
                  {Object.entries(selectedVisitor || {}).map(([key, value]) => (
                    <HStack justifyContent="space-between" key={key}>
                      <Text fontWeight="bold" color="gray.600">
                        {key.replace(/([A-Z])/g, " $1").toUpperCase()}
                      </Text>
                      <Text color="gray.800">{value || "N/A"}</Text>
                    </HStack>
                  ))}
                  {}
                  {selectedVisitor?.status === "Pending" && !isOtpSubmitted ? (
                    <VStack space={4} mt={4}>
                      <Text fontWeight="bold" color="gray.600">
                        Enter OTP
                      </Text>
                      <Input
                        placeholder="Enter OTP"
                        value={otp}
                        onChangeText={(text) => setOtp(text)}
                        keyboardType="numeric"
                        maxLength={6}
                      />
                      <Button
                        colorScheme="teal"
                        onPress={() => {
                          if (otp === "123456") {
                            setIsOtpSubmitted(true);
                          } else {
                            alert("Invalid OTP. Please try again.");
                          }
                        }}
                      >
                        Submit OTP
                      </Button>
                    </VStack>
                  ) : (
                    ""
                  )}
                  {}
                  {isOtpSubmitted && (
                    <VStack space={4} mt={4}>
                      <Button colorScheme="teal">Download Visitor Pass</Button>
                    </VStack>
                  )}
                </VStack>
              </ScrollView>
            </Modal.Body>
            <Modal.Footer>
              <HStack space={4} justifyContent="flex-end" width="100%">
                {}
                <Button
                  variant="outline"
                  colorScheme="coolGray"
                  onPress={() => setShowModal(false)}
                >
                  Cancel
                </Button>
                {}
                <Button
                  colorScheme="teal"
                  onPress={() => {
                    setShowModal(false);
                  }}
                >
                  Confirm
                </Button>
              </HStack>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </Center>
    </View>
  );
};
export default VisitorsList;
