import { Text, View } from "native-base";
import React, { useState, useEffect } from "react";
import { CameraView, useCameraPermissions } from "expo-camera";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
export default function Camera() {
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  useEffect(() => {
    if (permission && !permission.granted) {
      requestPermission();
    }
  }, [permission, requestPermission]);
  if (!permission) {
    return <View />;
  }
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to open the camera
        </Text>
      </View>
    );
  }
  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }
  return (
    <CameraView style={styles.camera} facing={facing}>
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.flipButton}
          onPress={toggleCameraFacing}
        >
          <Ionicons name="sync-circle-outline" size={40} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.captureButton} onPress={() => {}}>
          <Ionicons name="camera-outline" size={40} color="black" />
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
    justifyContent: "center",
    alignItems: "center",
  },
  bottomContainer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  flipButton: {
    backgroundColor: "#ffff",
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 20,
  },
  captureButton: {
    backgroundColor: "#ffff",
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  captureText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
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
    padding: 5,
  },
});
