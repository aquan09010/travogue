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
  ScrollView,
  SafeAreaView,
  Pressable,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import PostCard from "@/Components/PostCard";
import { useStateContext } from "@/Context/StateContext";
import { getCommentsByPost, getFeed, getPostsByUser, postCommentsByPost } from "@/Hooks/PostHooks";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import BottomSheet, {
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";

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
      return `${intervalCount} ${
        intervalCount === 1 ? name : name + "s"
      } ago`;
    }
  }

  return "just now";
};

export default function CommunityScreen() {
  const snapPoints = useMemo(() => ["95%"], []);
  const bottomSheetRef = React.createRef(BottomSheet);
  // const bottomSheetRef = useRef < BottomSheet > null;
  const handleClosePress = () => bottomSheetRef.current?.close();

  const handleOpenPress = async (postId) => {
    bottomSheetRef.current?.expand();
    setActivePost(postId);
    await getComments(accessToken, postId);
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

  const { feed, isFeedLoading, error, refetchFeed } = getFeed(accessToken);

  const { getComments, comments, isCommentLoading, commentError } = getCommentsByPost();

  const [activePost, setActivePost] = useState();
  const [commentList, setCommentList] = useState([]); 
  const { postComments, newComment, isPostCommentLoading, postCommentError } = postCommentsByPost();
  const [userCmt, setUserCmt] = useState('');
  const handlePostComment = async (e) => {
    e.preventDefault();
    
    await postComments(accessToken, activePost, userCmt);
    setUserCmt('');
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
        refreshControl={
          <RefreshControl
            refreshing={isFeedLoading}
            onRefresh={refetchFeed}
          />
        }
      >
        
        {isFeedLoading ? (
            <>
              <ActivityIndicator
                size="large"
                color="#ED2939"
                style={{ paddingVertical: 12 }}
              />
            </>
          ) : feed.data.data.length == 0 ? (
            <View>
              <Text style={{ textAlign: "center" }}>Chưa có bài viết nào</Text>
            </View>
          ) : (
            <View>
                {feed.data.data.map((post, index) =>(<PostCard
                  handleOpenPress={() => handleOpenPress(post.id)}
                  data={post}
                  key={index}
                />)
                )}
            </View>
          )
        }
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

          {isCommentLoading ? <>
              <ActivityIndicator
                size="large"
                color="#ED2939"
                style={{ paddingVertical: 12 }}
              />
          </> : commentList?.length == 0 ?
            <View>
            <Text style={{ marginVertical: 20, textAlign: "center" }}>Hãy là người bình luận đầu tiên</Text>
          </View> : commentList?.map(item => <View style={{ height: 55 }}>
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
                    source={{uri: item.user.avatar}}
                  />
                </Pressable>
                <View style={{}}>
                  <View style={styles.line1}>
                    <Text>
                      {" "}
                      {item.user.email.split("@")[0]} • {timeAgo(item.updatedAt)}
                    </Text>
                  </View>
                  <Text style={{ paddingTop: 3, paddingRight: 45 }}>
                    {" "}
                    {item.comment}
                  </Text>
                </View>
              </Pressable>
            </View>) }
          
        </View>
        <View style={{}}>
          <View style={styles.searchSection}>
            <Image
              style={[styles.avaImg, { marginRight: 10 }]}
              resizeMode="cover"
              source={{uri: user.avatar}}
            />
            <TextInput
              style={[styles.input, { width: "90%" }]}
              multiline={true}
              placeholder="Viết bình luận ..."
              underlineColorAndroid="transparent"
              value={userCmt}
              onChangeText={setUserCmt}
            />
            <Pressable onPress={handlePostComment}
              disabled={isPostCommentLoading}>
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



// import {
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   TextInput,
//   TouchableOpacity,
//   ScrollView,
//   Button,
// } from "react-native";
// import React, { useCallback, useMemo, useRef, useState } from "react";
// import BottomSheet, {
//   BottomSheetBackdrop,
//   BottomSheetView,
// } from "@gorhom/bottom-sheet";

// export default function CommunityScreen() {
//   const snapPoints = useMemo(() => ["100%"], []);
//   const bottomSheetRef = React.createRef(BottomSheet);
//   // const bottomSheetRef = useRef < BottomSheet > null;
//   const handleClosePress = () => bottomSheetRef.current?.close();
//   const handleOpenPress = () => bottomSheetRef.current?.expand();
//   const handleCollapsePress = () => bottomSheetRef.current?.collapse();
//   const snapeToIndex = (index) => bottomSheetRef.current?.snapToIndex(index);
//   const renderBackdrop = useCallback(
//     (props) => (
//       <BottomSheetBackdrop
//         appearsOnIndex={0}
//         disappearsOnIndex={-1}
//         {...props}
//       />
//     ),
//     []
//   );

//   return (
//     <View style={styles.container}>
//       <Button title="Open" onPress={handleOpenPress} />
//       <Button title="Close" onPress={handleClosePress} />
//       <Button title="Collapse" onPress={handleCollapsePress} />
//       <Button title="Snap To 0" onPress={() => snapeToIndex(0)} />
//       <Button title="Snap To 1" onPress={() => snapeToIndex(1)} />
//       <Button title="Snap To 2" onPress={() => snapeToIndex(2)} />

//       <BottomSheet
//         ref={bottomSheetRef}
//         index={0}
//         snapPoints={snapPoints}
//         enablePanDownToClose={true}
//         handleIndicatorStyle={{ backgroundColor: "black" }}
//         backgroundStyle={{}}
//         backdropComponent={renderBackdrop}
//       >
//         <View style={styles.contentContainer}>
//           <Text style={styles.containerHeadline}>Bình luận</Text>
//         </View>
//       </BottomSheet>
//     </View>
//   );
// }
// const styles = StyleSheet.create({
//   containerModal: {
//     flex: 1,
//     alignItems: "center",
//   },
//   contentContainerModal: {
//     flex: 1,
//     alignItems: "center",
//   },
//   containerHeadlineModal: {
//     fontSize: 16,
//     fontWeight: "600",
//     padding: 5,
//     color: "black",
//   },
// });
