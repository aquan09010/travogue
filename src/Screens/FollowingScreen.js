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
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import FollowingTab from "@/Components/FollowingTab";
const Tab = createMaterialTopTabNavigator();
import { Animated } from "react-native";
import { useStateContext } from "@/Context/StateContext";
import { getFollowers, getFollowing } from "@/Hooks/FollowHooks";
import { ActivityIndicator } from "react-native";
import { isAllOf } from "@reduxjs/toolkit";

export default function FollowingScreen({ route }) {
  console.log(route.params);
  const { tab, userProfile } = route.params;
  const navigation = useNavigation();
  const gotoHost = async (e) => {
    e.preventDefault();
    navigation.navigate("HostProfile");
  };
  const av = new Animated.Value(0);
  av.addListener(() => {
    return;
  });
  const handleCheckout = () => {
    navigation.navigate("Main");
  };

  const { accessToken } = useStateContext();

  const { followers, isFollowerLoading } = getFollowers(accessToken, userProfile.id);
  const { following, isFollowingLoading } = getFollowing(accessToken, userProfile.id);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.statusBar}>
        <Pressable onPress={() => navigation.goBack()}>
          <SvgXml xml={ArrowLeftBlack} />
        </Pressable>
        <Text style={styles.title}>{userProfile.email.split('@')[0]}</Text>
        <Pressable onPress={() => {}}>
          <SvgXml xml={SearchIconBlack} />
        </Pressable>
      </View>
      <View style={{ height: "100%" }}>
        {isFollowerLoading || isFollowingLoading ? 
        <ActivityIndicator
        size="large"
        color="#ED2939"
        style={{ paddingVertical: 12 }}
      /> : 
        <Tab.Navigator
        initialRouteName={tab}
        style={{ marginBottom: 0 }}
        screenOptions={{
          tabBarIndicatorStyle: {
            height: 2,
          },
          tabBarStyle: {
            height: 45,
          },
          tabBarLabelStyle: {
            fontSize: 16,
            fontFamily: "BeVNSemi",
            textTransform: "none",
          },
          tabBarIndicatorStyle: {
            backgroundColor: "black",
          },
        }}
      >
        <Tab.Screen
          name="theodoi"
          component={FollowingTab}
          options={{ title: followers.data.length + " Follwers" }}
          initialParams={{ data: followers.data }}
        />
        <Tab.Screen
          name="dangtheodoi"
          component={FollowingTab}
          options={{ title: following.data.length + " Following" }}
          initialParams={{ data: following.data }}
        />
      </Tab.Navigator>
        }
      </View>
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
    paddingTop: 10,
  },
  line1: {
    flexDirection: "row",
    alignContent: "center",
    // height: 10,
  },
  avaImg: {
    height: 40,
    width: 40,
    borderRadius: 40 / 2,
  },
  inputArea: {
    borderRadius: 7,
    borderStyle: "solid",
    borderColor: "#767676",
    borderWidth: 1,
    width: "70%",
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  button: {
    borderRadius: 7,
    backgroundColor: "#fff",
    borderStyle: "solid",
    borderColor: "#151515",
    borderWidth: 1,
    overflow: "hidden",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  line3: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
  },
  frameParent4: {
    height: 80,
    borderTopWidth: 1,
    paddingTop: 18,
    flexWrap: "wrap",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingVertical: 0,
    justifyContent: "space-between",
    flexDirection: "row",
    borderColor: "#bababa",
    borderStyle: "solid",
    backgroundColor: "#fff",
    bottom: 0,
    position: "relative",
    width: "100%",
  },
  button1: {
    borderRadius: 7,
    backgroundColor: "#ed2939",
    borderColor: "#fff",
    flexWrap: "wrap",
    paddingVertical: 12,
    paddingHorizontal: 16,
    overflow: "hidden",
  },
});
