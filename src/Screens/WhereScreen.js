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
import { DATA } from "../Utils/data";
import AccommodationCard from "@/Components/AccomodationCard";
import { StarIcon } from "@/Assets/Icons/Card";

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
      <View>
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
        <FlatList
          // onScroll={Animated.event(
          //   [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
          //   { useNativeDriver: false }
          // )}
          data={DATA}
          renderItem={({ index, item }) => (
            <AccommodationCard
              id={item.id}
              cardName={item.cardName}
              imgPath={item.imgPath}
              location={item.location}
              price={item.price}
              star={item.star}
              style={{ marginRight: index % 2 !== 0 ? 0 : "4%" }}
            />
          )}
          ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
          numColumns={2}
          keyExtractor={(item, index) => index}
          style={{ minHeight: 700 }}
        />
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
