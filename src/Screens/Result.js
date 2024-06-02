import { View, Text, SafeAreaView, StyleSheet, Pressable, Image } from "react-native";
import React from "react";
import { ArrowLeftBlack, SearchIconBlack } from "@/Assets/Icons/Navigation";
import { useNavigation } from "@react-navigation/native";
import { SvgXml } from "react-native-svg";
import TicketCard from "@/Components/TicketCard";
import { getTicketsById } from "@/Hooks/TicketHooks";
import { useStateContext } from "@/Context/StateContext";
import { CalendarIcon, PeopleIcon, TimeIcon } from "@/Assets/Icons/OrderConfirm";

const Result = ({route}) => {
  const navigation = useNavigation();
  const gotoMain = async (e) => {
    e.preventDefault();
    navigation.navigate("Main");
  };

  const gotoHost = async (e) => {
    e.preventDefault();
    navigation.navigate("HostProfile");
  };

  const { activity, host, data } = route.params;


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
          Xin chúc mừng bạn đã đặt vé thành công cho trải nghiệm: {activity.name} 
        </Text>
        <Text style={{ fontWeight: "bold" }}>
          {"Bạn có thể xem lại vé của mình trong phần Hồ Sơ > Vé của bạn."}{" "}
        </Text>
        <View style={styles.containerCard}>
          <Image
            style={styles.img}
            resizeMode="cover"
            source={{ uri: activity.mainImage }}
          />
          <View style={styles.orderCard}>
            <Text style={styles.textDetail}>{activity.name}</Text>
            <View style={[styles.line]}>
              <SvgXml xml={CalendarIcon} />
              <Text style={[styles.text]}> {activity.date}</Text>
            </View>
            <View style={[styles.line]}>
              <SvgXml xml={TimeIcon} />
              <Text style={[styles.text]}> {activity.time}</Text>
            </View>
            <View style={[styles.line]}>
              <SvgXml xml={PeopleIcon} />
              <Text style={[styles.text]}>
                {" "}
                {data.numOfAdults} người lớn, {data.numOfChildren} trẻ em,{" "}
                {data.numOfBabies} em bé
              </Text>
            </View>
            <Pressable style={styles.line1} onPress={gotoHost}>
              <Text style={{ alignSelf: "center", marginRight: 5 }}>
                <Text style={{ fontWeight: "600", fontSize: 16 }}>Host:</Text>
                <Text style={{ fontSize: 16 }}> {host.email}</Text>
              </Text>
              <View style={[styles.avatar, styles.actionPadding]}>
                <Image
                  style={styles.avaImg}
                  resizeMode="cover"
                  source={{ uri: host.avatar }}
                />
              </View>
            </Pressable>
          </View>
        </View>
        
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
  containerCard: {
    width: "100%",
    paddingHorizontal: 18,
    paddingVertical: 12,
    flexDirection: "row",
  },
  img: {
    borderRadius: 7,
    width: 130,
    height: 130,
  },
  orderCard: {
    marginLeft: 12,
    alignSelf: "stretch",
    flex: 1,
  },
  textDetail: {
    fontSize: 16,
    textAlign: "left",
    fontWeight: "600",
  },
  line: {
    flexDirection: "row",
    alignContent: "center",
    // height: 10,
    paddingTop: 10,
  },
  line1: {
    flexDirection: "row",
    alignContent: "center",
    // height: 10,
  },
  avaImg: {
    height: 40,
    width: 40,
    borderRadius: 40 / 2,
  },
});
