import { View, Text, SafeAreaView, StyleSheet, Pressable } from "react-native";
import React from "react";
import { ArrowLeftBlack, SearchIconBlack } from "@/Assets/Icons/Navigation";
import { useNavigation } from "@react-navigation/native";
import { SvgXml } from "react-native-svg";

const Result = () => {
  const navigation = useNavigation();
  const gotoMain = async (e) => {
    e.preventDefault();
    navigation.navigate("Main");
  };

  return (
    <SafeAreaView>
      <View style={styles.statusBar}>
        <Pressable onPress={gotoMain}>
          <SvgXml xml={ArrowLeftBlack} />
        </Pressable>
        <Text style={styles.title}>Xác nhận thanh toán</Text>
        <Pressable onPress={() => {}}>
          <SvgXml xml={SearchIconBlack} />
        </Pressable>
      </View>
      <View style={{ paddingVertical: 8, paddingHorizontal: 10 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignContent: "center",
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          <Text style={[styles.checkCircle, styles.checkCircleTypo]}>
            check-circle
          </Text>
          <Text
            style={{
              fontFamily: "BeVietnamPro-Regular",
              textAlign: "center",
              color: "#1d800e",
              fontSize: 25,
              marginLeft: 5,
            }}
          >
            Thanh toán thành công
          </Text>
        </View>
      </View>
      <View style={{ paddingVertical: 8, paddingHorizontal: 25 }}>
        <Text style={{ fontWeight: "bold" }}>
          Xin chúc mừng bạn đã đặt vé thành công cho trải nghiệm: ABC
        </Text>
        <Text style={{ fontWeight: "bold" }}>Sau đây là vé trải nghiệm:</Text>
        <Text style={{ fontWeight: "bold" }}>
          {"Vé của bạn sẽ được hiển thị trong phần Hồ Sơ > Vé của bạn."}{" "}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Result;
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
  checkCircleTypo: {
    textAlign: "center",
    color: "#1d800e",
    fontSize: 25,
  },
  checkCircle: {
    fontFamily: "Font Awesome 6 Pro",
    alignSelf: "center",
  },
  thanhTonThnh: {
    fontFamily: "BeVietnamPro-Regular",
    marginLeft: 5,
    flex: 1,
  },
  checkCircleParent: {
    alignSelf: "center",
    width: "100%",
    flexDirection: "row",
  },
});
