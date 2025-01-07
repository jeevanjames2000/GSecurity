import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, Box, HStack, Text, VStack } from "native-base";

import { Avatar } from "native-base";

const HistoryCard = () => {
  return (
    <HStack
      bgColor={"#F0F4F8"}
      paddingY={"8"}
      paddingLeft={"4"}
      paddingRight={"2"}
      alignItems={"center"}
      justifyContent={"space-between"}
      borderRadius={"lg"}
      marginBottom={"3"}
    >
      <HStack space={"sm"}>
        <Avatar
          bg="green.500"
          alignSelf="center"
          size="lg"
          source={{
            uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
          }}
        >
          A
        </Avatar>

        <VStack>
          <Text fontSize={"lg"} fontWeight={"bold"}>
            Kelivin Fryimnk
          </Text>
          <Text fontSize={"sm"} fontWeight={"semibold"}>
            Tata Nexon
          </Text>
          <Text fontSize={"sm"} fontWeight={"semibold"}>
            AN: 78586932
          </Text>
        </VStack>
      </HStack>

      <Text fontSize={"lg"} fontWeight={"semibold"}>
        {"\u20B9"} 250.00
      </Text>
    </HStack>
  );
};

export default function Fines() {
  return (
    <SafeAreaProvider style={styles.container}>
      <SafeAreaView>
        <ScrollView>
          <View>
            <VStack space={"lg"} marginBottom={"8"}>
              <HStack justifyContent={"space-between"} space={"md"}>
                <Box
                  borderColor={"#DBE0E5"}
                  borderWidth={"1"}
                  padding={"5"}
                  width={"47%"}
                  borderRadius={"lg"}
                >
                  <Text fontSize={"lg"} fontWeight={"medium"}>
                    Total Fines Issued{" "}
                  </Text>
                  <Text fontSize={"xl"} fontWeight={"bold"}>
                    1,200{" "}
                  </Text>
                </Box>
                <Box
                  borderColor={"#DBE0E5"}
                  borderWidth={"1"}
                  padding={"5"}
                  width={"47%"}
                  borderRadius={"lg"}
                >
                  <Text fontSize={"lg"} fontWeight={"medium"}>
                    Pending Fines
                  </Text>
                  <Text fontSize={"xl"} fontWeight={"bold"}>
                    320
                  </Text>
                </Box>
              </HStack>
              <Box
                borderColor={"#DBE0E5"}
                borderWidth={"1"}
                padding={"5"}
                width={"full"}
                borderRadius={"lg"}
              >
                <Text fontSize={"lg"} fontWeight={"medium"}>
                  Paid Fines
                </Text>
                <Text fontSize={"xl"} fontWeight={"bold"}>
                  320
                </Text>
              </Box>
            </VStack>

            <View>
              <Text fontSize={"2xl"} fontWeight={"bold"} marginY={"4"}>
                History
              </Text>

              <HistoryCard />
              <HistoryCard />

              <HistoryCard />
              <HistoryCard />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
});
