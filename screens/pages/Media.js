import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { ScrollView, Stack, Center, Wrap, HStack } from "native-base";

import { MaterialCommunityIcons } from "@expo/vector-icons/";

import v_1 from "../../assets/v_1.png";
import v_2 from "../../assets/v_2.png";
import v_3 from "../../assets/v_3.png";
import v_4 from "../../assets/v_1.png";
import VideocamImg from "../../assets/videocamImg.png";
import camImg from "../../assets/camImg.png";

export default function Media() {
  const [selectedImage, setSelectedImage] = useState(null);

  const handlePickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: [ImagePicker.MediaType.IMAGE],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };
  return (
    <SafeAreaProvider style={styles.container}>
      <SafeAreaView>
        <ScrollView>
          <View>
            <HStack
              space={6}
              alignItems={"center"}
              justifyContent={"center"}
              paddingVertical={10}
              mb={6}
            >
              <View
                borderColor="rgba(0,0,0,0.5)"
                borderStyle="solid"
                borderWidth={1}
                paddingVertical={10}
                paddingHorizontal={30}
                height={100}
                alignItems="center"
                style={{ borderRadius: 10, justifyContent: "space-between" }}
              >
                <Image borderStyle={"solid"} source={camImg} />
                <Text color={"rgba(0,0,0,0.5)"}>Take a photo</Text>
              </View>

              <View
                borderColor="rgba(0,0,0,0.5)"
                borderStyle="solid"
                borderWidth={1}
                paddingVertical={10}
                paddingHorizontal={30}
                alignItems="center"
                style={{ borderRadius: 10, justifyContent: "space-between" }}
                height={100}
              >
                <Image source={VideocamImg} />

                <Text color={"rgba(0,0,0,0.5)"}>Record a video</Text>
              </View>
            </HStack>
            <Stack space={5}>
              <Stack>
                <Text style={{ fontSize: 20, fontWeight: 600 }}>
                  Upload Photo
                </Text>

                <View paddingVertical={10}>
                  <Wrap space={4} flexDirection={"row"}>
                    <Center
                      width={100}
                      height={100}
                      borderColor={"#DBDBDB"}
                      borderStyle={"solid"}
                      borderWidth={1}
                      borderRadius="sm"
                      padding={4}
                      alignItems="center"
                    >
                      <TouchableOpacity
                        onPress={handlePickImage}
                        style={{ alignItems: "center" }}
                      >
                        {selectedImage ? (
                          <Image
                            source={{ uri: selectedImage }}
                            style={{
                              width: 50,
                              height: 50,
                              borderRadius: 10,
                            }}
                          />
                        ) : (
                          <>
                            <MaterialCommunityIcons
                              name="camera-plus-outline"
                              size={24}
                              color="black"
                            />
                            <Text fontSize="md" fontWeight={600}>
                              Add Photo
                            </Text>
                          </>
                        )}
                      </TouchableOpacity>
                    </Center>

                    {[v_1, v_2, v_3].map((source, index) => (
                      <Center
                        key={index}
                        width={100}
                        height={100}
                        borderColor={"#DBDBDB"}
                        borderStyle={"solid"}
                        borderWidth={1}
                        borderRadius={10}
                        justifyContent={"space-evenly"}
                      >
                        <Image
                          source={source}
                          alt="Alternate Text"
                          style={{
                            objectFit: "fill",
                            width: "100%",
                            height: "100%",
                            borderRadius: 10,
                          }}
                        />
                      </Center>
                    ))}
                  </Wrap>
                </View>
              </Stack>

              <Stack>
                <Text style={{ fontSize: 20, fontWeight: 600 }}>
                  Upload Video
                </Text>

                <View paddingVertical={10}>
                  <Wrap space={4} flexDirection={"row"}>
                    <Center
                      width={100}
                      height={100}
                      borderColor={"#DBDBDB"}
                      borderStyle={"solid"}
                      borderWidth={1}
                      borderRadius="sm"
                      padding={4}
                      alignItems="center"
                    >
                      <TouchableOpacity
                        onPress={handlePickImage}
                        style={{ alignItems: "center" }}
                      >
                        {selectedImage ? (
                          <Image
                            source={{ uri: selectedImage }}
                            style={{
                              width: 50,
                              height: 50,
                              borderRadius: 10,
                            }}
                          />
                        ) : (
                          <>
                            <MaterialCommunityIcons
                              name="video-vintage"
                              size={34}
                              color="black"
                            />
                            <Text fontSize="md" fontWeight={600}>
                              Add Video
                            </Text>
                          </>
                        )}
                      </TouchableOpacity>
                    </Center>

                    {[v_1, v_2, v_3, v_4].map((source, index) => (
                      <Center
                        key={index}
                        width={100}
                        height={100}
                        borderColor={"#DBDBDB"}
                        borderStyle={"solid"}
                        borderWidth={1}
                        borderRadius={10}
                        justifyContent={"space-evenly"}
                      >
                        <Image
                          source={source}
                          alt="Alternate Text"
                          style={{
                            objectFit: "fill",
                            width: "100%",
                            height: "100%",
                            borderRadius: 10,
                          }}
                        />
                      </Center>
                    ))}
                  </Wrap>
                </View>
              </Stack>
            </Stack>
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
  textAreaContainer: {
    position: "relative",
    width: "100%",
  },
  micIcon: {
    position: "absolute",
    right: 10,
    bottom: 10,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 8, // Optional, to give some spacing around the icon
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1, // Approximate to 40% opacity
    shadowRadius: 4,
    elevation: 10,
  },
  findEle: {
    borderColor: "#000",
    borderWidth: 1,
    borderStyle: "solid",
  },
  dotsContainer: {
    width: 60,
    padding: 10,
    marginTop: 16,
  },
});
