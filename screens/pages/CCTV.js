import React, { useState } from "react";
import { StyleSheet } from "react-native";
import {
  VStack,
  Input,
  Button,
  Box,
  FormControl,
  Text,
  Select,
  CheckIcon,
  HStack,
  ScrollView,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const CCTV = () => {
  const navigation = useNavigation();
  const [visitorName, setVisitorName] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [otp, setOtp] = useState("");
  const [purpose, setPurpose] = useState("");
  const [visitingDept, setVisitingDept] = useState("");
  const [whomToMeet, setWhomToMeet] = useState("");
  const handleSendOtp = () => {
    console.log("OTP sent to:", contactNo);
  };
  const handleSubmit = () => {
    console.log({
      visitorName,
      contactNo,
      otp,
      purpose,
      visitingDept,
      whomToMeet,
    });
  };
  return (
    <Box flex={1} backgroundColor="#f5f5f5">
      {}
      <Box backgroundColor="#007367" paddingY="12" paddingX="4">
        <HStack
          alignItems="center"
          justifyContent="space-between"
          position="relative"
          top={5}
        >
          <Text
            fontSize={30}
            color="white"
            justifyContent={"center"}
            alignItems={"center"}
            fontWeight="bold"
            textAlign="center"
            flex={1}
          >
            CCTV
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
      </Box>

      <Box flex={1} justifyContent="center" alignItems={"center"}>
        <Text fontSize={25}>Coming Soon...</Text>
      </Box>
    </Box>
  );
};
export default CCTV;
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "semibold",
  },
  inputValue: {
    fontSize: 16,
  },
});
