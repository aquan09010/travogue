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
import { useStateContext } from "@/Context/StateContext";
import { getPostsByUser } from "@/Hooks/PostHooks";

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

  const { accessToken, user } = useStateContext();

  const { posts, isPostsLoading, error } = getPostsByUser(accessToken, user.id);

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
              source={{uri: user.avatar}}
            />
            <Text
              style={{
                paddingTop: 10,
                color: "#000000",
                fontSize: 14,
                alignSelf: "center",
              }}
            >
              {user.email.split("@")[0]}
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
                  {user.numOfPosts}
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
                  {user.numOfFollowers}
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
                  {user.numOfFollowing}
                </Text>
                <Text
                  style={{
                    color: "#000000",
                    fontSize: 10,
                  }}
                >
                  {"Đang theo dõi"}
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
          isPostsLoading ? <>
          <ActivityIndicator
            size="large"
            color="#ED2939"
            style={{ paddingVertical: 12 }}
          />
          </> : posts.data.length == 0 ?
            <View>
              <Text style={{ textAlign: 'center' }}>Chưa có bài viết nào</Text>
            </View> :
            <View>
              {posts.data.map(post => <PostCard data={post} />)}
            
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
