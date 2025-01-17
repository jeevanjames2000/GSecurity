import React, { useState } from "react";
import {
  Box,
  ScrollView,
  VStack,
  FormControl,
  Stack,
  Input,
  Button,
  TextArea,
  HStack,
  Text,
  Select,
  IconButton,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Keyboard } from "react-native";
export default function AddGatepass() {
  const navigation = useNavigation();
  const [passType, setPassType] = useState("");
  const [issuedTo, setIssuedTo] = useState("gitamEmployee");
  const [issuedBy, setIssuedBy] = useState(""); // we need to get this data from login user api data
  const [issuedFrom, setIssuedFrom] = useState(""); // we need to get this data from login user api data
  const [mobile, setMobile] = useState(""); // we need to get this data from login user api data
  // created on date also
  const [particulars, setParticulars] = useState([
    { id: 1, particular: "", qty: 0 },
  ]);
  const handleInputChange = (id, field, value) => {
    setParticulars((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };
  const addNewField = () => {
    setParticulars((prev) => [
      ...prev,
      { id: prev.length + 1, particular: "", qty: 0 },
    ]);
  };
  const removeField = (id) => {
    setParticulars((prev) =>
      prev.length > 1
        ? prev.filter((item) => item.id !== id || item.id === 1)
        : prev
    );
  };
  const handleSubmit = () => {};
  return (
    <Box flex={1} bg="#f5f5f5">
      {}
      <Box backgroundColor="#007367" paddingY="10" paddingX="4">
        <HStack
          alignItems="center"
          justifyContent="space-between"
          position="relative"
          top={5}
        >
          <Text
            fontSize={30}
            color="white"
            justifyContent={"center"}
            alignItems={"center"}
            fontWeight="bold"
            textAlign="center"
            flex={1}
          >
            Create Pass
          </Text>
          <Ionicons
            name="arrow-back"
            size={30}
            position="absolute"
            left={0}
            color="white"
            onPress={() => navigation.goBack()}
          />
        </HStack>
      </Box>
      <ScrollView>
        <Box px={4} py={4} bg={"#FBFBFB"}>
          <FormControl mb={4} isReadOnly>
            <FormControl.Label _text={{ fontSize: 16, fontWeight: "bold" }}>
              Pass Type
            </FormControl.Label>
            <Select
              selectedValue={passType}
              onValueChange={(value) => {
                setPassType(value);
              }}
              placeholder="Select Pass Type"
              bg="#ffff"
              fontSize={13}
              p={3}
              _selectedItem={{
                bg: "gray.200",
                endIcon: <Ionicons name="checkmark" size={20} color="black" />,
              }}
            >
              <Select.Item label="Returnable" value="returnable" />
              <Select.Item label="Non-Returnable" value="non-returnable" />
              <Select.Item label="Domestic Waste" value="domestic-waste" />
              <Select.Item
                label="Construction Waste/Scrap"
                value="construction-waste"
              />
            </Select>
          </FormControl>

          <VStack space={4}>
            <FormControl mb={4} isReadOnly>
              <FormControl.Label _text={{ fontSize: 16, fontWeight: "bold" }}>
                Issued to
              </FormControl.Label>
              <Select
                selectedValue={issuedTo}
                onValueChange={(value) => {
                  setIssuedTo(value);
                }}
                placeholder="Select Pass Type"
                bg="#ffff"
                fontSize={13}
                p={3}
                _selectedItem={{
                  bg: "gray.200",
                  endIcon: (
                    <Ionicons name="checkmark" size={20} color="black" />
                  ),
                }}
              >
                <Select.Item label="Gitam Employee" value="gitamEmployee" />
                <Select.Item label="Other" value="other" />
              </Select>
            </FormControl>

            <Stack>
              <FormControl.Label _text={{ fontSize: 16, fontWeight: "bold" }}>
                Receiver {issuedTo === "gitamEmployee" ? "EMPID" : "Name"}
              </FormControl.Label>
              <Input
                placeholder={`Enter ${
                  issuedTo === "gitamEmployee" ? "EMPID" : "Name"
                }`}
                bg="#ffff"
                p={3}
              />
            </Stack>
            <Stack>
              <FormControl.Label _text={{ fontSize: 16, fontWeight: "bold" }}>
                Receiver Mobile No
              </FormControl.Label>
              <Input placeholder="Enter Mobile Number" bg="#ffff" p={3} />
            </Stack>
            <Stack>
              <FormControl.Label _text={{ fontSize: 16, fontWeight: "bold" }}>
                Receiver Vehicle No
              </FormControl.Label>
              <Input placeholder="Enter Vehicle Number" bg="#ffff" p={3} />
            </Stack>
            <FormControl>
              <FormControl.Label _text={{ fontSize: 16, fontWeight: "bold" }}>
                Particulars
              </FormControl.Label>
              {particulars.map((item, index) => (
                <HStack key={item.id} space={3} alignItems="center" mb={2}>
                  <Input
                    placeholder={`Particular ${index + 1}`}
                    flex={2}
                    bg="#ffff"
                    value={item.particular}
                    p={3}
                    onChangeText={(text) =>
                      handleInputChange(item.id, "particular", text)
                    }
                  />
                  <Input
                    placeholder="Qty"
                    flex={1}
                    bg="#ffff"
                    p={3}
                    keyboardType="numeric"
                    value={item.qty}
                    onChangeText={(text) =>
                      handleInputChange(item.id, "qty", parseInt(text) || 0)
                    }
                  />
                  <HStack>
                    <IconButton
                      icon={
                        <Ionicons name="add-circle" size={24} color="green" />
                      }
                      onPress={addNewField}
                    />
                    {}
                    {particulars.length > 1 && (
                      <IconButton
                        icon={
                          <Ionicons
                            name="remove-circle"
                            size={24}
                            color="red"
                          />
                        }
                        onPress={() => removeField(item.id)}
                      />
                    )}
                  </HStack>
                </HStack>
              ))}
            </FormControl>
            <Stack>
              <FormControl.Label _text={{ fontSize: 16, fontWeight: "bold" }}>
                Remarks
              </FormControl.Label>
              <TextArea placeholder="Enter Remarks" bg="#ffff" />
            </Stack>
          </VStack>
          {}
          <HStack justifyContent="space-between" mt={4}>
            <Button
              flex={1}
              mr={2}
              bg="#007367"
              onPress={handleSubmit}
              _text={{ fontSize: 16, fontWeight: "bold" }}
            >
              Create
            </Button>
            <Button
              flex={1}
              bg="gray.400"
              onPress={() => navigation.goBack()}
              _text={{ fontSize: 16, fontWeight: "bold" }}
            >
              Cancel
            </Button>
          </HStack>
        </Box>
      </ScrollView>
    </Box>
  );
}
