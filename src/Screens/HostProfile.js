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
import { ArrowLeftBlack, SearchIconBlack } from "@/Assets/Icons/Navigation";
import {
  CalendarIcon,
  PeopleIcon,
  TimeIcon,
} from "@/Assets/Icons/OrderConfirm";
import { LanguageIcon } from "@/Assets/Icons/DetailIcon";
import {
  LanguageBlackIcon,
  ListBlackIcon,
  StarBlackIcon,
} from "@/Assets/Icons/Proflie";
export default function HostProfile() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.statusBar}>
        <Pressable onPress={() => navigation.goBack()}>
          <SvgXml xml={ArrowLeftBlack} />
        </Pressable>
        <Text style={styles.title}>Người tổ chức</Text>
        <Pressable onPress={() => {}}>
          <SvgXml xml={SearchIconBlack} />
        </Pressable>
      </View>
      <ScrollView style={{}}>
        <View style={styles.containerCard}>
          <View>
            <View style={{ paddingBottom: 10 }}>
              <Image
                style={styles.avatar}
                resizeMode="cover"
                source={require("../Assets/ava1.jpg")}
              />
            </View>
            <View style={[styles.button1]}>
              <Text style={{ color: "#fff", textAlign: "center" }}>
                Xem Hồ sơ
              </Text>
            </View>
          </View>
          <View style={styles.orderCard}>
            <Text style={[styles.textDetail, { paddingBottom: 5 }]}>
              Martin Nguyen
            </Text>
            <Text style={(styles.line, styles.textDetail)}>
              12 thành phố, 64 trải nghiệm
            </Text>
            <Text style={{ paddingTop: 5 }}>
              6 năm: tổ chức trải nghiệm trên Travogue từ 2017
            </Text>
            <View style={[styles.line, { alignItems: "center" }]}>
              <SvgXml xml={LanguageBlackIcon} />
              <Text style={[styles.text]}>
                {" "}
                Tiếng Việt, Tiếng Anh, Tiếng Trung
              </Text>
            </View>
            <View style={[styles.line]}>
              <SvgXml xml={ListBlackIcon} />
              <Text style={[styles.text]}>
                {" "}
                Chụp hình, quay phim, lái mô tô, lái ô tô
              </Text>
            </View>
            <View style={[styles.line]}>
              <SvgXml xml={StarBlackIcon} />
              <Text style={[styles.text]}> 4.5</Text>
            </View>
          </View>
        </View>
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
  containerCard: {
    width: "100%",
    paddingHorizontal: 18,
    paddingVertical: 12,
    flexDirection: "row",
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
    paddingTop: 10,
    alignItems: "center",
  },
  line1: {
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    // height: 10,
  },
  avatar: {
    height: 130,
    width: 130,
    borderRadius: 130 / 2,
  },
  button1: {
    borderRadius: 7,
    backgroundColor: "#ed2939",
    borderColor: "#fff",
    paddingVertical: 10,
    width: 100,
    alignSelf: "center",
  },
});
