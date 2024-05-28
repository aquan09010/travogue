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
import { updateAvatarHook } from "@/Hooks/UserHook";

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
export default function EditProfile({ route }) {
  const navigation = useNavigation();
  const { accessToken, user, setUser } = useStateContext();

  const [image, setImage] = useState(null);
 
  const [name, setName] = useState(user.firstName);
  const [mail, setMail] = useState(user.lastName);


  const { updateAvatar, isUpdateAvatarLoading, error, refetch } = updateAvatarHook();

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

  const handleEditProfile = async () => {
    console.log(image);
    let userProfile = await updateAvatar(accessToken, user.id, image);
    setUser({ ...user, avatar: userProfile.data.avatar });
    navigation.navigate("ProfileScreen", { userId: user.id });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.statusBar}>
        <Pressable onPress={() => navigation.goBack()}>
          <SvgXml xml={ArrowLeftBlack} />
        </Pressable>
        <Text style={styles.title}>Chỉnh sửa Hồ Sơ</Text>
        <Pressable
          style={styles.button}
          onPress={() => handleEditProfile()}
            disabled={isUpdateAvatarLoading}
        >
          <Text style={styles.checkout}>Xong</Text>
        </Pressable>
      </View>
      <ScrollView
        style={{
          height: "100%",
          width: "100%",
          paddingVertical: 8,
          paddingHorizontal: 10,
        }}
      >
        <Text
          style={[styles.title1, { paddingVertical: 8, paddingHorizontal: 10 }]}
        >
          Ảnh đại diện{" "}
        </Text>
        <Pressable onPress={pickMainImage}>
          <Image
            style={{
              height: 130,
              width: 130,
              borderRadius: 130 / 2,
              width: 130,
              alignSelf: "center",
            }}
            resizeMode="cover"
            source={{uri: user.avatar}}
          />
        </Pressable>

        <Text
          style={[styles.title1, { paddingVertical: 8, paddingHorizontal: 10 }]}
        >
          Thông tin
        </Text>
        <View
          style={{
            flexDirection: "row",
            paddingVertical: 8,
            paddingHorizontal: 10,
          }}
        >
          <Text
            style={{
              alignSelf: "center",
              textAlign: "center",
              marginRight: 20,
            }}
          >
            Tên{" "}
          </Text>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ width: "90%" }}>
              <TextInput
                multiline={true}
                autoFocus={false}
                style={{
                  borderBottomWidth: 1,
                  borderColor: "#767676",
                  flex: 1,
                  width: "100%",
                  height: 30,
                  width: "100%",
                  flexDirection: "row",
                  paddingHorizontal: 12,
                  paddingVertical: 10,
                }}
                placeholder="Tên"
                placeholderTextColor="grey"
                value={name}
                onChangeText={(c) => {
                  setName(c);
                }}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View
          style={{
            flexDirection: "row",
            paddingVertical: 8,
            paddingHorizontal: 10,
          }}
        >
          <Text
            style={{
              alignSelf: "center",
              textAlign: "center",
              marginRight: 10,
            }}
          >
            Email{" "}
          </Text>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ width: "90%" }}>
              <TextInput
                multiline={true}
                autoFocus={false}
                style={{
                  borderBottomWidth: 1,
                  borderColor: "#767676",
                  flex: 1,
                  width: "100%",
                  height: 30,
                  width: "100%",
                  flexDirection: "row",
                  paddingHorizontal: 12,
                  paddingVertical: 10,
                }}
                placeholder="Mail"
                placeholderTextColor="grey"
                value={mail}
                onChangeText={(c) => {
                  setMail(c);
                }}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>

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
    height: "100%",
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
  checkout: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "left",
  },
});
