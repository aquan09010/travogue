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
} from "react-native";
import { ArrowLeftBlack, SearchIconBlack } from "@/Assets/Icons/Navigation";
import { SvgXml } from "react-native-svg";
import { LocationDotIcon } from "@/Assets/Icons/LocationDot";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Header } from "react-native/Libraries/NewAppScreen";
import { useNavigation } from "@react-navigation/native";
import { useStateContext } from "@/Context/StateContext";
import { useEffect, useState } from "react";
import { searchActivities } from "@/Hooks/TravelActivityHooks";

// SearchCityScreen component (implement search functionality and suggestion list)
export default function SearchActivitiesScreen() {
  const navigation = useNavigation();

  const { accessToken } = useStateContext();

  const [searchQuery, setSearchQuery] = useState("");

  const { activities, isSearchActivitiesLoading, searchActivitiesError } = searchActivities(accessToken, searchQuery);

  // useEffect(() => console.log(searchQuery), [searchQuery]);

  return (
    <SafeAreaView style={styles.container1}>
      <View style={styles.statusBar}>
        <Pressable onPress={() => navigation.goBack()}>
          <SvgXml xml={ArrowLeftBlack} />
        </Pressable>
        <Text style={styles.title}>Tìm kiếm</Text>
        <Pressable onPress={() => {}}>
          <SvgXml xml={SearchIconBlack} />
        </Pressable>
      </View>
      <View style={styles.mainView}>
        <View style={styles.container}>
          {/* <SvgXml style={styles.icon} xml={LocationDotIcon} /> */}
          <TextInput
            style={styles.inputArea}
            placeholder="Tìm kiếm"
            value={searchQuery}
            onChangeText={(q) => setSearchQuery(q)}
            autoFocus={true}
          />
        </View>
      </View>
      {isSearchActivitiesLoading ? (
        <>
          <ActivityIndicator
            size="large"
            color="#ED2939"
            style={{ paddingVertical: 12 }}
          />
          <Text
            style={{
              color: "#ED2939",
              textAlign: "center",
              paddingBottom: 20,
              fontSize: 14,
            }}
          >
            Please wait...
          </Text>
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
      ) : (
        <View style={styles.mainView}>
          <FlatList
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
        <Text style={styles.text}>{item.categoryName}</Text>
      </View>
    </View>

              </TouchableOpacity>
            )}
          />
        </View>
      )}
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
    borderStyle: "solid",
    borderColor: "#e8e8e8",
    borderWidth: 1,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingVertical: 15,
  },
  icon: {
    paddingLeft: 40,
  },
  inputArea: {
    height: "100%",
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
  },
  image: {
    width: 50,
    height: 50,
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
  }
});
