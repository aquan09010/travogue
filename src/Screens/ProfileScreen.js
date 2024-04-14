import {
  PostIcon,
  PostSelectedIcon,
  TicketIcon,
  TicketIconSelected,
} from "@/Assets/Icons/Proflie";
import React from "react";
import { useState } from "react";
import { SvgXml } from "react-native-svg";

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
  ActivityIndicator,
} from "react-native";
import PostCard from "@/Components/PostCard";

export default function ProfileScreen() {
  const tabs = [
    { id: 1, icon: PostIcon, iconSelected: PostSelectedIcon },
    {
      id: 2,
      icon: TicketIcon,
      iconSelected: TicketIconSelected,
    },
  ];
  const [selected, setSelected] = useState(1);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#FFFFFF",
      }}
    >
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: "#FFFFFF",
          paddingBottom: 60,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginHorizontal: 17,
            paddingTop: 10,
          }}
        >
          <View style={{ paddingBottom: 10 }}>
            <Image
              style={{
                height: 100,
                width: 100,
                borderRadius: 100 / 2,
                width: 100,
              }}
              resizeMode="cover"
              source={require("../Assets/ava1.jpg")}
            />
            <Text
              style={{
                paddingTop: 10,
                color: "#000000",
                fontSize: 14,
                alignSelf: "center",
              }}
            >
              {"Anh Quann"}
            </Text>
          </View>
          <View
            style={{
              width: 223,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 25,
                marginHorizontal: 16,
              }}
            >
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{
                    color: "#000000",
                    fontSize: 12,
                    marginBottom: 5,
                  }}
                >
                  {"8"}
                </Text>
                <Text
                  style={{
                    color: "#000000",
                    fontSize: 10,
                  }}
                >
                  {"Bài viết"}
                </Text>
              </View>
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{
                    color: "#000000",
                    fontSize: 12,
                    marginBottom: 5,
                  }}
                >
                  {"40"}
                </Text>
                <Text
                  style={{
                    color: "#000000",
                    fontSize: 10,
                  }}
                >
                  {"Người theo dõi"}
                </Text>
              </View>
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{
                    color: "#000000",
                    fontSize: 12,
                    marginBottom: 5,
                  }}
                >
                  {"120"}
                </Text>
                <Text
                  style={{
                    color: "#000000",
                    fontSize: 10,
                  }}
                >
                  {"Theo dõi"}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: 108,
                  alignItems: "center",
                  backgroundColor: "#E8E8E8",
                  borderRadius: 7,
                  paddingVertical: 7,
                }}
              >
                <Text
                  style={{
                    color: "#000000",
                    fontSize: 12,
                  }}
                >
                  {"Đăng bài viết"}
                </Text>
              </View>
              <View
                style={{
                  width: 108,
                  alignItems: "center",
                  backgroundColor: "#E8E8E8",
                  borderRadius: 7,
                  paddingVertical: 5,
                }}
              >
                <Text
                  style={{
                    color: "#151515",
                    fontSize: 12,
                  }}
                >
                  {"Chỉnh sửa"}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.header}>
          {tabs.map((e, i) => (
            <Pressable
              style={styles.categoryItem}
              key={e.id}
              onPress={() => setSelected(e.id)}
            >
              <SvgXml xml={selected === e.id ? e.iconSelected : e.icon} />
              {selected == e.id && <View style={styles.line}></View>}
            </Pressable>
          ))}
        </View>
        {selected === 1 ? (
          <View>
            <PostCard />
            <PostCard />
            <PostCard />
          </View>
        ) : (
          <></>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 18,
    borderBottomWidth: 0.5,
    borderColor: "#767676",
  },
  categoryItem: {
    width: "50%",
    alignItems: "center",
  },
  line: {
    width: "100%",
    height: 2,
    backgroundColor: "#151515",
    alignSelf: "center",
    marginTop: 9,
  },
});
