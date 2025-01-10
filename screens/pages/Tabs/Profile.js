import { useNavigation } from "@react-navigation/native";
import {
  Box,
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
};

const studentPrivt = {
  Email: "jacob.west@gmail.com",
  Phone: "+1 202 555 0147",
};

export default function Profile() {
  const navigation = useNavigation();
  const studKeys = Object.keys(studentInfo);
  const studValeus = Object.values(studentInfo);

  const studPrivKeys = Object.keys(studentPrivt);
  const studPrivValeus = Object.values(studentPrivt);

  const navigationToViolation = () => {
    navigation.navigate("AddViolations");
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Center paddingBottom={10}>
          <Image
            source={{
              uri: "http://172.17.58.151:9000/auth/getImage/progfile_sec.jpg",
            }}
            alt="Alternate Text"
            size="xl"
            borderColor={"#007367"}
            borderWidth={4}
            borderRadius={"xl"}
            borderStyle={"solid"}
          />
        </Center>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <VStack space={1}>
            {[0, 1, 2, 3].map((each) => (
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
                  // borderColor={"#000"}
                  // borderWidth={"1"}
                  // borderStyle={"solid"}
                  paddingLeft={4}
                >
                  {studValeus[each]}
                </Text>
              </Box>
            ))}
          </VStack>

          <View marginTop={6} marginBottom={6}>
            <Text style={styles.head_1} marginBottom={5}>
              Private Information
            </Text>

            <VStack space={4}>
              {[0, 1].map((each) => (
                <Box key={each} flexDirection={"row"} alignItems={"center"}>
                  <Text width={"1/3"} paddingLeft={6} style={styles.privt_info}>
                    {studPrivKeys[each]}
                  </Text>
                  <Text width={"2/3"} style={styles.privt_info}>
                    {studPrivValeus[each]}
                  </Text>
                </Box>
              ))}
            </VStack>
          </View>

          <View marginBottom={6} padding={2}>
            <Text style={styles.head_2}>Violations</Text>

            <HStack space={2} justifyContent="center" height={120}>
              <Center
                width={"1/3"}
                borderColor={"#DBDBDB"}
                borderStyle={"solid"}
                borderWidth={"1"}
                borderRadius={"sm"}
                justifyContent={"space-evenly"}
              >
                <Text fontSize={"2xl"} fontWeight={"bold"}>
                  32
                </Text>
                <Text fontSize={"lg"} fontWeight={700}>
                  Violations
                </Text>
              </Center>
              <Center
                width={"1/3"}
                borderColor={"#DBDBDB"}
                borderStyle={"solid"}
                borderWidth={"1"}
                borderRadius={"sm"}
                justifyContent={"space-evenly"}
              >
                <Text fontSize={"2xl"} fontWeight={"bold"}>
                  19
                </Text>
                <Text fontSize={"lg"} fontWeight={700}>
                  Pending Fines
                </Text>
              </Center>
              <Center
                width={"1/3"}
                borderColor={"#DBDBDB"}
                borderStyle={"solid"}
                borderWidth={"1"}
                borderRadius={"sm"}
                justifyContent={"space-evenly"}
              >
                <Text fontSize={"2xl"} fontWeight={"bold"}>
                  07
                </Text>
                <Text fontSize={"lg"} fontWeight={700}>
                  Paid fines
                </Text>
              </Center>
            </HStack>
          </View>

          <Pressable
            bg="#007367"
            mb={10}
            borderRadius="md"
            width="100%"
            p={3}
            onPress={navigationToViolation}
          >
            <Text
              textAlign={"center"}
              fontSize={20}
              fontWeight={600}
              color={"#fff"}
            >
              Report a Violation
            </Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
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
  privt_info: {
    fontSize: 18,
    color: "#000",
    fontWeight: 500,
  },
});
