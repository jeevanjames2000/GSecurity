import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native";
import {
  FormControl,
  Stack,
  Input,
  Button,
  Modal,
  TextArea,
  Image,
  Spinner,
  Actionsheet,
  Box,
  Checkbox,
  HStack,
  Wrap,
  Center,
} from "native-base";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather";
import LoadingDots from "react-native-loading-dots";

export default function ReportViolation() {
  const [isActionSheetOpen, setActionSheetOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
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
  const CustomInput = ({ label, placeholder, type = "text", onPress }) => (
    <Stack>
      <FormControl.Label
        _text={{
          fontSize: 20,
          color: "#000",
          fontWeight: 700,
          marginBottom: 2,
        }}
      >
        {label}
      </FormControl.Label>
      {type === "select" ? (
        <TouchableOpacity
          onPress={onPress}
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#F0F2F5",
            padding: 14,
            borderRadius: 4,
          }}
        >
          <Text style={{ color: "#637587", fontSize: 16, flex: 1 }}>
            {placeholder}
          </Text>
          <MaterialIcons
            name="keyboard-arrow-down"
            size={24}
            color="#637587"
            style={{ marginLeft: "auto" }}
          />
        </TouchableOpacity>
      ) : (
        <Input
          placeholder={placeholder}
          variant="filled"
          bg="#F0F2F5"
          p={3}
          borderRadius="md"
          width="100%"
          fontSize={16}
          _focus={{ bg: "#fff" }}
          color="#637587"
        />
      )}
    </Stack>
  );

  const CustomActionSheet = ({ isOpen, onClose }) => (
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
        {[
          "Accident",
          "Incorrect parking",
          "Over speeding",
          "Drunk & drive",
          "No Helmet",
          "Others",
        ].map((label, index) => (
          <Checkbox
            key={index}
            value={label}
            accessibilityLabel={label}
            marginBottom={2}
          >
            {label}
          </Checkbox>
        ))}
        <HStack w="100%" justifyContent="space-evenly" mt={4}>
          <Button flex={1} mr={2} backgroundColor="#007367" onPress={onClose}>
            Submit
          </Button>
          <Button flex={1} ml={2} variant="outline" onPress={onClose}>
            Cancel
          </Button>
        </HStack>
      </Actionsheet.Content>
    </Actionsheet>
  );

  const CustomTextArea = ({ onMicPress, isModalOpen, onClose }) => (
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
        <TextArea h={40} fontSize={16} w="100%" color="#637587" bg="#F0F2F5" />
        <TouchableOpacity style={styles.micIcon} onPress={onMicPress}>
          <Feather name="mic" size={24} color="#637587" />
        </TouchableOpacity>
      </View>
      <Modal isOpen={isModalOpen} onClose={onClose} size="xl">
        <Modal.Content maxH="300">
          <Modal.CloseButton />
          <Modal.Body padding={16} alignItems="center">
            <View style={styles.dotsContainer}>
              <LoadingDots
                dots={3}
                colors={["#BBE8DA", "#8BCBB7", "#007367"]}
                bounceHeight={4}
                size={10}
              />
            </View>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </Stack>
  );

  const UploadPhoto = ({ selectedImage, onPickImage }) => (
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
      <Wrap
        space={4}
        style={{ alignItems: "center", justifyContent: "center" }}
        flexDirection="row"
      >
        <Center
          width={"100%"}
          height={60}
          borderColor="#DBDBDB"
          borderWidth={1}
          borderRadius="sm"
          padding={4}
        >
          <TouchableOpacity
            onPress={onPickImage}
            style={{ alignItems: "center" }}
          >
            {selectedImage ? (
              <Image
                source={{ uri: selectedImage }}
                style={{ width: 50, height: 50, borderRadius: 10 }}
              />
            ) : (
              <>
                <MaterialCommunityIcons
                  name="camera-plus-outline"
                  size={24}
                  color="black"
                />
                <Text>Add Photo</Text>
              </>
            )}
          </TouchableOpacity>
        </Center>
      </Wrap>
    </Stack>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <FormControl>
          <CustomInput
            label="Vehicle Number"
            placeholder="Enter Vehicle Number"
          />
          <CustomInput
            label="Violation Category"
            placeholder="Actionsheet"
            type="select"
            onPress={() => setActionSheetOpen(true)}
          />
          <CustomActionSheet
            isOpen={isActionSheetOpen}
            onClose={() => setActionSheetOpen(false)}
          />
          <CustomTextArea
            onMicPress={() => setModalOpen(true)}
            isModalOpen={isModalOpen}
            onClose={() => setModalOpen(false)}
          />
          <UploadPhoto
            selectedImage={selectedImage}
            onPickImage={handlePickImage}
          />
          <Button
            bg="#007367"
            mt={3}
            mb={10}
            bottom={-70}
            borderRadius="md"
            width="100%"
            p={3}
          >
            <Text
              style={{
                color: "#fff",
                fontWeight: 600,
                fontSize: 20,
                textAlign: "center",
              }}
            >
              Submit
            </Text>
          </Button>
        </FormControl>
      </ScrollView>
    </SafeAreaView>
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
  dotsContainer: {
    width: 60,
    padding: 10,
    marginTop: 16,
  },
  micIcon: {
    position: "absolute",
    right: 10,
    bottom: 10,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
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
