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
import { PictureIcon } from "@/Assets/Icons/Home";
import Swiper from "react-native-swiper";
import TicketCard from "@/Components/HostPage/TicketCard";

export default function TicketSchedule({ route }) {
  const navigation = useNavigation();
  const [selectedOption, setSelectedOption] = useState([]);
  const gotoSetTicket = async (e) => {
    e.preventDefault();
    navigation.navigate("SetTicketPriceScreen");
  };

  const data = [
    { label: "10:30 - 11:30", value: "1" },
    { label: "11:30 - 12:30", value: "2" },
    { label: "12:30 - 13:30", value: "3" },
    { label: "13:30 - 14:30", value: "4" },
    { label: "14:30 - 15:30", value: "5" },
    { label: "15:30 - 16:30", value: "6" },
    { label: "16:30 - 17:30", value: "7" },
    { label: "17:30 - 18:30", value: "8" },
  ];
  const [value, setValue] = useState(null);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.statusBar}>
        <Pressable onPress={() => navigation.goBack()}>
          <SvgXml xml={ArrowLeftBlack} />
        </Pressable>
        <Text style={styles.title}>Khám phá kiến trúc Kinh thành Huế</Text>
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
        <View style={[styles.frameParent, styles.frameParentFlexBox]}>
          <View style={[styles.frameGroup, styles.frameParentFlexBox]}>
            <View style={styles.frameParentFlexBox}>
              <Text style={[styles.calendar, styles.th714FlexBox]}>
                CALENDAR
              </Text>
              <Text style={[styles.th714, styles.th714FlexBox]}>
                2024-05-22
              </Text>
            </View>
            <Text style={[styles.check, styles.th714FlexBox]}>check</Text>
          </View>

          <Dropdown
            style={{
              width: 140,
              height: 40,
              borderRadius: 7,
              borderStyle: "solid",
              borderColor: "#1b1b1b",
              borderWidth: 1,
              padding: 8,
            }}
            placeholderStyle={[styles.th714, styles.th714FlexBox]}
            selectedTextStyle={[styles.th714, styles.th714FlexBox]}
            inputSearchStyle={[styles.th714, styles.th714FlexBox]}
            iconStyle={styles.iconStyle}
            data={data}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder=" Chọn giờ"
            searchPlaceholder="Search..."
            value={value}
            onChange={(item) => {
              setValue(item.value);
            }}
            renderLeftIcon={() => (
              <>
                <Text style={[styles.calendar, styles.th714FlexBox]}>
                  clock
                </Text>
              </>
            )}
          />
        </View>
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            paddingVertical: 10,
            paddingHorizontal: 10,
          }}
        >
          <Text style={styles.users}>users</Text>
          <Text
            style={{
              paddingLeft: 10,
              fontSize: 14,
              fontWeight: "600",
              fontFamily: "BeVietnamPro-SemiBold",
              color: "#ed2939",
              textAlign: "left",
            }}
          >
            9/10
          </Text>
        </View>
        <TicketCard />
        <TicketCard />
        <TicketCard />
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
  dropdown: {
    borderRadius: 7,
    borderStyle: "solid",
    borderColor: "#767676",
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  listKind: {
    width: "100%",
    flexWrap: "wrap",
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  option: {
    width: "auto",
    height: "auto",
    marginRight: 4,
    borderWidth: 1.5,
    borderRadius: 15,
    marginVertical: 4,
    alignItems: "center",
    borderStyle: "solid",
    paddingVertical: "1%",
    paddingHorizontal: "3%",
    justifyContent: "center",
  },
  optionText: {
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  image: {
    fontSize: 28,
    color: "#000",
    textAlign: "left",
  },
  imageParent: {
    borderRadius: 7,
    borderStyle: "solid",
    borderColor: "#767676",
    borderWidth: 1,
    flex: 1,
    width: "100%",
    height: 80,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
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
  frameParentFlexBox: {
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  th714FlexBox: {
    textAlign: "left",
    color: "#000",
  },
  calendar: {
    fontFamily: "Font Awesome 6 Pro",
    fontSize: 16,
    color: "#000",
  },
  th714: {
    fontSize: 12,
    fontFamily: "BeVietnamPro-Regular",
    marginLeft: 6,
  },
  check: {
    marginLeft: 8,
    fontFamily: "Font Awesome 6 Pro",
    fontSize: 16,
    color: "#000",
  },
  frameGroup: {
    borderRadius: 7,
    borderStyle: "solid",
    borderColor: "#1b1b1b",
    borderWidth: 1,
    padding: 8,
  },
  frameParent: {
    alignSelf: "stretch",
    flex: 1,
    width: "100%",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  dropdown: {
    width: 150,
    borderRadius: 7,
    borderStyle: "solid",
    borderColor: "#767676",
    borderWidth: 1,
  },
  users: {
    fontSize: 14,
    fontFamily: "Font Awesome 6 Pro",
    color: "#ed2939",
    textAlign: "left",
  },
});
