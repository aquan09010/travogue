import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Pressable,
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { SvgXml } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import { ParkIconActive } from "@/Assets/Icons/Where";
import React, { useLayoutEffect, useState, useRef } from "react";
import {
  SearchIcon,
  ArrowLeft,
  ArrowLeftBlack,
  SearchIconBlack,
} from "@/Assets/Icons/Navigation";
import {
  CommentIcon,
  DotIcon,
  HeartIcon,
  LanguageIcon,
  MiniLocation1,
  MiniStar,
  ShareIcon,
} from "@/Assets/Icons/DetailIcon";
import { MiniLocation } from "@/Assets/Icons/Card";
import {
  AppleIcon,
  BoxCheckIcon,
  CalendarIcon,
  CashIcon,
  FailIcon,
  OrderIcon,
  PeopleIcon,
  SuccessIcon,
  TimeIcon,
  VisaIcon,
} from "@/Assets/Icons/OrderConfirm";
import { Dropdown } from "react-native-element-dropdown";
import { LocationDotIcon } from "@/Assets/Icons/LocationDot";
import { Video } from "expo-av";
import * as ImagePicker from "expo-image-picker";
import { AddCircleIcon, PictureIcon } from "@/Assets/Icons/Home";

const data = [
  { label: "Item 1", value: "1" },
  { label: "Item 2", value: "2" },
  { label: "Item 3", value: "3" },
  { label: "Item 4", value: "4" },
  { label: "Item 5", value: "5" },
  { label: "Item 6", value: "6" },
  { label: "Item 7", value: "7" },
  { label: "Item 8", value: "8" },
];
const options = [
  "Nghệ thuật và văn hoá",
  "Thể thao",
  "Lịch sử",
  "Ẩm thực",
  "Vận dộng",
  "Khác",
];
const imageExtensions = ["jpg", "jpeg", "png", "gif", "webp"];
const videoExtensions = ["mp4", "mov"];
export default function SetTicketPrice({ route }) {
  const navigation = useNavigation();
  const [city, setCity] = useState(null);
  const [selectedOption, setSelectedOption] = useState([]);
  const gotoHost = async (e) => {
    e.preventDefault();
    navigation.navigate("HostProfile");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.statusBar}>
        <Pressable onPress={() => navigation.goBack()}>
          <SvgXml xml={ArrowLeftBlack} />
        </Pressable>
        <Text style={styles.title}>Tạo mới trải nghiệm</Text>
        <Pressable onPress={() => {}}></Pressable>
      </View>
      <ScrollView
        style={{
          height: "100%",
          width: "100%",
          paddingVertical: 8,
          paddingHorizontal: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={[
              styles.title1,
              { paddingVertical: 8, paddingHorizontal: 10 },
            ]}
          >
            Chọn ngày và giờ
          </Text>
          <SvgXml style={{ alignSelf: "center" }} xml={AddCircleIcon} />
        </View>
        <View style={{ marginBottom: 90 }}></View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  mainView: {
    padding: 16,
    paddingBottom: 0,
  },
  container: {
    backgroundColor: "#fff",
  },
  statusBar: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
  title1: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
    textAlign: "left",
  },
  button: {
    top: 832,
    left: 261,
    backgroundColor: "#ed2939",
    borderColor: "#fff",
    paddingHorizontal: 16,
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 7,
    overflow: "hidden",
  },
});
