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
  import React, { useLayoutEffect, useState, useRef, useEffect } from "react";
  import SearchLocation from "@/Components/SearchLocation";
  import CategoryTab from "@/Components/CategoryTab";
  import WhereScreen from "./WhereScreen";
  import EatScreen from "./EatScreen";
  import PlaceScreen from "./PlaceScreen";
  import ExperienceScreen from "./ExperienceScreen";
  import { DATA } from "../Utils/data";
  import AccommodationCard from "@/Components/AccomodationCard";
  import { StarIcon } from "@/Assets/Icons/Card";
  import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
  const Tab = createMaterialTopTabNavigator();
  import { Animated } from "react-native";
  import { AddNewIcon, FilterHostIcon } from "@/Assets/Icons/Notification";
  import { getActivityByHost } from "@/Hooks/HostManage";
  import { useStateContext } from "@/Context/StateContext";
  import ExpHostCard from "@/Components/HostPage/ExpHostCard";
  import { RefreshControl } from "react-native-gesture-handler";
  import { deleteExperienceHook } from "@/Hooks/HostManageHook";
import { getWishlistByUser } from "@/Hooks/WishlistHook";
import { ArrowLeftBlack } from "@/Assets/Icons/Navigation";
  
  export default function WishlistScreen() {
    const navigation = useNavigation();
    const gotoNewExpScreen = async (e) => {
      e.preventDefault();
      navigation.navigate("NewExpScreen");
    };
    const tabs = ["Đi đâu", "Ăn gì", "Ở đâu", "Trải Nghiệm"];
    const [selected, setSelected] = useState(0);
    const av = new Animated.Value(0);
    av.addListener(() => {
      return;
    });
  
    const { accessToken, user } = useStateContext();
  
    const { wishlist, isWishlistLoading, error, refetchWishlistByUser } =
          getWishlistByUser(accessToken, user.id);
  
    const handleDelete = (deletedId) => {
      setActivities((activities) => activities.filter(activity => activity.id !== deletedId))
    }
  
  
    return (
    <SafeAreaView style={styles.container}>
            
        <View style={styles.statusBar}>
            <Pressable onPress={() => navigation.goBack()}>
            <SvgXml xml={ArrowLeftBlack} />
            </Pressable>
            <Text style={styles.title}>Đã lưu</Text>
            <Pressable onPress={() => {}}>
            </Pressable>
        </View>
            
        <View style={styles.mainView}>
                 
  
          {isWishlistLoading ? (
            <>
              <ActivityIndicator
                size="large"
                color="#ED2939"
                style={{ paddingVertical: 12 }}
              />
            </>
          ) : error ? (
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
                <ScrollView 
                  refreshControl={<RefreshControl refreshing={ isWishlistLoading} onRefresh={refetchWishlistByUser}/>}
                >
                  <View style={styles.cardListContainer}>
                  {wishlist.data.map((item, index) => {
                    return (
                      <AccommodationCard
                        key={index}
                        id={item.id}
                        cardName={item.activityName}
                        imgPath={item.mainImage}
                        location={item.city.name}
                        price={item.generalPrice}
                        star={item.averageRating}
                        host={item.host ? item.host.avatar : null}
                        category={item.activityCategory.categoryName}
                        liked={item.liked}
                        isExperience={item.host !== null}
                      />
                    );
                  })}
                  </View>
              
            </ScrollView>
          )}
        </View>
      </SafeAreaView>
    );
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white",
    },
    mainView: {
      padding: 16,
      marginTop: 10,
      paddingBottom: 0,
    },
  
    titleTab: {
      fontSize: 18,
      fontWeight: "600",
      color: "#767676",
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 18,
      paddingTop: 18,
      borderBottomWidth: 0.5,
      borderColor: "#767676",
    },
    line: {
      width: 35,
      height: 2,
      backgroundColor: "#151515",
      alignSelf: "center",
      marginTop: 9,
    },
    title: {
      fontSize: 18,
      fontWeight: "600",
      fontFamily: "BeVNBold",
    },
    flex: {
      flexDirection: "row",
      gap: 6,
      alignItems: "center",
      paddingBottom: 16,
    },
    cardListContainer: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between", // Evenly distribute cards
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
  });
  