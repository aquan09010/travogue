import {
  Text,
  View,
  Animated,
  Pressable,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
  ScrollView,
} from "react-native";

import React, {
  useState,
  useRef,
  useCallback,
  useMemo,
  useEffect,
} from "react";

import { SvgXml } from "react-native-svg";

import { Star } from "@/Assets/Icons/Star";
import { DownArrow } from "@/Assets/Icons/DownArrow";
import { LeftArrow } from "@/Assets/Icons/LeftArrow";
import { CloseButton } from "@/Assets/Icons/CloseButton";
import { BarsFilterIcon } from "@/Assets/Icons/BarsFilter";
import { SearchBlackIcon } from "@/Assets/Icons/SearchBlack";

import EatScreen from "./EatScreen";
import WhereScreen from "./WhereScreen";
import PlaceScreen from "./PlaceScreen";
import ExperienceScreen from "./ExperienceScreen";

import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { ArrowLeftBlack } from "@/Assets/Icons/Navigation";
import { useNavigation } from "@react-navigation/native";
import { useStateContext } from "@/Context/StateContext";
import { getActivityByCategoryInACity } from "@/Hooks/CityHooks";
import AccommodationCard from "@/Components/AccomodationCard";
import { getChildCategories } from "@/Hooks/TravelActivityHooks";

// Danh sách Loại hoạt động
const options = [
  "Khách sạn",
  "Homestay",
  "Căn hộ",
  "Nhà nghỉ",
  "Camping",
  "Khác",
];

// Danh sách Đánh giá
const optionsComment = ["5 - 4", "4 - 2", "2 - 0"];

/**
 * Represents the Whereabout Search Screen.
 * This screen allows users to search for locations based on different criteria.
 * @returns {JSX.Element} The Whereabout Search Screen component.
 */
