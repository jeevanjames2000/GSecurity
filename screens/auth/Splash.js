import React, { useCallback, useEffect, useState } from "react";
import { BackHandler, Alert } from "react-native";
import { jwtDecode } from "jwt-decode";
import { ActivityIndicator } from "react-native";
import { View, Box, Image, Spinner } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SplashScreen({ navigation }) {
  const [expired, setExpired] = useState(false);

  const checkSession = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        setTimeout(() => {
          navigation.navigate("Login");
        }, 1000);
        return;
      }
      const decoded = jwtDecode(token);
      const currentTime = Math.floor(new Date().getTime() / 1000);
      const isExpired = currentTime > decoded.exp;
      setExpired(isExpired);
      if (isExpired) {
        await AsyncStorage.removeItem("token");
        setTimeout(() => {
          navigation.navigate("Login", {
            message: "Session expired, please log in again.",
          });
        }, 1000);
      } else {
        setTimeout(() => {
          navigation.navigate("Main", { decoded });
        }, 1000);
      }
    } catch (error) {
      console.error("Error checking session:", error);
    }
  }, [navigation]);

  const handleBackPress = () => {
    // Prevent navigating back from splash and close the app
    Alert.alert("Exit App", "Are you sure you want to exit?", [
      { text: "Cancel", style: "cancel" },
      { text: "OK", onPress: () => BackHandler.exitApp() },
    ]);
    return true; // Prevent default back button behavior
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackPress);

    // Cleanup the event listener on component unmount
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
    };
  }, []);

  useEffect(() => {
    checkSession();
  }, [expired, checkSession]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <Image
        source={require("../../assets/gitam-logo-circle.png")}
        style={{
          width: "100%",
          height: "80%",
          backgroundColor: "transparent",
        }}
        resizeMode="contain"
      />
      <Spinner size="lg" color="green" />
    </View>
  );
}
