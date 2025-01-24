import {
  Badge,
  Box,
  HStack,
  Image,
  Pressable,
  VStack,
  Text,
  Center,
} from "native-base";

export default function VisitorDetailsCard() {
  const visitorData = [
    { key: "Visitor Name", value: "Alice Brown" },
    { key: "Contact", value: "+1 123 456 7890" },
    { key: "Visit Purpose", value: "Meeting with Faculty" },
    { key: "Check-In Time", value: "9:30 AM" },
    { key: "Check-Out Time", value: "Pending" },
    { key: "Status", value: "In Progress" },
    { key: "To Meet", value: "Dr. John Smith (Faculty)" }, // Added
  ];

  const requestData = [
    { key: "Requested By", value: "Jane Doe (Admin)" }, // Added
    { key: "Requester Contact", value: "+1 987 654 3210" }, // Added
  ];

  return (
    <Center>
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
        {/* Visitor Profile Section */}
        <HStack space={"lg"} alignItems={"center"}>
          <Image
            source={{
              uri: "http://172.17.58.151:9000/auth/getImage/progfile_sec.jpg", // Replace with visitor image URL
            }}
            alt="Visitor Image"
            size="lg"
            borderRadius="xl"
          />
          <VStack space={"2"}>
            <Text color={"#007367"} fontWeight={"bold"} fontSize="lg">
              Alice Brown
            </Text>
            <Text fontWeight={"semibold"} fontSize="md">
              Visitor
            </Text>
            <HStack alignItems={"center"} space={2}>
              <Badge colorScheme="info" _text={{ fontSize: "md" }}>
                Active Visitor
              </Badge>
            </HStack>
          </VStack>
        </HStack>

        {/* Visitor Details */}
        <VStack space={1.5} marginTop={"6"}>
          {visitorData.map((item, index) => (
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

        {/* Request Details */}
        <VStack space={1.5}>
          {requestData.map((item, index) => (
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

        {/* Buttons Section */}
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
              Mark Exit
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
              Cancel Visit
            </Text>
          </Pressable>
        </HStack>
      </Box>
    </Center>
  );
}
