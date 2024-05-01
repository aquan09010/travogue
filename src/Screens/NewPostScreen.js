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
import * as ImagePicker from "expo-image-picker";

import { MiniLocation } from "@/Assets/Icons/Card";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import FollowingTab from "@/Components/FollowingTab";
const Tab = createMaterialTopTabNavigator();
import { Animated } from "react-native";
import { useStateContext } from "@/Context/StateContext";
import { getFollowers, getFollowing } from "@/Hooks/FollowHooks";
import { ActivityIndicator } from "react-native";
import { isAllOf } from "@reduxjs/toolkit";
import {
  ImagePostIcon,
  LocationPostIcon,
  PeoplePostIcon,
} from "@/Assets/Icons/Proflie";

export default function NewPostScreen({ route }) {
  const { tab } = route.params;
  const navigation = useNavigation();
  const gotoHost = async (e) => {
    e.preventDefault();
    navigation.navigate("HostProfile");
  };

  const handleCheckout = () => {
    navigation.navigate("Main");
  };

  const { accessToken, user } = useStateContext();
  const [images, setImages] = useState([]);
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [1, 1],
      quality: 1,
      allowsMultipleSelection: true,
    });

    console.log(result);

    if (!result.canceled) {
      setImages(result.assets.map((asset) => asset.uri));
    }
  };
  const { followers, isFollowerLoading } = getFollowers(accessToken);
  const { following, isFollowingLoading } = getFollowing(accessToken);
  function formatDate(dateString) {
    // Parse the date string into a Date object
    const date = new Date(dateString);

    // Get the current year
    const currentYear = new Date().getFullYear();

    // Choose the format based on the year
    const formattedDate = date.toLocaleDateString(undefined, {
      day: "2-digit",
      month: "2-digit",
      year: currentYear === date.getFullYear() ? undefined : "numeric",
    });

    return formattedDate;
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.statusBar}>
        <Pressable onPress={() => navigation.goBack()}>
          <SvgXml xml={ArrowLeftBlack} />
        </Pressable>
        <Text style={styles.title}>Đăng bài viết</Text>
        <Pressable style={styles.button} onPress={() => {}}>
          <Text style={styles.checkout}>Đăng</Text>
        </Pressable>
      </View>
      <ScrollView
        style={{ height: "100%" }}
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{ flexGrow: 1 }}
      >
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
              <Text style={styles.boldText}>aquan09010</Text>
              <Text>{` đang ở `}</Text>
              <Text style={styles.boldText}>Quốc Học Huế</Text>
            </Text>
            <Text
              style={{
                fontSize: 10,
                color: "#767676",
                marginTop: 6,
                textAlign: "left",
              }}
            >
              {formatDate(new Date())}
            </Text>
          </View>
        </View>
        <TextInput
          multiline={true}
          autoFocus={false}
          style={{
            paddingHorizontal: 14,
            paddingVertical: 10,
            height: "auto",
            textAlignVertical: "top",
            fontSize: 18,
          }}
          placeholder="Bạn đang ở đâu đấy? "
          placeholderTextColor="grey"
        />
        <ScrollView style={{ height: "auto" }}>
          {images ? (
            images.map((image) => (
              <Image
                source={{ uri: image }}
                style={{ width: "50%", height: 200 }}
              />
            ))
          ) : (
            <></>
          )}
        </ScrollView>
        <Pressable
          style={{
            flexDirection: "row",
          }}
          onPress={pickImage}
        >
          <View
            style={{
              margin: 10,
              justifyContent: "center",
              alignItems: "center",
              height: 25,
              width: 30,
            }}
          >
            <SvgXml xml={ImagePostIcon} />
          </View>
          <Text style={{ alignSelf: "center", fontSize: 18 }}>Ảnh/Video</Text>
        </Pressable>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <View
            style={{
              margin: 10,
              justifyContent: "center",
              alignItems: "center",
              height: 25,
              width: 30,
            }}
          >
            <SvgXml xml={LocationPostIcon} />
          </View>
          <Text style={{ alignSelf: "center", fontSize: 18 }}>Địa điểm</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <View
            style={{
              margin: 10,
              justifyContent: "center",
              alignItems: "center",
              height: 25,
              width: 30,
            }}
          >
            <SvgXml xml={PeoplePostIcon} />
          </View>
          <Text style={{ alignSelf: "center", fontSize: 18 }}>Gắn thẻ</Text>
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
    height: "100%",
    flex: 1,
  },
  statusBar: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
  status: {
    alignSelf: "stretch",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
  checkout: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "left",
  },
  button: {
    borderRadius: 7,
    backgroundColor: "#ed2939",
    borderStyle: "solid",
    borderColor: "#fff",
    borderWidth: 1,
    overflow: "hidden",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  boldText: {
    fontWeight: "600",
  },
});
