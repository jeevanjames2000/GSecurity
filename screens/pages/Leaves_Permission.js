import { StyleSheet } from "react-native";
import { View, Text, HStack } from "native-base";

import React from "react";

export default function () {
  return (
    <View style={styles.maincontainer}>
      <HStack>
        <Text
          fontSize={"3xl"}
          fontWeight={"bold"}
          color={"#007367"}
          marginBottom={"4"}
        >
          Coming Soon
        </Text>
      </HStack>
    </View>
  );
}

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  dotsWrapper: {
    width: 40,
    justifyContent: "center",
  },
});
