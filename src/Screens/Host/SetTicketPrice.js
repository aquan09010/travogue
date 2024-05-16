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
  NoticeIcon,
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
import { Dropdown, MultiSelect } from "react-native-element-dropdown";
import { LocationDotIcon } from "@/Assets/Icons/LocationDot";
import { Video } from "expo-av";
import * as ImagePicker from "expo-image-picker";
import { AddCircleIcon, PictureIcon } from "@/Assets/Icons/Home";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { DeleteIcon } from "@/Assets/Icons/Proflie";

const data = [
  { label: "10:30 - 11:30", value: "1" },
  { label: "11:30 - 12:30", value: "2" },
  { label: "12:30 - 13:30", value: "3" },
  { label: "13:30 - 14:30", value: "4" },
  { label: "14:30 - 15:30", value: "5" },
  { label: "15:30 - 16:30", value: "6" },
  { label: "16:30 - 17:30", value: "7" },
  { label: "17:30 - 18:30", value: "8" },
];
const lang123 = [
  { label: "Tiếng Việt", value: "1" },
  { label: "Tiếng Anh", value: "2" },
  { label: "Tiếng Pháp", value: "3" },
  { label: "Tiếng Trung", value: "4" },
  { label: "Tiếng Nhật", value: "5" },
  { label: "Tiếng Hàn", value: "6" },
];
const options = [
  "Hoàn 100% tiền vé nếu huỷ trước 24 giờ bắt đầu",
  "Đã bao gồm phí cho tất cả các dịch vụ trong suốt trải nghiệm",
  "Giảm 10% khi đăng ký từ 2 người trở lên",
  "Cho phép thanh toán tại điểm đến",
  "Chưa bao gồm tiền ...",
];
const options1 = ["ABC", "123", "AQ", "zzz", "kuronami"];
const imageExtensions = ["jpg", "jpeg", "png", "gif", "webp"];
const videoExtensions = ["mp4", "mov"];
export default function SetTicketPrice({ route }) {
  const navigation = useNavigation();
  const [city, setCity] = useState(null);
  const [selectedOption, setSelectedOption] = useState([]);
  const [selectedOption1, setSelectedOption1] = useState([]);

  const gotoHost = async (e) => {
    e.preventDefault();
    navigation.navigate("HostProfile");
  };
  const [selected, setSelected] = useState("");
  const [openSchedule, setOpenSchedule] = useState(false);
  const [days, setDays] = useState({});
  const removeDayByKey = (keyToRemove) => {
    setDays((prevDays) => {
      const updatedDays = { ...prevDays };
      delete updatedDays[keyToRemove];
      return updatedDays;
    });
  };
  const addNewDay = (newDay) => {
    setDays((prevDays) => {
      const nextKey = Object.keys(prevDays).length + 1; // Determine the next key
      const updatedDays = { ...prevDays, [nextKey]: newDay }; // Create a new object with the new day
      return updatedDays;
    });
  };
  const [value, setValue] = useState(null);
  const [lang, setLang] = useState(null);
  const [count, setCount] = useState("");
  const [note, setNote] = useState("");
  const [ticket1, setTicket1] = useState("");
  const [ticket2, setTicket2] = useState("");
  const [ticket3, setTicket3] = useState("");

  const renderItem = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.selectedTextStyle}>{item.label}</Text>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.statusBar}>
        <Pressable onPress={() => navigation.goBack()}>
          <SvgXml xml={ArrowLeftBlack} />
        </Pressable>
        <Text style={styles.title}>Thiết lập Thời gian và Giá vé</Text>
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
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={[
              styles.title1,
              { paddingVertical: 8, paddingHorizontal: 10 },
            ]}
          >
            Chọn ngày và giờ
          </Text>
          <Pressable
            onPress={() => {
              setOpenSchedule(!openSchedule);
            }}
          >
            <SvgXml style={{ alignSelf: "center" }} xml={AddCircleIcon} />
          </Pressable>
        </View>
        {openSchedule ? (
          <Calendar
            onDayPress={(day) => {
              setSelected(day.dateString);
              addNewDay(day.dateString);
            }}
            markedDates={{
              [selected]: {
                selected: true,
                disableTouchEvent: false,
                selectedDotColor: "orange",
              },
            }}
          />
        ) : (
          <></>
        )}
        {days ? (
          <>
            {Object.keys(days).map((key) => {
              return (
                <View style={[styles.frameParent, styles.frameParentFlexBox]}>
                  <View style={[styles.frameGroup, styles.frameParentFlexBox]}>
                    <View style={styles.frameParentFlexBox}>
                      <Text style={[styles.calendar, styles.th714FlexBox]}>
                        CALENDAR
                      </Text>
                      <Text style={[styles.th714, styles.th714FlexBox]}>
                        {days[key]}
                      </Text>
                    </View>
                    <Text style={[styles.check, styles.th714FlexBox]}>
                      check
                    </Text>
                  </View>

                  <Dropdown
                    style={{
                      width: 140,
                      height: 40,
                      borderRadius: 7,
                      borderStyle: "solid",
                      borderColor: "#1b1b1b",
                      borderWidth: 1,
                      padding: 8,
                    }}
                    placeholderStyle={[styles.th714, styles.th714FlexBox]}
                    selectedTextStyle={[styles.th714, styles.th714FlexBox]}
                    inputSearchStyle={[styles.th714, styles.th714FlexBox]}
                    iconStyle={styles.iconStyle}
                    data={data}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder=" Chọn giờ"
                    searchPlaceholder="Search..."
                    value={value}
                    onChange={(item) => {
                      setValue(item.value);
                    }}
                    renderLeftIcon={() => (
                      <>
                        <Text style={[styles.calendar, styles.th714FlexBox]}>
                          clock
                        </Text>
                      </>
                    )}
                  />
                  {/* <View style={[styles.frameGroup, styles.frameParentFlexBox]}>
                    <View style={styles.frameParentFlexBox}>
                      <Text style={[styles.calendar, styles.th714FlexBox]}>
                        clock
                      </Text>
                      <Text style={[styles.th714, styles.th714FlexBox]}>
                        17:30 - 20:30
                      </Text>
                    </View>
                    <Text style={[styles.check, styles.th714FlexBox]}>
                      angle-down
                    </Text>
                  </View> */}
                  <Pressable onPress={() => removeDayByKey(key)}>
                    <SvgXml xml={DeleteIcon} />
                  </Pressable>
                </View>
              );
            })}
          </>
        ) : (
          <></>
        )}

        {/* <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingVertical: 8,
            paddingHorizontal: 10,
          }}
        >
          <View style={[styles.frameParent, styles.parentFlexBox]}>
            <View style={styles.parentFlexBox}>
              <SvgXml xml={CalendarIcon} />
              <Text style={[styles.th714, styles.th714FlexBox]}>
                Th 7, 14 thg 10, 2023
              </Text>
            </View>
          </View>
          <View style={[styles.frameParent, styles.parentFlexBox]}>
            <View style={styles.parentFlexBox}>
              <SvgXml xml={TimeIcon} />
              <Text style={[styles.th714, styles.th714FlexBox]}>
                17:30 - 20:30
              </Text>
            </View>
          </View>
        </View> */}
        <View
          style={{
            flexDirection: "row",
            paddingVertical: 8,
            paddingHorizontal: 10,
          }}
        >
          <Text style={[styles.title1, { alignSelf: "center" }]}>Ngôn ngữ</Text>
          <Dropdown
            style={{
              width: 140,
              height: 40,
              borderRadius: 7,
              borderStyle: "solid",
              borderColor: "#1b1b1b",
              borderWidth: 1,
              marginLeft: 20,

              padding: 8,
            }}
            placeholderStyle={[styles.th714, styles.th714FlexBox]}
            selectedTextStyle={[styles.th714, styles.th714FlexBox]}
            inputSearchStyle={[styles.th714, styles.th714FlexBox]}
            data={lang123}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder=" Chọn ngôn ngữ"
            searchPlaceholder="Search..."
            value={lang}
            onChange={(item) => {
              setLang(item.value);
            }}
            renderLeftIcon={() => (
              <>
                <Text style={[styles.calendar, styles.th714FlexBox]}>
                  clock
                </Text>
              </>
            )}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            paddingVertical: 8,
            paddingHorizontal: 10,
          }}
        >
          <Text style={[styles.title1, { alignSelf: "center" }]}>
            Số lượng khách mỗi khung giờ
          </Text>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <TextInput
              multiline={true}
              autoFocus={false}
              style={{
                borderRadius: 7,
                borderStyle: "solid",
                borderColor: "#1b1b1b",
                borderWidth: 1,
                padding: 8,
                marginLeft: 20,
                width: 40,
              }}
              placeholderTextColor="grey"
              value={count}
              onChangeText={(c) => {
                setCount(c);
              }}
            />
          </TouchableWithoutFeedback>
          {/* <View
              style={{
                borderRadius: 7,
                borderStyle: "solid",
                borderColor: "#1b1b1b",
                borderWidth: 1,
                padding: 8,
                marginLeft: 15,
              }}
            >
              <View style={styles.wrapperFlexBox}>
                <Text style={styles.text}>100</Text>
              </View>
            </View> */}
        </View>
        <View
          style={{
            paddingTop: 10,
            flexDirection: "row",
            alignContent: "center",
            paddingVertical: 8,
            paddingHorizontal: 10,
          }}
        >
          <SvgXml xml={NoticeIcon} />
          <Text style={{ fontStyle: "italic" }}> Lưu ý của Host</Text>
        </View>
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
                height: 100,
                flexDirection: "row",
                paddingHorizontal: 12,
                paddingVertical: 10,
              }}
              placeholder="Lưu ý dành cho du khách"
              placeholderTextColor="grey"
              value={note}
              onChangeText={(c) => {
                setNote(c);
              }}
            />
          </View>
        </TouchableWithoutFeedback>
        <Text
          style={[styles.title1, { paddingVertical: 8, paddingHorizontal: 10 }]}
        >
          Thiết lập giá vé
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={[
              {
                paddingVertical: 8,
                paddingHorizontal: 10,
                alignSelf: "center",
              },
            ]}
          >
            Người lớn
          </Text>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View
              style={{
                paddingVertical: 8,
                paddingHorizontal: 10,
                alignSelf: "center",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  borderRadius: 7,
                  borderStyle: "solid",
                  borderColor: "#1b1b1b",
                  borderWidth: 1,
                  padding: 8,
                  marginLeft: 20,
                  width: 100,
                }}
              >
                {/* Replace 'your-icon-name' with the actual icon name */}
                <TextInput
                  multiline={true}
                  autoFocus={false}
                  style={{
                    marginLeft: 10,
                    flex: 1,
                  }}
                  placeholderTextColor="grey"
                  value={ticket1}
                  onChangeText={(c) => {
                    setTicket1(c);
                  }}
                />
                <Text style={[styles.th714, styles.th714FlexBox]}>đ</Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={[
              {
                paddingVertical: 8,
                paddingHorizontal: 10,
                alignSelf: "center",
              },
            ]}
          >
            Trẻ em (2 đến dưới 12 tuổi)
          </Text>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View
              style={{
                paddingVertical: 8,
                paddingHorizontal: 10,
                alignSelf: "center",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  borderRadius: 7,
                  borderStyle: "solid",
                  borderColor: "#1b1b1b",
                  borderWidth: 1,
                  padding: 8,
                  marginLeft: 20,
                  width: 100,
                }}
              >
                {/* Replace 'your-icon-name' with the actual icon name */}
                <TextInput
                  multiline={true}
                  autoFocus={false}
                  style={{
                    marginLeft: 10,
                    flex: 1,
                  }}
                  placeholderTextColor="grey"
                  value={ticket2}
                  onChangeText={(c) => {
                    setTicket2(c);
                  }}
                />
                <Text style={[styles.th714, styles.th714FlexBox]}>đ</Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={[
              {
                paddingVertical: 8,
                paddingHorizontal: 10,
                alignSelf: "center",
              },
            ]}
          >
            Em bé (Dưới 2 tuổi)
          </Text>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View
              style={{
                paddingVertical: 8,
                paddingHorizontal: 10,
                alignSelf: "center",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  borderRadius: 7,
                  borderStyle: "solid",
                  borderColor: "#1b1b1b",
                  borderWidth: 1,
                  padding: 8,
                  marginLeft: 20,
                  width: 100,
                }}
              >
                {/* Replace 'your-icon-name' with the actual icon name */}
                <TextInput
                  multiline={true}
                  autoFocus={false}
                  style={{
                    marginLeft: 10,
                    flex: 1,
                  }}
                  placeholderTextColor="grey"
                  value={ticket3}
                  onChangeText={(c) => {
                    setTicket3(c);
                  }}
                />
                <Text style={[styles.th714, styles.th714FlexBox]}>đ</Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <Text
          style={[styles.title1, { paddingVertical: 8, paddingHorizontal: 10 }]}
        >
          Chính sách về vé và giá
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
        <Pressable
          style={{
            alignSelf: "flex-end",
            position: "absolute",
            bottom: 45,
            left: 20,
            paddingVertical: 8,
            paddingHorizontal: 10,
            backgroundColor: "#1b1b1b",
            borderColor: "#fff",
            paddingHorizontal: 16,
            borderWidth: 1,
            borderStyle: "solid",
            borderRadius: 7,
            overflow: "hidden",
            width: 100,
          }}
          onPress={() => {}}
        >
          <Text style={{ color: "#fff", fontSize: 14, alignSelf: "center" }}>
            Quay lại
          </Text>
        </Pressable>
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
            width: 100,
          }}
          onPress={() => {}}
        >
          <Text style={{ color: "#fff", fontSize: 14, alignSelf: "center" }}>
            Hoàn thành{" "}
          </Text>
        </Pressable>
        <Text
          style={[styles.title1, { paddingVertical: 8, paddingHorizontal: 10 }]}
        >
          Các bên bảo hiểm
        </Text>
        <View style={styles.listKind}>
          {options1.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.option,
                {
                  borderColor: selectedOption1.includes(option)
                    ? "red"
                    : "gray",
                },
              ]}
              onPress={() => {
                setSelectedOption1((prevOptions) => {
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
                    color: selectedOption1.includes(option) ? "red" : "gray",
                  },
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
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
  frameParentFlexBox: {
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 6,
    paddingHorizontal: 10,
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
    fontSize: 12,
    fontFamily: "BeVietnamPro-Regular",
    marginLeft: 6,
  },
  check: {
    marginLeft: 8,
    fontFamily: "Font Awesome 6 Pro",
    fontSize: 16,
    color: "#000",
  },
  frameGroup: {
    borderRadius: 7,
    borderStyle: "solid",
    borderColor: "#1b1b1b",
    borderWidth: 1,
    padding: 8,
  },
  frameParent: {
    alignSelf: "stretch",
    flex: 1,
    width: "100%",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  dropdown: {
    width: 150,
    borderRadius: 7,
    borderStyle: "solid",
    borderColor: "#767676",
    borderWidth: 1,
  },
  listKind: {
    width: "100%",
    flexWrap: "wrap",
    flexDirection: "column",
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  option: {
    width: "auto",
    height: "auto",
    marginRight: 4,
    padding: 8,
  },
  optionText: {
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
});
