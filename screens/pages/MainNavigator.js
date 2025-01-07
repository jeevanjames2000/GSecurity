import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider, View, extendTheme } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import GetDetails from "./utils/GetDetails";
import ReportViolation from "./ReportViolation";
import Emergency from "./Emergency";
import Media from "./Media";
import Fines from "./Fines";
import VisitorRegistration from "./VisitorRegistration";
import Login from "../auth/Login";
import Main from "./Main";
import Home from "./Tabs/Home";
import Parking from "./Parking";
import Leaves_Permission from "./Leaves_Permission";
import Gatepass from "./Gatepass";
import Violations from "./Tabs/Violations";
import Camera from "./Tabs/Camera";

const Stack = createNativeStackNavigator();

export default function MainNavigator() {
  const navigation = useNavigation();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#673AB7",
        },
        headerTintColor: "#fff",
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Report Violation"
        component={ReportViolation}
        options={{
          headerStyle: {
            backgroundColor: "#ffffff",
          },
          headerTitleAlign: "center",
          headerShown: true,
          headerTintColor: "#000",
          headerTitle: "Report Violation",
          headerTitleStyle: {
            fontSize: 20,
          },
          headerShadowVisible: false,
          headerLeft: () => (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#ffffff",
                width: 40,
                height: 40,
                color: "#007367",

                borderRadius: 20,
                shadowColor: "#000",
                shadowOffset: { width: 2, height: 4 },
                shadowOpacity: 0.6,
                shadowRadius: 20,
                elevation: 10,
              }}
            >
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color={"#007367"} />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="Violations"
        component={Violations}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Camera"
        component={Camera}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Emergency"
        component={Emergency}
        options={{
          headerStyle: {
            backgroundColor: "#ffffff",
          },
          headerTitleAlign: "center",
          headerShown: true,
          headerTintColor: "#000",
          headerTitle: "Emergency",
          headerTitleStyle: {
            fontSize: 20,
          },
          headerShadowVisible: false,
          headerLeft: () => (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#ffffff",
                width: 40,
                height: 40,
                color: "#007367",

                borderRadius: 20,
                shadowColor: "#000",
                shadowOffset: { width: 2, height: 4 },
                shadowOpacity: 0.6,
                shadowRadius: 20,
                elevation: 10,
              }}
            >
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color={"#007367"} />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="Media"
        component={Media}
        options={{
          headerStyle: {
            backgroundColor: "#ffffff",
          },
          headerTitleAlign: "center",
          headerShown: true,
          headerTintColor: "#000",
          headerTitle: "Media",
          headerTitleStyle: {
            fontSize: 20,
          },
          headerShadowVisible: false,
          headerLeft: () => (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#ffffff",
                width: 40,
                height: 40,
                color: "#007367",

                borderRadius: 20,
                shadowColor: "#000",
                shadowOffset: { width: 2, height: 4 },
                shadowOpacity: 0.6,
                shadowRadius: 20,
                elevation: 10,
              }}
            >
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color={"#007367"} />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Get Details"
        component={GetDetails}
        options={{
          headerStyle: {
            backgroundColor: "#fff",
          },
          headerShown: true,
          headerTintColor: "#fff",
          headerTitle: "",
          headerLeft: () => (
            <View
              style={{
                backgroundColor: "#fff",
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ marginLeft: 0, alignItems: "center", marginRight: 5 }}
              >
                <Ionicons name="arrow-back" size={30} color={"black"} />
              </TouchableOpacity>
            </View>
          ),
        }}
      />

      <Stack.Screen
        name="Fines"
        component={Fines}
        options={{
          headerStyle: {
            backgroundColor: "#ffffff",
          },
          headerTitleAlign: "center",
          headerShown: true,
          headerTintColor: "#000",
          headerTitle: "Fines",
          headerTitleStyle: {
            fontSize: 20,
          },
          headerShadowVisible: false,
          headerLeft: () => (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#ffffff",
                width: 40,
                height: 40,
                color: "#007367",

                borderRadius: 20,
                shadowColor: "#000",
                shadowOffset: { width: 2, height: 4 },
                shadowOpacity: 0.6,
                shadowRadius: 20,
                elevation: 10,
              }}
            >
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color={"#007367"} />
              </TouchableOpacity>
            </View>
          ),
        }}
      />

      <Stack.Screen
        name="Visitor"
        component={VisitorRegistration}
        options={{
          headerStyle: {
            backgroundColor: "#ffffff",
          },
          headerTitleAlign: "center",
          headerShown: true,
          headerTintColor: "#000",
          headerTitle: "Visitor Registration",
          headerTitleStyle: {
            fontSize: 20,
          },
          headerShadowVisible: false,
          headerLeft: () => (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#ffffff",
                width: 40,
                height: 40,
                color: "#007367",

                borderRadius: 20,
                shadowColor: "#000",
                shadowOffset: { width: 2, height: 4 },
                shadowOpacity: 0.6,
                shadowRadius: 20,
                elevation: 10,
              }}
            >
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color={"#007367"} />
              </TouchableOpacity>
            </View>
          ),
        }}
      />

      <Stack.Screen
        name="Parking"
        component={Parking}
        options={{
          headerStyle: {
            backgroundColor: "#ffffff",
          },
          headerTitleAlign: "center",
          headerShown: true,
          headerTintColor: "#000",
          headerTitle: "Parking",
          headerTitleStyle: {
            fontSize: 20,
          },
          headerShadowVisible: false,
          headerLeft: () => (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#ffffff",
                width: 40,
                height: 40,
                color: "#007367",

                borderRadius: 20,
                shadowColor: "#000",
                shadowOffset: { width: 2, height: 4 },
                shadowOpacity: 0.6,
                shadowRadius: 20,
                elevation: 10,
              }}
            >
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color={"#007367"} />
              </TouchableOpacity>
            </View>
          ),
        }}
      />

      <Stack.Screen
        name="Leaves_Permission"
        component={Leaves_Permission}
        options={{
          headerStyle: {
            backgroundColor: "#ffffff",
          },
          headerTitleAlign: "center",
          headerShown: true,
          headerTintColor: "#000",
          headerTitle: "Leaves & Permissions",
          headerTitleStyle: {
            fontSize: 20,
          },
          headerShadowVisible: false,
          headerLeft: () => (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#ffffff",
                width: 40,
                height: 40,
                color: "#007367",

                borderRadius: 20,
                shadowColor: "#000",
                shadowOffset: { width: 2, height: 4 },
                shadowOpacity: 0.6,
                shadowRadius: 20,
                elevation: 10,
              }}
            >
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color={"#007367"} />
              </TouchableOpacity>
            </View>
          ),
        }}
      />

      <Stack.Screen
        name="Gatepass"
        component={Gatepass}
        options={{
          headerStyle: {
            backgroundColor: "#ffffff",
          },
          headerTitleAlign: "center",
          headerShown: true,
          headerTintColor: "#000",
          headerTitle: "Gatepass",
          headerTitleStyle: {
            fontSize: 20,
          },
          headerShadowVisible: false,
          headerLeft: () => (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#ffffff",
                width: 40,
                height: 40,
                color: "#007367",

                borderRadius: 20,
                shadowColor: "#000",
                shadowOffset: { width: 2, height: 4 },
                shadowOpacity: 0.6,
                shadowRadius: 20,
                elevation: 10,
              }}
            >
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color={"#007367"} />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  );
}
