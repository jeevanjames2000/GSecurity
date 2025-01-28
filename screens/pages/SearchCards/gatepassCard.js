import React, { useEffect, useState } from "react";
import {
  Text,
  VStack,
  HStack,
  Input,
  View,
  Button,
  FormControl,
} from "native-base";
import { Pressable } from "react-native";
export default function GatepassCard({ data }) {
  const [selectedGatePass, setSelectedGatePass] = useState(null);
  const [particulars, setParticulars] = useState([]);
  useEffect(() => {
    if (data) {
      setSelectedGatePass(data.gatePass);
      setParticulars(data.particulars);
    }
  }, [data]);
  const handleParticularChange = (idx, field, value) => {
    const updatedParticulars = particulars.map((item, index) =>
      index === idx ? { ...item, [field]: value } : item
    );
    setParticulars(updatedParticulars);
  };
  return (
    <VStack padding="6" pt={2} shadow="9" bg={"#fff"} borderRadius={"xl"}>
      {selectedGatePass && particulars.length > 0 ? (
        <>
          <View mb={2}>
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
                  #{selectedGatePass.pass_no || "null"}
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
                  {selectedGatePass.pass_type || "null"}
                </Text>
              </View>
            </View>
            <View mt={4}>
              <HStack justifyContent="space-between" alignItems="center" mb={3}>
                <Text fontSize={18} fontWeight="bold">
                  Vehicle number:
                </Text>
                <Text fontSize={16} textAlign="right" flex={1}>
                  {selectedGatePass.vehicle_number || "null"}
                </Text>
              </HStack>
              <HStack justifyContent="space-between" alignItems="center" mb={3}>
                <Text fontSize={18} fontWeight="bold">
                  Reciever name:
                </Text>
                <Text fontSize={16} textAlign="right" flex={1}>
                  {selectedGatePass.receiver_name || "null"}
                </Text>
              </HStack>
              <HStack justifyContent="space-between" alignItems="center" mb={3}>
                <Text fontSize={18} fontWeight="bold">
                  Created on:
                </Text>
                <Text fontSize={16} textAlign="right" flex={1}>
                  {new Date(
                    selectedGatePass.created_time
                  ).toLocaleDateString() || "null"}
                </Text>
              </HStack>
              <HStack justifyContent="space-between" alignItems="center" mb={3}>
                <Text fontSize={18} fontWeight="bold">
                  Issued to:
                </Text>
                <Text fontSize={16} textAlign="right" flex={1}>
                  {selectedGatePass.receiver_emp_id || "null"}
                </Text>
              </HStack>
              <HStack justifyContent="space-between" alignItems="center" mb={3}>
                <Text fontSize={18} fontWeight="bold">
                  Issued by:
                </Text>
                <Text fontSize={16} textAlign="right" flex={1}>
                  {selectedGatePass.issued_by || "null"}
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
                      selectedGatePass.status === "approved"
                        ? "green"
                        : selectedGatePass.status === "pending"
                        ? "orange"
                        : "red",
                  }}
                >
                  {selectedGatePass.status === "approved"
                    ? "Approved"
                    : selectedGatePass.status === "rejected"
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
                <Input fontSize={14} value={selectedGatePass.note} />
              </HStack>
            </View>
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
            {particulars.map((particular, idx) => (
              <HStack key={idx} space={3} alignItems="center" mb={2}>
                <Input
                  flex={2}
                  bg="#ffff"
                  fontSize={16}
                  value={particular.particular}
                  p={3}
                  onChangeText={(value) =>
                    handleParticularChange(idx, "particular", value)
                  }
                />
                <Input
                  placeholder="Qty"
                  flex={1}
                  bg="#ffff"
                  p={3}
                  fontSize={16}
                  keyboardType="numeric"
                  value={`${particular.qty}`}
                  onChangeText={(value) =>
                    handleParticularChange(idx, "qty", value)
                  }
                />
              </HStack>
            ))}
          </FormControl>
          {}
          <HStack
            justifyContent="space-between"
            space={4}
            mt={4}
            alignItems="center"
            width="100%"
          >
            <Pressable
              style={{
                borderWidth: 1,
                borderColor: "#37474F",
                borderRadius: 20,
                paddingVertical: 8,
                paddingHorizontal: 15,
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
                marginRight: 8,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  color: "#37474F",
                }}
              >
                Reject
              </Text>
            </Pressable>
            <Pressable
              style={{
                backgroundColor: "#007367",
                borderRadius: 20,
                paddingVertical: 8,
                paddingHorizontal: 15,
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  color: "#fff",
                }}
              >
                Approve
              </Text>
            </Pressable>
          </HStack>
        </>
      ) : (
        <View justifyContent="center" alignItems="center">
          <Text fontSize={18}>No results found.</Text>
        </View>
      )}
    </VStack>
  );
}
