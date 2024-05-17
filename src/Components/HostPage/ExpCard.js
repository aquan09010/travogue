import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Pressable,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { SvgXml } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect, useState, useRef } from "react";

export default function ExpCard() {
  const navigation = useNavigation();
  const [selectedOption, setSelectedOption] = useState([]);
  const gotoTicketSchedule = async (e) => {
    e.preventDefault();
    navigation.navigate("TicketSchedule");
  };
  return (
    <Pressable onPress={gotoTicketSchedule} style={styles.rectangleParent}>
      <Image
        style={styles.frameChild}
        resizeMode="cover"
        source={require("../../Assets/card1.jpg")}
      />
      <View style={styles.frameParent}>
        <View style={styles.wrapper}>
          <Text style={styles.text}>8:30 - 9:30</Text>
        </View>
        <Text style={[styles.khmPhKin, styles.khmPhKinSpaceBlock]}>
          Khám phá kiến trúc Kinh thành Huế
        </Text>
        <View style={[styles.usersParent, styles.khmPhKinSpaceBlock]}>
          <Text style={[styles.users, styles.usersClr]}>users</Text>
          <Text style={[styles.text1, styles.usersClr]}>9/10</Text>
        </View>
      </View>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  khmPhKinSpaceBlock: {
    marginTop: 6,
    alignSelf: "stretch",
  },
  usersClr: {
    color: "#767676",
    textAlign: "left",
  },
  frameChild: {
    borderRadius: 7,
    width: 90,
    height: 90,
  },
  text: {
    fontWeight: "700",
    fontFamily: "BeVietnamPro-Bold",
    color: "#ed2939",
    textAlign: "left",
    fontSize: 12,
    flex: 1,
  },
  wrapper: {
    alignSelf: "stretch",
    flexDirection: "row",
  },
  khmPhKin: {
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "BeVietnamPro-SemiBold",
    color: "#767676",
    textAlign: "left",
  },
  users: {
    fontFamily: "Font Awesome 6 Pro",
    fontSize: 12,
    color: "#767676",
  },
  text1: {
    fontFamily: "BeVietnamPro-Regular",
    marginLeft: 6,
    fontSize: 12,
    color: "#767676",
    flex: 1,
  },
  usersParent: {
    alignItems: "center",
    flexDirection: "row",
  },
  frameParent: {
    justifyContent: "center",
    marginLeft: 12,
    alignSelf: "stretch",
    flex: 1,
  },
  rectangleParent: {
    width: "100%",
    paddingHorizontal: 18,
    paddingVertical: 12,
    flexDirection: "row",
    flex: 1,
  },
});
