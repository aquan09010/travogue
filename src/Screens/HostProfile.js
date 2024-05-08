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
  ActivityIndicator,
  FlatList,
} from "react-native";
import { DATA } from "../Utils/data";
import { SvgXml } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import { ParkIconActive } from "@/Assets/Icons/Where";
import React, { useLayoutEffect, useState, useRef, useEffect } from "react";
import { ArrowLeftBlack, SearchIconBlack } from "@/Assets/Icons/Navigation";
import {
  CalendarIcon,
  PeopleIcon,
  TimeIcon,
} from "@/Assets/Icons/OrderConfirm";
import { LanguageIcon } from "@/Assets/Icons/DetailIcon";
import {
  FacebookBlackIcon,
  LanguageBlackIcon,
  ListBlackIcon,
  MailBlackIcon,
  PhoneBlackIcon,
  StarBlackIcon,
} from "@/Assets/Icons/Proflie";
import CircleCard from "@/Components/CircleCard";
import { getHostInfo } from "@/Hooks/UserHook";
import { useStateContext } from "@/Context/StateContext";
export default function HostProfile({route}) {
  const navigation = useNavigation();
  const renderCircleItem = ({ item }) => (
    <CircleCard
      imgPath={item.mainImage}
      cardName={item.activityName}
      cityName={item.cityName}
      star={item.rating}
    />
  );
  // const renderCircleAvatar = ({ item }) => (
  //   <Image
  //     source={item.ava1}
  //     style={{ width: 100, height: 100, borderRadius: 100 / 2 }}
  //   />
  // );

  const { accessToken } = useStateContext();

  const {hostId} = route.params

  const { host, isHostLoading, error, refetchHostInfo } = getHostInfo(accessToken, hostId);

  useEffect(() => console.log(host), [host])

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

      {isHostLoading
        ? <ActivityIndicator
            size="large"
            color="#ED2939"
            style={{ paddingVertical: 12 }}
          />
        : <ScrollView style={{}}>
        <View style={styles.containerCard}>
          <View>
            <View style={{ paddingBottom: 10 }}>
              <Image
                style={styles.avatar}
                resizeMode="cover"
                source={{uri: host.avatar}}
              />
            </View>
              <Pressable style={[styles.button1]}
                onPress={() => navigation.navigate("ProfileScreen", {userId: host.id})}
              >
              <Text style={{ color: "#fff", textAlign: "center" }}>
                Xem Hồ sơ
              </Text>
            </Pressable>
          </View>
          <View style={styles.orderCard}>
            <Text
              style={[styles.textDetail, { paddingTop: 10, paddingBottom: 5 }]}
            >
              {host.firstName + ' ' + host.lastName}
            </Text>
            <Text style={(styles.line, styles.textDetail)}>
              {host.numOfCities} thành phố, {host.numOfActivities} trải nghiệm
            </Text>
            <Text style={{ paddingTop: 5 }}>
              Tổ chức trải nghiệm trên Travogue từ {host.createdAt.substring(0, 4)}
            </Text>
            <View style={[styles.line, { alignItems: "center" }]}>
              <SvgXml xml={LanguageBlackIcon} />
              <Text style={[styles.text]}>
                {" "}
                {host.languages}
              </Text>
            </View>
            <View style={[styles.line]}>
              <SvgXml xml={ListBlackIcon} />
              <Text style={[styles.text]}>
                {" "}
                {host.personalSkills}
              </Text>
            </View>
            {/* <View style={[styles.line]}>
              <SvgXml xml={StarBlackIcon} />
              <Text style={[styles.text]}> 4.5</Text>
            </View> */}
          </View>
        </View>
        <View style={styles.mainView}>
          <Text style={{ fontWeight: "600", fontSize: 16, paddingBottom: 10 }}>
            {" "}
            Trải nghiệm nổi bật của Martin
          </Text>
          <FlatList
            data={host.hotTour}
            renderItem={renderCircleItem}
            keyExtractor={(item, index) => index}
            horizontal
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
          />
        </View>
        <View style={styles.mainView}>
          <Text style={{ fontWeight: "600", fontSize: 16, paddingBottom: 10 }}>
            {" "}
            Về Martin{" "}
          </Text>
          <Text style={{ paddingBottom: 15 }}>
            {host.selfIntroduction}
          </Text>
          {/* <FlatList
            data={DATA}
            renderItem={renderCircleAvatar}
            keyExtractor={(item, index) => index}
            horizontal
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
          /> */}
        </View>
        <View style={styles.mainView}>
          <Text style={{ fontWeight: "600", fontSize: 16 }}>
            {" "}
            Thông tin liên hệ{" "}
          </Text>
          <View style={[styles.line]}>
            <SvgXml xml={MailBlackIcon} />
            <Text style={[styles.text]}> {host.email }</Text>
          </View>
          <View style={[styles.line]}>
            <SvgXml xml={PhoneBlackIcon} />
            <Text style={[styles.text]}> {host.phone}</Text>
          </View>
          {/* <View style={[styles.line]}>
            <SvgXml xml={FacebookBlackIcon} />
            <Text style={[styles.text]}> Martin Nguyen</Text>
          </View> */}
        </View>
      </ScrollView>
      }
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
  text: {
    textTransform: 'capitalize'
  }
});
