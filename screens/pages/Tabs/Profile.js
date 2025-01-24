import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import {
  Box,
  Button,
  Center,
  HStack,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
  VStack,
} from "native-base";
import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const studentInfo = {
  Name: "Jacob West",
  Role: "Student",
  Vehicle: "AP 39 CE 4585",
  Department: "CSE, Engineering",
  Email: "jacob@gmail.com",
  Phone: "+1 202 555 0147",
};

export default function Profile() {
  const navigation = useNavigation();

  const studKeys = Object.keys(studentInfo);
  const studValeus = Object.values(studentInfo);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    navigation.reset({
      index: 0,
      routes: [{ name: "Splash" }],
    });
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <VStack
          justifyContent={"space-between"}
          alignItems={"center"}
          paddingBottom={10}
          flex={1}
        >
          <Image
            source={{
              uri: "http://172.17.58.151:9000/auth/getImage/progfile_sec.jpg",
            }}
            alt="Alternate Text"
            size="2xl"
            borderColor={"#007367"}
            borderWidth={4}
            borderRadius={"xl"}
            borderStyle={"solid"}
          />

          <VStack space={1}>
            {[0, 1, 2, 3, 4, 5].map((each) => (
              <Box key={each} flexDirection={"row"} alignItems={"center"}>
                <Text fontSize={"lg"} width={"2/5"} paddingLeft={6}>
                  {studKeys[each]}
                </Text>
                <Text
                  fontSize={"lg"}
                  width={"3/5"}
                  color={
                    studKeys[each] === "Role"
                      ? "#007367"
                      : studKeys[each] === "Name"
                      ? "#000000"
                      : "#706F6F"
                  }
                  paddingLeft={4}
                >
                  {studValeus[each]}
                </Text>
              </Box>
            ))}
          </VStack>

          <Pressable
            bg="#007367"
            my={10}
            borderRadius="md"
            width="100%"
            p={3}
            alignItems="center"
            onPress={handleLogout}
          >
            <HStack alignItems="center" justifyContent="center" space={2}>
              <Text
                textAlign="center"
                fontSize={20}
                fontWeight={600}
                color="#fff"
              >
                Logout
              </Text>
              <Ionicons name="log-out-outline" size={20} color="white" />
            </HStack>
          </Pressable>
        </VStack>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  head_1: {
    color: "#000",
    fontWeight: 700,
    fontSize: 20,
  },
  head_2: {
    color: "#000",
    fontWeight: 700,
    fontSize: 22,
    marginBottom: 8,
  },
});
