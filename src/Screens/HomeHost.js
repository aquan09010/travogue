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
import { getActivityByHost } from "@/Hooks/HostManage";
import { useStateContext } from "@/Context/StateContext";
import ExpHostCard from "@/Components/HostPage/ExpHostCard";

export default function HomeHost() {
  const navigation = useNavigation();
  const gotoNewExpScreen = async (e) => {
    e.preventDefault();
    navigation.navigate("NewExpScreen");
  };
  const tabs = ["Đi đâu", "Ăn gì", "Ở đâu", "Trải Nghiệm"];
  const [selected, setSelected] = useState(0);
  const av = new Animated.Value(0);
  av.addListener(() => {
    return;
  });

  const { accessToken, user } = useStateContext();

  const {
    activities,
    isActivitiesLoading,
    activitiesError,
    refetchActivityByHost,
  } = getActivityByHost(accessToken, user.id);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainView}>
        <View style={styles.flex}>
          <Text style={styles.title}>Tổ chức trải nghiệm mới</Text>
          <Pressable onPress={gotoNewExpScreen}>
            <SvgXml xml={AddNewIcon} />
          </Pressable>
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

        {isActivitiesLoading ? (
          <>
            <ActivityIndicator
              size="large"
              color="#ED2939"
              style={{ paddingVertical: 12 }}
            />
          </>
        ) : activitiesError ? (
          <Text
            style={{
              color: "#A80027",
              textAlign: "center",
              paddingBottom: 20,
              fontSize: 16,
            }}
          >
            Something went wrong!
          </Text>
        ) : (
          <ScrollView style={styles.cardListContainer}>
            {activities.data.data.map((item, index) => {
              return (
                <ExpHostCard
                  key={index}
                  id={item.id}
                  cardName={item.activityName}
                  imgPath={item.mainImage}
                  location={item.city.name}
                  price={item.generalPrice}
                  star={item.averageRating}
                  isExperience={false}
                />
              );
            })}
          </ScrollView>
        )}
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
