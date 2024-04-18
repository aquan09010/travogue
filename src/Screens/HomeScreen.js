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

export default function HomeScreen() {
  const navigation = useNavigation();
  const tabs = ["Đi đâu", "Ăn gì", "Ở đâu", "Trải Nghiệm"];
  const [selected, setSelected] = useState(0);

  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={styles.mainView}>
        <SearchLocation />
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
        {selected == 0 && <WhereScreen />}
        {selected == 1 && <EatScreen />}
        {selected == 2 && <PlaceScreen />}
        {selected == 3 && <ExperienceScreen />}
      </View> */}
      <View style={styles.mainView}>
        <SearchLocation />
      </View>
      <Tab.Navigator
        style={{ marginBottom: 10 }}
        screenOptions={{
          tabBarIndicatorStyle: {
            height: 2,
          },
          tabBarStyle: {
            height: 55,
          },
          tabBarLabelStyle: { fontSize: 16, fontFamily: "BeVNSemi" },
          tabBarIndicatorStyle: {
            backgroundColor: "black",
          },
        }}
      >
        <Tab.Screen name="Đi đâu" component={WhereScreen} />
        <Tab.Screen name="Ăn gì" component={EatScreen} />
        <Tab.Screen name="Ở đâu" component={PlaceScreen} />
        <Tab.Screen name="Trải nghiệm" component={ExperienceScreen} />
      </Tab.Navigator>
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
});
