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

const data = [
  { label: "Item 1", value: "1" },
  { label: "Item 2", value: "2" },
  { label: "Item 3", value: "3" },
  { label: "Item 4", value: "4" },
  { label: "Item 5", value: "5" },
  { label: "Item 6", value: "6" },
  { label: "Item 7", value: "7" },
  { label: "Item 8", value: "8" },
];
const options = [
  "Nghệ thuật và văn hoá",
  "Thể thao",
  "Lịch sử",
  "Ẩm thực",
  "Vận dộng",
  "Khác",
];
const imageExtensions = ["jpg", "jpeg", "png", "gif", "webp"];
const videoExtensions = ["mp4", "mov"];
export default function CreateNewExp({ route }) {
  const navigation = useNavigation();
  const [city, setCity] = useState(null);
  const [selectedOption, setSelectedOption] = useState([]);
  const gotoSetTicket = async (e) => {
    e.preventDefault();
    navigation.navigate("SetTicketPriceScreen");
  };
  const [nameExp, setNameExp] = useState("");
  const [detail, setDetail] = useState("");
  const [images, setImages] = useState([]);
  const [image, setImage] = useState(null);
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
      setImages((images) => [
        ...result.assets.map((asset) => asset.uri),
        ...images,
      ]);
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
                value={nameExp}
                onChangeText={(c) => {
                  setNameExp(c);
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
              placeholderStyle={{ color: "grey", fontSize: 14 }}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={data}
              search
              maxHeight={300}
              labelField="label"
              valueField="city"
              placeholder="Chọn thành phố"
              searchPlaceholder="Search..."
              value={city}
              onChange={(item) => {
                setCity(item.value);
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
          Loại hoạt động
        </Text>
        <View style={styles.listKind}>
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.option,
                {
                  borderColor: selectedOption.includes(option) ? "red" : "gray",
                },
              ]}
              onPress={() => {
                setSelectedOption((prevOptions) => {
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
                    color: selectedOption.includes(option) ? "red" : "gray",
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
              value={detail}
              onChangeText={(c) => setDetail(c)}
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
          <Pressable style={styles.imageParent} onPress={pickImage}>
            <SvgXml xml={PictureIcon} />
          </Pressable>
          {images ? (
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
});