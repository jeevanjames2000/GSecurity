import { Box, Image, Text, View } from "native-base";
import React from "react";

export default function GetDetails() {
  return (
    <View bg={"#fff"} h={"100%"}>
      <View alignItems={"center"}>
        <Image
          source={{
            uri: "http://172.17.58.151:9000/auth/getImage/Frame3281.jpg",
          }}
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
