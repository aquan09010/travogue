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
  ActivityIndicator,
} from "react-native";
import { SvgXml } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect, useState, useRef } from "react";

export default function TicketCard() {
  const navigation = useNavigation();
  const [selectedOption, setSelectedOption] = useState([]);
  const gotoTicketInfo = async (e) => {
    e.preventDefault();
    navigation.navigate("TicketInfo");
  };
  return (
    <Pressable onPress={gotoTicketInfo} style={styles.frameParent}>
      <View style={styles.ellipseParent}>
        <Image
          style={styles.frameChild}
          resizeMode="cover"
          source={require("../../Assets/ava1.jpg")}
        />
        <View style={styles.frameGroup}>
          <View style={[styles.anhQuanParent, styles.anhQuanParentFlexBox]}>
            <Text style={[styles.anhQuan, styles.usersClr]}>Anh Quan</Text>
            <Text style={[styles.ticket, styles.usersClr]}>
              <Text style={styles.textTypo}>
                <Text style={styles.text1}>{` `}</Text>
                <Text style={styles.text2}>{`3 `}</Text>
              </Text>
              <Text style={styles.text1}>
                <Text style={styles.textTypo}>{` `}</Text>
                <Text style={styles.ticket2}>ticket</Text>
              </Text>
            </Text>
          </View>
          <View style={styles.usersParent}>
            <Text style={[styles.users, styles.usersClr]}>users</Text>
            <Text style={[styles.ngiLn1, styles.usersClr]}>
              2 người lớn, 1 trẻ em, 1 em bé
            </Text>
          </View>
          <View style={[styles.frameContainer, styles.anhQuanParentFlexBox]}>
            <View style={[styles.vnWrapper, styles.vnWrapperFlexBox]}>
              <Text style={styles.vn}>296.000vnđ</Text>
            </View>
            <View style={styles.vnWrapperFlexBox}>
              <Text style={[styles.checkCircle, styles.thanhTonTypo]}>
                check-circle
              </Text>
              <Text style={[styles.thanhTon, styles.thanhTonTypo]}>
                Đã thanh toán
              </Text>
            </View>
          </View>
        </View>
      </View>
      <Text
        style={styles.liNhnLi}
      >{`Lời nhắn Lời nhắn Lời nhắn Lời nhắn Lời nhắn Lời nhắn Lời nhắn Lời nhắn Lời nhắn Lời nhắn Lời nhắn Lời nhắn `}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  anhQuanParentFlexBox: {
    justifyContent: "space-between",
    alignSelf: "stretch",
    flexDirection: "row",
  },
  usersClr: {
    color: "#151515",
    textAlign: "left",
  },
  vnWrapperFlexBox: {
    height: 23,
    flexDirection: "row",
    alignItems: "center",
  },
  thanhTonTypo: {
    color: "#1d800e",
    textAlign: "left",
    fontSize: 14,
  },
  frameChild: {
    width: 70,
    height: 70,
  },
  anhQuan: {
    textAlign: "left",
    fontFamily: "BeVietnamPro-SemiBold",
    fontWeight: "600",
    fontSize: 14,
  },
  text1: {
    fontSize: 10,
  },
  text2: {
    fontSize: 14,
  },
  textTypo: {
    fontFamily: "BeVietnamPro-SemiBold",
    fontWeight: "600",
  },
  ticket2: {
    fontSize: 14,
    fontFamily: "Font Awesome 6 Pro",
  },
  ticket: {
    textAlign: "left",
  },
  anhQuanParent: {
    alignItems: "center",
  },
  users: {
    fontFamily: "Font Awesome 6 Pro",
    textAlign: "left",
    fontSize: 14,
  },
  ngiLn1: {
    fontFamily: "BeVietnamPro-Regular",
    textAlign: "left",
    fontSize: 14,
    marginLeft: 6,
    flex: 1,
  },
  usersParent: {
    marginTop: 6,
    alignSelf: "stretch",
    flexDirection: "row",
    alignItems: "center",
  },
  vn: {
    color: "#ed2939",
    fontFamily: "BeVietnamPro-Regular",
    textAlign: "left",
    fontSize: 14,
    flex: 1,
  },
  vnWrapper: {
    flex: 1,
  },
  checkCircle: {
    fontFamily: "Font Awesome 6 Pro",
  },
  thanhTon: {
    marginLeft: 4,
    fontFamily: "BeVietnamPro-Regular",
  },
  frameContainer: {
    marginTop: 6,
  },
  frameGroup: {
    width: 300,
    marginLeft: 6,
  },
  ellipseParent: {
    flexDirection: "row",
  },
  liNhnLi: {
    fontSize: 10,
    color: "#767676",
    width: 385,
    fontFamily: "BeVietnamPro-Regular",
    marginTop: 6,
    textAlign: "left",
  },
  frameParent: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: "100%",
  },
});
