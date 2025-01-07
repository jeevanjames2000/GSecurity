import { Box, Image, Text, View } from "native-base";
import React from "react";
import Frame from "../../../assets/Frame3281.jpg";

export default function GetDetails() {
  return (
    <View bg={"#fff"} h={"100%"}>
      <View alignItems={"center"}>
        <Image
          source={Frame}
          alt="Illustration"
          resizeMode="contain"
          size={"md"}
        />
      </View>
      <Box>
        <View flexDirection={"row"}>
          <Text>Name:</Text>
          <Text>Jacob West</Text>
        </View>
      </Box>
    </View>
  );
}
