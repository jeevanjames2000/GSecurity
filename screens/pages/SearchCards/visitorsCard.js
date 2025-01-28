import {
  Box,
  HStack,
  VStack,
  Text,
  Center,
  View,
  Input,
  Button,
} from "native-base";
import { useState } from "react";
import { useSelector } from "react-redux";
export default function VisitorDetailsCard() {
  const { isLoading, cardData, image, noProfile, profile } = useSelector(
    (state) => state.home
  );
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);
  const [otp, setOtp] = useState("");
  if (noProfile) {
    return (
      <View justifyContent="center" alignItems="center">
        <Text fontSize={18}>No results found.</Text>
      </View>
    );
  }
  return (
    <Box padding="6" shadow="9" bg={"#fff"} borderRadius={"xl"}>
      <HStack alignItems={"center"} justifyContent={"center"} mb={2}>
        <Text
          fontSize={22}
          fontWeight="bold"
          color={"#007367"}
          textAlign={"center"}
        >
          Visitor Details
        </Text>
      </HStack>
      <VStack space={2}>
        <VStack space={3} borderBottomWidth={1} borderColor="#DADADA" pb={3}>
          <HStack justifyContent="space-between">
            <Text fontWeight="bold" color="gray.600">
              Name
            </Text>
            <Text color="gray.800">
              {cardData[0]?.visitor_name || "Name not available"}
            </Text>
          </HStack>
          <HStack justifyContent="space-between">
            <Text fontWeight="bold" color="gray.600">
              Phone Number
            </Text>
            <Text color="gray.800">
              {cardData[0]?.contact_no || "Phone not available"}
            </Text>
          </HStack>
          <HStack justifyContent="space-between">
            <Text fontWeight="bold" color="gray.600">
              Vehicle Type
            </Text>
            <Text color="gray.800">
              {cardData[0]?.vehicle_type || "Vehicle type not available"}
            </Text>
          </HStack>
          <HStack justifyContent="space-between">
            <Text fontWeight="bold" color="gray.600">
              Vehicle Number
            </Text>
            <Text color="gray.800">
              {cardData[0]?.vehicle_no || "Vehicle number not available"}
            </Text>
          </HStack>
          <HStack justifyContent="space-between">
            <Text fontWeight="bold" color="gray.600">
              Visit Time
            </Text>
            <Text color="gray.800">
              {new Date(cardData[0]?.from_time).toLocaleTimeString() || "N/A"}
            </Text>
          </HStack>
          <HStack justifyContent="space-between">
            <Text fontWeight="bold" color="gray.600">
              Out Time
            </Text>
            <Text color="gray.800">
              {new Date(cardData[0]?.to_time).toLocaleTimeString() || "N/A"}
            </Text>
          </HStack>
          <HStack justifyContent="space-between">
            <Text fontWeight="bold" color="gray.600">
              Visit Department
            </Text>
            <Text color="gray.800">
              {cardData[0]?.visiting_location || "Department not available"}
            </Text>
          </HStack>
          <HStack justifyContent="space-between">
            <Text fontWeight="bold" color="gray.600">
              Status
            </Text>
            <Text
              color={
                cardData[0]?.status === "pending"
                  ? "#DB9669"
                  : cardData[0]?.status === "rejected"
                  ? "#FF6060"
                  : "#007367"
              }
            >
              {cardData[0]?.status || "N/A"}
            </Text>
          </HStack>
          <VStack space={2} justifyContent="space-between">
            <Text fontWeight="bold" color="gray.600">
              Purpose:
            </Text>
            <Text
              color="gray.800"
              borderWidth={1}
              borderColor={"#DADADA"}
              borderRadius={"lg"}
              padding={"2"}
            >
              {cardData[0]?.purpose || "Purpose not available"}
            </Text>
          </VStack>
        </VStack>
        {}
        <Text fontWeight="bold" color="#007367" fontSize="lg" mt={2}>
          Invitor Details
        </Text>
        <VStack space={3} borderBottomWidth={1} borderColor="#DADADA" pb={3}>
          <HStack justifyContent="space-between">
            <Text fontWeight="bold" color="gray.600">
              Name
            </Text>
            <Text color="gray.800">
              {cardData[0]?.whomToMeet || "Invitor name not available"}
            </Text>
          </HStack>
          <HStack justifyContent="space-between">
            <Text fontWeight="bold" color="gray.600">
              Visitor ID
            </Text>
            <Text color="gray.800">
              {cardData[0]?.visitor_id || "Visitor ID not available"}
            </Text>
          </HStack>
        </VStack>
        {}
        {cardData[0]?.status === "pending" && !isOtpSubmitted && (
          <Center mt={4}>
            <Input
              placeholder="Enter OTP"
              value={otp}
              onChangeText={(text) => setOtp(text)}
              keyboardType="numeric"
              maxLength={6}
              p={"4"}
              fontSize={"md"}
              color={"#9D9D9C"}
              borderRadius={"xl"}
              borderColor={"#9D9D9C"}
              borderWidth={1}
              borderStyle={"solid"}
              w="70%"
              InputRightElement={
                <Button
                  colorScheme="teal"
                  borderRadius={"full"}
                  mx={4}
                  px={4}
                  onPress={() => {
                    if (otp === "123456") {
                      setIsOtpSubmitted(true);
                    } else {
                      alert("Invalid OTP. Please try again.");
                    }
                  }}
                >
                  Allow
                </Button>
              }
            />
          </Center>
        )}
        {isOtpSubmitted && (
          <VStack space={4} mt={4}>
            <Button colorScheme="teal">Download Visitor Pass</Button>
          </VStack>
        )}
      </VStack>
    </Box>
  );
}
