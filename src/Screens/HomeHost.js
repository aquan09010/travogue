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
} from "react-native";
import { SvgXml } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect, useState, useRef } from "react";
import SearchLocation from "@/Components/SearchLocation";
import CategoryTab from "@/Components/CategoryTab";
import WhereScreen from "./WhereScreen";
import EatScreen from "./EatScreen";
import PlaceScreen from "./PlaceScreen";
import ExperienceScreen from "./ExperienceScreen";
import { DATA } from "../Utils/data";
import AccommodationCard from "@/Components/AccomodationCard";
import { StarIcon } from "@/Assets/Icons/Card";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
const Tab = createMaterialTopTabNavigator();
import { Animated } from "react-native";
import { AddNewIcon, FilterHostIcon } from "@/Assets/Icons/Notification";

export default function HomeHost() {
  const navigation = useNavigation();
  const tabs = ["Đi đâu", "Ăn gì", "Ở đâu", "Trải Nghiệm"];
  const [selected, setSelected] = useState(0);
  const av = new Animated.Value(0);
  av.addListener(() => {
    return;
  });
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainView}>
        <View style={styles.flex}>
          <Text style={styles.title}>Tổ chức trải nghiệm mới</Text>
          <SvgXml xml={AddNewIcon} />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingTop: 10,
          }}
        >
          <Text style={styles.title}>Quản lý trải nghiệm</Text>
          <View style={styles.flex}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "600",
                fontFamily: "BeVNBold",
                textAlign: "center",
              }}
            >
              Đã tạo gần đây
            </Text>
            <SvgXml xml={FilterHostIcon} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  mainView: {
    padding: 16,
    marginTop: 10,
    paddingBottom: 0,
  },

  titleTab: {
    fontSize: 18,
    fontWeight: "600",
    color: "#767676",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingTop: 18,
    borderBottomWidth: 0.5,
    borderColor: "#767676",
  },
  line: {
    width: 35,
    height: 2,
    backgroundColor: "#151515",
    alignSelf: "center",
    marginTop: 9,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "BeVNBold",
  },
  flex: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
    paddingBottom: 16,
  },
});
