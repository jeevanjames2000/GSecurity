import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Camera from "./Tabs/Camera";
import Profile from "./Tabs/Profile";
import MainNavigator from "./MainNavigator";
import { Image } from "native-base";
import ReportViolation from "./ReportViolation";
import Violations from "./Tabs/Violations";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Tab = createBottomTabNavigator();
export default function Main() {
  const navigation = useNavigation();
  const icons = {
    MainNavigator: {
      uri: "http://172.17.58.151:9000/auth/getImage/home.png",
    },
    QR: {
      uri: "http://172.17.58.151:9000/auth/getImage/qr-code1.png",
    },
    Profile: {
      uri: "http://172.17.58.151:9000/auth/getImage/user1.png",
    },
  };
  return (
    <Tab.Navigator
      initialRouteName="MainNavigator"
      screenOptions={({ route }) => ({
        tabBarLabel: "",
        tabBarIcon: ({ focused, color }) => {
          const label =
            route.name === "MainNavigator"
              ? "Home"
              : route.name === "Profile"
              ? "Profile"
              : "QR";
          const iconSource = icons[route.name];
          return (
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: 15,
                width: "100%",
              }}
            >
              <Image
                source={iconSource}
                alt={`${label} Icon`}
                resizeMode="contain"
                style={{
                  alignItems: "center",
                  width: route.name === "QR" ? 50 : 30,
                  height: route.name === "QR" ? 50 : 30,
                  tintColor: focused ? "green" : "gray",
                  padding: route.name === "QR" ? 10 : 0,
                  // backgroundColor: route.name === "Qr" ? "#dddd" : "",
                  // borderRadius: route.name === "Qr" ? 50 : 0,
                }}
              />
              {route.name !== "QR" && (
                <Text
                  style={{
                    color,
                    fontSize: 12,
                    fontWeight: "bold",
                  }}
                >
                  {label}
                </Text>
              )}
            </View>
          );
        },
        tabBarActiveTintColor: "#007367",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          height: 70,
          backgroundColor: "#fff",
          justifyContent: "center",
          paddingTop: 15,
          alignItems: "center",
        },
      })}
    >
      <Tab.Screen
        name="MainNavigator"
        component={MainNavigator}
        options={{
          headerTitle: "",
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="QR"
        component={Camera}
        options={{
          headerStyle: {
            backgroundColor: "#007367",
          },
          headerTintColor: "#fff",
          headerTitleAlign: "center",
          tabBarLabel: "",
          headerShown: true,
          headerLeft: () => (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "#007367",
                width: "100%",
                height: "auto",
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate("Home")}
                style={{ marginLeft: 5, alignItems: "center" }}
              >
                <Ionicons name="arrow-back" size={30} color={"#fff"} />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerStyle: {
            backgroundColor: "#FFFFFF",
          },
          headerTitle: "Profile",
          headerTintColor: "#000",
          headerTitleAlign: "center",
        }}
      />
      {}
    </Tab.Navigator>
  );
}
