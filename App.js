import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider, View, extendTheme } from "native-base";

import GetDetails from "./screens/pages/utils/GetDetails";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import Login from "./screens/auth/Login";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

// import AppLoading from "expo-app-loading";
import { CustomTheme } from "./screens/customTheme";
import Profile from "./screens/pages/Tabs/Profile";
import ReportViolation from "./screens/pages/ReportViolation";
import Emergency from "./screens/pages/Emergency";
import Media from "./screens/pages/Media";
import VisitorRegistration from "./screens/pages/VisitorRegistration";

import Fines from "./screens/pages/Fines";

import Main from "./screens/pages/Main";
import SplashScreen from "./screens/auth/Splash";

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <NativeBaseProvider theme={CustomTheme}>
        <StatusBar style="auto" />
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: "#007367",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        >
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Main"
            component={Main}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}
