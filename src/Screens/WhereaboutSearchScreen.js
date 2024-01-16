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
  Animated,
  SectionList,
  VirtualizedList,
} from "react-native";
import {
  ParkIcon,
  CentreIcon,
  RelicIcon,
  ScenicIcon,
  MuseumIcon,
  ParkIconActive,
  CentreIconActive,
  RelicIconActive,
  ScenicIconActive,
  MuseumIconActive,
  FireIcon,
  BookIcon,
} from "@/Assets/Icons/Where";

import { useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect, useState, useRef } from "react";

import { DATA } from "../Utils/data";

import AccommodationCard from "@/Components/AccomodationCard";
import { StarIcon } from "@/Assets/Icons/Card";
import CityCard from "@/Components/CityCard";

import { SvgXml } from "react-native-svg";
import { DownArrow } from "@/Assets/Icons/DownArrow";
import { LeftArrow } from "@/Assets/Icons/LeftArrow";
import { BarsFilterIcon } from "@/Assets/Icons/BarsFilter";
import { SearchBlackIcon } from "@/Assets/Icons/SearchBlack";

import EatScreen from "./EatScreen";
import WhereScreen from "./WhereScreen";
import PlaceScreen from "./PlaceScreen";
import ExperienceScreen from "./ExperienceScreen";
import { ArrowLeft, ArrowLeftBlack } from "@/Assets/Icons/Navigation";

export default function WhereaboutSearchScreen() {
  const tabs = ["Đi đâu", "Ăn gì", "Ở đâu", "Trải Nghiệm"];
  const [selected, setSelected] = useState(0);
  const navigation = useNavigation();

  const bottomSheetRef = React.createRef();
  const showBottomSheet = () => {
    bottomSheetRef.current.show();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.statusBar}>
        <Pressable onPress={() => navigation.goBack()}>
          <SvgXml xml={ArrowLeftBlack} />
        </Pressable>
        <Text style={styles.title}>London</Text>
        <Pressable onPress={() => {}}>
          <SvgXml xml={SearchBlackIcon} />
        </Pressable>
      </View>

      <View>
        <View style={styles.header}>
          {tabs.map((e, i) => (
            <Pressable key={i} onPress={() => setSelected(i)}>
              <Text
                style={[
                  styles.titleTab,
                  selected == i && {
                    color: "#151515",
                  },
                ]}
              >
                {e}
              </Text>

              {selected == i && <View style={styles.line}></View>}
            </Pressable>
          ))}
        </View>
      </View>

      <View>
        <View style={styles.filter}>
          <TouchableOpacity onPress={showBottomSheet}>
            <SvgXml xml={BarsFilterIcon} style={styles.barsFilter} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.kind} onPress={showBottomSheet}>
            <Text>Loại chỗ ở</Text>

            <SvgXml xml={DownArrow} style={styles.downArrow} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.price} onPress={showBottomSheet}>
            <Text>Giá</Text>

            <SvgXml
              xml={DownArrow}
              style={styles.downArrow}
              onPress={showBottomSheet}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.comment}>
            <Text>Đánh giá</Text>

            <SvgXml xml={DownArrow} style={styles.downArrow} />
          </TouchableOpacity>
        </View>
      </View>

      <View>
        {selected == 0 && <WhereScreen />}

        {selected == 1 && <EatScreen />}

        {selected == 2 && <PlaceScreen />}

        {selected == 3 && <ExperienceScreen />}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
  },
  headTitle: {
    width: "100%",
    marginTop: "8%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  statusBar: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
  arrow: {
    left: "7%",
    position: "absolute",
  },
  titleText: {
    center: true,
    fontSize: 22,
    fontWeight: "700",
  },
  search: {
    right: "7%",
    position: "absolute",
  },
  header: {
    paddingTop: "5%",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#747474",
    paddingHorizontal: "5%",
    justifyContent: "space-between",
  },
  titleTab: {
    fontSize: 18,
    color: "#747474",
    fontWeight: "600",
  },
  line: {
    height: 2,
    width: "60%",
    marginTop: 9,
    alignSelf: "center",
    backgroundColor: "#151515",
  },
  filter: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    paddingVertical: "5%",
    borderColor: "#747474",
    alignContent: "center",
    paddingHorizontal: "5%",
    justifyContent: "center",
    justifyContent: "space-between",
  },
  barsFilter: {},
  kind: {
    borderWidth: 1,
    borderRadius: 15,
    alignItems: "center",
    borderStyle: "solid",
    flexDirection: "row",
    paddingVertical: "1%",
    alignContent: "center",
    paddingHorizontal: "3%",
    justifyContent: "center",
  },
  price: {
    borderWidth: 1,
    borderRadius: 15,
    alignItems: "center",
    borderStyle: "solid",
    flexDirection: "row",
    paddingVertical: "1%",
    alignContent: "center",
    paddingHorizontal: "3%",
    justifyContent: "center",
  },
  comment: {
    borderWidth: 1,
    borderRadius: 15,
    alignItems: "center",
    borderStyle: "solid",
    flexDirection: "row",
    paddingVertical: "1%",
    alignContent: "center",
    paddingHorizontal: "3%",
    justifyContent: "center",
  },
  downArrow: {
    marginLeft: "4%",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
});
