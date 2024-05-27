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
import React, { useLayoutEffect, useState, useRef, useEffect } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
const Tab = createMaterialTopTabNavigator();
import { Animated } from "react-native";
import { AddNewIcon, FilterHostIcon } from "@/Assets/Icons/Notification";
import { getActivityByHost } from "@/Hooks/HostManage";
import { useStateContext } from "@/Context/StateContext";
import ExpHostCard from "@/Components/HostPage/ExpHostCard";
import { Calendar } from "react-native-calendars";
import { Dropdown } from "react-native-element-dropdown";
import ExpCard from "@/Components/HostPage/ExpCard";
import { getActiveDates, getSchedule } from "@/Hooks/ScheduleHook";

const data = [
  { label: "10:30 - 11:30", value: "1" },
  { label: "11:30 - 12:30", value: "2" },
  { label: "12:30 - 13:30", value: "3" },
  { label: "13:30 - 14:30", value: "4" },
  { label: "14:30 - 15:30", value: "5" },
  { label: "15:30 - 16:30", value: "6" },
  { label: "16:30 - 17:30", value: "7" },
  { label: "17:30 - 18:30", value: "8" },
];
export default function ScheduleScreen() {
  const navigation = useNavigation();
  const tabs = ["Đi đâu", "Ăn gì", "Ở đâu", "Trải Nghiệm"];
  const [selected, setSelected] = useState(
    new Date().toISOString().split("T")[0]
  );
  let markedDates1 = {};
  const [value, setValue] = useState(null);
  const [days, setDays] = useState([]);
  
  markedDates1[selected] = {
    selected: true,
    disableTouchEvent: false,
    selectedDotColor: "orange",
  };
  // console.log(markedDates1);
  const av = new Animated.Value(0);
  av.addListener(() => {
    return;
  });

  const { accessToken, user } = useStateContext();

  const { activeDates, isGetActiveDatesLoading, error, refetchGetActiveDates } = getActiveDates(accessToken, user.id);

  activeDates.map((item) => {
    markedDates1[item] = {
      marked: true,
      dotColor: "#50cebb",
    };
  });
  
  const { schedule, isGetScheduleLoading, refetchGetSchedule } = getSchedule(accessToken, user.id, selected);

  return (
    <SafeAreaView style={styles.container}>
      <Text
        style={[styles.title1, { paddingVertical: 10, paddingHorizontal: 10 }]}
      >
        Lịch trình của bạn
      </Text>
      <ScrollView>
        {isGetActiveDatesLoading ? 
          <ActivityIndicator
            size="large"
            color="#ED2939"
            style={{ paddingVertical: 12 }}
          /> :
          <Calendar
            onDayPress={(day) => {
              setSelected(day.dateString);
            }}
            markedDates={markedDates1}
          />
        }
        

        <View
          style={[
            styles.frameParent,
            styles.frameParentFlexBox,
            { paddingVertical: 10, paddingHorizontal: 20 },
          ]}
        >
          <View style={[styles.frameGroup, styles.frameParentFlexBox]}>
            <View style={styles.frameParentFlexBox}>
              <Text style={[styles.calendar, styles.th714FlexBox]}>
                CALENDAR
              </Text>
              <Text style={[styles.th714, styles.th714FlexBox]}>
                {selected}
              </Text>
            </View>
            <Text style={[styles.check, styles.th714FlexBox]}>check</Text>
          </View>
        </View>
        <Text
          style={[styles.c4Hot, { paddingVertical: 10, paddingHorizontal: 10 }]}
        >
          Có {schedule?.data.length} hoạt động trong ngày
        </Text>
        {isGetScheduleLoading ? 
          <ActivityIndicator
            size="large"
            color="#ED2939"
            style={{ paddingVertical: 12 }}
          /> : 
          schedule.data.map(item =>
            <ExpCard data={ item} />
          )
        }
        <View style={{ marginBottom: 90 }}></View>
      </ScrollView>
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
  title1: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
    textAlign: "left",
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
  frameParentFlexBox: {
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  th714FlexBox: {
    textAlign: "left",
    color: "#000",
  },
  calendar: {
    fontFamily: "Font Awesome 6 Pro",
    fontSize: 16,
    color: "#000",
  },
  th714: {
    fontSize: 12,
    fontFamily: "BeVietnamPro-Regular",
    marginLeft: 6,
  },
  check: {
    marginLeft: 8,
    fontFamily: "Font Awesome 6 Pro",
    fontSize: 16,
    color: "#000",
  },
  frameGroup: {
    borderRadius: 7,
    borderStyle: "solid",
    borderColor: "#1b1b1b",
    borderWidth: 1,
    padding: 8,
  },
  frameParent: {
    alignSelf: "stretch",
    flex: 1,
    width: "100%",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  dropdown: {
    width: 150,
    borderRadius: 7,
    borderStyle: "solid",
    borderColor: "#767676",
    borderWidth: 1,
  },
  listKind: {
    width: "100%",
    flexWrap: "wrap",
    flexDirection: "column",
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  option: {
    width: "auto",
    height: "auto",
    marginRight: 4,
    padding: 8,
  },
  optionText: {
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  c4Hot: {
    fontSize: 10,
    fontStyle: "italic",
    fontFamily: "BeVietnamPro-Italic",
    color: "#000",
  },
});
