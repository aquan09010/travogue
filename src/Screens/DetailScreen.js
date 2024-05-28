import { ArrowLeft, SearchIcon } from "@/Assets/Icons/Navigation";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { SvgXml } from "react-native-svg";

import {
  CancelIcon,
  CheckIcon,
  CommentIcon,
  HeartIcon,
  HeartLiked,
  LanguageIcon,
  MiniLocation1,
  MinusIcon,
  NoticeIcon,
  PlusIcon,
  ShareIcon,
} from "@/Assets/Icons/DetailIcon";
import { CalendarIcon, PeopleIcon } from "@/Assets/Icons/OrderConfirm";
import { LanguageBlackIcon } from "@/Assets/Icons/Proflie";
import StarRating from "@/Components/StarRating";
import { useStateContext } from "@/Context/StateContext";
import {
  getCommentsByActivity,
  getDetailActivity,
  postCommentsByActivity,
} from "@/Hooks/TravelActivityHooks";
import Modal from "react-native-modal";
import Swiper from "react-native-swiper";
import { ResizeMode, Video } from "expo-av";
import { current } from "@reduxjs/toolkit";
import {
  addToWishlistHook,
  removeFromWishlistHook,
} from "@/Hooks/WishlistHook";

const imageExtensions = ["jpg", "jpeg", "png", "gif", "webp"];
const videoExtensions = ["mp4", "mov"];

