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
  Button,
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
  CancelIcon,
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
import Modal from "react-native-modal";

export default function ModalComment() {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={{}}>
      <Button title="Show modal" onPress={toggleModal} />

      <Modal
        onBackButtonPress={() => setModalVisible(false)}
        onBackdropPress={() => setModalVisible(false)}
        swipeDirection="down"
        onSwipeComplete={toggleModal}
        isVisible={isModalVisible}
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
            height: 600,
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
              <Text style={{ fontSize: 14 }}> (12)</Text>
            </Text>
            <Pressable style={{}} onPress={toggleModal}>
              <SvgXml xml={CancelIcon} />
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}
