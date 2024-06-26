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
  RefreshControl,
} from "react-native";
import PostCard from "@/Components/PostCard";
import { useStateContext } from "@/Context/StateContext";
import {
  getCommentsByPost,
  getLikesListByPost,
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
  BottomSheetTextInput,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";

import { ArrowLeftBlack } from "@/Assets/Icons/Navigation";
import { getUserProfile } from "@/Hooks/UserHook";
import { followUserHook, unFollowUserHook } from "@/Hooks/FollowHooks";
import { BarIcon } from "../Assets/Icons/Proflie";
import { getTicketsByUser } from "@/Hooks/TicketHooks";

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

export default function ProfileScreen({ route }) {
  const navigation = useNavigation();

  const onRefresh = () => {
    refetchUserProfile();
    refetchPostsByUser();
  };

  const snapPoints = useMemo(() => ["95%"], []);
  const bottomSheetRef = React.createRef(BottomSheet);
  const bottomSheetRef1 = React.createRef(BottomSheet);

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

  const handleClosePress1 = () => bottomSheetRef1.current?.close();

  const handleOpenPress1 = async (postId) => {
    bottomSheetRef1.current?.expand();
    await getLikeListByPost(accessToken, postId);
  };

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

  let { userId } = route.params;
  const currentUser = !userId || userId == user.id;
  if (!userId) userId = user.id;

  const { userProfile, isUserLoading, refetchUserProfile } = getUserProfile(
    accessToken,
    userId
  );

  const { posts, isPostsLoading, error, refetchPostsByUser } = getPostsByUser(
    accessToken,
    userId
  );

  const { getComments, comments, isCommentLoading, commentError } =
    getCommentsByPost();
  const { getLikeListByPost, likeList, isLikeListLoading, likeListError } =
    getLikesListByPost();

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

  const [followStatus, setFollowStatus] = useState(false);

  useEffect(() => {
    if (!isUserLoading) setFollowStatus(userProfile.followStatus);
  }, [isUserLoading]);

  const { followUser, isFollowUserLoading } = followUserHook();
  const { unFollowUser, isUnFollowUserLoading } = unFollowUserHook();

  const { tickets, isTicketsLoading, refetchGetTicketsByUser } =
    getTicketsByUser(accessToken, userId);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#FFFFFF",
      }}
    >
      {!currentUser && (
        <View style={styles.statusBar}>
          <Pressable onPress={() => navigation.goBack()}>
            <SvgXml xml={ArrowLeftBlack} />
          </Pressable>
          {!isUserLoading && (
            <Text style={styles.title}>{userProfile.email.split("@")[0]}</Text>
          )}
          <Pressable onPress={() => {}}>
            {/* <SvgXml xml={SearchIconBlack} /> */}
          </Pressable>
        </View>
      )}
      {currentUser && (
        <>
          <Pressable
            style={styles.icon}
            onPress={() => navigation.navigate("ProfileSettingScreen")}
          >
            <SvgXml xml={BarIcon} />
          </Pressable>
        </>
      )}
      {isUserLoading ? (
        <></>
      ) : (
        <ScrollView
          style={{
            flex: 1,
            backgroundColor: "#FFFFFF",
            paddingBottom: 60,
          }}
          refreshControl={
            <RefreshControl refreshing={isUserLoading} onRefresh={onRefresh} />
          }
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
                source={{ uri: userProfile.avatar }}
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
                {userProfile.email.split("@")[0]}
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
                    {userProfile.numOfPosts}
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
                      userProfile: userProfile,
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
                    {userProfile.numOfFollowers}
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
                      userProfile: userProfile,
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
                    {userProfile.numOfFollowing}
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
                {currentUser ? (
                  <>
                    <TouchableOpacity
                      onPress={(e) => {
                        e.preventDefault();
                        navigation.navigate("NewPostScreen", {
                          userProfile: userProfile,
                        });
                      }}
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
                    </TouchableOpacity>
                    <Pressable
                      style={{
                        width: 108,
                        alignItems: "center",
                        backgroundColor: "#E8E8E8",
                        borderRadius: 7,
                        paddingVertical: 8,
                        height: 30,
                      }}
                      onPress={() => navigation.navigate("EditProfile")}
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
                    </Pressable>
                  </>
                ) : (
                  <>
                    <Pressable
                      onPress={async () => {
                        if (followStatus) {
                          await unFollowUser(accessToken, userProfile.id);
                          setFollowStatus(false);
                        } else {
                          await followUser(accessToken, userProfile.id);
                          setFollowStatus(true);
                        }
                      }}
                      disabled={isFollowUserLoading || isUnFollowUserLoading}
                      style={{
                        borderRadius: 15,
                        flex: 1,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        height: 30,
                      }}
                    >
                      {!followStatus ? (
                        <View style={styles.followButton}>
                          <Text style={styles.followText}>Theo dõi</Text>
                        </View>
                      ) : (
                        <View style={styles.followingButton}>
                          <Text style={styles.followingText}>
                            Đang theo dõi
                          </Text>
                        </View>
                      )}
                    </Pressable>
                    <View
                      style={{
                        marginLeft: 10,
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
                        {"Nhắn tin"}
                      </Text>
                    </View>
                  </>
                )}
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
                <Text style={{ textAlign: "center" }}>
                  Chưa có bài viết nào
                </Text>
              </View>
            ) : (
              <View style={{ paddingBottom: 50 }}>
                {posts.data.map((post, index) => (
                  <PostCard
                    handleOpenPress={() => handleOpenPress(post.id)}
                    handleOpenPress1={() => handleOpenPress1(post.id)}
                    data={post}
                    key={index}
                  />
                ))}
              </View>
            )
          ) : (
            <>
              {isTicketsLoading ? (
                <ActivityIndicator
                  size="large"
                  color="#ED2939"
                  style={{ paddingVertical: 12 }}
                />
              ) : (
                tickets.data.map((ticket) => <TicketCard data={ticket} />)
              )}
            </>
          )}
        </ScrollView>
      )}

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        handleIndicatorStyle={{ backgroundColor: "black" }}
        backgroundStyle={{}}
        backdropComponent={renderBackdrop}
      >
        <View style={{ paddingTop: 18 }}>
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
        </View>
        <View style={{ display: "flex", alignContent: "space-between" }}>
          <ScrollView style={{ height: "75%" }}>
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
                      onPress={() =>
                        navigation.navigate("ProfileScreen", {
                          userId: item.user.id,
                        })
                      }
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
                        <Text style={{ color: "gray" }}>
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
          </ScrollView>
          <View style={{}}>
            <View style={styles.searchSection}>
              <Image
                style={[styles.avaImg, { marginRight: 10 }]}
                resizeMode="cover"
                source={{ uri: user.avatar }}
              />
              <BottomSheetTextInput
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
        </View>
      </BottomSheet>

      <BottomSheet
        ref={bottomSheetRef1}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        handleIndicatorStyle={{ backgroundColor: "black" }}
        backgroundStyle={{}}
        backdropComponent={renderBackdrop}
      >
        <View style={{ paddingTop: 18 }}>
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
            <Text style={styles.containerHeadlineModal}>Lượt thích</Text>
          </View>
        </View>
        <View style={{ display: "flex", alignContent: "space-between" }}>
          <ScrollView style={{ height: "75%" }}>
            {isLikeListLoading ? (
              <>
                <ActivityIndicator
                  size="large"
                  color="#ED2939"
                  style={{ paddingVertical: 12 }}
                />
              </>
            ) : likeList?.data.length == 0 ? (
              <View>
                <Text style={{ marginVertical: 20, textAlign: "center" }}>
                  Chưa có lượt thích nào
                </Text>
              </View>
            ) : (
              likeList?.data.map((item) => (
                <View style={{ height: 55 }}>
                  <Pressable
                    style={{
                      flexDirection: "row",
                      paddingHorizontal: 18,
                      paddingVertical: 12,
                      alignItems: "center",
                    }}
                  >
                    <Pressable
                      onPress={() =>
                        navigation.navigate("ProfileScreen", {
                          userId: item.user.id,
                        })
                      }
                      style={[styles.avatar, styles.actionPadding]}
                    >
                      <Image
                        style={[styles.avaImg, { marginRight: 10 }]}
                        resizeMode="cover"
                        source={{ uri: item.user.avatar }}
                      />
                    </Pressable>
                    <View style={{}}>
                      <View>
                        <Text style={{ fontWeight: "500" }}>
                          {" "}
                          {item.user.email.split("@")[0]}
                        </Text>
                      </View>
                    </View>
                  </Pressable>
                </View>
              ))
            )}
          </ScrollView>
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
  followText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 14,
  },
  followingText: {
    color: "black",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 14,
  },
  followButton: {
    borderRadius: 15,
    backgroundColor: "#418dff",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 30,
  },
  followingButton: {
    borderRadius: 15,
    backgroundColor: "#e8e8e8",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 30,
  },
  icon: {
    position: "absolute",
    top: 60, // Adjust top spacing as needed
    right: 10, // Adjust right spacing as needed
    width: 30, // Adjust icon width as needed
    height: 30, // Adjust icon height as needed
    zIndex: 1000,
  },
});
