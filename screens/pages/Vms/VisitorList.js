import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import {
  ScrollView,
  HStack,
  Text,
  VStack,
  View,
  Input,
  Center,
  Button,
  Box,
  Badge,
  Modal,
  Pressable,
  Image,
  Actionsheet,
  useDisclose,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const HistoryCard = ({ data, setShowModal }) => {
  return (
    <Pressable onPress={() => setShowModal(true)}>
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
        {}
        <VStack
          flexDirection={"row"}
          gap={4}
          alignItems="center"
          justifyContent={"center"}
          top={-15}
        >
          <Text
            fontSize={"sm"}
            fontWeight={"normal"}
            color={"gray.600"}
            alignItems="center"
            justifyContent="center"
          >
            {data.time}{" "}
          </Text>
          {/* <Badge
            variant="solid"
            borderRadius={"md"}
            px={2}
            py={2}
            _text={{
              fontSize: "xs",
              fontWeight: "bold",
              textTransform: "uppercase",
              textAlign: "center",
            }}
            style={{
              width: 100,
              borderWidth: 0.5,
              borderColor:
                data.status === "Approved"
                  ? "green"
                  : data.status === "Pending"
                  ? "orange"
                  : data.status === "Denied"
                  ? "red"
                  : "gray",
            }}
            colorScheme={
              data.status === "Approved"
                ? "success"
                : data.status === "Pending"
                ? "warning"
                : data.status === "Denied"
                ? "danger"
                : "gray"
            }
          >
            {data.status}
          </Badge> */}
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
  const filterOptions = [
    { label: "Approved", value: "approved" },
    { label: "Pending", value: "pending" },
    { label: "Denied", value: "denied" },
  ];

  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const visitorsData = [
    {
      rqName: "Kelivin Fryimnk",
      visitorName: "Annonyms",
      time: "02:00 pm",
      status: "Approved",
    },
    {
      rqName: "John Doe",
      visitorName: "Jane Smith",
      time: "03:00 pm",
      status: "Pending",
    },
    {
      rqName: "Alex Carter",
      visitorName: "Anonymous",
      time: "04:00 pm",
      status: "Denied",
    },
    {
      rqName: "John Doe",
      visitorName: "Jane Smith",
      time: "03:00 pm",
      status: "Pending",
    },
    {
      rqName: "Kelivin Fryimnk",
      visitorName: "Annonyms",
      time: "02:00 pm",
      status: "Approved",
    },
    {
      rqName: "John Doe",
      visitorName: "Jane Smith",
      time: "03:00 pm",
      status: "Pending",
    },
    {
      rqName: "Alex Carter",
      visitorName: "Anonymous",
      time: "04:00 pm",
      status: "Denied",
    },
    {
      rqName: "John Doe",
      visitorName: "Jane Smith",
      time: "03:00 pm",
      status: "Pending",
    },
    {
      rqName: "Kelivin Fryimnk",
      visitorName: "Annonyms",
      time: "02:00 pm",
      status: "Approved",
    },
  ];
  return (
    <View style={{ flex: 1 }}>
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
            VMS
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
            onPress={() => navigation.navigate("AddVisitor")}
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
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 16 }}
        showsVerticalScrollIndicator={false}
        padding={"0"}
        marginTop={"12"}
      >
        {visitorsData.map((visitor, i) => (
          <HistoryCard key={i} data={visitor} setShowModal={setShowModal} />
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
                  option.label === "Approved"
                    ? "green.600"
                    : option.label === "Denied"
                    ? "red.500"
                    : "orange.400"
                }
                borderBottomColor={"black"}
              >
                {option.label}
              </Text>
            </Actionsheet.Item>
          ))}
        </Actionsheet.Content>
      </Actionsheet>
      <Center>
        <Modal size="xl" isOpen={showModal} onClose={() => setShowModal(false)}>
          <Modal.Content maxWidth="400px" borderRadius="10">
            <Modal.CloseButton />
            <Modal.Header>
              <Text fontSize="lg" fontWeight="bold" color={"#007367"}>
                Visitor Details
              </Text>
            </Modal.Header>
            <Modal.Body>
              <VStack space={4}>
                {}
                <HStack justifyContent="space-between">
                  <Text fontWeight="bold" color="gray.600">
                    Request ID
                  </Text>
                  <Text color="gray.800">Bangaru Naidu</Text>
                </HStack>
                {}
                <HStack justifyContent="space-between">
                  <Text fontWeight="bold" color="gray.600">
                    Visitor Name
                  </Text>
                  <Text color="gray.800">Taru Kumar</Text>
                </HStack>
                {}
                <HStack justifyContent="space-between">
                  <Text fontWeight="bold" color="gray.600">
                    Visit Date
                  </Text>
                  <Text color="gray.800">12 Jan 2025</Text>
                </HStack>
                {}
                <HStack justifyContent="space-between">
                  <Text fontWeight="bold" color="gray.600">
                    Contact No
                  </Text>
                  <Text color="gray.800">7894561230</Text>
                </HStack>
                {}
                <HStack justifyContent="space-between">
                  <Text fontWeight="bold" color="gray.600">
                    Created On
                  </Text>
                  <Text color="gray.800">10 Jan 2025, 2:30 PM</Text>
                </HStack>
                {}
                <HStack justifyContent="space-between">
                  <Text fontWeight="bold" color="gray.600">
                    Status
                  </Text>
                  <Badge colorScheme="warning" borderRadius="md">
                    Pending
                  </Badge>
                </HStack>
                {}
                <HStack justifyContent="space-between">
                  <Text fontWeight="bold" color="gray.600">
                    Enter OTP
                  </Text>
                  <Input
                    variant="filled"
                    placeholder="Enter OTP"
                    keyboardType="numeric"
                    maxLength={6}
                    borderWidth={2}
                    borderColor="#007367"
                    borderRadius="8"
                    minWidth="160px"
                    fontSize="lg"
                    textAlign="center"
                    _focus={{
                      borderColor: "#007367",
                      backgroundColor: "white",
                    }}
                    _placeholder={{
                      color: "gray.500",
                    }}
                  />
                </HStack>
              </VStack>
            </Modal.Body>
            <Modal.Footer>
              <Button.Group space={2}>
                <Button
                  variant="outline"
                  colorScheme="blueGray"
                  onPress={() => setShowModal(false)}
                >
                  Close
                </Button>
                <Button
                  bgColor={"#007367"}
                  onPress={() => {
                    setShowModal(false);
                  }}
                >
                  Confirm
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </Center>
    </View>
  );
};
export default VisitorsList;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
});
