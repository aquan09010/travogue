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

export default function EatScreen() {
  const [selected, setSelected] = useState(
    "959d470f-e346-4dd4-9ad4-db9a3d47e8ee"
  );
  // const scrollOffsetY = useRef(new Animated.Value(0)).current;

  const { mainCategories, accessToken } = useStateContext();

  const { childCategories, isLoading, error } = getChildCategories(
    accessToken,
    mainCategories.angi.id
  );

  const { popularActivities, isPopularLoading, popularError } =
    getPopularByCategory(accessToken, mainCategories.angi.id);

  const { activities, isActivitiesLoading, activitiesError } =
    getActivityByCategory(accessToken, selected);

  const { topCities, isTopCitiesLoading, topCitiesError } =
    getTopCities(accessToken);

  const renderItem = ({ item }) => (
    <AccommodationCard
      id={item.id}
      cardName={item.activityName}
      imgPath={item.mainImage}
      location={item.city.name}
      price={item.generalPrice}
      star={item.averageRating}
      isExperience={false}
    />
  );

  const renderCityItem = ({ item }) => (
    <CityCard cardName={item.name} imgPath={item.images} />
  );

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.mainView}>
        <View style={styles.flex}>
          <SvgXml xml={FireIcon} />
          <Text style={styles.title}>Các điểm ăn uống đang HOT</Text>
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
        <Text style={styles.title}>Khám phá ẩm thực cho chuyến đi của bạn</Text>
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
                  id={item.id}
                  cardName={item.activityName}
                  imgPath={item.mainImage}
                  location={item.city.name}
                  price={item.generalPrice}
                  star={item.averageRating}
                  isExperience={false}
                />
              );
            })}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainView: {
    padding: 16,
    paddingBottom: 0,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#ED2939",
    paddingRight: 12,
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
