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
} from "react-native";
import { SvgXml } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import { ParkIconActive } from "@/Assets/Icons/Where";
import React, { useLayoutEffect, useState, useRef } from "react";
import {
  SearchIcon,
  ArrowLeft,
  ArrowLeftBlack,
  SearchIconBlack,
} from "@/Assets/Icons/Navigation";
import {
  CommentIcon,
  DotIcon,
  HeartIcon,
  LanguageIcon,
  MiniLocation1,
  MiniStar,
  ShareIcon,
} from "@/Assets/Icons/DetailIcon";
import { MiniLocation } from "@/Assets/Icons/Card";
import {
  AppleIcon,
  BoxCheckIcon,
  CalendarIcon,
  CashIcon,
  FailIcon,
  OrderIcon,
  PeopleIcon,
  SuccessIcon,
  TimeIcon,
  VisaIcon,
} from "@/Assets/Icons/OrderConfirm";
import { Dropdown } from "react-native-element-dropdown";
import { LocationDotIcon } from "@/Assets/Icons/LocationDot";
import { Video } from "expo-av";
import * as ImagePicker from "expo-image-picker";
import { PictureIcon } from "@/Assets/Icons/Home";
import Swiper from "react-native-swiper";
import { searchCities } from "@/Hooks/CityHooks";
import { useStateContext } from "@/Context/StateContext";
import { getChildCategories } from "@/Hooks/TravelActivityHooks";

