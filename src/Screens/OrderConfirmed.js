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
  ActivityIndicator,
} from "react-native";
import { SvgXml } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import { ParkIconActive } from "@/Assets/Icons/Where";
import React, { useLayoutEffect, useState, useRef, useEffect } from "react";
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
import { checkDiscountCodeHook } from "@/Hooks/PromotionHook";
import { useStateContext } from "@/Context/StateContext";
import { buyTicketAPI } from "@/Hooks/TicketHooks";
export default function OrderConfirm({ route }) {
  const navigation = useNavigation();
  const gotoHost = async (e) => {
    e.preventDefault();
    navigation.navigate("HostProfile");
  };

  const { activity, host, data } = route.params;
  const { accessToken, user } = useStateContext();

  const [selectedInsurance, setSelectedInsurance] = useState(null);

  const [discountCode, setDiscountCode] = useState(null);

  const {
    checkDiscount,
    discount,
    isCheckDiscountLoading,
    checkDiscountError,
  } = checkDiscountCodeHook();

  const { buyTicket, ticket, isTicketLoading, ticketError } = buyTicketAPI();

  const handleCheckDiscountCode = async () => {
    await checkDiscount(accessToken, activity.id, discountCode);
  };

  const handleCheckout = async () => {
    const body = {
      ...data,
      insuranceCost: selectedInsurance ? selectedInsurance.bestOffer : 0,
      totalDiscountCode:
        discount && !checkDiscountError
          ? discount *
            0.01 *
            (data.numOfAdults * data.adultsPrice +
              data.numOfChildren * data.childrenPrice +
              data.numOfBabies * data.babyPrice)
          : 0,
      totalDiscountEvent: 0,
      totalPay:
        data.numOfAdults * data.adultsPrice +
        data.numOfChildren * data.childrenPrice +
        data.numOfBabies * data.babyPrice +
        (selectedInsurance ? selectedInsurance.bestOffer : 0) -
        (discount && !checkDiscountError
          ? discount *
            0.01 *
            (data.numOfAdults * data.adultsPrice +
              data.numOfChildren * data.childrenPrice +
              data.numOfBabies * data.babyPrice)
          : 0),
      insuranceId: selectedInsurance ? selectedInsurance.id : null,
    };
    await buyTicket(accessToken, null, activity.activityTimeFrameId, body);
    navigation.navigate("Result");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.statusBar}>
        <Pressable onPress={() => navigation.goBack()}>
          <SvgXml xml={ArrowLeftBlack} />
        </Pressable>
        <Text style={styles.title}>Xác nhận và thanh toán</Text>
        <Pressable onPress={() => {}}>
          <SvgXml xml={SearchIconBlack} />
        </Pressable>
      </View>
      <ScrollView style={{ height: "87%" }}>
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
        <View style={styles.mainView}>
          <View style={[styles.line]}>
            <SvgXml xml={OrderIcon} />
            <Text style={{ fontWeight: "600", fontSize: 16 }}>
              {" "}
              Nhập mã giảm giá
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <TextInput
              style={styles.inputArea}
              placeholder="Nhập mã giảm giá"
              value={discountCode}
              onChangeText={(e) => setDiscountCode(e)}
            ></TextInput>
            <Pressable style={styles.button} onPress={handleCheckDiscountCode}>
              <Text>Áp dụng</Text>
            </Pressable>
          </View>
          {isCheckDiscountLoading ? (
            <ActivityIndicator
              size="large"
              color="#ED2939"
              style={{ paddingVertical: 12 }}
            />
          ) : checkDiscountError ? (
            <View style={styles.line3}>
              <Text style={{}}>{checkDiscountError.message}</Text>
            </View>
          ) : discount ? (
            <View style={styles.line3}>
              <Text style={{}}>Đã áp dụng mã {discountCode}</Text>
              <Text style={{}}>giảm {discount}%</Text>
            </View>
          ) : (
            <></>
          )}
        </View>
        <View style={styles.mainView}>
          <View style={[styles.line]}>
            <SvgXml xml={OrderIcon} />
            <Text style={{ fontWeight: "600", fontSize: 16 }}>
              {" "}
              Chi tiết thanh toán
            </Text>
          </View>

          <View style={styles.line3}>
            <Text style={{}}>Vé người lớn</Text>
            <Text style={{}}>x{data.numOfAdults}</Text>
            <Text style={{}}>đ{data.adultsPrice.toLocaleString()}</Text>
          </View>
          <View style={styles.line3}>
            <Text style={{}}>Vé trẻ em</Text>
            <Text style={{}}>x{data.numOfChildren}</Text>
            <Text style={{}}>đ{data.childrenPrice.toLocaleString()}</Text>
          </View>
          <View style={styles.line3}>
            <Text style={{}}>Vé em bé</Text>
            <Text style={{}}>x{data.numOfBabies}</Text>
            <Text style={{}}>đ{data.babyPrice.toLocaleString()}</Text>
          </View>

          <View style={styles.line3}>
            <Text style={{}}>Tổng cộng Voucher giảm giá</Text>
            <Text style={{}}>
              -đ
              {(discount && !checkDiscountError
                ? discount *
                  0.01 *
                  (data.numOfAdults * data.adultsPrice +
                    data.numOfChildren * data.childrenPrice +
                    data.numOfBabies * data.babyPrice)
                : 0
              ).toLocaleString()}
            </Text>
          </View>
          {selectedInsurance && (
            <View style={styles.line3}>
              <Text style={{}}>{selectedInsurance.name}</Text>
              <Text style={{}}>-đ{selectedInsurance.bestOffer}</Text>
            </View>
          )}

          <View style={styles.line3}>
            <Text style={{ fontWeight: "600", fontSize: 16 }}>
              Tổng thanh toán:
            </Text>
            <Text style={{ fontWeight: "600", fontSize: 16, color: "#ed2939" }}>
              đ
              {(
                data.numOfAdults * data.adultsPrice +
                data.numOfChildren * data.childrenPrice +
                data.numOfBabies * data.babyPrice +
                (selectedInsurance ? selectedInsurance.bestOffer : 0) -
                (discount && !checkDiscountError
                  ? discount *
                    0.01 *
                    (data.numOfAdults * data.adultsPrice +
                      data.numOfChildren * data.childrenPrice +
                      data.numOfBabies * data.babyPrice)
                  : 0)
              ).toLocaleString()}
            </Text>
          </View>
        </View>

        <View style={styles.mainView}>
          <View style={[styles.line]}>
            <SvgXml xml={CashIcon} />
            <Text style={{ fontWeight: "600", fontSize: 16 }}>
              {" "}
              Phương thức thanh toán
            </Text>
          </View>
          <View style={[styles.line, { marginLeft: 5 }]}>
            <SvgXml xml={VisaIcon} />
            <Text style={{}}> Thẻ Tín dụng/Ghi nợ</Text>
          </View>
          <View style={[styles.line, { marginLeft: 5 }]}>
            <SvgXml xml={AppleIcon} />
            <Text style={{}}> Apple Pay</Text>
          </View>
        </View>

        <View style={styles.listKind}>
          <View style={[styles.line]}>
            <SvgXml xml={CashIcon} />
            <Text style={{ fontWeight: "600", fontSize: 16 }}>
              {" "}
              Bảo hiểm du lịch
            </Text>
          </View>

          {activity.insurances.map((insurance, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.option,
                {
                  borderColor:
                    selectedInsurance &&
                    selectedInsurance.id === insurance.insurance.id
                      ? "red"
                      : "gray",
                },
              ]}
              onPress={() => setSelectedInsurance(insurance.insurance)}
            >
              <Text
                style={[
                  styles.optionText,
                  {
                    color:
                      selectedInsurance &&
                      selectedInsurance.id === insurance.insurance.id
                        ? "red"
                        : "gray",
                  },
                ]}
              >
                {insurance.insurance.name} : {insurance.insurance.bestOffer}đ
              </Text>

              {insurance.insurance.benefits.split(";").map((item) => (
                <Text style={[styles.th714, { color: "gray" }]}>{item},</Text>
              ))}
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.mainView}>
          <View style={[styles.line]}>
            <SvgXml xml={BoxCheckIcon} />
            <Text style={{}}>
              {" "}
              Nhấn “Thanh toán” đồng nghĩa với việc bạn đồng ý tuân theo Điều
              khoản của Travogue.
            </Text>
          </View>
        </View>
      </ScrollView>
      <View style={[styles.frameParent4]}>
        <View style={{}}>
          <Text style={{}}>Tổng thanh toán</Text>
          <Text style={{ fontWeight: "600", fontSize: 16, color: "#ed2939" }}>
            đ
            {(
              data.numOfAdults * data.adultsPrice +
              data.numOfChildren * data.childrenPrice +
              data.numOfBabies * data.babyPrice +
              (selectedInsurance ? selectedInsurance.bestOffer : 0) -
              (discount && !checkDiscountError
                ? discount *
                  0.01 *
                  (data.numOfAdults * data.adultsPrice +
                    data.numOfChildren * data.childrenPrice +
                    data.numOfBabies * data.babyPrice)
                : 0)
            ).toLocaleString()}
          </Text>
        </View>
        {isTicketLoading ? (
          <ActivityIndicator
            size="large"
            color="#ED2939"
            style={{ paddingVertical: 12 }}
          />
        ) : (
          <></>
        )}
        <Pressable style={[styles.button1]} onPress={handleCheckout}>
          <Text style={{ color: "#fff" }}>Thanh toán</Text>
        </Pressable>
      </View>
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
  inputArea: {
    borderRadius: 7,
    borderStyle: "solid",
    borderColor: "#767676",
    borderWidth: 1,
    width: "70%",
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  button: {
    borderRadius: 7,
    backgroundColor: "#fff",
    borderStyle: "solid",
    borderColor: "#151515",
    borderWidth: 1,
    overflow: "hidden",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  line3: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
  },
  frameParent4: {
    height: 80,
    borderTopWidth: 1,
    paddingTop: 18,
    flexWrap: "wrap",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingVertical: 0,
    justifyContent: "space-between",
    flexDirection: "row",
    borderColor: "#bababa",
    borderStyle: "solid",
    backgroundColor: "#fff",
    bottom: 0,
    position: "relative",
    width: "100%",
  },
  button1: {
    borderRadius: 7,
    backgroundColor: "#ed2939",
    borderColor: "#fff",
    flexWrap: "wrap",
    paddingVertical: 12,
    paddingHorizontal: 16,
    overflow: "hidden",
  },
  th714: {
    fontSize: 12,
    fontFamily: "BeVietnamPro-Regular",
    marginLeft: 6,
  },
  listKind: {
    width: "100%",
    flexWrap: "wrap",
    flexDirection: "column",
    gap: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  optionText: {
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
});
