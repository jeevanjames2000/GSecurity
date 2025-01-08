import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import GetDetails from "./utils/GetDetails";
import ReportViolation from "./ReportViolation";
import Emergency from "./Emergency";
import Fines from "./Fines";
import Login from "../auth/Login";
import Home from "./Tabs/Home";
import Parking from "./Parking";
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
              <TouchableOpacity onPress={() => navigation.navigate("Home")}>
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
              <TouchableOpacity onPress={() => navigation.navigate("Home")}>
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
                onPress={() => navigation.navigate("Home")}
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
              <TouchableOpacity onPress={() => navigation.navigate("Home")}>
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
              <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                <Ionicons name="arrow-back" size={24} color={"#007367"} />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  );
}