const options = [
  "Nghệ thuật và văn hoá",
  "Thể thao",
  "Lịch sử",
  "Ẩm thực",
  "Vận dộng",
  "Hoang sơ",
  "Hiện đại",
  "Khác",
];
const imageExtensions = ["jpg", "jpeg", "png", "gif", "webp"];
const videoExtensions = ["mp4", "mov"];
export default function CreateNewExp({ route }) {
  const navigation = useNavigation();
  const gotoSetTicket = async (e) => {
    e.preventDefault();
    navigation.navigate("SetTicketPriceScreen", 
      {
        activityName: activityName,
        description: description,
        tags: selectedTags.join(';'),
        cityId: city,
        categoryId: categoryId,
        image: image,
        images: images
      }
    );
  };
  const [activityName, setActivityName] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [image, setImage] = useState(null);
  const [city, setCity] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);

  const { accessToken } = useStateContext();

  const { cities, isCitiesLoading, citiesError } = searchCities(
    accessToken,
    ""
  );

  const { childCategories, isLoading, error, refetchChildCategories } = getChildCategories(accessToken, "df8762e6-e127-4e75-ac55-da372c2fcb09");

  const pickMainImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
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
      setImages((images) => [...result.assets.map((asset) => asset.uri)]);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.statusBar}>
        <Pressable onPress={() => navigation.goBack()}>
          <SvgXml xml={ArrowLeftBlack} />
        </Pressable>
        <Text style={styles.title}>Tạo mới trải nghiệm</Text>
        <Pressable onPress={() => {}}></Pressable>
      </View>
      <ScrollView
        style={{
          height: "100%",
          width: "100%",
          paddingVertical: 8,
          paddingHorizontal: 10,
        }}
      >
        <View>
          <Text
            style={[
              styles.title1,
              { paddingVertical: 8, paddingHorizontal: 10 },
            ]}
          >
            Tên trải nghiệm
          </Text>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ paddingVertical: 8, paddingHorizontal: 10 }}>
              <TextInput
                multiline={true}
                autoFocus={false}
                style={{
                  borderRadius: 7,
                  borderStyle: "solid",
                  borderColor: "#767676",
                  borderWidth: 1,
                  flex: 1,
                  width: "100%",
                  height: 53,
                  flexDirection: "row",
                  paddingHorizontal: 12,
                  paddingVertical: 10,
                }}
                placeholder="Đặt tên cho trải nghiệm của bạn "
                placeholderTextColor="grey"
                value={activityName}
                onChangeText={(c) => {
                  setActivityName(c);
                }}
              />
            </View>
          </TouchableWithoutFeedback>
          <Text
            style={[
              styles.title1,
              { paddingVertical: 8, paddingHorizontal: 10 },
            ]}
          >
            Thành phố
          </Text>
          <View style={{ paddingVertical: 8, paddingHorizontal: 10 }}>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={[styles.th714, styles.th714FlexBox]}
              selectedTextStyle={[styles.th714, styles.th714FlexBox]}
              inputSearchStyle={[styles.th714, styles.th714FlexBox]}
              iconStyle={styles.iconStyle}
              data={isCitiesLoading ? [] : cities.data.data}
              search
              maxHeight={300}
              labelField="name"
              valueField="id"
              placeholder="Select item"
              searchPlaceholder="Search..."
              value={city}
              onChange={(item) => {
                setCity(item.id);
              }}
              renderLeftIcon={() => (
                <>
                  <SvgXml xml={LocationDotIcon} />
                  <Text> </Text>
                </>
              )}
            />
          </View>

          <Text
            style={[
              styles.title1,
              { paddingVertical: 8, paddingHorizontal: 10 },
            ]}
          >
            Loại hoạt động
          </Text>
          <View style={{ paddingVertical: 8, paddingHorizontal: 10 }}>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={[styles.th714, styles.th714FlexBox]}
              selectedTextStyle={[styles.th714, styles.th714FlexBox]}
              inputSearchStyle={[styles.th714, styles.th714FlexBox]}
              iconStyle={styles.iconStyle}
              data={isLoading ? [] : childCategories.data.childCategories}
              search
              maxHeight={300}
              labelField="categoryName"
              valueField="id"
              placeholder="Select item"
              searchPlaceholder="Search..."
              value={categoryId}
              onChange={(item) => {
                setCategoryId(item.id);
              }}
              renderLeftIcon={() => (
                <>
                  <SvgXml xml={LocationDotIcon} />
                  <Text> </Text>
                </>
              )}
            />
          </View>
        </View>
        <Text
          style={[styles.title1, { paddingVertical: 8, paddingHorizontal: 10 }]}
        >
          Tags
        </Text>
        <View style={styles.listKind}>
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.option,
                {
                  borderColor: selectedTags.includes(option) ? "red" : "gray",
                },
              ]}
              onPress={() => {
                setSelectedTags((prevOptions) => {
                  if (prevOptions.includes(option)) {
                    // If the option is already selected, remove it from the array
                    return prevOptions.filter(
                      (prevOption) => prevOption !== option
                    );
                  } else {
                    // If the option is not selected, add it to the array
                    return [...prevOptions, option];
                  }
                });
              }}
            >
              <Text
                style={[
                  styles.optionText,
                  {
                    color: selectedTags.includes(option) ? "red" : "gray",
                  },
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text
          style={[styles.title1, { paddingVertical: 8, paddingHorizontal: 10 }]}
        >
          Thêm mô tả
        </Text>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ paddingVertical: 8, paddingHorizontal: 10 }}>
            <TextInput
              multiline={true}
              autoFocus={false}
              style={{
                borderRadius: 7,
                borderStyle: "solid",
                borderColor: "#767676",
                borderWidth: 1,
                flex: 1,
                width: "100%",
                height: 150,
                flexDirection: "row",
                paddingHorizontal: 12,
                paddingVertical: 10,
              }}
              placeholder="Đặt tên cho trải nghiệm của bạn "
              placeholderTextColor="grey"
              value={description}
              onChangeText={(c) => setDescription(c)}
            />
          </View>
        </TouchableWithoutFeedback>
        <Text
          style={[styles.title1, { paddingVertical: 8, paddingHorizontal: 10 }]}
        >
          Thêm ảnh bìa
        </Text>
        <View style={{ paddingVertical: 8, paddingHorizontal: 10 }}>
          {image ? (
            <Pressable onPress={pickMainImage}>
              <Image
                source={{ uri: image }}
                style={{
                  width: "100%",
                  height: 300,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              />
            </Pressable>
          ) : (
            <Pressable style={styles.imageParent} onPress={pickMainImage}>
              <SvgXml xml={PictureIcon} />
            </Pressable>
          )}
        </View>
        <Text
          style={[styles.title1, { paddingVertical: 8, paddingHorizontal: 10 }]}
        >
          Thêm ảnh khác
        </Text>
        <View style={{ paddingVertical: 8, paddingHorizontal: 10 }}>
          {/* {images ? (
            images.map((image) => {
              const extension = image.split(".").pop();
              if (videoExtensions.includes(extension)) {
                return (
                  <Pressable onPress={pickImage}>
                    <Video
                      source={{ uri: image }}
                      style={{ width: 300, height: 200 }}
                      useNativeControls
                      resizeMode="contain"
                      isLooping
                    />
                  </Pressable>
                );
              } else {
                return (
                  <Pressable onPress={pickImage}>
                    <Image
                      source={{ uri: image }}
                      style={{
                        width: 300,
                        height: 300,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    />
                  </Pressable>
                );
              }
            })
          ) : (
            <></>
          )} */}
          {images.length ? (
            <Swiper
              style={{ height: 300 }}
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
                  }}
                />
              }
            >
              {images.map((image, index) => {
                const extension = image.split(".").pop();
                if (imageExtensions.includes(extension)) {
                  return (
                    <Pressable onPress={pickImage}>
                      <Image
                        source={{ uri: image }}
                        style={{
                          width: "100%",
                          height: 290,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        resizeMode="cover"
                        key={index}
                      />
                    </Pressable>
                  );
                } else if (videoExtensions.includes(extension)) {
                  return (
                    <Video
                      ref={ref}
                      style={{
                        width: "100%",
                        height: 290,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
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
          ) : (
            <Pressable style={styles.imageParent} onPress={pickImage}>
              <SvgXml xml={PictureIcon} />
            </Pressable>
          )}
        </View>
        <Pressable
          style={{
            alignSelf: "flex-end",
            position: "absolute",
            bottom: 45,
            paddingVertical: 8,
            paddingHorizontal: 10,
            backgroundColor: "#ed2939",
            borderColor: "#fff",
            paddingHorizontal: 16,
            borderWidth: 1,
            borderStyle: "solid",
            borderRadius: 7,
            overflow: "hidden",
          }}
          onPress={gotoSetTicket}
        >
          <Text style={{ color: "#fff", fontSize: 14 }}>Tiếp theo</Text>
        </Pressable>
        <View style={{ marginBottom: 90 }}></View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  mainView: {
    padding: 16,
    paddingBottom: 0,
  },
  container: {
    backgroundColor: "#fff",
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
  title1: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
    textAlign: "left",
  },
  dropdown: {
    borderRadius: 7,
    borderStyle: "solid",
    borderColor: "#767676",
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  listKind: {
    width: "100%",
    flexWrap: "wrap",
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  option: {
    width: "auto",
    height: "auto",
    marginRight: 4,
    borderWidth: 1.5,
    borderRadius: 15,
    marginVertical: 4,
    alignItems: "center",
    borderStyle: "solid",
    paddingVertical: "1%",
    paddingHorizontal: "3%",
    justifyContent: "center",
  },
  optionText: {
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  image: {
    fontSize: 28,
    color: "#000",
    textAlign: "left",
  },
  imageParent: {
    borderRadius: 7,
    borderStyle: "solid",
    borderColor: "#767676",
    borderWidth: 1,
    flex: 1,
    width: "100%",
    height: 80,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    top: 832,
    left: 261,
    backgroundColor: "#ed2939",
    borderColor: "#fff",
    paddingHorizontal: 16,
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 7,
    overflow: "hidden",
  },
  th714FlexBox: {
    textAlign: "left",
    color: "#000",
  },
  calendar: {
    fontFamily: "Font Awesome 6 Pro",
    fontSize: 16,
    color: "#000",
  },
  th714: {
    fontSize: 13,
    fontFamily: "BeVietnamPro-Regular",
    marginLeft: 6,
  },
});
