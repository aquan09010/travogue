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
  CalendarIcon,
  OrderIcon,
  PeopleIcon,
  TimeIcon,
} from "@/Assets/Icons/OrderConfirm";
export default function OrderConfirm() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.statusBar}>
        <Pressable onPress={() => navigation.goBack()}>
          <SvgXml xml={ArrowLeftBlack} />
        </Pressable>
        <Text style={styles.title}>Xác nhận và thanh toán</Text>
        <Pressable onPress={() => {}}>
          <SvgXml xml={SearchIconBlack} />
        </Pressable>
      </View>
      <View style={styles.containerCard}>
        <Image
          style={styles.img}
          resizeMode="cover"
          source={require("../Assets/detail1.jpg")}
        />
        <View style={styles.orderCard}>
          <Text style={styles.textDetail}>
            Khám phá kiến trúc Kinh thành Huế
          </Text>
          <View style={[styles.line]}>
            <SvgXml xml={CalendarIcon} />
            <Text style={[styles.text]}> Th 7, 14 thg 10, 2023</Text>
          </View>
          <View style={[styles.line]}>
            <SvgXml xml={TimeIcon} />
            <Text style={[styles.text]}> 17:30 - 20:30</Text>
          </View>
          <View style={[styles.line]}>
            <SvgXml xml={PeopleIcon} />
            <Text style={[styles.text]}> 2 người lớn, 1 trẻ em, 1 em bé</Text>
          </View>
          <Pressable style={styles.line1} onPress={() => {}}>
            <Text style={{ alignSelf: "center", marginRight: 5 }}>
              <Text style={{ fontWeight: "600", fontSize: 16 }}>Host:</Text>
              <Text style={{ fontSize: 16 }}> Martin Nguyen</Text>
            </Text>
            <View style={[styles.avatar, styles.actionPadding]}>
              <Image
                style={styles.avaImg}
                resizeMode="cover"
                source={require("../Assets/ava1.jpg")}
              />
            </View>
          </Pressable>
        </View>
      </View>
      <View style={[styles.line]}>
        <SvgXml xml={OrderIcon} />
        <Text style={{ fontWeight: "600", fontSize: 16 }}>
          {" "}
          Nhập mã giảm giá
        </Text>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingTop: "10%",
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
  containerCard: {
    width: "100%",
    paddingHorizontal: 18,
    paddingVertical: 12,
    flexDirection: "row",
  },
  img: {
    borderRadius: 7,
    width: 130,
    height: 130,
  },
  orderCard: {
    marginLeft: 12,
    alignSelf: "stretch",
    flex: 1,
  },
  textDetail: {
    fontSize: 16,
    textAlign: "left",
    fontWeight: "600",
  },
  line: {
    flexDirection: "row",
    alignContent: "center",
    // height: 10,
    marginTop: 5,
  },
  line1: {
    flexDirection: "row",
    alignContent: "center",
    // height: 10,
    marginTop: 10,
  },
  avaImg: {
    height: 40,
    width: 40,
    borderRadius: 40 / 2,
  },
});
