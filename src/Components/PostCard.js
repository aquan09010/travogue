import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Pressable,
  Animated,
} from "react-native";
import { SearchIcon } from "@/Assets/Icons/Search";
import { SvgXml } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import { MiniLocation, StarIcon } from "@/Assets/Icons/Card";
import HeartButton from "./HeartButton";
import React, { useRef, useState } from "react";
import Swiper from "react-native-swiper";
import { CommentIcon, HeartIcon } from "@/Assets/Icons/DetailIcon";
import {
  BookmarkIcon,
  BookmarkIconSelected,
  CommentBlackIcon,
  HeartBlackIcon,
} from "@/Assets/Icons/Proflie";

export default function PostCard() {
  const [selectedBookmark, setSelectedBookmark] = useState(false);
  const [liked, setLiked] = useState(false);

  return (
    <View
      style={{
        borderBottomWidth: 1,
        borderColor: "#767676",
        paddingBottom: 10,
        paddingTop: 5,
      }}
    >
      <View style={{ paddingHorizontal: 10 }}>
        <View style={styles.status}>
          <Image
            style={{
              height: 40,
              width: 40,
              borderRadius: 40 / 2,
              width: 40,
            }}
            resizeMode="cover"
            source={require("../Assets/ava1.jpg")}
          />
          <View style={{ marginLeft: 8 }}>
            <Text style={{ fontSize: 12, color: "#000", textAlign: "left" }}>
              <Text style={styles.boldText}>{`Anh Quan `}</Text>
              <Text>{`đang ở`}</Text>
              <Text style={styles.boldText}> Địa điểm ABC</Text>
            </Text>
            <Text
              style={{
                fontSize: 10,
                color: "#767676",
                marginTop: 6,
                textAlign: "left",
              }}
            >
              28 thg 1
            </Text>
          </View>
        </View>
        <Swiper
          style={styles.wrapper}
          dot={
            <View
              style={{
                backgroundColor: "rgba(0,0,0,.2)",
                width: 4,
                height: 4,
                borderRadius: 4,
                marginLeft: 3,
                marginRight: 3,
                marginTop: 3,
                marginBottom: 3,
              }}
            />
          }
          activeDot={
            <View
              style={{
                backgroundColor: "#007aff",
                width: 5,
                height: 5,
                borderRadius: 4,
                marginLeft: 3,
                marginRight: 3,
                marginTop: 3,
                marginBottom: 3,
              }}
            />
          }
        >
          <Image
            style={styles.slide1}
            resizeMode="cover"
            source={require("../Assets/ava1.jpg")}
          />
          <Image
            style={styles.slide1}
            resizeMode="cover"
            source={require("../Assets/card1.jpg")}
          />

          <Image
            style={styles.slide1}
            resizeMode="cover"
            source={require("../Assets/card1.jpg")}
          />
        </Swiper>
        <Text style={{ paddingBottom: 8 }}>
          This is a caption. This is a caption. This is a caption. This is a
          caption. This is a caption
        </Text>
        <View style={styles.frameParent}>
          <View style={{ flexDirection: "row" }}>
            <Pressable>
              <SvgXml xml={HeartBlackIcon} />
            </Pressable>
            <Pressable style={{ marginLeft: 15 }}>
              <SvgXml xml={CommentBlackIcon} />
            </Pressable>
          </View>
          <Pressable onPress={() => setSelectedBookmark(!selectedBookmark)}>
            <SvgXml
              xml={
                selectedBookmark === true ? BookmarkIconSelected : BookmarkIcon
              }
            />
          </Pressable>
        </View>
        <Text style={{ marginLeft: 5 }}>3 người đã thích</Text>
        <Pressable
          style={{
            flexDirection: "row",
            paddingHorizontal: 18,
            paddingVertical: 12,
          }}
        >
          <Pressable
            onPress={() => {}}
            style={[styles.avatar, styles.actionPadding]}
          >
            <Image
              style={[styles.avaImg, { marginRight: 10 }]}
              resizeMode="cover"
              source={require("../Assets/ava1.jpg")}
            />
          </Pressable>
          <View style={{}}>
            <View style={styles.line}>
              <Text>
                {" "}
                {"aquan09010"} • {"14:30"}
              </Text>
            </View>
            <Text style={{ paddingRight: 45 }}>{"testabc"}</Text>
          </View>
        </Pressable>
        <Pressable>
          <Text style={{ marginLeft: 5 }}>View more</Text>
        </Pressable>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  wrapper: { height: 295 },
  slide1: {
    width: "100%",
    height: 250,
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
  boldText: {
    fontWeight: "600",
  },

  status: {
    alignSelf: "stretch",
    flex: 1,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 0,
    paddingVertical: 8,
  },

  frameParent: {
    alignSelf: "stretch",
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingBottom: 8,
  },
  avaImg: {
    height: 40,
    width: 40,
    borderRadius: 40 / 2,
  },
});
