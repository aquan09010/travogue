import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Pressable,
  Animated,
} from "react-native";
import { SearchIcon } from "@/Assets/Icons/Search";
import { SvgXml } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import { MiniLocation, StarIcon } from "@/Assets/Icons/Card";
import HeartButton from "./HeartButton";
import React, { useCallback, useMemo, useRef, useState } from "react";
import Swiper from "react-native-swiper";
import { CommentIcon, HeartIcon } from "@/Assets/Icons/DetailIcon";
import {
  BookmarkIcon,
  BookmarkIconSelected,
  CommentBlackIcon,
  DeleteIcon,
  HeartBlackIcon,
  HeartSeletetedIcon,
} from "@/Assets/Icons/Proflie";
import { deleteLikeHook, postLikeHook } from "@/Hooks/PostHooks";
import { useStateContext } from "@/Context/StateContext";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { ResizeMode, Video } from "expo-av";

function formatDate(dateString) {
  // Parse the date string into a Date object
  const date = new Date(dateString);

  // Get the current year
  const currentYear = new Date().getFullYear();

  // Choose the format based on the year
  const formattedDate = date.toLocaleDateString(undefined, {
    day: "2-digit",
    month: "2-digit",
    year: currentYear === date.getFullYear() ? undefined : "numeric",
  });

  return formattedDate;
}

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

const imageExtensions = ["jpg", "jpeg", "png", "gif", "webp"];
const videoExtensions = ["mp4", "mov"];

