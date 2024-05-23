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
  ActivityIndicator
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
import { addMainImage, addOtherImageHook, createExperienceHook, getInsurances } from "@/Hooks/HostManageHook";
import { useStateContext } from "@/Context/StateContext";

const data = [
  { label: "10:30 - 11:30", value: "1", startH: 10, startM: 30, endH: 11, endM: 30 },
  { label: "11:30 - 12:30", value: "2", startH: 11, startM: 30, endH: 12, endM: 30  },
  { label: "12:30 - 13:30", value: "3", startH: 12, startM: 30, endH: 13, endM: 30  },
  { label: "13:30 - 14:30", value: "4", startH: 13, startM: 30, endH: 14, endM: 30  },
  { label: "14:30 - 15:30", value: "5", startH: 14, startM: 30, endH: 15, endM: 30  },
  { label: "15:30 - 16:30", value: "6", startH: 15, startM: 30, endH: 16, endM: 30  },
  { label: "16:30 - 17:30", value: "7", startH: 16, startM: 30, endH: 17, endM: 30  },
  { label: "17:30 - 18:30", value: "8", startH: 17, startM: 30, endH: 18, endM: 30  },
];
const lang123 = [
  { label: "Tiếng Việt", value: "1" },
  { label: "Tiếng Anh", value: "2" },
  { label: "Tiếng Pháp", value: "3" },
  { label: "Tiếng Trung", value: "4" },
  { label: "Tiếng Nhật", value: "5" },
  { label: "Tiếng Hàn", value: "6" },
];

