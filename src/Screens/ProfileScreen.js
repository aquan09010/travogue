import {
  PostIcon,
  PostSelectedIcon,
  TicketIcon,
  TicketIconSelected,
  sendCommentIcon,
} from "@/Assets/Icons/Proflie";
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
  Button,
  ActivityIndicator,
  Modal,
} from "react-native";
import PostCard from "@/Components/PostCard";
import { useStateContext } from "@/Context/StateContext";
import {
  getCommentsByPost,
  getPostsByUser,
  postCommentsByPost,
} from "@/Hooks/PostHooks";
import TicketCard from "@/Components/TicketCard";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";

const timeAgo = (dateString) => {
  const now = new Date();
  const createdAt = new Date(dateString);
  const differenceInSeconds = Math.floor((now - createdAt) / 1000);

  const intervals = [
    ["year", 31536000],
    ["month", 2592000],
    ["day", 86400],
    ["hour", 3600],
    ["minute", 60],
    ["second", 1],
  ];

  for (const [name, seconds] of intervals) {
    const intervalCount = Math.floor(differenceInSeconds / seconds);
    if (intervalCount >= 1) {
      return `${intervalCount} ${intervalCount === 1 ? name : name + "s"} ago`;
    }
  }

  return "just now";
};

export default function ProfileScreen() {
  const navigation = useNavigation();

  const snapPoints = useMemo(() => ["95%"], []);
  const bottomSheetRef = React.createRef(BottomSheet);
  // const bottomSheetRef = useRef < BottomSheet > null;
  const goToFollowingScreen = async (e) => {
    e.preventDefault();
    navigation.navigate("FollowingScreen", {});
  };
  const handleClosePress = () => bottomSheetRef.current?.close();

  const handleOpenPress = async (postId) => {
    bottomSheetRef.current?.expand();
    setActivePost(postId);
    await getComments(accessToken, postId);
  };
  const [modalVisible, setModalVisible] = useState(false);
  const handleCollapsePress = () => bottomSheetRef.current?.collapse();
  const snapToIndex = (index) => bottomSheetRef.current?.snapToIndex(index);
  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
      />
    ),
    []
  );
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

  const { getComments, comments, isCommentLoading, commentError } =
    getCommentsByPost();

  const [activePost, setActivePost] = useState();
  const [commentList, setCommentList] = useState([]);
  const { postComments, newComment, isPostCommentLoading, postCommentError } =
    postCommentsByPost();
  const [userCmt, setUserCmt] = useState("");
  const handlePostComment = async (e) => {
    e.preventDefault();

    await postComments(accessToken, activePost, userCmt);
    setUserCmt("");
  };

  useEffect(() => {
    if (comments) setCommentList(comments.data);
  }, [comments]);

  useEffect(() => {
    if (newComment) {
      setCommentList([newComment.data, ...commentList]);
    }
  }, [newComment]);

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
              source={{ uri: user.avatar }}
            />
            <Text
              style={{
                paddingTop: 10,
                color: "#000000",
                fontSize: 14,
                alignSelf: "center",
                fontWeight: "bold",
                paddingBottom: 5,
              }}
            >
              {user.email.split("@")[0]}
            </Text>
            <Text style={{ alignSelf: "center" }}>Young Killua</Text>
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
                marginHorizontal: 8,
              }}
            >
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{
                    color: "#000000",
                    fontSize: 14,
                    marginBottom: 5,
                    fontWeight: "bold",
                  }}
                >
                  {user.numOfPosts}
                </Text>
                <Text
                  style={{
                    color: "#000000",
                    fontSize: 12,
                  }}
                >
                  {"Bài viết"}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("FollowingScreen", {
                    tab: "theodoi",
                  });
                }}
                style={{ alignItems: "center" }}
              >
                <Text
                  style={{
                    color: "#000000",
                    fontSize: 14,
                    marginBottom: 5,
                    fontWeight: "bold",
                  }}
                >
                  {user.numOfFollowers}
                </Text>
                <Text
                  style={{
                    color: "#000000",
                    fontSize: 12,
                  }}
                >
                  {"Người theo dõi"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("FollowingScreen", {
                    tab: "dangtheodoi",
                  });
                }}
                style={{ alignItems: "center" }}
              >
                <Text
                  style={{
                    color: "#000000",
                    fontSize: 14,
                    fontWeight: "bold",
                    marginBottom: 5,
                  }}
                >
                  {user.numOfFollowing}
                </Text>
                <Text
                  style={{
                    color: "#000000",
                    fontSize: 12,
                  }}
                >
                  {"Đang theo dõi"}
                </Text>
              </TouchableOpacity>
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
                  paddingVertical: 8,
                  height: 30,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "#000000",
                    fontSize: 13,
                    fontWeight: "500",
                    alignContent: "center",
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
                  paddingVertical: 8,
                  height: 30,
                }}
              >
                <Text
                  style={{
                    color: "#000000",
                    fontSize: 13,
                    fontWeight: "500",
                    alignSelf: "center",
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
          isPostsLoading ? (
            <>
              <ActivityIndicator
                size="large"
                color="#ED2939"
                style={{ paddingVertical: 12 }}
              />
            </>
          ) : posts.data.length == 0 ? (
            <View>
              <Text style={{ textAlign: "center" }}>Chưa có bài viết nào</Text>
            </View>
          ) : (
            <View>
              {posts.data.map((post, index) => (
                <PostCard
                  handleOpenPress={() => handleOpenPress(post.id)}
                  data={post}
                  key={index}
                />
              ))}
            </View>
          )
        ) : (
          <>
            <View>
              <TicketCard />
              <TicketCard />
              <TicketCard />
              <TicketCard />
              <TicketCard />
              <TicketCard />
            </View>
          </>
        )}
      </ScrollView>

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        handleIndicatorStyle={{ backgroundColor: "black" }}
        backgroundStyle={{}}
        backdropComponent={renderBackdrop}
      >
        <View>
          <View
            style={{
              height: 40,
              backgroundColor: "white",
              width: "100%",
              borderStyle: "solid",
              borderColor: "#bababa",
              borderBottomWidth: 0.5,
              alignItems: "center",
            }}
          >
            <Text style={styles.containerHeadlineModal}>Bình luận</Text>
          </View>

          {isCommentLoading ? (
            <>
              <ActivityIndicator
                size="large"
                color="#ED2939"
                style={{ paddingVertical: 12 }}
              />
            </>
          ) : commentList?.length == 0 ? (
            <View>
              <Text style={{ marginVertical: 20, textAlign: "center" }}>
                Hãy là người bình luận đầu tiên
              </Text>
            </View>
          ) : (
            commentList?.map((item) => (
              <View style={{ height: 55 }}>
                <Pressable
                  style={{
                    flexDirection: "row",
                    paddingHorizontal: 18,
                    paddingVertical: 12,
                  }}
                >
                  <Pressable
                    onPress={() => {}}
                    style={[styles.avatar, styles.actionPadding]}
                  >
                    <Image
                      style={[styles.avaImg, { marginRight: 10 }]}
                      resizeMode="cover"
                      source={{ uri: item.user.avatar }}
                    />
                  </Pressable>
                  <View style={{}}>
                    <View style={styles.line1}>
                      <Text>
                        {" "}
                        {item.user.email.split("@")[0]} •{" "}
                        {timeAgo(item.updatedAt)}
                      </Text>
                    </View>
                    <Text style={{ paddingTop: 3, paddingRight: 45 }}>
                      {" "}
                      {item.comment}
                    </Text>
                  </View>
                </Pressable>
              </View>
            ))
          )}
        </View>
        <View style={{}}>
          <View style={styles.searchSection}>
            <Image
              style={[styles.avaImg, { marginRight: 10 }]}
              resizeMode="cover"
              source={{ uri: user.avatar }}
            />
            <TextInput
              style={[styles.input, { width: "90%" }]}
              multiline={true}
              placeholder="Viết bình luận ..."
              underlineColorAndroid="transparent"
              value={userCmt}
              onChangeText={setUserCmt}
            />
            <Pressable
              onPress={handlePostComment}
              disabled={isPostCommentLoading}
            >
              <SvgXml style={{ marginLeft: 5 }} xml={sendCommentIcon} />
            </Pressable>
          </View>
        </View>
      </BottomSheet>
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
  containerModal: {
    flex: 1,
    alignItems: "center",
  },
  contentContainerModal: {
    flex: 1,
    alignItems: "center",
  },
  containerHeadlineModal: {
    fontSize: 16,
    fontWeight: "600",
    padding: 5,
    color: "black",
  },
  line1: {
    flexDirection: "row",
    alignContent: "center",
    // height: 10,
    marginRight: 15,
  },
  avaImg: {
    height: 30,
    width: 30,
    borderRadius: 30 / 2,
  },
  searchSection: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    backgroundColor: "#F3F3F3",
    color: "#424242",
    borderRadius: 7,
    flex: 1,
    padding: 10,
    paddingTop: 10,
  },
});
