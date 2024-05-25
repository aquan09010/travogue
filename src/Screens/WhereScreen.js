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
  Animated,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import React, { useLayoutEffect, useState, useRef, useEffect } from "react";
import { SvgXml } from "react-native-svg";
import { FireIcon, BookIcon } from "@/Assets/Icons/Where";
import AccommodationCard from "@/Components/AccomodationCard";
import { StarIcon } from "@/Assets/Icons/Card";
import CityCard from "@/Components/CityCard";
import { useStateContext } from "@/Context/StateContext";
import {
  getActivityByCategory,
  getChildCategories,
  getPopularByCategory,
} from "@/Hooks/TravelActivityHooks";
import { getTopCities } from "@/Hooks/CityHooks";

export default function WhereScreen() {
  const [selected, setSelected] = useState(
    "30112408-eeaa-4f0f-9f3a-5ae39b712d42"
  );
  // const scrollOffsetY = useRef(new Animated.Value(0)).current;

  const { mainCategories, accessToken } = useStateContext();

  const { childCategories, isLoading, error, refetchChildCategories } = getChildCategories(
    accessToken,
    mainCategories.didau.id
  );

  const { popularActivities, isPopularLoading, popularError, refetchPopularByCategory } =
    getPopularByCategory(accessToken, mainCategories.didau.id);

  const { activities, isActivitiesLoading, activitiesError, refetchActivityByCategory } =
    getActivityByCategory(accessToken, selected);

  const { topCities, isTopCitiesLoading, topCitiesError, refetchTopCities } =
    getTopCities(accessToken);

  const renderItem = ({ item }) => (
    <AccommodationCard
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

  const renderCityItem = ({ item }) => (
    <CityCard cardName={item.name} imgPath={item.images} />
  );

  const onRefresh = () => {
    refetchChildCategories();
    refetchActivityByCategory();
    refetchPopularByCategory();
    refetchTopCities();
  }

  return (
    <View style={{ height: "100%", backgroundColor: "white" }}>
      <ScrollView showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isLoading || isPopularLoading || isActivitiesLoading || isTopCitiesLoading}
            onRefresh={onRefresh} />
        }
      >
        <View style={styles.mainView}>
          <View style={styles.flex}>
            <SvgXml xml={FireIcon} />
            <Text style={styles.title}>Các địa điểm du lịch đang HOT</Text>
          </View>

          {isPopularLoading ? (
            <>
              <ActivityIndicator
                size="large"
                color="#ED2939"
                style={{ paddingVertical: 12 }}
              />
            </>
          ) : popularError ? (
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
            <FlatList
              data={popularActivities.data}
              renderItem={renderItem}
              keyExtractor={(item, index) => index}
              horizontal
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
            />
          )}
        </View>

        <View style={styles.mainView}>
          <View style={styles.flex}>
            <SvgXml xml={BookIcon} />
            <Text style={styles.title}>Các thành phố du lịch bạn nên đến</Text>
          </View>

          {isTopCitiesLoading ? (
            <>
              <ActivityIndicator
                size="large"
                color="#ED2939"
                style={{ paddingVertical: 12 }}
              />
            </>
          ) : topCitiesError ? (
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
            <FlatList
              data={topCities.data}
              renderItem={renderCityItem}
              keyExtractor={(item, index) => index}
              horizontal
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
            />
          )}
        </View>

        <View style={styles.mainView}>
          <Text style={styles.title}>Bạn có thể thích những địa điểm này</Text>
          {isLoading ? (
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
            <>
              <View style={styles.header}>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                >
                  {childCategories.data.childCategories.map((e, i) => (
                    <Pressable
                      style={styles.categoryItem}
                      key={i}
                      onPress={() => setSelected(e.id)}
                    >
                      <SvgXml
                        style={styles.icon}
                        xml={selected === e.id ? e.svgActive : e.svg}
                      />
                      <Text
                        style={[
                          styles.titleTab,
                          selected == e.id && {
                            color: "#151515",
                          },
                        ]}
                        numberOfLines={2}
                      >
                        {e.categoryName}
                      </Text>
                    </Pressable>
                  ))}
                </ScrollView>
              </View>
            </>
          )}

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
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    padding: 16,
    paddingBottom: 0,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#ED2939",
    fontFamily: "BeVNBold",
  },
  titleTab: {
    fontSize: 15,
    fontWeight: "600",
    color: "#767676",
    width: 70,
    textAlign: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 18,
  },
  flex: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
    paddingBottom: 16,
  },
  icon: {
    alignSelf: "center",
    marginBottom: 5,
  },
  cardListContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between", // Evenly distribute cards
  },
  categoryItem: {
    width: 85,
    alignItems: "center",
  },
});
