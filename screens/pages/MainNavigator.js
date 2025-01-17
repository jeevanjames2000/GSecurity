import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import GetDetails from "./utils/GetDetails";
import ReportViolation from "./ReportViolation";
import Login from "../auth/Login";
import Home from "./Tabs/Home";
import Violations from "./Tabs/Violations";
import Camera from "./Tabs/Camera";
import GatePass from "./Gatepass";
import VisitorsList from "./Vms/VisitorList";
import AddVisitor from "./Vms/AddVisitor";
import AddViolations from "./Vms/AddViolations";
import CCTV from "./CCTV";
import Leaves_Permission from "./Leaves_Permission";
import QrCamera from "./Tabs/Camera";
import MaterialPass from "./MaterialPass";
import AddGatepass from "./utils/AddGatepass";
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
        name="Violation"
        component={ReportViolation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CCTV"
        component={CCTV}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen
        name="Violations"
        component={Violations}
        options={{ headerShown: false }}
      /> */}
      <Stack.Screen
        name="AddViolations"
        component={AddViolations}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Camera"
        component={QrCamera}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddVisitor"
        component={AddVisitor}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Material-Pass"
        component={MaterialPass}
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
        name="Visitors"
        component={VisitorsList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Create Pass"
        component={AddGatepass}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Leaves"
        component={Leaves_Permission}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Gate-Pass"
        component={GatePass}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
