import { Text, View } from "native-base";
import React, { useState } from "react";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Button, StyleSheet, TouchableOpacity } from "react-native";
export default function Camera() {
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  if (!permission) {
    return <View />;
  }
  if (!permission.granted) {
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
    <CameraView style={styles.camera} facing={facing}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
          <Text style={styles.text}>Flip Camera</Text>
        </TouchableOpacity>
      </View>
    </CameraView>
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
