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
} from 'react-native';
import React, { useLayoutEffect, useState, useRef } from 'react';
import { SvgXml } from 'react-native-svg';
import {
  ParkIcon,
  CentreIcon,
  RelicIcon,
  ScenicIcon,
  MuseumIcon,
  ParkIconActive,
  CentreIconActive,
  RelicIconActive,
  ScenicIconActive,
  MuseumIconActive,
  FireIcon,
  BookIcon,
} from '@/Assets/Icons/Where';
import { DATA } from '../Utils/data';
import AccommodationCard from '@/Components/AccomodationCard';
import { StarIcon } from '@/Assets/Icons/Card';
import CityCard from '@/Components/CityCard';
import { useStateContext } from '@/Context/StateContext';
import { getChildCategories } from '@/Hooks/TravelActivityHooks';

export default function ExperienceScreen() {
  const [selected, setSelected] = useState(0);
  // const scrollOffsetY = useRef(new Animated.Value(0)).current;
  const { mainCategories, accessToken } = useStateContext();

  const { childCategories, isLoading, error } = getChildCategories(
    accessToken,
    mainCategories.trainghiem.id
  );

  const renderItem = ({ item }) => (
    <AccommodationCard
      id={item.id}
      cardName={item.cardName}
      imgPath={item.imgPath}
      location={item.location}
      price={item.price}
      star={item.star}
    />
  );

  const renderCityItem = ({ item }) => (
    <CityCard cardName={item.cardName} imgPath={item.imgPath} />
  );

  return (
    <ScrollView
      style={{ marginBottom: 170 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.mainView}>
        <View style={styles.flex}>
          <SvgXml xml={FireIcon} />
          <Text style={styles.title}>Trải nghiệm hàng đầu</Text>
        </View>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item, index) => index}
          horizontal
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
        />
      </View>

      <View style={styles.mainView}>
        <View style={styles.flex}>
          <SvgXml xml={BookIcon} />
          <Text style={styles.title}>Các hoạt động trải nghiệm mới</Text>
        </View>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item, index) => index}
          horizontal
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
        />
      </View>

      <View style={styles.mainView}>
        <View style={styles.flex}>
          <SvgXml xml={BookIcon} />
          <Text style={styles.title}>
            Các thành phố du lịch trải nghiệm sôi động
          </Text>
        </View>
        <FlatList
          data={DATA}
          renderItem={renderCityItem}
          keyExtractor={(item, index) => index}
          horizontal
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
        />
      </View>

      <View style={styles.mainView}>
        <Text style={styles.title}>
          Lựa chọn trải nghiệm du lịch cho bản thân
        </Text>

        {isLoading ? (
          <>
            <ActivityIndicator
              size="large"
              color="#ED2939"
              style={{ paddingVertical: 12 }}
            />
            <Text
              style={{
                color: '#ED2939',
                textAlign: 'center',
                paddingBottom: 20,
                fontSize: 14,
              }}
            >
              Please wait...
            </Text>
          </>
        ) : error ? (
          <Text
            style={{
              color: '#A80027',
              textAlign: 'center',
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
                    onPress={() => setSelected(i)}
                  >
                    <SvgXml
                      style={styles.icon}
                      xml={selected === i ? e.svgActive : e.svg}
                    />
                    <Text
                      style={[
                        styles.titleTab,
                        selected == i && {
                          color: '#151515',
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

        <View style={styles.cardListContainer}>
          {DATA.map((item, index) => {
            return (
              <AccommodationCard
                id={item.id}
                cardName={item.cardName}
                imgPath={item.imgPath}
                location={item.location}
                price={item.price}
                star={item.star}
              />
            );
          })}
        </View>
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
    fontWeight: '600',
    color: '#ED2939',
    paddingRight: 12,
  },
  titleTab: {
    fontSize: 15,
    fontWeight: '600',
    color: '#767676',
    width: 70,
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 18,
  },
  flex: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
    paddingBottom: 16,
  },
  icon: {
    alignSelf: 'center',
    marginBottom: 5,
  },
  cardListContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between', // Evenly distribute cards
  },
  categoryItem: {
    width: 85,
    alignItems: 'center',
  },
});
