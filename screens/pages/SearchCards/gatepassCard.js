import React from "react";
import { Text, VStack, HStack, Input, View, Button } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import {
  gatepassSearchState,
  passByIDState,
} from "../../../store/slices/gatePassSlice";
export default function GatepassCard(cardData) {
  const { data } = cardData;
  const dispatch = useDispatch();
  const { passesByID } = useSelector((state) => state.gatepass);

  const handleClear = () => {
    dispatch(gatepassSearchState(""));
    dispatch(passByIDState(null));
    setSearch("");
  };

  return (
    <VStack space={4} padding={4} bg="white" borderRadius="xl" shadow="3">
      {data.map((gatePass, index) => (
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
            <HStack justifyContent="space-between" alignItems="center" mb={3}>
              <Text fontSize={18} fontWeight="bold">
                Vehicle number:
              </Text>
              <Text fontSize={16} textAlign="right" flex={1}>
                {gatePass.vehicle_number || "null"}
              </Text>
            </HStack>
            <HStack justifyContent="space-between" alignItems="center" mb={3}>
              <Text fontSize={18} fontWeight="bold">
                Reciever name:
              </Text>
              <Text fontSize={16} textAlign="right" flex={1}>
                {gatePass.receiver_name || "null"}
              </Text>
            </HStack>
            <HStack justifyContent="space-between" alignItems="center" mb={3}>
              <Text fontSize={18} fontWeight="bold">
                Created on:
              </Text>
              <Text fontSize={16} textAlign="right" flex={1}>
                {new Date(gatePass.created_time).toLocaleDateString() || "null"}
              </Text>
            </HStack>
            <HStack justifyContent="space-between" alignItems="center" mb={3}>
              <Text fontSize={18} fontWeight="bold">
                Issued to:
              </Text>
              <Text fontSize={16} textAlign="right" flex={1}>
                {gatePass.receiver_emp_id || "null"}
              </Text>
            </HStack>
            <HStack justifyContent="space-between" alignItems="center" mb={3}>
              <Text fontSize={18} fontWeight="bold">
                Issued by:
              </Text>
              <Text fontSize={16} textAlign="right" flex={1}>
                {gatePass.issued_by || "null"}
              </Text>
            </HStack>
            <HStack justifyContent="space-between" alignItems="center" mb={3}>
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
              <Text fontSize={18} fontWeight="bold" textAlign={"left"}>
                Note:
              </Text>
              <Input fontSize={14} value={gatePass.note} readOnly />
            </HStack>
          </View>

          <HStack space={2} mt={4} justifyContent="flex-end">
            <Button
              onPress={() => handleClear()}
              variant="outline"
              colorScheme="orange"
              padding={2}
              px={8}
              borderRadius={5}
              borderColor="orange.400"
            >
              View
            </Button>
          </HStack>
        </View>
      ))}
    </VStack>
  );
}
