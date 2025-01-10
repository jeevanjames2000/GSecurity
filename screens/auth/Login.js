import React, { useState } from "react";
import { Text, Box, Image, VStack, Input, Spinner } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet, TouchableOpacity } from "react-native";

export default function Login({ navigation }) {
  // const navigation = useNavigation();
  const [username, setUsername] = useState("sample");
  const [password, setPassword] = useState("123@123");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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

      console.log("response: ", response);
      if (response.ok) {
        await AsyncStorage.setItem("token", data.token);
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
        pb={20}
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
        <VStack space={4} width="100%" alignItems="center">
          <Input
            placeholder="Username"
            variant="filled"
            bg="white"
            p={3}
            value={username}
            onChangeText={setUsername}
            borderRadius="md"
            width="100%"
            fontSize={16}
            _focus={{ bg: "#fff" }}
          />
          <Input
            placeholder="Password"
            variant="filled"
            bg="white"
            p={3}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            borderRadius="md"
            width="100%"
            fontSize={16}
            _focus={{ bg: "#fff" }}
          />
          {error && (
            <Text color="red.500" textAlign="center">
              {error}
            </Text>
          )}
          {isLoading ? (
            <Spinner size="lg" color="white" />
          ) : (
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
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
      </Box>
    </Box>
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
