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
} from "react-native";
import { ArrowLeftBlack, SearchIconBlack } from "@/Assets/Icons/Navigation";
import { SvgXml } from "react-native-svg";
import { LocationDotIcon } from "@/Assets/Icons/LocationDot";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Header } from "react-native/Libraries/NewAppScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { searchCities } from "@/Hooks/CityHooks";
import { useStateContext } from "@/Context/StateContext";
import { useState } from "react";

// SearchCityScreen component (implement search functionality and suggestion list)
export default function SearchCityScreen() {
  const navigation = useNavigation();

  const { accessToken } = useStateContext();

  const [searchQuery, setSearchQuery] = useState("");

  const { cities, isCitiesLoading, citiesError } = searchCities(
    accessToken,
    searchQuery
  );

  return (
    <SafeAreaView style={styles.container1}>
      <View style={styles.statusBar}>
        <Pressable onPress={() => navigation.goBack()}>
          <SvgXml xml={ArrowLeftBlack} />
        </Pressable>
        <Text style={styles.title}>Tìm kiếm thành phố</Text>
        <Pressable onPress={() => {}}>
          {/* <SvgXml xml={SearchIconBlack} /> */}
        </Pressable>
      </View>
      <View style={styles.mainView}>
        <View style={styles.container}>
          <SvgXml style={styles.icon} xml={LocationDotIcon} />
          <TextInput
            style={styles.inputArea}
            placeholder="Bạn muốn đi đâu ?"
            value={searchQuery}
            onChangeText={(q) => setSearchQuery(q)}
            autoFocus={true}
          />
        </View>
      </View>
      {isCitiesLoading ? (
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
      ) : citiesError ? (
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
            data={cities.data.data}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.suggestionItem}
                onPress={() =>
                  navigation.navigate("WhereaboutSearch", { city: item })
                }
              >
                <Text style={styles.suggestionText}>{item.name}</Text>
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
  },
});