const options1 = ["ABC", "123", "AQ", "zzz", "kuronami"];
const imageExtensions = ["jpg", "jpeg", "png", "gif", "webp"];
const videoExtensions = ["mp4", "mov"];
export default function SetTicketPrice({ route }) {
  const navigation = useNavigation();

  const gotoHost = async (e) => {
    e.preventDefault();
    navigation.navigate("HostProfile");
  };
  const [selected, setSelected] = useState("");
  const [openSchedule, setOpenSchedule] = useState(false);

  const [days, setDays] = useState([]);
  const removeDayByKey = (dateToRemove) => {
    setDays((days) => days.filter(item => item.date !== dateToRemove));
  };
  const addNewDay = (newDay) => {
    const newDayObject = {
      date: newDay,
      time: null,
      startAt: null,
      endAt: null
    }
    setDays([ ...days, newDayObject ]); // Create a new object with the new day);
  };
  const [languages, setLang] = useState(null);
  const [maximumGuests, setMaximumGuests] = useState("");
  const [hostNotes, setNote] = useState("");
  const [adultsPrice, setAdultsPrice] = useState(0);
  const [childrenPrice, setChildrenPrice] = useState(0);
  const [babyPrice, setBabyPrice] = useState(0);
  const [selectedInsurances, setSelectedInsurances] = useState([]);

  useEffect(() => console.log(days), [days])

  const { accessToken } = useStateContext();

  const { insurances, isGetInsurancesLoading, getInsurancesError, refetchGetInsurances } = getInsurances(accessToken);

  const basicInfo = route.params;

  const { createExperience, newExperience, isCreateExperienceLoading } = createExperienceHook();
  const { addOtherImage, isAddOtherImageLoading } = addOtherImageHook();
  const { addImage, isAddImageLoading } = addMainImage();

  const handleSubmitCreate = async () => {
    const activityTimeFramesCreate = days.map(day => {
      day.startAt = day.date + 'T' + day.time.substr(0, 2) + ':' + day.time.substr(3, 2) + ':' + '00Z'
      day.endAt = day.date + 'T' + day.time.substr(8, 2) + ':' + day.time.substr(11, 2) + ':' + '00Z'
      const { time, ...newDay } = day
      return {...newDay, maximumGuests, languages, hostNotes, adultsPrice, childrenPrice, babyPrice}
    })
    const body = {
      activityName: basicInfo.activityName, 
      description: basicInfo.description,
      tags: basicInfo.tags,
      activityTimeFramesCreate: activityTimeFramesCreate,
      insurances: selectedInsurances
    }
    const response = await createExperience(accessToken, basicInfo.categoryId, basicInfo.cityId, body);
    console.log(response);
    await addImage(accessToken, response.data.id, basicInfo.image)
    for (const image of basicInfo.images) {
      await addOtherImage(accessToken, response.data.id, image);
    }
    navigation.navigate("HomeHost");
  }

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
            {days.map((item, index) => {
              return (
                <View style={[styles.frameParent, styles.frameParentFlexBox]}>
                  <View style={[styles.frameGroup, styles.frameParentFlexBox]}>
                    <View style={styles.frameParentFlexBox}>
                      <Text style={[styles.calendar, styles.th714FlexBox]}>
                        CALENDAR
                      </Text>
                      <Text style={[styles.th714, styles.th714FlexBox]}>
                        {item.date}
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
                    onChange={(item) => {
                      setDays((prevDays) => {
                        // Create a copy of the previous array
                        const newDays = [...prevDays];
                        // Update the object at the specified index
                        newDays[index].time = item.label;
                        return newDays;
                      });
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
                  <Pressable onPress={() => removeDayByKey(item.date)}>
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
            valueField="label"
            placeholder=" Chọn ngôn ngữ"
            searchPlaceholder="Search..."
            value={languages}
            onChange={(item) => {
              setLang(item.label);
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
              keyboardType="numeric"
              placeholderTextColor="grey"
              value={maximumGuests}
              onChangeText={(c) => {
                setMaximumGuests(c);
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
              value={hostNotes}
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
                  keyboardType="numeric"
                  placeholderTextColor="grey"
                  value={adultsPrice}
                  onChangeText={(c) => {
                    setAdultsPrice(c);
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
                  keyboardType="numeric"
                  placeholderTextColor="grey"
                  value={childrenPrice}
                  onChangeText={(c) => {
                    setChildrenPrice(c);
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
                  keyboardType="numeric"
                  placeholderTextColor="grey"
                  value={babyPrice}
                  onChangeText={(c) => {
                    setBabyPrice(c);
                  }}
                />
                <Text style={[styles.th714, styles.th714FlexBox]}>đ</Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
        {/* <Text
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
        </View> */}

        {isCreateExperienceLoading || isAddImageLoading || isAddOtherImageLoading ? (
          <ActivityIndicator
            size="large"
            color="#ED2939"
            style={{ paddingVertical: 12 }}
          />
        ) : (
          <></>
        )}

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
          disabled={isCreateExperienceLoading || isAddImageLoading || isAddOtherImageLoading}
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
          disabled={isCreateExperienceLoading || isAddImageLoading || isAddOtherImageLoading}
          onPress={handleSubmitCreate}
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
          {isGetInsurancesLoading ? <></> : insurances.data.map((insurance, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.option,
                {
                  borderColor: selectedInsurances.includes(insurance.id)
                    ? "red"
                    : "gray",
                },
              ]}
              onPress={() => {
                setSelectedInsurances((prevOptions) => {
                  if (prevOptions.includes(insurance.id)) {
                    // If the option is already selected, remove it from the array
                    return prevOptions.filter(
                      (prevOption) => prevOption !== insurance.id
                    );
                  } else {
                    // If the option is not selected, add it to the array
                    return [...prevOptions, insurance.id];
                  }
                });
              }}
            >
              <Text
                style={[
                  styles.optionText,
                  {
                    color: selectedInsurances.includes(insurance.id) ? "red" : "gray",
                  },
                ]}
              >
                {insurance.name} : {insurance.bestOffer}.000đ
              </Text>

              {insurance.benefits.split(';').map(item => 
                <Text
                  style={[
                    styles.th714,
                    {color: "gray"}
                  ]}
                >
                  {item}, 
                </Text>
              )}
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
