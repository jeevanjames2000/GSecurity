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
  Actionsheet,
  Box,
  Checkbox,
  HStack,
  Wrap,
  Center,
  IconButton,
} from "native-base";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather";
import LoadingDots from "react-native-loading-dots";
export default function ReportViolation() {
  const [isActionSheetOpen, setActionSheetOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedValues, setSelectedValues] = useState([]);
  const [vehicleNumber, setVehicleNumber] = useState("");
  const handlePickImages = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      selectionLimit: 5,
      quality: 1,
    });
    if (!result.canceled) {
      const newImages = result.assets.map((asset) => asset.uri);
      setSelectedImages((prevImages) => [...prevImages, ...newImages]);
    }
  };
  const handleDeleteImage = (index) => {
    setSelectedImages((prevImages) =>
      prevImages.filter((_, imgIndex) => imgIndex !== index)
    );
  };
  const CustomActionSheet = ({ isOpen, onClose, onSubmit, selectedValues }) => {
    const [tempSelectedValues, setTempSelectedValues] =
      useState(selectedValues);
    const handleCheckboxChange = (value) => {
      setTempSelectedValues((prev) =>
        prev.includes(value)
          ? prev.filter((item) => item !== value)
          : [...prev, value]
      );
    };
    const handleSubmit = () => {
      onSubmit(tempSelectedValues);
      onClose();
    };
    return (
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
              isChecked={tempSelectedValues.includes(label)}
              onChange={() => handleCheckboxChange(label)}
            >
              {label}
            </Checkbox>
          ))}
          <HStack w="100%" justifyContent="space-evenly" mt={4}>
            <Button
              flex={1}
              mr={2}
              backgroundColor="#007367"
              onPress={handleSubmit}
            >
              Submit
            </Button>
            <Button flex={1} ml={2} variant="outline" onPress={onClose}>
              Cancel
            </Button>
          </HStack>
        </Actionsheet.Content>
      </Actionsheet>
    );
  };
  const [comments, setComments] = useState("");
  const handleUploadImage = async () => {
    const formData = new FormData();
    selectedImages.forEach((imageUri, index) => {
      const image = {
        uri: imageUri,
        type: "image/jpeg",
        name: imageUri.split("/").pop(),
      };
      formData.append("images[]", image);
    });
    formData.append("vehicle_number", vehicleNumber);
    selectedValues.forEach((violation) => {
      formData.append("violationType[]", violation);
    });
    formData.append("comments", comments);
    try {
      const response = await fetch(
        "http://172.17.58.151:9000/auth/reportViolation",
        {
          method: "POST",
          body: formData,
          headers: {},
        }
      );
      const result = await response.json();
      if (response.status === 200) {
        setVehicleNumber("");
        setComments("");
        setSelectedImages("");
        setSelectedValues("");
      }
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };
  const UploadPhoto = ({ selectedImages, onPickImages, onDeleteImage }) => (
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
          height={90}
          borderColor="#DBDBDB"
          borderWidth={1}
          borderRadius="sm"
          padding={4}
        >
          <TouchableOpacity
            onPress={onPickImages}
            style={{ alignItems: "center" }}
          >
            <MaterialCommunityIcons
              name="camera-plus-outline"
              size={30}
              color="black"
            />
            <Text style={{ marginTop: 5, fontSize: 14 }}>Add Photo</Text>
          </TouchableOpacity>
        </Center>
      </Wrap>
      {}
      {selectedImages.length > 0 && (
        <View style={styles.galleryContainer}>
          <ScrollView horizontal>
            {selectedImages.map((imageUri, index) => (
              <View key={index} style={styles.imageWrapper}>
                <Image
                  source={{ uri: imageUri }}
                  alt={`Selected ${index}`}
                  style={styles.image}
                />
                <IconButton
                  icon={<Feather name="x-circle" size={25} color="white" />}
                  onPress={() => onDeleteImage(index)}
                  style={styles.deleteIcon}
                />
              </View>
            ))}
          </ScrollView>
        </View>
      )}
    </Stack>
  );
  const [placeholder, setPlaceholder] = useState("Select Violation Type");
  const handleActionSheetSubmit = (values) => {
    setSelectedValues(values);
    setPlaceholder(
      values.length > 0 ? values.join(", ") : "Select Violation Type"
    );
  };
  const handleSubmit = () => {
    handleUploadImage(selectedImages);
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <FormControl>
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
              value={vehicleNumber}
              onChangeText={setVehicleNumber}
              placeholder={"Vehicle Number"}
              variant="filled"
              bg="#F0F2F5"
              p={3}
              borderRadius="md"
              width="100%"
              fontSize={16}
              _focus={{ bg: "#fff" }}
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
              onPress={() => setActionSheetOpen(true)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#F0F2F5",
                padding: 14,
                borderRadius: 4,
              }}
            >
              <Text style={{ color: "#637587", fontSize: 16, flex: 1 }}>
                {selectedValues.length > 0
                  ? selectedValues.join(", ")
                  : "Select Violation Type"}
              </Text>
              <MaterialIcons
                name="keyboard-arrow-down"
                size={24}
                color="#637587"
                style={{ marginLeft: "auto" }}
              />
            </TouchableOpacity>
          </Stack>
          <CustomActionSheet
            isOpen={isActionSheetOpen}
            onClose={() => setActionSheetOpen(false)}
            selectedValues={selectedValues}
            onSubmit={handleActionSheetSubmit}
          />
          <Stack>
            <FormControl.Label
              _text={{
                fontSize: 20,
                color: "#000",
                fontWeight: "700",
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
                color="#637587"
                bg="#F0F2F5"
                value={comments}
                placeholder="Enter Violation Information"
                onChangeText={setComments}
              />
              <TouchableOpacity
                style={styles.micIcon}
                onPress={() => setModalOpen(true)}
              >
                <Feather name="mic" size={24} color="#637587" />
              </TouchableOpacity>
            </View>
            <Modal
              isOpen={isModalOpen}
              onClose={() => setModalOpen(false)}
              size="xl"
            >
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
          <UploadPhoto
            selectedImages={selectedImages}
            onPickImages={handlePickImages}
            onDeleteImage={handleDeleteImage}
          />
          <Button
            bg="#007367"
            mt={3}
            mb={10}
            borderRadius="md"
            width="100%"
            p={3}
            bottom={-40}
            onPress={handleSubmit}
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
  galleryContainer: {
    marginTop: 10,
    flexDirection: "row",
  },
  imageWrapper: {
    marginRight: 10,
    width: 100,
    height: 100,
    borderColor: "#DBDBDB",
    borderWidth: 1,
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  deleteIcon: {
    position: "absolute",
    top: -10,
    right: -10,
    borderRadius: 50,
  },
});
