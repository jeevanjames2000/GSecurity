import React, { useRef, useState } from "react";
import { Text, Box, Image, VStack, Input, Spinner, View } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
export default function Login({ navigation }) {
  const [username, setUsername] = useState("sample");
  const [password, setPassword] = useState("123@123");
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const otpRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const handleSendOtp = () => {
    if (mobileNumber.length === 10) {
      setOtpSent(true);
      setError("");
    } else {
      setError("Please enter a valid mobile number.");
    }
  };
  const handleChangeOtp = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    if (text.length === 1 && index < 3) {
      otpRefs[index + 1].current.focus();
    }
  };
  const handleLogin = async () => {
    if (!username || !password) {
      setError("Please enter both username and password.");
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("http://172.17.58.151:9000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok) {
        await AsyncStorage.setItem("token", data.token);
        await AsyncStorage.setItem("userName", username);
        navigation.navigate("Main");
      } else {
        setError(data.message || "Invalid credentials.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Box flex={1} bg="white" justifyContent="center" alignItems="center">
          <Box
            position="absolute"
            top={10}
            justifyContent="center"
            alignItems="center"
          >
            <Image
              source={{
                uri: "http://172.17.58.151:9000/auth/getImage/GitamLogo.jpg",
              }}
              alt="Search Icon"
              size="xl"
              resizeMode="contain"
            />
          </Box>
          <Box
            position="absolute"
            top={100}
            width="100%"
            height="50%"
            justifyContent="center"
            alignItems="center"
          >
            <Image
              source={{
                uri: "http://172.17.58.151:9000/auth/getImage/Frame1.png",
              }}
              alt="Illustration"
              resizeMode="contain"
              style={{ width: "90%", height: "90%" }}
            />
          </Box>
          <Box
            bg="#00796B"
            borderTopRadius="40"
            p={5}
            pb={10}
            width="100%"
            alignItems="center"
            position="absolute"
            bottom={0}
          >
            <Text
              fontSize="3xl"
              color="white"
              mb={5}
              fontWeight="bold"
              textAlign="center"
            >
              G-Security
            </Text>
            <VStack space={3} width="100%" alignItems="center" padding={1}>
              <Input
                placeholder="Mobile number"
                variant="filled"
                bg="white"
                p={3}
                value={mobileNumber}
                onChangeText={setMobileNumber}
                borderRadius="md"
                width="100%"
                fontSize={16}
                keyboardType="numeric"
                maxLength={10}
                _focus={{ bg: "#fff" }}
                InputRightElement={
                  <TouchableOpacity onPress={handleSendOtp}>
                    <Text fontSize="lg" color="black" marginRight={3}>
                      ➔
                    </Text>
                  </TouchableOpacity>
                }
              />
              {otpSent && (
                <Text color="white">OTP sent to your mobile number.</Text>
              )}

              <Box
                flexDirection="row"
                justifyContent="space-between"
                width="100%"
              >
                {otp.map((digit, index) => (
                  <Input
                    key={index}
                    value={digit}
                    onChangeText={(text) => handleChangeOtp(text, index)}
                    ref={otpRefs[index]}
                    // placeholder="0"
                    keyboardType="numeric"
                    maxLength={1}
                    textAlign="center"
                    fontSize={20}
                    variant="outline"
                    bg="white"
                    width="22%"
                  />
                ))}
              </Box>

              {error && <Text color="red.500">{error}</Text>}
              {isLoading ? (
                <Spinner size="lg" color="white" />
              ) : (
                <TouchableOpacity
                  style={{
                    backgroundColor: "#A58255",
                    padding: 15,
                    borderRadius: 5,
                    width: "100%",
                  }}
                  onPress={handleLogin}
                >
                  <Text
                    textAlign="center"
                    fontSize={17}
                    fontWeight="bold"
                    color="#fff"
                  >
                    Log in
                  </Text>
                </TouchableOpacity>
              )}
            </VStack>
            <View position={"absolute"} bottom={2}>
              <Text color={"#ddd"} fontSize={12}>
                Powered by CATS
              </Text>
            </View>
          </Box>
        </Box>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 60,
    backgroundColor: "#A58255",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
});
