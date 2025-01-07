import { Box, Image, Pressable, Text, View } from "native-base";
import React, { useState } from "react";
import Frame1 from "../../../assets/without-university-green.png";
import Frame from "../../../assets/Frame3281.jpg";
import { useNavigation } from "@react-navigation/native";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
// import { useState } from "react";
import { Button, StyleSheet, TouchableOpacity } from "react-native";

export default function Camera() {
  // const navigation = useNavigation();

  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }
  return (
    // <Box alignItems={"center"} bg={"#ddd"} h={"100%"}>
    //   <View>
    //     <Image
    //       source={Frame1}
    //       alt="Illustration"
    //       resizeMode="contain"
    //       style={{ height: 200, width: 200 }}
    //     />
    //   </View>
    //   <View mb={10}>
    //     <Image
    //       source={Frame}
    //       alt="Illustration"
    //       resizeMode="contain"
    //       size={"2xl"}
    //     />
    //   </View>

    //   <View w={"90%"}>
    //     <Pressable
    //       bg={"#007367"}
    //       alignItems={"center"}
    //       mb={3}
    //       p={2}
    //       onPress={() => navigation.navigate("Get Details")}
    //     >
    //       <Text fontSize={20} fontWeight={"bold"} color={"#fff"}>
    //         Get details
    //       </Text>
    //     </Pressable>

    //     <Pressable bg={"#fff"} alignItems={"center"} p={2}>
    //       <Text fontSize={20} fontWeight={"bold"}>
    //         Report a violation
    //       </Text>
    //     </Pressable>
    //   </View>
    // </Box>
    // <View style={styles.container}>
    <CameraView style={styles.camera} facing={facing}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
          <Text style={styles.text}>Flip Camera</Text>
        </TouchableOpacity>
      </View>
    </CameraView>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
