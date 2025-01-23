import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  VStack,
  HStack,
  Pressable,
  Input,
  View,
  Skeleton,
  FormControl,
  useToast,
  Image,
  Button,
  ScrollView,
  KeyboardAvoidingView,
} from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchGatepassByID,
  gatepassSearchState,
  passByIDState,
} from "../../store/slices/gatePassSlice";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
const GatePass = () => {
  const toast = useToast();
  const navigation = useNavigation();
  const [selectedPass, setSelectedPass] = useState(null);
  const dispatch = useDispatch();
  const { isLoading, gatepassSearch, passesByID } = useSelector(
    (state) => state.gatepass
  );
  const [search, setSearch] = useState("");
  const handleSearch = () => {
    if (search.trim() === "") return;
    dispatch(fetchGatepassByID(search));
    dispatch(gatepassSearchState(search));
    setSearch(search);
  };
  useEffect(() => {
    if (passesByID && passesByID.length > 0) {
      setSelectedPass({ ...passesByID[0] });
    }
  }, [passesByID]);
  const handleClear = () => {
    dispatch(gatepassSearchState(""));
    dispatch(passByIDState(null));
    setSearch("");
  };
  const handleUpdate = async (id, updatedStatus) => {
    const name = await AsyncStorage.getItem("userName");
    const formData = {
      pass_no: id,
      particulars: JSON.stringify(selectedPass.particulars),
      status: updatedStatus,
      verified_by: name,
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
      setTimeout(() => {
        dispatch(fetchGatepassByID(search));
        toast.show({
          render: () => (
            <Box bg="green.300" px="4" py="2" rounded="md" shadow={2}>
              {responseData.message}
            </Box>
          ),
          placement: "top-right",
        });
      }, 500);
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
  };
  const handleReject = (id) => {
    handleUpdate(id, "rejected");
  };
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
              {gatepassSearch ? (
                <>
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
                </>
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
            ) : passesByID && passesByID.length > 0 ? (
              <ScrollView bg="white" borderRadius="xl">
                <VStack
                  space={4}
                  padding={4}
                  bg="white"
                  borderRadius="xl"
                  shadow="3"
                >
                  {passesByID.map((gatePass, index) => (
                    <View key={index} mb={5} pt={0}>
                      <Text
                        textAlign={"center"}
                        fontWeight={"bold"}
                        color={"black"}
                        fontSize={18}
                        pb={2}
                      >
                        GatePass Details
                      </Text>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                          backgroundColor: "#007367",
                          padding: 10,
                          borderRadius: 15,
                        }}
                      >
                        <View ml={3}>
                          <Text
                            style={{
                              fontSize: 15,
                              fontWeight: "bold",
                              color: "#ddd",
                            }}
                          >
                            Pass No
                          </Text>
                          <Text
                            style={{
                              fontSize: 15,
                              fontWeight: "bold",
                              color: "white",
                            }}
                          >
                            #{gatePass.pass_no || "null"}
                          </Text>
                        </View>
                        <View mr={3}>
                          <Text
                            style={{
                              fontSize: 15,
                              fontWeight: "bold",
                              color: "#ddd",
                            }}
                          >
                            Type
                          </Text>
                          <Text
                            style={{
                              fontSize: 15,
                              fontWeight: "bold",
                              color: "white",
                            }}
                          >
                            {gatePass.pass_type || "null"}
                          </Text>
                        </View>
                      </View>
                      <View mt={4}>
                        <HStack
                          justifyContent="space-between"
                          alignItems="center"
                          mb={3}
                        >
                          <Text fontSize={18} fontWeight="bold">
                            Vehicle number:
                          </Text>
                          <Text fontSize={16} textAlign="right" flex={1}>
                            {gatePass.vehicle_number || "null"}
                          </Text>
                        </HStack>
                        <HStack
                          justifyContent="space-between"
                          alignItems="center"
                          mb={3}
                        >
                          <Text fontSize={18} fontWeight="bold">
                            Reciever name:
                          </Text>
                          <Text fontSize={16} textAlign="right" flex={1}>
                            {gatePass.receiver_name || "null"}
                          </Text>
                        </HStack>
                        <HStack
                          justifyContent="space-between"
                          alignItems="center"
                          mb={3}
                        >
                          <Text fontSize={18} fontWeight="bold">
                            Created on:
                          </Text>
                          <Text fontSize={16} textAlign="right" flex={1}>
                            {new Date(
                              gatePass.created_time
                            ).toLocaleDateString() || "null"}
                          </Text>
                        </HStack>
                        <HStack
                          justifyContent="space-between"
                          alignItems="center"
                          mb={3}
                        >
                          <Text fontSize={18} fontWeight="bold">
                            Issued to:
                          </Text>
                          <Text fontSize={16} textAlign="right" flex={1}>
                            {gatePass.receiver_emp_id || "null"}
                          </Text>
                        </HStack>
                        <HStack
                          justifyContent="space-between"
                          alignItems="center"
                          mb={3}
                        >
                          <Text fontSize={18} fontWeight="bold">
                            Issued by:
                          </Text>
                          <Text fontSize={16} textAlign="right" flex={1}>
                            {gatePass.issued_by || "null"}
                          </Text>
                        </HStack>
                        <HStack
                          justifyContent="space-between"
                          alignItems="center"
                          mb={3}
                        >
                          <Text fontSize={18} fontWeight="bold">
                            Status:
                          </Text>
                          <Text
                            fontSize={16}
                            fontWeight={"bold"}
                            textAlign="right"
                            flex={1}
                            style={{
                              color:
                                gatePass.status === "approved"
                                  ? "green"
                                  : gatePass.status === "pending"
                                  ? "orange"
                                  : "red",
                            }}
                          >
                            {gatePass.status === "approved"
                              ? "Approved"
                              : gatePass.status === "rejected"
                              ? "Rejected"
                              : "Pending"}
                          </Text>
                        </HStack>
                        <HStack
                          flexDirection={"column"}
                          justifyContent="space-between"
                          mb={3}
                          space={2}
                        >
                          <Text
                            fontSize={18}
                            fontWeight="bold"
                            textAlign={"left"}
                          >
                            Note:
                          </Text>
                          <Input fontSize={14} value={gatePass.note} readOnly />
                        </HStack>
                      </View>
                      <FormControl
                        mt={1}
                        borderWidth={1}
                        borderColor={"#ddd"}
                        borderRadius={10}
                        p={3}
                        backgroundColor={"#F8FAFC"}
                      >
                        <FormControl.Label
                          _text={{
                            fontSize: 18,
                            fontWeight: "bold",
                            color: "gray.600",
                          }}
                        >
                          Particulars
                        </FormControl.Label>
                        {selectedPass &&
                          selectedPass.particulars &&
                          selectedPass.particulars.map((particular, idx) => (
                            <HStack
                              key={idx}
                              space={3}
                              alignItems="center"
                              mb={2}
                            >
                              <Input
                                flex={2}
                                bg="#ffff"
                                fontSize={16}
                                value={particular.particular}
                                p={3}
                                onChangeText={(value) => {
                                  const updatedParticulars =
                                    selectedPass.particulars.map(
                                      (item, index) =>
                                        index === idx
                                          ? { ...item, particular: value }
                                          : item
                                    );
                                  setSelectedPass((prev) => ({
                                    ...prev,
                                    particulars: updatedParticulars,
                                  }));
                                }}
                              />
                              <Input
                                placeholder="Qty"
                                flex={1}
                                bg="#ffff"
                                p={3}
                                fontSize={16}
                                keyboardType="numeric"
                                value={`${particular.qty}`}
                                onChangeText={(value) => {
                                  const updatedParticulars =
                                    selectedPass.particulars.map(
                                      (item, index) =>
                                        index === idx
                                          ? { ...item, qty: value }
                                          : item
                                    );
                                  setSelectedPass((prev) => ({
                                    ...prev,
                                    particulars: updatedParticulars,
                                  }));
                                }}
                              />
                            </HStack>
                          ))}
                      </FormControl>

                      {selectedPass?.status === "pending" ? (
                        <HStack space={2} mt={4} justifyContent="space-between">
                          <Button
                            onPress={() => handleReject(gatePass.pass_no)}
                            variant="outline"
                            colorScheme="red"
                            padding={2}
                            px={12}
                            borderRadius={5}
                            borderColor="red.400"
                            style={{ flex: 1 }}
                          >
                            Reject
                          </Button>
                          <Pressable
                            onPress={() => handleApprove(gatePass.pass_no)}
                            style={{
                              backgroundColor: "#007367",
                              padding: 10,
                              paddingHorizontal: 50,
                              borderRadius: 5,
                              flex: 1,
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Text color="white" fontWeight="bold">
                              Approve
                            </Text>
                          </Pressable>
                        </HStack>
                      ) : (
                        <HStack space={2} mt={4} justifyContent="flex-end">
                          <Button
                            onPress={() => handleClear()}
                            variant="outline"
                            colorScheme="red"
                            padding={2}
                            px={8}
                            borderRadius={5}
                            borderColor="red.400"
                          >
                            Close
                          </Button>
                        </HStack>
                      )}
                    </View>
                  ))}
                </VStack>
              </ScrollView>
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
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate("Create Pass")}
          >
            <Image
              source={require("../../assets/Frame 213.png")}
              alt="Profile Image"
              size={20}
              color="#007367"
              position="absolute"
              right={5}
              zIndex={1000}
              bottom={12}
            />
          </TouchableWithoutFeedback>
        </Box>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
export default GatePass;
