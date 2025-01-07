import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import {
  FormControl,
  ScrollView,
  Stack,
  Input,
  TextArea,
  Icon,
  IconButton,
  Pressable,
  useDisclose,
  Center,
  Box,
  Button,
  HStack,
  Wrap,
  Modal,
  Checkbox,
} from "native-base";
import { Actionsheet } from "native-base";
import {
  Feather,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons/";

import LoadingDots from "react-native-loading-dots";

import v_1 from "../../assets/v_1.png";
import v_2 from "../../assets/v_2.png";
import v_3 from "../../assets/v_3.png";
import mic from "../../assets/mic.png";
export default function ReportViolation() {
  const { isOpen, onOpen, onClose } = useDisclose();
  const [groupValues, setGroupValues] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);

  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const onLongPressMic = () => {
    console.log("mic", modalVisible);
    //  setSize(newSize);
    setModalVisible(!modalVisible);
  };

  const onSelectCheckbox = (values) => {
    setGroupValues([...values]);
  };

  // const [selectedImage, setSelectedImage] = useState(null);

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
            <FormControl>
              <Stack space={5}>
                <Stack>
                  <FormControl.Label
                    _text={{
                      fontSize: 20,
                      color: "#000",
                      fontWeight: 700,
                      marginBottom: 2,
                    }}
                  >
                    Vehicle Number
                  </FormControl.Label>
                  <Input
                    placeholder="Enter Vehicle number"
                    variant="filled"
                    bg="#F0F2F5"
                    p={3}
                    borderRadius="md"
                    width="100%"
                    fontSize={16}
                    _focus={{ bg: "#fff" }}
                    color={"#637587"}
                    type="text"
                  />
                </Stack>

                <Stack>
                  <FormControl.Label
                    _text={{
                      fontSize: 20,
                      color: "#000",
                      fontWeight: 700,
                      marginBottom: 2,
                    }}
                  >
                    Violation Category
                  </FormControl.Label>
                  <TouchableOpacity
                    onPress={onOpen}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      backgroundColor: "#F0F2F5",
                      padding: 14,
                      borderRadius: 4,
                    }}
                  >
                    <Text
                      style={{
                        color: "#637587",
                        fontSize: 16,
                        flex: 1,
                        // fontWeight: 300,
                      }}
                    >
                      Actionsheet
                    </Text>
                    <MaterialIcons
                      name="keyboard-arrow-down"
                      size={24}
                      color="#637587"
                      style={{ marginLeft: "auto" }}
                    />
                  </TouchableOpacity>
                  <Actionsheet isOpen={isOpen} onClose={onClose}>
                    <Actionsheet.Content alignItems="left" padding={6}>
                      <Box
                        w="100%"
                        h={60}
                        px={4}
                        justifyContent="center"
                        alignItems="center"
                        mb={4}
                      >
                        <Text style={{ fontSize: 24, fontWeight: "700" }}>
                          Violation Type
                        </Text>
                      </Box>

                      <Checkbox
                        value="test"
                        accessibilityLabel="Accident"
                        marginBottom={2}
                        color={"#007367"}
                      >
                        Accident
                      </Checkbox>
                      <Checkbox
                        value="test"
                        accessibilityLabel="Incorrect parking"
                        marginBottom={2}
                      >
                        Incorrect parking
                      </Checkbox>
                      <Checkbox
                        value="test"
                        accessibilityLabel="over speeding"
                        marginBottom={2}
                      >
                        over speeding
                      </Checkbox>
                      <Checkbox
                        value="test"
                        accessibilityLabel="Drunk & drive"
                        marginBottom={2}
                      >
                        Drunk & drive
                      </Checkbox>
                      <Checkbox
                        value="test"
                        accessibilityLabel="No Helmet"
                        marginBottom={2}
                      >
                        No Helmet
                      </Checkbox>
                      <Checkbox
                        value="test"
                        accessibilityLabel="Others"
                        marginBottom={2}
                      >
                        Others
                      </Checkbox>

                      <HStack w="100%" justifyContent="space-evenly" mt={4}>
                        <Button
                          flex={1}
                          mr={2}
                          backgroundColor={"#007367"}
                          onPress={onClose}
                        >
                          Submit
                        </Button>
                        <Button
                          flex={1}
                          ml={2}
                          variant="outline"
                          color={"#007367"}
                          onPress={onClose}
                        >
                          Cancel
                        </Button>
                      </HStack>
                    </Actionsheet.Content>
                  </Actionsheet>
                </Stack>

                <Stack>
                  <FormControl.Label
                    _text={{
                      fontSize: 20,
                      color: "#000",
                      fontWeight: 700,
                      marginBottom: 2,
                    }}
                  >
                    Comments
                  </FormControl.Label>
                  <View style={styles.textAreaContainer}>
                    <TextArea
                      h={40}
                      fontSize={16}
                      w="100%"
                      color={"#637587"}
                      bg="#F0F2F5"
                    />

                    <IconButton
                      colorScheme="#637587"
                      _icon={{
                        as: Feather,
                        name: "mic",
                      }}
                      style={styles.micIcon}
                      onPress={onLongPressMic}
                    />
                  </View>

                  <Modal
                    isOpen={modalVisible}
                    onClose={onLongPressMic}
                    size={"full"}
                  >
                    <Modal.Content maxH="300">
                      <Modal.CloseButton />
                      <Modal.Body padding={16} alignItems={"center"}>
                        <Image
                          source={mic}
                          alt={"mic"}
                          size={"sm"}
                          // borderRadius="md"
                          style={{ objectFit: "contain" }}
                        />
                        <View style={styles.dotsContainer}>
                          <LoadingDots
                            dots={3}
                            colors={["#BBE8DA", "#8BCBB7", "#007367"]}
                            bounceHeight={4}
                            size={10}
                          />
                        </View>
                        <Text
                          style={{
                            fontSize: 22,
                            marginTop: 10,
                            color: "#A58255",
                          }}
                        >
                          Speak
                        </Text>
                      </Modal.Body>
                    </Modal.Content>
                  </Modal>
                </Stack>

                <Stack>
                  <FormControl.Label
                    _text={{
                      fontSize: 20,
                      color: "#000",
                      fontWeight: 700,
                      marginBottom: 2,
                    }}
                  >
                    Upload Photo
                  </FormControl.Label>

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
              </Stack>
              <Pressable
                bg="#007367"
                mt={3}
                mb={10}
                borderRadius="md"
                width="100%"
                p={3}
                // onPress={navigationToViolation}
              >
                <Text
                  textAlign={"center"}
                  fontSize={40}
                  fontWeight={600}
                  // color={"#fff"}
                  style={{
                    color: "#fff",
                    fontWeight: 600,
                    fontSize: 20,
                    textAlign: "center",
                  }}
                >
                  Submit
                </Text>
              </Pressable>
            </FormControl>
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
