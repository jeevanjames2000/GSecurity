import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Box, HStack, Image, Pressable, Text, VStack } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

export default function Profile() {
  const navigation = useNavigation();
  const { profile, image } = useSelector((state) => state.auth);
  const studentInfo = profile?.stdprofile?.[0]
    ? {
        Name: profile.stdprofile[0].name || "N/A",
        Role: profile.role || "N/A",
        Department: profile.stdprofile[0].branch_code || "N/A",
        Email: profile.stdprofile[0].emailid || "N/A",
        Phone: profile.stdprofile[0].mobile || "N/A",
        Campus: profile.stdprofile[0].campus || "N/A",
      }
    : null;
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
          position={"fixed"}
          top={10}
        >
          <Image
            source={{ uri: image }}
            alt="Alternate Text"
            size="2xl"
            borderColor={"#007367"}
            borderWidth={4}
            borderRadius={"xl"}
            borderStyle={"solid"}
          />

          <VStack space={1} alignItems="flex-start">
            {[0, 1, 2, 3, 4, 5].map((each) => (
              <Box
                key={each}
                flexDirection="row"
                alignItems="flex-start"
                flexWrap="wrap"
                width="100%"
              >
                <Text
                  fontSize="lg"
                  width="40%"
                  paddingLeft={6}
                  fontWeight="bold"
                >
                  {studKeys[each]}:
                </Text>
                <Text
                  fontSize="lg"
                  width="60%"
                  color={
                    studKeys[each] === "Role"
                      ? "#007367"
                      : studKeys[each] === "Name"
                      ? "#000000"
                      : "#706F6F"
                  }
                  paddingLeft={2}
                  flexShrink={1}
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