export default function PostCard({ data, handleOpenPress, handleOpenPress1 }) {
  // const [selectedBookmark, setSelectedBookmark] = useState(false);
  const [liked, setLiked] = useState(data.liked);
  const [numOfLikes, setNumOfLikes] = useState(data.numOfLikes);
  const [numOfComments, setNumOfComments] = useState(data.numOfComments);

  const { accessToken } = useStateContext();

  const { postLike } = postLikeHook();
  const { deleteLike } = deleteLikeHook();

  const handleLike = async (e) => {
    e.preventDefault();

    if (!liked) {
      setLiked(true);
      setNumOfLikes((numOfLikes) => numOfLikes + 1);
      await postLike(accessToken, data.id);
    } else {
      setLiked(false);
      setNumOfLikes((numOfLikes) => numOfLikes - 1);
      await deleteLike(accessToken, data.id);
    }
  };

  const [selectedBookmark, setSelectedBookmark] = useState(false);
  const snapPoints = useMemo(() => ["50%", "90%"]);
  const bottomSheetRef = useRef < BottomSheet > null;
  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

  const navigation = useNavigation();

  const ref = useRef(null);
  return (
    <View
      style={{
        borderBottomWidth: 1,
        borderColor: "#767676",
        paddingBottom: 10,
        paddingTop: 5,
      }}
    >
      <View style={{ paddingHorizontal: 10 }}>
        <View style={styles.status}>
          <Pressable
            onPress={() =>
              navigation.navigate("ProfileScreen", { userId: data.user.id })
            }
          >
            <Image
              style={{
                height: 40,
                width: 40,
                borderRadius: 40 / 2,
                width: 40,
              }}
              resizeMode="cover"
              source={{ uri: data.user.avatar }}
            />
          </Pressable>

          <View style={{ marginLeft: 8 }}>
            <Text style={{ fontSize: 12, color: "#000", textAlign: "left" }}>
              <Text style={styles.boldText}>
                {data.user.email.split("@")[0]}{" "}
              </Text>
              {data.travelActivity && (
                <>
                  <Text>{`đang ở`}</Text>
                  <Text
                    onPress={() =>
                      navigation.navigate("Detail", {
                        activityId: data.travelActivity.id,
                      })
                    }
                  >
                    <Text style={styles.boldText}>
                      {" "}
                      {data.travelActivity.activityName}
                    </Text>
                  </Text>
                </>
              )}
            </Text>

            {data.tags.length === 2 ? (
              <Text style={{ fontSize: 12, color: "#000", textAlign: "left" }}>
                <Text>{`cùng với `}</Text>
                <Text
                  style={styles.boldText}
                  onPress={() =>
                    navigation.navigate("ProfileScreen", {
                      userId: data.tags[0].user.id,
                    })
                  }
                >
                  {data.tags[0].user.email.split("@")[0]}
                </Text>
                <Text>{" và "}</Text>
                <Text
                  style={styles.boldText}
                  onPress={() =>
                    navigation.navigate("ProfileScreen", {
                      userId: data.tags[1].user.id,
                    })
                  }
                >
                  {data.tags[1].user.email.split("@")[0]}
                </Text>
              </Text>
            ) : data.tags.length === 1 ? (
              <Text style={{ fontSize: 12, color: "#000", textAlign: "left" }}>
                <Text>{`cùng với `}</Text>
                <Text
                  style={styles.boldText}
                  onPress={() =>
                    navigation.navigate("ProfileScreen", {
                      userId: data.tags[0].user.id,
                    })
                  }
                >
                  {data.tags[0].user.email.split("@")[0]}
                </Text>
              </Text>
            ) : data.tags.length > 2 ? (
              <Text style={{ fontSize: 12, color: "#000", textAlign: "left" }}>
                <Text>{`cùng với `}</Text>
                <Text
                  style={styles.boldText}
                  onPress={() =>
                    navigation.navigate("ProfileScreen", {
                      userId: data.tags[0].user.id,
                    })
                  }
                >
                  {data.tags[0].user.email.split("@")[0]}
                </Text>
                <Text>{" và "}</Text>
                <Text onPress={() => {}} style={styles.boldText}>
                  {data.tags.length - 1} người khác
                </Text>
              </Text>
            ) : (
              <></>
            )}

            <Text
              style={{
                fontSize: 10,
                color: "#767676",
                marginTop: 6,
                textAlign: "left",
              }}
            >
              {formatDate(data.createdAt)}
            </Text>
          </View>
        </View>
        {data.images && (
          <Swiper
            style={styles.wrapper}
            dot={
              <View
                style={{
                  backgroundColor: "rgba(0,0,0,.2)",
                  width: 4,
                  height: 4,
                  borderRadius: 4,
                  marginLeft: 3,
                  marginRight: 3,
                  marginTop: 3,
                  marginBottom: -50,
                }}
              />
            }
            activeDot={
              <View
                style={{
                  backgroundColor: "#007aff",
                  width: 5,
                  height: 5,
                  borderRadius: 4,
                  marginLeft: 3,
                  marginRight: 3,
                  marginTop: 3,
                  marginBottom: -50,
                }}
              />
            }
          >
            {data.images.split(";").map((image, index) => {
              const extension = image.split(".").pop();
              if (imageExtensions.includes(extension)) {
                return (
                  <Image
                    source={{ uri: image }}
                    style={styles.slide1}
                    resizeMode="cover"
                    key={index}
                  />
                );
              } else if (videoExtensions.includes(extension)) {
                return (
                  <Video
                    ref={ref}
                    style={styles.slide1}
                    resizeMode={ResizeMode.COVER}
                    shouldPlay={false}
                    isLooping
                    useNativeControls
                    source={{ uri: image }}
                    key={index}
                  />
                );
              }
            })}
          </Swiper>
        )}

        <Text style={{ paddingTop: 8, paddingBottom: 8 }}>{data.caption}</Text>
        <View style={styles.frameParent}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Pressable onPress={handleLike}>
              {liked ? (
                <SvgXml xml={HeartSeletetedIcon} />
              ) : (
                <SvgXml xml={HeartBlackIcon} />
              )}
            </Pressable>
            <Pressable onPress={handleOpenPress1}>
              <Text style={{ marginLeft: 5, color: "gray" }}>{numOfLikes}</Text>
            </Pressable>
            <Pressable onPress={handleOpenPress} style={{ marginLeft: 15 }}>
              <SvgXml xml={CommentBlackIcon} />
            </Pressable>
            <Pressable>
              <Text style={{ marginLeft: 5, color: "gray" }}>
                {numOfComments}
              </Text>
            </Pressable>
          </View>
          <Pressable onPress={() => {}} style={{ marginLeft: 15 }}>
            <SvgXml xml={DeleteIcon} />
          </Pressable>
          {/* <Pressable onPress={() => setSelectedBookmark(!selectedBookmark)}>
            <SvgXml
              xml={
                selectedBookmark === true ? BookmarkIconSelected : BookmarkIcon
              }
            />
          </Pressable> */}
        </View>

        {!data.latestComment ? (
          <></>
        ) : (
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
                source={{ uri: data.latestComment.user.avatar }}
              />
            </Pressable>
            <View style={{}}>
              <View style={styles.line}>
                <Text style={{ color: "gray" }}>
                  {data.latestComment.user.email.split("@")[0]} •{" "}
                  {timeAgo(data.latestComment.updatedAt)}
                </Text>
              </View>
              <Text style={{ paddingRight: 45 }}>
                {data.latestComment.comment}
              </Text>
            </View>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { height: 300 },
  slide1: {
    width: "100%",
    height: 290,
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
  boldText: {
    fontWeight: "600",
  },

  status: {
    alignSelf: "stretch",
    flex: 1,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 0,
    paddingVertical: 8,
  },

  frameParent: {
    alignSelf: "stretch",
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingBottom: 8,
  },
  avaImg: {
    height: 40,
    width: 40,
    borderRadius: 40 / 2,
  },
});
