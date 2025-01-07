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

const Tab = createBottomTabNavigator();
export default function Main() {
  const navigation = useNavigation();
  const icons = {
    MainNavigator: require("../../assets/home.png"),
    Violations: require("../../assets/newIcons/risk-management.png"),
    Profile: require("../../assets/user (1).png"),
  };
  return (
    <Tab.Navigator
      initialRouteName="MainNavigator"
      screenOptions={({ route }) => ({
        tabBarLabel: "",
        tabBarIcon: ({ focused, color, size }) => {
          const label =
            route.name === "MainNavigator"
              ? "Home"
              : route.name === "Profile"
              ? "Profile"
              : "Violations";

          const iconSource = icons[route.name];

          return (
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: 5,
                width: "100%",
              }}
            >
              <Image
                source={iconSource}
                alt={`${label} Icon`}
                resizeMode="contain"
                style={{
                  alignItems: "center",
                  width: 30,
                  height: 30,
                  tintColor: focused ? "green" : "gray",
                }}
              />
              <Text
                style={{
                  color,
                  fontSize: 13,
                  fontWeight: "bold",
                }}
              >
                {label}
              </Text>
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
        name="Profile"
        component={Profile}
        options={{
          headerStyle: {
            backgroundColor: "#FFFFFF",
          },
          headerTitle: "Profile",
          headerTintColor: "#fff",
          headerTintColor: "#000",
          headerTitleAlign: "center",
        }}
      />
      <Tab.Screen
        name="MainNavigator"
        component={MainNavigator}
        options={{
          headerTitle: "",
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="Violations"
        component={Violations}
        options={{
          headerStyle: {
            backgroundColor: "#007367",
          },
          headerTintColor: "#fff",
          headerTitleAlign: "center",
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
    </Tab.Navigator>
  );
}
