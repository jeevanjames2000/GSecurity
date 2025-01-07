import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import Home from "./Tabs/Home";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Camera from "./Tabs/Camera";
import Profile from "./Tabs/Profile";
import MainNavigator from "./MainNavigator";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Tab = createBottomTabNavigator();
export default function Main() {
  const navigation = useNavigation();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarLabel: "",
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let label;

          if (route.name === "MainNavigator") {
            iconName = focused ? "home" : "home-outline";
            label = "Home";
          } else if (route.name === "Camera") {
            iconName = focused ? "camera" : "camera-outline";
            label = "Camera";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
            label = "Profile";
          }

          return (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                padding: 5,
                width: "80%",
              }}
            >
              <Ionicons name={iconName} size={24} color={color} />
              <Text
                style={{
                  color,
                  fontSize: 13,
                  marginLeft: 5,
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
        name="MainNavigator"
        component={MainNavigator}
        options={{
          headerTitle: "",
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="Camera"
        component={Camera}
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
                onPress={() => navigation.goBack()}
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
          headerTintColor: "#fff",
          headerTintColor: "#000",
          headerTitleAlign: "center",

          headerLeft: () => (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#ffffff",
                width: 40,
                height: 40,

                marginLeft: 16,
                marginBottom: 10,
                marginTop: 20,
                borderRadius: 25,
                shadowColor: "#000",
                shadowOffset: { width: 2, height: 4 },
                shadowOpacity: 0.6,
                shadowRadius: 20,
                elevation: 10,
              }}
            >
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={30} color={"#007367"} />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
