import React, { useState } from "react";

import {
  Badge,
  Box,
  Center,
  FormControl,
  HStack,
  Image,
  Input,
  Modal,
  Pressable,
  ScrollView,
  Stack,
  Text,
  TextArea,
  View,
  VStack,
} from "native-base";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import camImg from "../../assets/camImg.png";
import VideocamImg from "../../assets/videocamImg.png";
import { StyleSheet } from "react-native";

const studentInfo = {
  Name: "Jacob West",
  Visitor: "Employee",
  Host: "Ram",
  Department: "CATS",
};

const VisitorRegistration = () => {
  const img = require("../../assets/progfile_sec.jpg");
  const studKeys = Object.keys(studentInfo);
  const studValeus = Object.values(studentInfo);

  const [modalVisible, setModalVisible] = useState(false);

  const onLongPressMic = () => {
    setModalVisible(!modalVisible);
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
                <Image borderStyle={"solid"} source={camImg} alt="camera" />
                <Text color={"rgba(0,0,0,0.5)"}>Take a photo</Text>
              </View>
            </HStack>
          </View>
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
                    Full Name
                  </FormControl.Label>
                  <Input
                    placeholder="Enter Name"
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
                    Mobile Number
                  </FormControl.Label>
                  <Input
                    placeholder="Enter Mobile Number"
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
                    Host Name
                  </FormControl.Label>
                  <Input
                    placeholder="Name of the host"
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
                    Purpose
                  </FormControl.Label>
                  <TextArea
                    h={20}
                    placeholder="Enter Purpose"
                    bg="#F0F2F5"
                    p={3}
                    borderRadius="md"
                    width="100%"
                    fontSize={16}
                    color={"#637587"}
                    _focus={{
                      bgColor: "transparent",
                    }}
                  />
                </Stack>
              </Stack>
              <Pressable
                bg="#007367"
                mt={10}
                // mb={10}
                borderRadius="md"
                width="100%"
                onPress={onLongPressMic}
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

            <Modal
              isOpen={modalVisible}
              onClose={setModalVisible}
              size={"full"}
            >
              <Modal.Content>
                <Modal.CloseButton />
                <Modal.Body padding={10} alignItems={"center"}>
                  <Badge
                    colorScheme="success"
                    _text={{ fontSize: "lg" }}
                    marginBottom={"8"}
                    paddingLeft={"6"}
                    paddingRight={"6"}
                  >
                    Approved
                  </Badge>

                  <Center paddingBottom={10}>
                    <Image
                      source={img}
                      alt="Alternate Text"
                      size="md"
                      //   borderColor={"#007367"}
                      //   borderWidth={4}
                      borderRadius={"xl"}
                      //   borderStyle={"solid"}
                    />
                  </Center>

                  <VStack space={4}>
                    {[0, 1, 2, 3].map((each) => (
                      <Box
                        key={each}
                        flexDirection={"row"}
                        alignItems={"center"}
                      >
                        <Text fontSize={"xl"} width={"2/5"} textAlign={"left"}>
                          {studKeys[each]}
                        </Text>
                        <Text
                          fontSize={"xl"}
                          width={"3/5"}
                          color={
                            studKeys[each] === "Role"
                              ? "#007367"
                              : studKeys[each] === "Name"
                              ? "#000000"
                              : "#706F6F"
                          }
                          // borderColor={"#000"}
                          // borderWidth={"1"}
                          // borderStyle={"solid"}
                          paddingLeft={4}
                        >
                          {studValeus[each]}
                        </Text>
                      </Box>
                    ))}
                  </VStack>
                </Modal.Body>
              </Modal.Content>
            </Modal>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
});

export default VisitorRegistration;
