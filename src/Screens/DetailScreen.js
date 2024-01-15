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
} from "react-native";
import { SvgXml } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import { ParkIconActive } from "@/Assets/Icons/Where";
import React, { useLayoutEffect, useState, useRef } from "react";
import { SearchIcon, ArrowLeft } from "@/Assets/Icons/Navigation";
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
export default function DetailScreen() {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  const goToOrder = async (e) => {
    e.preventDefault();
    navigation.navigate("OrderConfirm");
  };
  const gotoHost = async (e) => {
    e.preventDefault();
    navigation.navigate("HostProfile");
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../Assets/detail1.jpg")}
        style={styles.image}
      >
        <View style={styles.mainView}>
          <View style={styles.statusBar}>
            <Pressable onPress={() => navigation.goBack()}>
              <SvgXml xml={ArrowLeft} />
            </Pressable>
            <Pressable onPress={() => {}}>
              <SvgXml xml={SearchIcon} />
            </Pressable>
          </View>
        </View>
        <View style={styles.actionContainer}>
          <Pressable
            onPress={gotoHost}
            style={[styles.avatar, styles.actionPadding]}
          >
            <Image
              style={styles.avaImg}
              resizeMode="cover"
              source={require("../Assets/ava1.jpg")}
            />
          </Pressable>
          <Pressable style={styles.actionPadding}>
            <SvgXml xml={HeartIcon} />
          </Pressable>
          <Pressable style={[styles.actionPadding, styles.extraLine]}>
            <SvgXml xml={CommentIcon} />
            <Text style={styles.text}>120</Text>
          </Pressable>
          <Pressable style={[styles.actionPadding, styles.extraLine]}>
            <SvgXml xml={ShareIcon} />
            <Text style={styles.text}>120</Text>
          </Pressable>
        </View>
        <Pressable style={styles.buttonTicket}>
          <Text style={styles.textDetail}>Từ 12$/người</Text>
          <Pressable style={styles.button} onPress={goToOrder}>
            <Text style={[styles.textDetail]}>Đặt ngay</Text>
          </Pressable>
        </Pressable>
        <View style={styles.detailContainer}>
          <View style={styles.topWrapper}>
            <Text style={[styles.textDetail]}>Top trải nghiệm</Text>
          </View>
          <View>
            <Text style={[styles.title]}>
              Khám phá kiến trúc Kinh thành Huế
            </Text>
            <View style={[styles.container1]}>
              <View style={[styles.line]}>
                <SvgXml xml={MiniStar} />
                <Text style={[styles.text]}>4.9</Text>
              </View>
              <View style={[styles.line]}>
                <SvgXml xml={MiniLocation1} />
                <Text style={[styles.text]}>Huế</Text>
              </View>
            </View>
            <View style={[styles.frameContainer, styles.frameParentShadowBox]}>
              <View style={styles.wrapperSpaceBlock}>
                <Text style={[styles.textTag]}>Nghệ thuật</Text>
              </View>
              <View style={[styles.lchSWrapper, styles.wrapperSpaceBlock]}>
                <Text style={[styles.textTag]}>Lịch sử</Text>
              </View>
              <View style={[styles.lchSWrapper, styles.wrapperSpaceBlock]}>
                <Text style={[styles.textTag]}>Văn hoá</Text>
              </View>
            </View>
            <View style={[styles.line]}>
              <SvgXml xml={LanguageIcon} />
              <Text style={[styles.languageBorder]}>
                Tiếng Anh, Tiếng Trung, Tiếng Việt
              </Text>
            </View>
          </View>
          <Text style={styles.textDetail}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            blandit velit erat. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Vestibulum blandit velit erat. Lorem ipsum dolor
            sit amet, consectetur adipiscing elit. Vestibulum blandit velit erat
            ... Xem chi tiết
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
  mainView: {
    padding: 16,
    paddingBottom: 0,
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
  actionContainer: {
    top: 400,
    left: 360,
    alignItems: "center",
    position: "absolute",
  },
  actionPadding: {
    paddingBottom: 15,
  },
  extraLine: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
    color: "#fff",
    fontSize: 12,
  },
  avaImg: {
    height: 40,
    width: 40,
    borderRadius: 40 / 2,
  },
  detailContainer: {
    bottom: 40,
    left: "50%",
    marginLeft: -187.5,
    width: 375,
    position: "absolute",
  },
  textDetail: {
    color: "#fff",
    fontSize: 14,
    textAlign: "left",
    fontWeight: "600",
  },
  topWrapper: {
    paddingVertical: 4,
    paddingHorizontal: 5,
    backgroundColor: "#ed2939",
    borderRadius: 7,
    width: "28%",
    flexDirection: "row",
  },
  frameParentShadowBox: {
    alignItems: "center",
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
    flexDirection: "row",
    paddingBottom: 8,
  },
  wrapperSpaceBlock: {
    paddingHorizontal: 6,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingVertical: 2,
    flexDirection: "row",
    borderRadius: 7,
  },
  title: {
    fontSize: 20,
    textShadowRadius: 4,
    textShadowOffset: {
      width: 0,
      height: 4,
    },
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textAlign: "left",
    color: "#fff",
    fontWeight: "600",
    paddingTop: 10,
    paddingBottom: 5,
  },

  text: {
    marginLeft: 4,
    textAlign: "left",
    color: "#fff",
  },

  textTag: {
    color: "#151515",
    textAlign: "left",
  },
  lchSWrapper: {
    marginLeft: 4,
  },
  frameContainer: {
    marginTop: 8,
    alignSelf: "stretch",
  },
  languageBorder: {
    width: 210,
    marginLeft: 4,
    textAlign: "left",
    color: "#fff",
  },
  line: {
    flexDirection: "row",
    alignContent: "center",
    // height: 10,
    marginRight: 15,
  },
  container1: {
    alignContent: "center",
    flexDirection: "row",
  },
  buttonTicket: {
    top: 630,
    left: 300,
    alignItems: "center",
    position: "absolute",
  },
  checkout: {
    fontSize: 14,
    color: "#fff",
  },
  button: {
    borderRadius: 7,
    backgroundColor: "#ed2939",
    borderStyle: "solid",
    borderColor: "#fff",
    borderWidth: 1,
    width: 100,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    marginTop: 5,
  },
});
