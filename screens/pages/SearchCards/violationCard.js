import React from "react";
import { Box, Text, Image, HStack, VStack, Badge, View } from "native-base";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { wrap } from "lodash";
export default function ViolationsCard() {
  const { isLoading, cardData, image, noProfile, profile } = useSelector(
    (state) => state.home
  );
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const handleShowViolations = () => {
    navigation.navigate("AddViolations");
  };
  if (noProfile) {
    return (
      <View justifyContent="center" alignItems="center">
        <Text fontSize={18}>No results found.</Text>
      </View>
    );
  }
  return (
    <Box padding="6" shadow="9" bg={"#fff"} borderRadius={"xl"}>
      <HStack space={"lg"}>
        <Image
          source={{
            uri: image,
          }}
          alt="Profile Image"
          size="lg"
          borderRadius="xl"
        />
        <VStack space={"2"}>
          <Text color={"#007367"} fontWeight={"bold"} fontSize="lg">
            {profile?.stdprofile?.[0]?.name || "Name not available"}
          </Text>
          <Text fontWeight={"semibold"} fontSize="md">
            {profile?.role || "Role not available"}
          </Text>
          <HStack
            justifyContent={"space-between"}
            alignItems={"center"}
            space={2}
            flexWrap={wrap}
          >
            <Text fontWeight={"semibold"} fontSize="md">
              {profile?.stdprofile?.[0]?.regdno || " not available"}
            </Text>
            <Badge
              colorScheme={
                profile?.stdprofile?.[0]?.status === "A" ? "success" : "error"
              }
              _text={{ fontSize: "md" }}
              borderRadius={5}
            >
              {profile?.stdprofile?.[0]?.status === "A" ? "Active" : "Inactive"}
            </Badge>
          </HStack>
        </VStack>
      </HStack>
      <VStack space={1.5} marginTop={"6"}>
        {[
          { key: "Role", value: profile?.role },
          { key: "Batch", value: profile?.stdprofile?.[0]?.batch },
          {
            key: "Email",
            value: profile?.stdprofile?.[0]?.emailid,
          },
          {
            key: "Mobile",
            value: profile?.stdprofile?.[0]?.mobile,
          },
        ].map((item, index) => (
          <Box
            key={index}
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Text fontSize={"md"}>{item.key}</Text>
            <Text
              fontSize={"md"}
              color={
                item.key === "Role"
                  ? "#007367"
                  : item.key === "Name"
                  ? "#000000"
                  : "#706F6F"
              }
              paddingLeft={4}
            >
              {item?.value || "Not available"}
            </Text>
          </Box>
        ))}
      </VStack>
      <HStack
        justifyContent="space-between"
        space={4}
        mt={4}
        alignItems="center"
        width="100%"
      >
        <Pressable
          onPress={handleShowViolations}
          style={{
            borderWidth: 1,
            borderColor: "#37474F",
            borderRadius: 20,
            paddingVertical: 10,
            paddingHorizontal: 15,
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
            marginRight: 8,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: "#37474F",
            }}
          >
            Violations {cardData?.length || 0}
          </Text>
        </Pressable>
        <Pressable
          onPress={handleShowViolations}
          style={{
            backgroundColor: "#007367",
            borderRadius: 20,
            paddingVertical: 10,
            paddingHorizontal: 15,
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "#fff",
            }}
          >
            Add Violation
          </Text>
        </Pressable>
      </HStack>
    </Box>
  );
}
