import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useLayoutEffect } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { SvgXml } from "react-native-svg";
import { HomeIcon, HomeIconFilled } from "@/Assets/Icons/Home.js";
import {
  CommunityIcon,
  CommunityIconFilled,
} from "@/Assets/Icons/Community.js";
import { PlanIcon, PlanIconFilled } from "@/Assets/Icons/Plan.js";
import {
  NotificationIcon,
  NotificationIconFilled,
} from "@/Assets/Icons/Notification.js";
import { ProfileIcon, ProfileIconFilled } from "@/Assets/Icons/Proflie.js";
import HomeScreen from "../Screens/HomeScreen";
import CommunityScreen from "@/Screens/CommunityScreen.js";

const MainNavigator = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          bottom: 0,
          borderColor: "#bababa",
          borderTopWidth: 0.8,
          borderStyle: "solid",
          position: "absolute",
          overflow: "hidden",
          backgroundColor: "#fff",
        },
        tabBarLabelStyle: {
          fontSize: 10,
          color: "black",
        },

        tabBarIcon: ({ focused }) => {
          if (route.name === "Home") {
            if (focused) {
              return <SvgXml xml={HomeIconFilled} />;
            } else {
              return <SvgXml xml={HomeIcon} />;
            }
          } else if (route.name === "Community") {
            if (focused) {
              return <SvgXml xml={CommunityIconFilled} />;
            } else {
              return <SvgXml xml={CommunityIcon} />;
            }
          } else if (route.name === "Plan") {
            if (focused) {
              return <SvgXml xml={PlanIconFilled} />;
            } else {
              return <SvgXml xml={PlanIcon} />;
            }
          } else if (route.name === "Notification") {
            if (focused) {
              return <SvgXml xml={NotificationIconFilled} />;
            } else {
              return <SvgXml xml={NotificationIcon} />;
            }
          } else if (route.name === "Profile") {
            if (focused) {
              return <SvgXml xml={ProfileIconFilled} />;
            } else {
              return <SvgXml xml={ProfileIcon} />;
            }
          }
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Community" component={CommunityScreen} />
      <Tab.Screen name="Plan" component={HomeScreen} />
      <Tab.Screen name="Notification" component={HomeScreen} />
      <Tab.Screen name="Profile" component={HomeScreen} />
    </Tab.Navigator>
  );
};

export default MainNavigator;

const styles = StyleSheet.create({
  cameraBtn: {
    backgroundColor: "#fff",
  },
});
