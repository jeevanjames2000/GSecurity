import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  HStack,
  Input,
  VStack,
  Badge,
  KeyboardAvoidingView,
  ScrollView,
  Image,
  Skeleton,
} from "native-base";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const leaves = [
  {
    name: "John Doe",
    id: "#ID001",
    status: "Check-In",
    time: "10:00 AM",
    date: "24 Jan 2025",
  },
  {
    name: "Jane Smith",
    id: "#ID002",
    status: "Checked-Out",
    time: "12:30 PM",
    date: "24 Jan 2025",
  },
  {
    name: "Ram",
    id: "#ID002",
    status: "Check-In",
    time: "12:30 PM",
    date: "24 Jan 2025",
  },
  {
    name: "Jeevan",
    id: "#ID006",
    status: "Check-In",
    time: "1:30 PM",
    date: "24 Jan 2025",
  },
  {
    name: "Naidu",
    id: "#ID008",
    status: "Checked-Out",
    time: "2:30 PM",
    date: "24 Jan 2025",
  },
];

export default function Leaves_Permission() {
  const navigation = useNavigation();
  const [search, setSearch] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(false); // New state for loading

  const handleSearch = () => {
    if (search.trim() !== "") {
      setLoadingProfile(true); // Show loading skeleton
      setTimeout(() => {
        setShowProfile(true); // Show profile after 2 seconds
        setLoadingProfile(false); // Hide skeleton
      }, 2000); // Simulating 2-second delay
    }
  };

  const handleClear = () => {
    setSearch("");
    setShowProfile(false); // Hide profile when search is cleared
    setLoadingProfile(false); // Hide skeleton
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <Box flex={1}>
        <Box backgroundColor="#007367" paddingY="3" paddingX="4">
          <HStack
            alignItems="center"
            justifyContent="space-between"
            position="relative"
            top={10}
            px={1}
          >
            <Ionicons
              name="arrow-back"
              size={30}
              color="white"
              onPress={() => navigation.goBack()}
            />
            <Text
              fontSize={30}
              color="white"
              fontWeight="bold"
              textAlign="center"
              flex={1}
            >
              Leaves
            </Text>
          </HStack>

          <HStack
            backgroundColor="white"
            borderRadius="20"
            alignItems="center"
            paddingX="4"
            paddingY="4"
            mt="4"
            shadow="2"
            top={50}
          >
            <Input
              flex={1}
              placeholder="Registration Number"
              variant="unstyled"
              fontSize="md"
              value={search}
              onChangeText={(value) => setSearch(value)}
            />
            <HStack space={3}>
              {search !== "" && (
                <Ionicons
                  name="close-circle-outline"
                  size={26}
                  color="black"
                  onPress={handleClear}
                />
              )}
              <Pressable>
                <Ionicons
                  name="search-outline"
                  size={26}
                  color="black"
                  onPress={handleSearch}
                />
              </Pressable>
            </HStack>
          </HStack>
        </Box>

        <ScrollView flex={1} mt={"10"} p={"4"}>
          {loadingProfile ? (
            <ProfileSkeleton />
          ) : showProfile ? (
            <Profile />
          ) : (
            <ListOfApprovals />
          )}
        </ScrollView>
      </Box>
    </KeyboardAvoidingView>
  );
}

function ListOfApprovals() {
  return (
    <Box>
      <Text fontSize={"lg"} color={"#706F6F"} mb={"4"}>
        Leave Approvals
      </Text>
      <Box
        backgroundColor="white"
        borderRadius="10"
        shadow="3"
        px={"4"}
        pt="6"
        pb="4"
      >
        {leaves.map((item, index) => (
          <HStack
            key={index}
            backgroundColor="#f0f0f0"
            px={"4"}
            py="2"
            mb="4"
            justifyContent="space-between"
            alignItems="center"
          >
            <VStack>
              <Text fontSize="md" fontWeight="bold">
                {item.name}
              </Text>
              <Text fontSize="sm" color="gray.500">
                {item.id}
              </Text>
            </VStack>
            <VStack alignItems="flex-end">
              <Text
                fontSize="md"
                fontWeight="bold"
                color={item.status === "Check-In" ? "green.600" : "red.600"}
              >
                {item.status}
              </Text>
              <Text fontSize="sm" color="gray.500">
                {item.time}, {item.date}
              </Text>
            </VStack>
          </HStack>
        ))}
      </Box>
    </Box>
  );
}

