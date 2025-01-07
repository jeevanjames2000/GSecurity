import React, { useState } from "react";
import { Box, Text, FlatList, Image, Pressable, VStack } from "native-base";
import { useNavigation } from "@react-navigation/native";
import Location from "../../../assets/location.jpg";
import Frame3821 from "../../../assets/Frame3281.jpg";
import violations from "../../../assets/violations.jpg";
import id from "../../../assets/id.jpg";
import pay from "../../../assets/pay1.jpg";
import emergency from "../../../assets/images1.jpg";
import Media from "../../../assets/image9(1).jpg";
import Gatepass from "../../../assets/vehicles(1).png";
import cctc from "../../../assets/cctv-camera-svgrepo-com1.jpg";
import disha from "../../../assets/45cb6fb47812abc6250c5602ef7a025a_icon1.jpg";
import Camera from "./Camera";

export default function Home() {
  const dummyData = [
    {
      name: "Face Recognition",
      img: Frame3821,
    },
    {
      name: "Navigation",
      img: Location,
    },
    {
      name: "Leaves_Permission",
      img: violations,
    },
    {
      name: "Visitor",
      img: id,
    },
    {
      name: "Report Violation",
      img: violations,
    },
    {
      name: "Fines",
      img: pay,
    },
    {
      name: "Emergency",
      img: emergency,
    },
    {
      name: "Disha",
      img: disha,
    },
    {
      name: "Parking",
      img: violations,
    },
    {
      name: "Cctv",
      img: cctc,
    },
    {
      name: "Gatepass",
      img: Gatepass,
    },
    {
      name: "Media",
      img: Media,
    },
  ];

  const navigation = useNavigation();
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleRoute = (item) => {
    if (item.name === "Face Recognition") {
      navigation.navigate({ name: "Camera" });
    } else {
      navigation.navigate({ name: item.name });
    }
    // console.log(item);
    // navigation.navigate({ name: item.name });
  };

  const renderItem = ({ item, index }) => (
    <Pressable
      onPressIn={() => setSelectedIndex(index)}
      onPressOut={() => setSelectedIndex(null)}
      onPress={() => handleRoute(item)}
      flex={1}
      margin="2"
    >
      <Box
        bg={selectedIndex === index ? "gray.200" : "white"}
        borderRadius="md"
        p="3"
        alignItems="center"
        shadow="2"
      >
        <Image
          source={item.img}
          alt={item.name}
          size={"sm"}
          borderRadius="md"
          style={{ objectFit: "contain" }}
        />
        <VStack mt="2" space="1" alignItems="left">
          <Text fontSize="sm" fontWeight="medium" color="black">
            {item.name}
          </Text>
        </VStack>
      </Box>
    </Pressable>
  );

  return (
    <Box flex={1} paddingTop={70}>
      <FlatList
        data={dummyData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        contentContainerStyle={{ paddingHorizontal: 8, paddingBottom: 80 }}
      />
    </Box>
  );
}
