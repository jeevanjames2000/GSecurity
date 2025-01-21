import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider } from "native-base";
import store from "./store/store";

import Login from "./screens/auth/Login";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { CustomTheme } from "./screens/customTheme";

import Main from "./screens/pages/Main";
import SplashScreen from "./screens/auth/Splash";
import { Provider } from "react-redux";

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
    <Provider store={store}>
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
    </Provider>
  );
}