function ProfileSkeleton() {
  return (
    <Box
      padding="6"
      shadow="9"
      bg={"#fff"}
      borderRadius={"xl"}
      minWidth={"sm"}
      maxWidth={"sm"}
      mt="1"
      mb="1"
    >
      <HStack space={"lg"}>
        <Skeleton height="100px" width="100px" borderRadius="xl" />
        <VStack space={"2"}>
          <Skeleton height="20px" width="120px" />
          <Skeleton height="16px" width="100px" />
          <Skeleton height="14px" width="80px" />
        </VStack>
      </HStack>

      {/* Profile Information Skeleton */}
      <VStack space={1.5} marginTop={"6"}>
        <Skeleton height="20px" width="100%" />
        <Skeleton height="20px" width="100%" />
        <Skeleton height="20px" width="100%" />
        <Skeleton height="20px" width="100%" />
        <Skeleton height="20px" width="100%" />
      </VStack>

      {/* Divider Skeleton */}
      <Box height="1" backgroundColor="#f0f0f0" my="6" />

      {/* Approval Information Skeleton */}
      <VStack space={1.5}>
        <Skeleton height="20px" width="100%" />
        <Skeleton height="20px" width="100%" />
        <Skeleton height="20px" width="100%" />
        <Skeleton height="20px" width="100%" />
      </VStack>

      {/* Buttons Skeleton */}
      <HStack
        justifyContent="space-between"
        space={4}
        mt={4}
        alignItems="center"
        width="100%"
      >
        <Skeleton height="40px" width="45%" />
        <Skeleton height="40px" width="45%" />
      </HStack>
    </Box>
  );
}

function Profile() {
  const profileData = [
    { key: "Batch", value: "2023-2027" },
    { key: "Email", value: "johndoe@example.com" },
    { key: "Parent/Guardian", value: "Jane Doe" },
    { key: "Parent Contact", value: "+9876543210" },
    { key: "Branch", value: "Computer Science" },
    { key: "Type", value: "Full-Time" },
    { key: "Status", value: "Active" },
  ];

  const approvalData = [
    { key: "Approved By", value: "Faculty Name" },
    { key: "Type", value: "Leave" },
    { key: "Time", value: "10:00 AM" },
    { key: "Status", value: "Approved" },
  ];

  return (
    <Box
      padding="6"
      shadow="9"
      bg={"#fff"}
      borderRadius={"xl"}
      minWidth={"sm"}
      maxWidth={"sm"}
      mt="1"
      mb="1"
    >
      <HStack space={"lg"}>
        <Image
          source={{
            uri: "http://172.17.58.151:9000/auth/getImage/progfile_sec.jpg",
          }}
          alt="Profile Image"
          size="lg"
          borderRadius="xl"
        />
        <VStack space={"2"}>
          <Text color={"#007367"} fontWeight={"bold"} fontSize="lg">
            John Doe
          </Text>
          <Text fontWeight={"semibold"} fontSize="md">
            Student
          </Text>
          <HStack
            justifyContent={"space-between"}
            alignItems={"center"}
            space={2}
          >
            <Text fontWeight={"semibold"} fontSize="md">
              785489654
            </Text>
            <Badge colorScheme="success" _text={{ fontSize: "md" }}>
              Active
            </Badge>
          </HStack>
        </VStack>
      </HStack>
      {/* Profile Information */}
      <VStack space={1.5} marginTop={"6"}>
        {profileData.map((item, index) => (
          <Box
            key={index}
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Text fontSize={"md"}>{item.key}</Text>
            <Text fontSize={"md"} color="#706F6F" paddingLeft={4}>
              {item.value || "Not available"}
            </Text>
          </Box>
        ))}
      </VStack>
      {/* Divider */}
      <Box height="1" backgroundColor="#f0f0f0" my="6" />
      {/* Approval Information */}
      <VStack space={1.5}>
        {approvalData.map((item, index) => (
          <Box
            key={index}
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Text fontSize={"md"}>{item.key}</Text>
            <Text fontSize={"md"} color="#706F6F" paddingLeft={4}>
              {item.value || "Not available"}
            </Text>
          </Box>
        ))}
      </VStack>
      {/* Buttons */}

      <HStack
        justifyContent="space-between"
        space={4}
        mt={4}
        alignItems="center"
        width="100%"
      >
        <Pressable
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
            Check In
          </Text>
        </Pressable>
        <Pressable
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
            Check Out
          </Text>
        </Pressable>
      </HStack>
    </Box>
  );
}
