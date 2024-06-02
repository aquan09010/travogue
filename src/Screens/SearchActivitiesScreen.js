import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Pressable,
  ActivityIndicator,
  SafeAreaView,
  Button,
} from "react-native";
import { ArrowLeftBlack, SearchIconBlack } from "@/Assets/Icons/Navigation";
import { SvgXml } from "react-native-svg";
import { LocationDotIcon } from "@/Assets/Icons/LocationDot";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Header } from "react-native/Libraries/NewAppScreen";
import { useNavigation } from "@react-navigation/native";
import { useStateContext } from "@/Context/StateContext";
import { useEffect, useState } from "react";
import { searchActivities, searchActivitiesHook } from "@/Hooks/TravelActivityHooks";
import { searchUsers, searchUsersHook } from "@/Hooks/UserHook";
import { searchCities } from "@/Hooks/CityHooks";
import { Dropdown } from "react-native-element-dropdown";
import StarRating from "@/Components/StarRating";

// SearchCityScreen component (implement search functionality and suggestion list)
export default function SearchActivitiesScreen() {
  const navigation = useNavigation();

  const { accessToken } = useStateContext();

  const [searchQuery, setSearchQuery] = useState("");
  const [city, setCity] = useState(null);

  const { searchActivities,
    activities,
    isSearchActivitiesLoading,
    searchActivitiesError } = searchActivitiesHook();
  
  const {  searchUsers,
    users,
    isSearchUsersLoading,
    searchUsersError, } = searchUsersHook();
  
    const { cities, isCitiesLoading, citiesError } = searchCities(
      accessToken,
      ""
    );

  const tabs = ["Điểm đến", "Người dùng"];

  const [selected, setSelected] = useState(0);

  // useEffect(() => console.log(searchQuery), [searchQuery]);

  const handleSubmit = () => {
    if (selected == 0) {
      searchActivities(accessToken, searchQuery, city);
    } else if (selected == 1) {
      searchUsers(accessToken, searchQuery);
    }
  }

  const handleSubmitWithCity = (cityId) => {
    if (selected == 0) {
      searchActivities(accessToken, searchQuery, cityId);
    } else if (selected == 1) {
      searchUsers(accessToken, searchQuery);
    }
  }



  return (
    <SafeAreaView style={styles.container1}>
      <View style={styles.statusBar}>
        <Pressable onPress={() => navigation.goBack()}>
          <SvgXml xml={ArrowLeftBlack} />
        </Pressable>
        <View style={styles.container}>
          <TextInput
            style={styles.inputArea}
            placeholder="Tìm kiếm trên Travogue..."
            value={searchQuery}
            onChangeText={(q) => setSearchQuery(q)}
            onSubmitEditing={handleSubmit}
            autoFocus={true}
          />
        </View>
      </View>

      <View>
        <View style={styles.header}>
          {tabs.map((e, i) => (
            <Pressable
              key={i}
              onPress={() => {
                setSelected(i);
                handleSubmit();
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
      
      {isSearchActivitiesLoading ? (
        <>
          <ActivityIndicator
            size="large"
            color="#ED2939"
            style={{ paddingVertical: 12 }}
          />
        </>
      ) : searchActivitiesError ? (
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
      ) : selected == 0 && activities !== null ? (
          <View style={styles.mainView}>
            <View style={{ paddingBottom: 15, paddingHorizontal: 10 }}>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={[styles.th714, styles.th714FlexBox]}
                selectedTextStyle={[styles.th714, styles.th714FlexBox]}
                inputSearchStyle={[styles.th714, styles.th714FlexBox]}
                iconStyle={styles.iconStyle}
                data={isCitiesLoading ? [] : cities.data.data}
                search
                maxHeight={300}
                labelField="name"
                valueField="id"
                placeholder="Chọn thành phố"
                searchPlaceholder="Search..."
                value={city}
                onChange={(item) => {
                  setCity(item.id);
                  handleSubmitWithCity(item.id);
                }}
                renderLeftIcon={() => (
                  <>
                    <SvgXml xml={LocationDotIcon} />
                    <Text> </Text>
                  </>
                )}
                />
            </View>
                
          <FlatList
            showsVerticalScrollIndicator={false}
            data={activities.data.data}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.suggestionItem}
                onPress={() =>
                  navigation.navigate("Detail", { activityId: item.id })
                }
              >
                {/* <Text style={styles.suggestionText}>{item.activityName}</Text> */}
                <View style={styles.container2}>
                  <Image source={{uri: item.mainImage}} style={styles.image} />
                  <View style={styles.textContainer}>
                    <Text style={[styles.text, styles.textStyle1]}>{item.activityName}</Text>
                    <Text style={styles.text}>{item.cityName}</Text>
                    <Text style={styles.text}>{item.categoryName}</Text>
                    <View style={styles.line2}>
                      <StarRating rating={item.rating} disabled={true} />
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      ) : <></>}

      {isSearchUsersLoading ? (
        <>
          <ActivityIndicator
            size="large"
            color="#ED2939"
            style={{ paddingVertical: 12 }}
          />
        </>
      ) : searchUsersError ? (
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
      ) : selected == 1 && users !== null ? (
        <View style={styles.mainView}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={users.data.data}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.suggestionItem}
                onPress={() =>
                  navigation.navigate("ProfileScreen", { userId: item.id })
                }
              >
                {/* <Text style={styles.suggestionText}>{item.activityName}</Text> */}
                <View style={styles.container2}>
                  <Image source={{uri: item.avatar}} style={styles.image} />
                  <View style={styles.textContainer}>
                    <Text style={[styles.text, styles.textStyle1]}>{item.email.split('@')[0]}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      ) : <></>}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainView: {
    padding: 16,
    paddingBottom: 0,
  },
  locationDot: {
    fontSize: 16,
  },
  container: {
    borderRadius: 15,
    borderColor: "#e8e8e8",
    backgroundColor: "#ececec",
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  icon: {
    paddingLeft: 40,
  },
  inputArea: {
    height: "100%",
    fontSize: 16,
  },
  statusBar: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 12,
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
  suggestionText: {
    padding: 15,
    paddingHorizontal: 30,
  },
  suggestionItem: {
    borderBottomWidth: 1,
    borderColor: "#e8e8e8",
    borderStyle: "solid",
  },
  container1: {
    backgroundColor: "#ffffff",
    height: "100%",
  },
  container2: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 90,
  },
  image: {
    width: 75,
    height: 75,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  text: {
    fontSize: 16,
  },
  textStyle1: {
    fontWeight: '500'
  },
  header: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#747474",
    paddingHorizontal: "5%",
    gap: 18,
    justifyContent: "flex-start",
  },
  titleTab: {
    fontSize: 16,
    color: "#747474",
    fontWeight: '500'
  },
  line: {
    height: 2,
    width: "60%",
    marginTop: 9,
    alignSelf: "center",
    backgroundColor: "#151515",
  },
  line2: {
    flexDirection: "row",
    alignContent: "center",
    // height: 10,
    marginRight: 15,
  },
});
