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
} from "react-native";
import React, { useLayoutEffect, useState, useRef } from "react";
import { SvgXml } from "react-native-svg";
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
} from "@/Assets/Icons/Where";
export default function WhereScreen() {
  const menu = [
    { name: "Công viên", svg: ParkIcon, svgActive: ParkIconActive },
    { name: "Khu giải trí", svg: CentreIcon, svgActive: CentreIconActive },
    { name: "Khu di tích", svg: RelicIcon, svgActive: RelicIconActive },
    {
      name: "Danh lam thắng cảnh",
      svg: ScenicIcon,
      svgActive: ScenicIconActive,
    },
    { name: "Bảo tàng", svg: MuseumIcon, svgActive: MuseumIconActive },
  ];
  const [selected, setSelected] = useState(0);

  return (
    <ScrollView>
      <Text style={styles.title}>Bạn có thể thích những địa điểm này</Text>
      <View style={styles.header}>
        {menu.map((e, i) => (
          <Pressable
            style={styles.categoryItem}
            key={i}
            onPress={() => setSelected(i)}
          >
            <SvgXml
              style={styles.icon}
              xml={selected === i ? e.svgActive : e.svg}
            />
            <Text
              style={[
                styles.titleTab,
                selected == i && {
                  color: "#151515",
                },
              ]}
            >
              {e.name}
            </Text>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#151515",
  },
  titleTab: {
    fontSize: 15,
    fontWeight: "600",
    color: "#767676",
    width: 70,
    textAlign: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 18,
  },
  icon: {
    alignSelf: "center",
    marginBottom: 5,
  },
});