export default function DetailScreen({ route }) {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  const goToOrder = async (e) => {
    setModalTicketVisible(false);
    e.preventDefault();
    navigation.navigate("OrderConfirm", {
      activity: {
        id: activity.data.id,
        name: activity.data.activityName,
        mainImage: activity.data.mainImage,
        date: selectedDate.date,
        time: formatTimeRange(selectedTime.startAt, selectedTime.endAt),
        insurances: activity.data.insuranceActivities,
        activityTimeFrameId: selectedTime.id
      },
      host: activity.data.host,
      data: {
        notes: userNotes,
        adultsPrice: selectedTime.adultsPrice,
        childrenPrice: selectedTime.childrenPrice,
        babyPrice: selectedTime.babyPrice,
        numOfAdults: adultQuantity,
        numOfChildren: childQuantity,
        numOfBabies: babyQuantity,
      },
    });
  };
  const gotoHost = (hostId) => {
    navigation.navigate("HostProfile", { hostId: hostId });
  };

  const { accessToken, user } = useStateContext();

  const { activity, isActivityLoading, activityError } = getDetailActivity(
    accessToken,
    route.params.activityId
  );

  const { addToWishlist, isAddToWishlistLoading, addWishlistError } =
    addToWishlistHook();

  const {
    removeFromWishlist,
    isRemoveFromWishlistLoading,
    removeWishlistError,
  } = removeFromWishlistHook();

  const [liked, setLiked] = useState(route.params.isLiked);

  const handlePressHeart = async () => {
    if (liked) {
      setLiked(false);
      await removeFromWishlist(accessToken, user.id, route.params.activityId);
    } else {
      setLiked(true);
      await addToWishlist(accessToken, user.id, route.params.activityId);
    }
  };

  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalTicketVisible, setModalTicketVisible] = useState(false);

  const toggleModal = async (e) => {
    e.preventDefault();
    setModalVisible(!isModalVisible);

    await getComments(accessToken, activity.data.id);
  };

  const toggleModalTicket = () => {
    setModalTicketVisible(!isModalTicketVisible);
  };

  // Call Comment API
  const { getComments, comments, setComments, isCommentLoading, commentError } =
    getCommentsByActivity();

  const { postComments, newComment, isPostCommentLoading, postCommentError } =
    postCommentsByActivity();

  const handlePostComment = async (e) => {
    e.preventDefault();

    await postComments(accessToken, activity.data.id, currentRating, userCmt);
    // setCurrentRating(4);
    setUserCmt("");
  };

  const [currentRating, setCurrentRating] = useState(4);
  const [userCmt, setUserCmt] = useState("");
  const [commentList, setCommentList] = useState([]);

  useEffect(() => {
    if (comments) setCommentList(comments.data);
  }, [comments]);

  useEffect(() => {
    if (newComment) {
      setCommentList([newComment.data.activityComment, ...commentList]);
    }
  }, [newComment]);

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

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [value, setValue] = useState(null);

  const renderDateItem = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.date}</Text>
        {item.id === selectedDate?.id && <SvgXml xml={CheckIcon} />}
      </View>
    );
  };

  const renderTimeItem = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.timeRange}</Text>
        {item.id === selectedTime?.id && <SvgXml xml={CheckIcon} />}
      </View>
    );
  };

  const formatTimeRange = (startAt, endAt) => {
    const formattedStart = startAt.slice(11, 16); // Extract "18:22"
    const formattedEnd = endAt.slice(11, 16);

    return `${formattedStart} - ${formattedEnd}`;
  };

  const [userNotes, setUserNotes] = useState("");

  const [adultQuantity, setAdultQuantity] = useState(1);
  const [childQuantity, setChildQuantity] = useState(1);
  const [babyQuantity, setBabyQuantity] = useState(1);

  const handleAdultDecrease = () => {
    setAdultQuantity(Math.max(0, adultQuantity - 1));
  };

  const handleAdultIncrease = () => {
    setAdultQuantity(adultQuantity + 1);
  };

  const handleChildDecrease = () => {
    setChildQuantity(Math.max(0, childQuantity - 1));
  };

  const handleChildIncrease = () => {
    setChildQuantity(childQuantity + 1);
  };

  const handleBabyDecrease = () => {
    setBabyQuantity(Math.max(0, babyQuantity - 1));
  };

  const handleBabyIncrease = () => {
    setBabyQuantity(babyQuantity + 1);
  };

  const ref = useRef(null);
  const [status, setStatus] = useState({});

  return (
    <View style={styles.container}>
      {isActivityLoading ? (
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}
        >
          <ActivityIndicator size="large" color="#ED2939" />
        </View>
      ) : activityError ? (
        <Text
          style={{
            color: "#A80027",
            textAlign: "center",
            paddingBottom: 20,
            fontSize: 16,
          }}
        >
          Something went wrong!
        </Text>
      ) : (
        <>
          <View style={{ flex: 1 }}>
            <Swiper>
              {activity.data.images.split(";").map((image, index) => {
                const extension = image.split(".").pop();
                if (imageExtensions.includes(extension)) {
                  return (
                    <Image
                      source={{ uri: image }}
                      style={styles.backgroundContainer}
                      resizeMode="contain"
                      key={index}
                    />
                  );
                } else if (videoExtensions.includes(extension)) {
                  return (
                    <Video
                      ref={ref}
                      style={styles.container}
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
          </View>

          <View style={styles.actionContainer}>
            {route.params.isExperience && (
              <Pressable
                onPress={() => gotoHost(activity.data.host.id)}
                style={[styles.avatar, styles.actionPadding]}
              >
                <Image
                  style={styles.avaImg}
                  resizeMode="cover"
                  source={{ uri: activity.data.host.avatar }}
                />
              </Pressable>
            )}

            <Pressable style={styles.actionPadding} onPress={handlePressHeart}>
              {liked ? <SvgXml xml={HeartLiked} /> : <SvgXml xml={HeartIcon} />}
            </Pressable>
            <Pressable
              onPress={toggleModal}
              style={[styles.actionPadding, styles.extraLine]}
            >
              <SvgXml xml={CommentIcon} />
              {/* <Text style={styles.text}>120</Text> */}
            </Pressable>
            <Pressable style={[styles.actionPadding, styles.extraLine]}>
              <SvgXml xml={ShareIcon} />
              {/* <Text style={styles.text}>120</Text> */}
            </Pressable>
          </View>
          <View
            style={[
              styles.mainView,
              {
                top: 0,
                left: 0,
                position: "absolute",
                paddingHorizontal: 18,
                paddingVertical: 14,
                width: "100%",
              },
            ]}
          >
            <View style={styles.statusBar}>
              <Pressable onPress={() => navigation.goBack()}>
                <SvgXml xml={ArrowLeft} />
              </Pressable>
              <Pressable onPress={() => {}}>
                <SvgXml xml={SearchIcon} />
              </Pressable>
            </View>
          </View>

          {route.params.isExperience && (
            <TouchableOpacity
              style={styles.buttonTicket}
              onPress={toggleModalTicket}
            >
              <Text style={[styles.textDetail, { color: "#ed2939" }]}>
                Từ {activity.data.generalPrice / 1000}K/người
              </Text>
              <View onPress={toggleModalTicket} style={styles.button}>
                <Text style={[styles.textDetail]}>Đặt ngay</Text>
              </View>
            </TouchableOpacity>
            // <View style={styles.buttonTicket}>
            //   <Button title=" Đặt ngay" onPress={toggleModalTicket}></Button>
            // </View>
          )}

          <View style={styles.detailContainer}>
            
            <View>
              <Text style={[styles.title]} numberOfLines={2}>
                {activity.data.activityName +
                  " - " +
                  activity.data.activityCategory.categoryName}
              </Text>

              <View style={[styles.container1]}>
                <View style={[styles.line]}>
                  <StarRating
                    disabled={true}
                    color="white"
                    rating={activity.data.averageRating}
                  />
                  <Text style={[styles.text]}>
                    {parseFloat(activity.data.averageRating).toFixed(1)}
                  </Text>
                </View>
                <View style={[styles.line]}>
                  <SvgXml xml={MiniLocation1} />
                  <Text style={[styles.text]}>{activity.data.city.name}</Text>
                    </View>
                    
                    {route.params.isExperience &&
                  activity.data.averageRating >= 4.8 && (
                    <View style={styles.topWrapper}>
                      <Text style={[styles.textDetail]}>Top trải nghiệm</Text>
                    </View>
                  )}
              </View>
              <View
                style={[styles.frameContainer, styles.frameParentShadowBox]}
              >
                {activity.data.tags.split(";").map((tag) => (
                  <View style={styles.wrapperSpaceBlock}>
                    <Text style={[styles.textTag]}>{tag}</Text>
                  </View>
                ))}
              </View>

              {route.params.isExperience && (
                <View style={[styles.line]}>
                  <SvgXml xml={LanguageIcon} />
                  <Text style={[styles.languageBorder]}>
                    {activity.data.languages}
                  </Text>
                </View>
              )}
            </View>
            <Text style={styles.textDetail}>{activity.data.description}</Text>
          </View>
        </>
      )}
      <Modal
        onBackButtonPress={() => setModalVisible(false)}
        onBackdropPress={() => setModalVisible(false)}
        swipeDirection="down"
        onSwipeComplete={toggleModal}
        isVisible={isModalVisible}
        avoidKeyboard={true}
        propagateSwipe={true}
        style={{
          justifyContent: "flex-end",
          width: "100%",
          padding: 0,
          margin: 0,
        }}
      >
        <View
          style={{
            bottom: 0,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            backgroundColor: "#fff",
            height: 500,
            minHeight: 100,
          }}
        >
          <View
            style={{
              paddingTop: 20,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 18,
              paddingVertical: 8,
            }}
          >
            <Text style={{ fontWeight: "600", fontSize: 20 }}>
              Bình luận
              <Text style={{ fontSize: 14 }}> ({commentList.length})</Text>
            </Text>
            <Pressable style={{}} onPress={toggleModal}>
              <SvgXml xml={CancelIcon} />
            </Pressable>
          </View>

          {isCommentLoading || isPostCommentLoading ? (
            <>
              <ActivityIndicator
                size="large"
                color="#ED2939"
                style={{ paddingVertical: 12 }}
              />
            </>
          ) : commentError ? (
            <Text
              style={{
                color: "#A80027",
                textAlign: "center",
                paddingBottom: 20,
                fontSize: 16,
              }}
            >
              {commentError.message}
            </Text>
          ) : commentList.length > 0 ? (
            <View style={{ height: 270 }}>
              <ScrollView>
                {commentList.map((item) => (
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
                      <View style={styles.line}>
                        <StarRating rating={item.rating} disabled={true} />
                        <Text>
                          {" "}
                          {item.user.email.split("@")[0]} •{" "}
                          {timeAgo(item.createdAt)}
                        </Text>
                      </View>
                      <Text style={{ paddingRight: 45 }}>{item.comment}</Text>
                    </View>
                  </Pressable>
                ))}
              </ScrollView>
            </View>
          ) : (
            <></>
          )}

          <View
            style={{
              position: "absolute",
              bottom: 0,
              borderColor: "#bababa",
              borderTopWidth: 1,
              paddingHorizontal: 18,
              paddingTop: 12,
              paddingBottom: 24,
              flexDirection: "row",
              width: "100%",
              flex: 1,
              borderStyle: "solid",
              height: 180,
            }}
          >
            <View
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
                  source={{ uri: user.avatar }}
                />
              </Pressable>
              <View style={{}}>
                <View style={[styles.line, { paddingBottom: 10 }]}>
                  {/* <SvgXml xml={TwoStarBar} /> */}
                  <StarRating
                    rating={currentRating}
                    onStarPress={setCurrentRating}
                  />
                </View>
                <TextInput
                  style={styles.inputArea}
                  placeholder="Viết bình luận..."
                  placeholderTextColor="#1b1b1b"
                  value={userCmt}
                  onChangeText={setUserCmt}
                ></TextInput>
              </View>
            </View>
            <Pressable
              style={{ position: "absolute", bottom: 20, right: 30 }}
              onPress={handlePostComment}
              disabled={isPostCommentLoading}
            >
              <View style={[styles.button1]}>
                <Text style={{ color: "#fff" }}>Đăng</Text>
              </View>
            </Pressable>
          </View>
        </View>
      </Modal>

      {route.params.isExperience && (
        <Modal
          onBackdropPress={() => setModalTicketVisible(false)}
          swipeDirection="down"
          onSwipeComplete={toggleModalTicket}
          isVisible={isModalTicketVisible}
          avoidKeyboard={true}
          propagateSwipe={true}
          style={{
            justifyContent: "flex-end",
            width: "100%",
            padding: 0,
            margin: 0,
          }}
        >
          <View
            style={{
              bottom: 0,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              backgroundColor: "#fff",
              height: 650,
              minHeight: 100,
            }}
          >
            <View
              style={{
                paddingTop: 20,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 18,
                paddingVertical: 8,
              }}
            >
              <Text style={{ fontWeight: "600", fontSize: 20 }}>Vé và giá</Text>
              <Pressable style={{}} onPress={toggleModalTicket}>
                <SvgXml xml={CancelIcon} />
              </Pressable>
            </View>
            <View
              style={{
                paddingHorizontal: 18,
                paddingVertical: 12,
              }}
            >
              <Text style={{ fontWeight: "600", fontSize: 14 }}>
                Chọn ngày và giờ
              </Text>
              <View style={styles.line}>
                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={activity.data?.activityDates}
                  maxHeight={300}
                  labelField="date"
                  valueField="date"
                  placeholder=" Chọn ngày"
                  value={selectedDate}
                  onChange={(item) => {
                    console.log("zzzzzzzzzzzz", item);
                    setSelectedDate(item);
                  }}
                  renderLeftIcon={() => (
                    <SvgXml style={{ marginRight: 10 }} xml={CalendarIcon} />
                  )}
                  renderItem={renderDateItem}
                />

                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={
                    selectedDate
                      ? selectedDate?.activityTimeFrames.map((e) => ({
                          ...e,
                          timeRange: formatTimeRange(e.startAt, e.endAt),
                        }))
                      : []
                  }
                  maxHeight={300}
                  labelField="timeRange"
                  valueField="timeRange"
                  placeholder=" Chọn giờ"
                  // value={
                  //   selectedTime
                  //     ? formatTimeRange(
                  //         selectedTime.startAt,
                  //         selectedTime.endAt
                  //       )
                  //     : "Chưa có"
                  // }
                  value={selectedTime}
                  onChange={(item) => {
                    setSelectedTime(item);
                  }}
                  renderLeftIcon={() => (
                    <SvgXml style={{ marginRight: 10 }} xml={CalendarIcon} />
                  )}
                  renderItem={renderTimeItem}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={[styles.line, { paddingTop: 10 }]}>
                  <SvgXml xml={PeopleIcon} />
                  <Text style={{ fontWeight: "600" }}>
                    {" "}
                    {selectedTime
                      ? selectedTime.numOfRegisteredGuests +
                        "/" +
                        selectedTime.maximumGuests
                      : ".../..."}
                  </Text>
                </View>
                <View style={[styles.line, { paddingTop: 10 }]}>
                  <SvgXml xml={LanguageBlackIcon} />
                  <Text style={{ fontWeight: "600" }}>
                    {" "}
                    {selectedTime ? selectedTime.languages : ""}
                  </Text>
                </View>
              </View>
              <View style={[styles.line, { paddingTop: 10 }]}>
                <SvgXml xml={NoticeIcon} />
                <Text style={{ fontStyle: "italic" }}> Lưu ý của Host</Text>
              </View>
              <View style={[styles.line, { paddingTop: 10 }]}>
                <Text style={{}}>{selectedTime?.hostNotes}</Text>
              </View>

              <View style={{ paddingTop: 10 }}>
                <Text style={{ fontWeight: "600", fontSize: 14 }}>
                  Vé của bạn{" "}
                </Text>
                <Text
                  style={{
                    fontStyle: "italic",
                    paddingTop: 10,
                    paddingBottom: 10,
                  }}
                >
                  {" "}
                  Gửi lời nhắn cho Host
                </Text>
                <TextInput
                  style={[styles.inputArea, { width: "100%" }]}
                  placeholder="Lời nhắn"
                  placeholderTextColor="#1b1b1b"
                  value={userNotes}
                  onChangeText={setUserNotes}
                ></TextInput>
                <View
                  style={{
                    paddingTop: 10,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View>
                    <Text style={{ fontWeight: "600", fontSize: 14 }}>
                      Người lớn
                    </Text>
                    <Text style={{ fontWeight: "600", fontSize: 14 }}>
                      {selectedTime?.adultsPrice.toLocaleString()} VND
                    </Text>
                  </View>
                  <View style={styles.minusParent}>
                    <TouchableOpacity onPress={() => handleAdultDecrease()}>
                      <SvgXml xml={MinusIcon} />
                    </TouchableOpacity>
                    <Text style={{ color: "black" }}>{adultQuantity}</Text>
                    <TouchableOpacity onPress={() => handleAdultIncrease()}>
                      <SvgXml xml={PlusIcon} />
                    </TouchableOpacity>
                  </View>
                </View>
                <View
                  style={{
                    paddingTop: 10,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View>
                    <Text style={{ fontWeight: "600", fontSize: 14 }}>
                      Trẻ em (2 đến dưới 12 tuổi){" "}
                    </Text>
                    <Text style={{ fontWeight: "600", fontSize: 14 }}>
                      {" "}
                      {selectedTime?.childrenPrice.toLocaleString()} VND
                    </Text>
                  </View>
                  <View style={styles.minusParent}>
                    <TouchableOpacity onPress={() => handleChildDecrease()}>
                      <SvgXml xml={MinusIcon} />
                    </TouchableOpacity>
                    <Text style={{ color: "black" }}>{childQuantity}</Text>
                    <TouchableOpacity onPress={() => handleChildIncrease()}>
                      <SvgXml xml={PlusIcon} />
                    </TouchableOpacity>
                  </View>
                </View>
                <View
                  style={{
                    paddingTop: 10,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View>
                    <Text style={{ fontWeight: "600", fontSize: 14 }}>
                      Em bé (Dưới 2 tuổi)
                    </Text>
                    <Text style={{ fontWeight: "600", fontSize: 14 }}>
                      {selectedTime?.babyPrice.toLocaleString()} VND
                    </Text>
                  </View>
                  <View style={styles.minusParent}>
                    <TouchableOpacity onPress={() => handleBabyDecrease()}>
                      <SvgXml xml={MinusIcon} />
                    </TouchableOpacity>
                    <Text style={{ color: "black" }}>{babyQuantity}</Text>
                    <TouchableOpacity onPress={() => handleBabyIncrease()}>
                      <SvgXml xml={PlusIcon} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              position: "absolute",
              bottom: 0,
              borderColor: "#bababa",
              borderTopWidth: 1,
              paddingHorizontal: 18,
              paddingTop: 12,
              paddingBottom: 24,
              flexDirection: "row",
              width: "100%",
              flex: 1,
              borderStyle: "solid",
              height: 100,
              justifyContent: "space-between",
            }}
          >
            <View style={{}}>
              <Text style={{}}>Tổng thanh toán</Text>
              <Text
                style={{ fontWeight: "600", fontSize: 16, color: "#ed2939" }}
              >
                {selectedTime
                  ? (
                      adultQuantity * selectedTime.adultsPrice +
                      childQuantity * selectedTime.childrenPrice +
                      babyQuantity * selectedTime.babyPrice
                    ).toLocaleString()
                  : 0}{" "}
                VND
              </Text>
            </View>
            <TouchableOpacity
              onPress={goToOrder}
              style={[styles.button2, { height: 45, alignItems: "center" }]}
            >
              <Text style={{ color: "#fff" }}>Tiếp tục</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
  mainView: { paddingBottom: 0, paddingTop: "15%" },
  statusBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  actionContainer: {
    top: 400,
    right: 30,
    left: 360,
    alignItems: "center",
    position: "absolute",
  },
  actionPadding: {
    paddingBottom: 15,
  },
  extraLine: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
    color: "#fff",
    fontSize: 12,
  },
  avaImg: {
    height: 40,
    width: 40,
    borderRadius: 40 / 2,
  },
  detailContainer: {
    bottom: 40,
    left: "50%",
    marginLeft: -187.5,
    width: 375,
    position: "absolute",
  },
  textDetail: {
    color: "#fff",
    fontSize: 14,
    textAlign: "left",
    fontWeight: "600",
  },
  topWrapper: {
    paddingVertical: 4,
    paddingHorizontal: 5,
    backgroundColor: "#ed2939",
    borderRadius: 7,
    width: "28%",
    flexDirection: "row",
  },
  frameParentShadowBox: {
    alignItems: "center",
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
    flexDirection: "row",
    paddingBottom: 8,
  },
  wrapperSpaceBlock: {
    paddingHorizontal: 6,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingVertical: 2,
    flexDirection: "row",
    borderRadius: 7,
  },
  title: {
    fontSize: 20,
    width: "70%",
    textShadowRadius: 4,
    textShadowOffset: {
      width: 0,
      height: 4,
    },
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textAlign: "left",
    color: "#fff",
    fontWeight: "600",
    paddingTop: 10,
    paddingBottom: 5,
    textTransform: "capitalize",
  },

  text: {
    marginLeft: 4,
    textAlign: "left",
    color: "#fff",
  },

  textTag: {
    color: "#151515",
    textAlign: "left",
    textTransform: "capitalize",
  },
  lchSWrapper: {
    marginLeft: 4,
  },
  frameContainer: {
    marginTop: 8,
    gap: 6,
    alignSelf: "stretch",
    display: "flex",
    flexWrap: "wrap" /* Enable wrapping of tags */,
  },
  languageBorder: {
    width: 210,
    marginLeft: 4,
    textAlign: "left",
    color: "#fff",
    textTransform: "capitalize",
  },
  line: {
    flexDirection: "row",
    alignContent: "center",
    // height: 10,
    marginRight: 15,
  },
  container1: {
    alignContent: "center",
    flexDirection: "row",
  },
  buttonTicket: {
    top: 550,
    left: 16,
    alignItems: "center",
    position: "absolute",
  },
  checkout: {
    fontSize: 14,
    color: "#fff",
  },
  button: {
    borderRadius: 7,
    backgroundColor: "#ed2939",
    borderStyle: "solid",
    borderColor: "#fff",
    borderWidth: 1,
    width: 100,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    marginTop: 5
  },
  inputArea: {
    borderRadius: 7,
    backgroundColor: "#E8E8E8",
    color: "#1b1b1b",
    paddingVertical: 10,
    paddingHorizontal: 18,
    width: 275,
    height: 50,
  },
  button1: {
    borderRadius: 7,
    backgroundColor: "#ed2939",
    borderColor: "#fff",
    flexWrap: "wrap",
    paddingVertical: 12,
    paddingHorizontal: 16,
    overflow: "hidden",
    width: 100,
    alignContent: "center",
    alignItems: "center",
  },
  button2: {
    borderRadius: 7,
    backgroundColor: "#ed2939",
    borderColor: "#fff",
    flexWrap: "wrap",
    paddingVertical: 14,
    overflow: "hidden",
    width: 100,
    alignContent: "center",
    alignItems: "center",
  },
  minusParent: {
    borderRadius: 7,
    borderStyle: "solid",
    borderColor: "#1b1b1b",
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 8,
    width: "25%",
  },
  dropdown: {
    width: "48%",
    marginTop: 12,
    height: 50,
    marginRight: 15,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  backgroundContainer: {
    flex: 1,
    resizeMode: "cover",
    width: undefined,
    height: undefined,
    backgroundColor: "#889DAD",
  },
  containerView: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
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
//   SafeAreaView,
//   Pressable,
//   FlatList,
//   Animated,
//   ActivityIndicator,
// } from "react-native";
// import Swiper from "react-native-swiper";
// export default function CloneSceen({}) {
//   return (
//     <View style={{ flex: 1 }}>
//       <Swiper>
//         <Image
//           source={require("../Assets/ava1.jpg")}
//           style={styles.backgroundContainer}
//         />
//         <Image
//           source={require("../Assets/ava1.jpg")}
//           style={styles.backgroundContainer}
//         />
//         <Image
//           source={require("../Assets/ava1.jpg")}
//           style={styles.backgroundContainer}
//         />
//       </Swiper>
//       <View style={styles.containerView}>
//         <Text>abc</Text>
//       </View>
//     </View>
//   );
// }
// const styles = StyleSheet.create({
//   backgroundContainer: {
//     flex: 1,
//     resizeMode: "cover",
//     width: undefined,
//     height: undefined,
//     backgroundColor: "#889DAD",
//   },
//   containerView: {
//     position: "absolute",
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });
