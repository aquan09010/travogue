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
  ScheduleIcon,
  ScheduleIconFilled,
} from "@/Assets/Icons/Notification.js";
import { ProfileIcon, ProfileIconFilled } from "@/Assets/Icons/Proflie.js";
import HomeScreen from "../Screens/HomeScreen";
import CommunityScreen from "@/Screens/CommunityScreen.js";
import TabHeader from "@/Components/TabHeader";
import SearchCityScreen from "@/Screens/SearchCityScreen";
import ProfileScreen from "@/Screens/ProfileScreen";
import CloneSceen from "@/Screens/CloneDetail";
import HomePagePlanning from "@/Screens/HomePagePlanning";
import HomeHost from "@/Screens/HomeHost";

const HostNavigation = () => {
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
          if (route.name === "Trang chủ") {
            if (focused) {
              return <SvgXml xml={HomeIconFilled} />;
            } else {
              return <SvgXml xml={HomeIcon} />;
            }
          } else if (route.name === "Lịch trình") {
            if (focused) {
              return <SvgXml xml={ScheduleIconFilled} />;
            } else {
              return <SvgXml xml={ScheduleIcon} />;
            }
          } else if (route.name === "Thông báo") {
            if (focused) {
              return <SvgXml xml={NotificationIconFilled} />;
            } else {
              return <SvgXml xml={NotificationIcon} />;
            }
          } else if (route.name === "Hồ sơ") {
            if (focused) {
              return <SvgXml xml={ProfileIconFilled} />;
            } else {
              return <SvgXml xml={ProfileIcon} />;
            }
          }
        },
      })}
    >
      <Tab.Screen
        name="Trang chủ"
        component={HomeHost}
        options={{
          headerTitle: (props) => <TabHeader {...props} />,
        }}
      />
      <Tab.Screen name="Lịch trình" component={CommunityScreen} />
      <Tab.Screen name="Thông báo" component={HomeScreen} />
      <Tab.Screen
        name="Hồ sơ"
        component={ProfileScreen}
        options={({}) => ({
          headerShown: false,
        })}
        initialParams={{ userId: null }}
      />
    </Tab.Navigator>
  );
};

export default HostNavigation;
