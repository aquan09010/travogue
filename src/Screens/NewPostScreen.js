import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Pressable,
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
  FlatList,
} from "react-native";
import { SvgXml } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import { ParkIconActive } from "@/Assets/Icons/Where";
import React, {
  useLayoutEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
} from "react";
import {
  SearchIcon,
  ArrowLeft,
  ArrowLeftBlack,
  SearchIconBlack,
} from "@/Assets/Icons/Navigation";
import * as ImagePicker from "expo-image-picker";

import { MiniLocation } from "@/Assets/Icons/Card";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import FollowingTab from "@/Components/FollowingTab";
const Tab = createMaterialTopTabNavigator();
import { Animated } from "react-native";
import { useStateContext } from "@/Context/StateContext";
import { getFollowers, getFollowing } from "@/Hooks/FollowHooks";
import { ActivityIndicator } from "react-native";
import { isAllOf } from "@reduxjs/toolkit";
import {
  ImagePostIcon,
  LocationPostIcon,
  PeoplePostIcon,
} from "@/Assets/Icons/Proflie";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetTextInput,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { CancelIcon } from "@/Assets/Icons/DetailIcon";
import { searchActivities } from "@/Hooks/TravelActivityHooks";
import { searchCities } from "@/Hooks/CityHooks";
export default function NewPostScreen({ route }) {
  const { tab } = route.params;
  // const { activities, isSearchActivitiesLoading, searchActivitiesError } =
  //   searchActivities(accessToken, searchQuery);

  const navigation = useNavigation();
  const gotoHost = async (e) => {
    e.preventDefault();
    navigation.navigate("HostProfile");
  };

  const handleCheckout = () => {
    navigation.navigate("Main");
  };
  const { accessToken, user } = useStateContext();

  const [searchQuery, setSearchQuery] = useState("");
  const { activities, isSearchActivitiesLoading, searchActivitiesError } =
    searchActivities(accessToken, searchQuery);

  const [images, setImages] = useState([]);
  const [place, setPlace] = useState();
  const [taggedUsers, setTaggedUsers] = useState([]);
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [1, 1],
      quality: 1,
      allowsMultipleSelection: true,
      orderedSelection: true,
    });
    console.log(result);
    if (!result.canceled) {
      setImages(result.assets.map((asset) => asset.uri));
    }
  };
  const snapPoints = useMemo(() => ["95%"], []);
  const bottomSheetRef = React.createRef(BottomSheet);
  const bottomSheetRef1 = React.createRef(BottomSheet);

  const handleClosePress = () => {
    Keyboard.dismiss();
    bottomSheetRef.current?.close();
  };

  const handleOpenPress = () => {
    bottomSheetRef.current?.expand();
  };
  const handleClosePress1 = () =>
    bottomSheetRef1.current?.close(Keyboard.dismiss());

  const handleOpenPress1 = () => {
    bottomSheetRef1.current?.expand();
  };
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
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.statusBar}>
        <Pressable onPress={() => navigation.goBack()}>
          <SvgXml xml={ArrowLeftBlack} />
        </Pressable>
        <Text style={styles.title}>Đăng bài viết</Text>
        <Pressable style={styles.button} onPress={() => {}}>
          <Text style={styles.checkout}>Đăng</Text>
        </Pressable>
      </View>
      <ScrollView
        style={{ height: "100%" }}
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={styles.status}>
          <Image
            style={{
              height: 40,
              width: 40,
              borderRadius: 40 / 2,
              width: 40,
            }}
            resizeMode="cover"
            source={{ uri: user.avatar }}
          />
          <View style={{ marginLeft: 8 }}>
            <Text style={{ fontSize: 12, color: "#000", textAlign: "left" }}>
              <Text style={styles.boldText}>{user.email.split("@")[0]}</Text>
              {place ? (
                <>
                  <Text>{` đang ở `}</Text>
                  <Text
                    onPress={() =>
                      navigation.navigate("Detail", { activityId: place.id })
                    }
                    style={styles.boldText}
                  >
                    {place?.activityName}
                  </Text>
                </>
              ) : (
                <></>
              )}
            </Text>
            <Text
              style={{
                fontSize: 10,
                color: "#767676",
                marginTop: 6,
                textAlign: "left",
              }}
            >
              {formatDate(new Date())}
            </Text>
          </View>
        </View>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <TextInput
            multiline={true}
            autoFocus={false}
            style={{
              paddingHorizontal: 14,
              paddingVertical: 10,
              height: "auto",
              textAlignVertical: "top",
              fontSize: 18,
            }}
            placeholder="Bạn đang ở đâu đấy? "
            placeholderTextColor="grey"
          />
        </TouchableWithoutFeedback>

        <ScrollView style={{ height: "auto", flexDirection: "row" }}>
          {images ? (
            images.map((image) => (
              <Image
                source={{ uri: image }}
                style={{
                  width: 300,
                  height: 300,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              />
            ))
          ) : (
            <></>
          )}
        </ScrollView>
        <Pressable
          style={{
            flexDirection: "row",
          }}
          onPress={pickImage}
        >
          <View
            style={{
              margin: 10,
              justifyContent: "center",
              alignItems: "center",
              height: 25,
              width: 30,
            }}
          >
            <SvgXml xml={ImagePostIcon} />
          </View>
          <Text style={{ alignSelf: "center", fontSize: 18 }}>Ảnh/Video</Text>
        </Pressable>
        <Pressable
          style={{
            flexDirection: "row",
          }}
          onPress={() => handleOpenPress()}
        >
          <View
            style={{
              margin: 10,
              justifyContent: "center",
              alignItems: "center",
              height: 25,
              width: 30,
            }}
          >
            <SvgXml xml={LocationPostIcon} />
          </View>
          <Text style={{ alignSelf: "center", fontSize: 18 }}>Địa điểm</Text>
        </Pressable>
        <Pressable
          style={{
            flexDirection: "row",
          }}
          onPress={() => handleOpenPress1()}
        >
          <View
            style={{
              margin: 10,
              justifyContent: "center",
              alignItems: "center",
              height: 25,
              width: 30,
            }}
          >
            <SvgXml xml={PeoplePostIcon} />
          </View>
          <Text style={{ alignSelf: "center", fontSize: 18 }}>
            Gắn thẻ người khác
          </Text>
        </Pressable>
      </ScrollView>
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        handleIndicatorStyle={{ backgroundColor: "black" }}
        backgroundStyle={{}}
        backdropComponent={renderBackdrop}
      >
        <TouchableOpacity
          style={{
            position: "absolute",
            top: 0,
            left: 10,
            width: 25,
            height: 25,
            flexDirection: "row",
            justifyContent: "center",
            paddingBottom: 10,
          }}
          onPress={() => handleClosePress()}
        >
          <SvgXml style={{ alignSelf: "center" }} xml={CancelIcon} />
        </TouchableOpacity>
        <View style={{ marginTop: 25 }}>
          <View style={styles.mainView}>
            <View style={styles.containerInput}>
              <TextInput
                style={styles.inputArea}
                placeholder="Tìm kiếm"
                value={searchQuery}
                onChangeText={(q) => setSearchQuery(q)}
                autoFocus={false}
              />
            </View>
          </View>
          {isSearchActivitiesLoading ? (
            <>
              <ActivityIndicator
                size="large"
                color="#ED2939"
                style={{ paddingVertical: 12 }}
              />
              <Text
                style={{
                  color: "#ED2939",
                  textAlign: "center",
                  paddingBottom: 20,
                  fontSize: 14,
                }}
              >
                Please wait...
              </Text>
            </>
          ) : searchActivitiesError ? (
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
            <View style={styles.mainView}>
              <FlatList
                data={activities.data.data}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.suggestionItem}
                    onPress={() => {
                      setPlace(item);
                      handleClosePress();
                    }}
                  >
                    {/* <Text style={styles.suggestionText}>{item.activityName}</Text> */}
                    <View style={styles.container2}>
                      <Image
                        source={{ uri: item.mainImage }}
                        style={styles.image}
                      />
                      <View style={styles.textContainer}>
                        <Text style={[styles.text, styles.textStyle1]}>
                          {item.activityName}
                        </Text>
                        <Text style={styles.text}>{item.categoryName}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}
        </View>
      </BottomSheet>
      <BottomSheet
        ref={bottomSheetRef1}
        index={-1}
        snapPoints={snapPoints}
        handleIndicatorStyle={{ backgroundColor: "black" }}
        backgroundStyle={{}}
        backdropComponent={renderBackdrop}
      >
        <TouchableOpacity
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            width: 25,
            height: 25,
            flexDirection: "row",
            justifyContent: "center",
            paddingBottom: 10,
          }}
          onPress={() => handleClosePress1()}
        >
          <SvgXml style={{ alignSelf: "center" }} xml={CancelIcon} />
        </TouchableOpacity>
      </BottomSheet>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  mainView: {
    margin: 16,
  },
  container: {
    backgroundColor: "#fff",
    height: "100%",
    flex: 1,
  },
  containerInput: {
    borderRadius: 15,
    borderStyle: "solid",
    borderColor: "#e8e8e8",
    borderWidth: 1,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingVertical: 15,
  },
  container2: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputArea: {
    height: "100%",
    width: "100%",
  },
  statusBar: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
  status: {
    alignSelf: "stretch",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
  checkout: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "left",
  },
  button: {
    borderRadius: 7,
    backgroundColor: "#ed2939",
    borderStyle: "solid",
    borderColor: "#fff",
    borderWidth: 1,
    overflow: "hidden",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  boldText: {
    fontWeight: "600",
  },
  suggestionItem: {
    borderBottomWidth: 1,
    borderColor: "#e8e8e8",
    borderStyle: "solid",
  },
  container2: {
    flexDirection: "row",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
  },
  text: {
    fontSize: 16,
  },
  textStyle1: {
    fontWeight: "500",
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
});