export default function WhereaboutSearchScreen({ route }) {
  // Tabs.
  const tabs = ["Đi đâu", "Ăn gì", "Ở đâu", "Trải Nghiệm"];

  const [selected, setSelected] = useState(0);

  // Kiểm tra danh sách Loại hoạt động
  const [selectedOption, setSelectedOption] = useState([]);

  // Kiểm tra danh sách Đánh giá
  const [selectedComment, setSelectedComment] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);

  // Bottom Sheet Model.
  const bottomSheetModalRef = useRef(null);
  // Nền sau khi xuất hiện Bottom Sheet Model.
  const modalAnimation = useRef(new Animated.Value(0)).current;

  // Diện tích khung Bottom Sheet Model.
  const snapPoints = useMemo(() => ["25%", "50%", "75%"], []);

  /**
   * Handles the press event to present the modal.
   */
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
    Animated.timing(modalAnimation, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, []);

  /**
   * Handles changes in the sheet.
   * @param {number} index - The index of the sheet.
   */
  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
    if (index === -1) {
      Animated.timing(modalAnimation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  }, []);

  /**
   * The background color of the container.
   * @type {Animated.Value}
   */
  const containerBackgroundColor = modalAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["#ffffff", "rgba(255, 255, 255, 0)"],
  });

  // Slider values.
  const [sliderValues, setSliderValues] = useState([50, 1000]);
  const [sliderValuePositions, setSliderValuePositions] = useState([0, 280]);

  /**
   * Tính toán vị trí của các Slider Values.
   * Handles the change of slider values.
   * @param {number[]} values - The new slider values.
   * @returns {void}
   */
  const handleValuesChange = (values) => {
    setSliderValues(values);

    // Calculate pixel positions based on slider values
    const positions = values.map((value) => ((value - 50) / 950) * 280);
    setSliderValuePositions(positions);
  };
  const navigation = useNavigation();

  const { accessToken, mainCategories } = useStateContext();

  const { city } = route.params;

  const [mainCategory, setMainCategory] = useState(
    "c7a2fe12-21ee-4757-a36d-ed429743b472"
  );

  const [filter, setFilter] = useState("");
  const [keyword, setKeyword] = useState("");

  const {
    activities,
    isActivitiesLoading,
    activitiesError,
    refetchActivityByCategory,
  } = getActivityByCategoryInACity(
    accessToken,
    city.id,
    mainCategory,
    filter,
    keyword
  );

  const { childCategories, isLoading, error } = getChildCategories(
    accessToken,
    mainCategory
  );

  const handleApplyFilter = () => {
    let filterString = ""; // Initialize an empty string to store the filters
    // Build filters with proper handling of empty values
    if (selectedOption.length > 0) {
      filterString +=
        "type=" +
        selectedOption.map((childCategory) => childCategory.id).join(";");
    }

    if (selectedPrice) {
      filterString +=
        (filterString.length > 0 ? "&" : "") + // Add "&" only if filterString is not empty
        "price=" +
        selectedPrice[0] * 1000 +
        "-" +
        selectedPrice[1] * 1000;
    }

    if (selectedComment) {
      filterString +=
        (filterString.length > 0 ? "&" : "") + // Add "&" only if filterString is not empty
        "rating=" +
        selectedComment[0] +
        ":" +
        selectedComment[4];
    }

    setFilter(filterString);
    console.log("FILTER STRING: " + filterString);

    bottomSheetModalRef.current?.close();
  };

  return (
    <SafeAreaView>
      <SafeAreaView style={styles.headTitle}>
        <Pressable onPress={() => navigation.goBack()} style={styles.arrow}>
          <SvgXml xml={ArrowLeftBlack} />
        </Pressable>

        <Text style={{ fontSize: 18, fontWeight: "600" }}>{city.name}</Text>

        {/* <SvgXml xml={SearchBlackIcon} style={styles.search} /> */}
      </SafeAreaView>
      <SafeAreaView>
        <View>
          <View style={styles.header}>
            {tabs.map((e, i) => (
              <Pressable
                key={i}
                onPress={() => {
                  setSelected(i);
                  if (i == 0) setMainCategory(mainCategories.didau.id);
                  else if (i == 1) setMainCategory(mainCategories.angi.id);
                  else if (i == 2) setMainCategory(mainCategories.odau.id);
                  else setMainCategory(mainCategories.trainghiem.id);
                }}
              >
                <Text
                  style={[
                    styles.titleTab,
                    selected == i && {
                      color: "#151515",
                    },
                  ]}
                >
                  {e}
                </Text>

                {selected == i && <View style={styles.line}></View>}
              </Pressable>
            ))}
          </View>
        </View>

        <View>
          <View style={styles.filter}>
            <TouchableOpacity onPress={handlePresentModalPress}>
              <SvgXml xml={BarsFilterIcon} style={styles.barsFilter} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.kind}
              onPress={handlePresentModalPress}
            >
              <Text>Bộ lọc</Text>

              <SvgXml xml={DownArrow} style={styles.downArrow} />
            </TouchableOpacity>
          </View>

          <BottomSheetModal
            index={2}
            snapPoints={snapPoints}
            ref={bottomSheetModalRef}
            onChange={handleSheetChanges}
            backgroundStyle={{ borderRadius: 30 }}
            backdropComponent={BottomSheetBackdrop}
          >
            <View style={styles.bottomSheetContainer}>
              <View style={styles.bottomSheetHead}>
                <Text style={styles.bottomSheetTitle}>Bộ lọc</Text>

                <TouchableOpacity
                  onPress={() => bottomSheetModalRef.current?.close()}
                >
                  <SvgXml xml={CloseButton} style={styles.closeButton} />
                </TouchableOpacity>
              </View>

              <View style={{ marginBottom: 8 }}></View>

              <View style={styles.kindContainer}>
                <Text style={styles.kindText}>Loại hoạt động</Text>

                <View style={styles.listKind}>
                  {isLoading ? (
                    <></>
                  ) : (
                    childCategories?.data.childCategories.map(
                      (option, index) => (
                        <TouchableOpacity
                          key={index}
                          style={[
                            styles.option,
                            {
                              borderColor: selectedOption.includes(option)
                                ? "red"
                                : "gray",
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
                                color: selectedOption.includes(option)
                                  ? "red"
                                  : "gray",
                              },
                            ]}
                          >
                            {option.categoryName}
                          </Text>
                        </TouchableOpacity>
                      )
                    )
                  )}
                </View>
              </View>

              <View style={{ marginBottom: 8 }}></View>

              <View style={styles.priceContainer}>
                <Text style={styles.priceText}>Giá</Text>

                <View style={styles.sliderContainer}>
                  <Text style={styles.minValue}>50k</Text>
                  <MultiSlider
                    snapped
                    min={50}
                    step={50}
                    max={1000}
                    sliderLength={280}
                    allowOverlap={false}
                    values={sliderValues}
                    minMarkerOverlapDistance={50}
                    onValuesChange={handleValuesChange}
                    onValuesChangeFinish={(values) => setSelectedPrice(values)}
                    markerStyle={{
                      ...Platform.select({
                        ios: {
                          width: 15,
                          height: 15,
                          borderWidth: 2,
                          borderRadius: 15,
                          borderColor: "#FF0000",
                          backgroundColor: "#FFFFFF",
                        },
                        android: {
                          width: 15,
                          height: 15,
                          borderWidth: 2,
                          borderRadius: 50,
                          borderColor: "#FF0000",
                          backgroundColor: "#FFFFFF",
                        },
                      }),
                    }}
                    pressedMarkerStyle={{
                      ...Platform.select({
                        ios: {
                          width: 20,
                          height: 20,
                          borderWidth: 2,
                          borderRadius: 15,
                          borderColor: "#FF0000",
                          backgroundColor: "#FFFFFF",
                        },
                        android: {
                          width: 20,
                          height: 20,
                          borderWidth: 2,
                          borderRadius: 50,
                          borderColor: "#FF0000",
                          backgroundColor: "#FFFFFF",
                        },
                      }),
                    }}
                    selectedStyle={{
                      backgroundColor: "#FF0000",
                    }}
                  />
                  <Text style={styles.maxValue}>1000k</Text>
                </View>

                <View style={styles.sliderValues}>
                  <Text
                    style={[
                      styles.sliderValue,
                      { left: sliderValuePositions[0] },
                    ]}
                  >
                    {sliderValues[0]}k
                  </Text>
                  <Text
                    style={[
                      styles.sliderValue,
                      { left: sliderValuePositions[1] },
                    ]}
                  >
                    {sliderValues[1]}k
                  </Text>
                </View>
              </View>

              <View style={{ marginBottom: 8 }}></View>

              <View style={styles.commentContainer}>
                <Text style={styles.commentText}>Đánh giá</Text>

                <View style={styles.listComment}>
                  {optionsComment.map((option, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.optionsComment,
                        {
                          borderColor:
                            selectedComment == option ? "red" : "gray",
                        },
                      ]}
                      onPress={() => {
                        if (selectedComment == option) {
                          setSelectedComment(null);
                        } else {
                          setSelectedComment(option);
                        }
                      }}
                    >
                      <Text
                        style={[
                          styles.optionText,
                          {
                            color: selectedComment == option ? "red" : "gray",
                            marginRight: 4,
                          },
                        ]}
                      >
                        {option}
                      </Text>

                      <SvgXml xml={Star} style={styles.star} />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <Pressable style={styles.button} onPress={handleApplyFilter}>
                <Text>Áp dụng</Text>
              </Pressable>
            </View>
          </BottomSheetModal>
        </View>

        <ScrollView style={styles.mainView}>
          {isActivitiesLoading ? (
            <>
              <ActivityIndicator
                size="large"
                color="#ED2939"
                style={{ paddingVertical: 12 }}
              />
            </>
          ) : activitiesError ? (
            <Text
              style={{
                color: "#A80027",
                textAlign: "center",
                paddingBottom: 20,
                fontSize: 16,
              }}
            >
              Something went wrong!
            </Text>
          ) : (
            <View style={styles.cardListContainer}>
              {activities.data.data.map((item, index) => {
                return (
                  <AccommodationCard
                    key={index}
                    id={item.id}
                    cardName={item.activityName}
                    imgPath={item.mainImage}
                    location={item.city.name}
                    price={item.generalPrice}
                    star={item.averageRating}
                    liked={item.liked}
                    isExperience={false}
                  />
                );
              })}
              <View style={{ marginBottom: 400 }}></View>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: "10%",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  headTitle: {
    width: "100%",
    marginTop: "8%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  arrow: {
    left: "7%",
    position: "absolute",
  },
  titleText: {
    center: true,
    fontSize: 22,
    fontWeight: "700",
  },
  search: {
    right: "7%",
    position: "absolute",
  },
  header: {
    paddingTop: "5%",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#747474",
    paddingHorizontal: "5%",
    justifyContent: "space-between",
  },
  titleTab: {
    fontSize: 18,
    color: "#747474",
    fontWeight: "600",
  },
  line: {
    height: 2,
    width: "60%",
    marginTop: 9,
    alignSelf: "center",
    backgroundColor: "#151515",
  },
  filter: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    paddingVertical: "5%",
    borderColor: "#747474",
    alignContent: "center",
    paddingHorizontal: "5%",
    justifyContent: "center",
    justifyContent: "flex-start",
    gap: 10,
  },
  barsFilter: {},
  kind: {
    borderWidth: 1,
    borderRadius: 15,
    alignItems: "center",
    borderStyle: "solid",
    flexDirection: "row",
    paddingVertical: "1%",
    alignContent: "center",
    paddingHorizontal: "3%",
    justifyContent: "center",
  },
  price: {
    borderWidth: 1,
    borderRadius: 15,
    alignItems: "center",
    borderStyle: "solid",
    flexDirection: "row",
    paddingVertical: "1%",
    alignContent: "center",
    paddingHorizontal: "3%",
    justifyContent: "center",
  },
  comment: {
    borderWidth: 1,
    borderRadius: 15,
    alignItems: "center",
    borderStyle: "solid",
    flexDirection: "row",
    paddingVertical: "1%",
    alignContent: "center",
    paddingHorizontal: "3%",
    justifyContent: "center",
  },
  downArrow: {
    marginLeft: "4%",
  },
  bottomSheetContainer: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: "8%",
  },
  bottomSheetHead: {
    width: "100%",
    marginBottom: "5%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bottomSheetTitle: {
    fontSize: 16,
    fontWeight: "900",
    letterSpacing: 0.5,
  },
  kindContainer: {
    width: "100%",
    marginBottom: "5%",
    flexDirection: "column",
  },
  kindText: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: "3%",
    letterSpacing: 0.5,
  },
  listKind: {
    width: "100%",
    flexWrap: "wrap",
    flexDirection: "row",
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
  priceContainer: {
    width: "100%",
    marginBottom: "5%",
    flexDirection: "column",
  },
  priceText: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: "4%",
    letterSpacing: 0.5,
  },
  sliderContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  minValue: {
    left: 0,
    bottom: 40,
    fontSize: 11,
    fontWeight: "400",
    letterSpacing: 0.5,
    position: "absolute",
  },
  maxValue: {
    right: 0,
    bottom: 40,
    fontSize: 11,
    fontWeight: "400",
    letterSpacing: 0.5,
    position: "absolute",
  },
  sliderValue: {
    bottom: 0,
    fontSize: 11,
    color: "#FF0000",
    fontWeight: "400",
    letterSpacing: 0.5,
    position: "absolute",
  },
  commentContainer: {
    width: "100%",
    marginBottom: "5%",
    flexDirection: "column",
  },
  commentText: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: "4%",
    letterSpacing: 0.5,
  },
  listComment: {
    width: "100%",
    flexDirection: "row",
  },
  optionsComment: {
    width: "auto",
    height: "auto",
    marginRight: 4,
    borderWidth: 1.5,
    borderRadius: 15,
    marginVertical: 4,
    alignItems: "center",
    borderStyle: "solid",
    flexDirection: "row",
    paddingVertical: "1%",
    paddingHorizontal: "3%",
  },
  mainView: {
    padding: 16,
    paddingBottom: 0,
    backgroundColor: "#fff",
    height: "100%",
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
  cardListContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between", // Evenly distribute cards
  },
});
