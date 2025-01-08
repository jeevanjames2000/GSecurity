import { StyleSheet } from "react-native";
import { View, Text, HStack } from "native-base";

import React from "react";
import LoadingDots from "react-native-loading-dots";

export default function Leaves_Permission() {
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
        <View style={styles.dotsWrapper}>
          <LoadingDots
            dots={3}
            colors={["#007367", "#8BCBB7", "#BBE8DA"]}
            bounceHeight={3}
            size={10}
          />
        </View>
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
