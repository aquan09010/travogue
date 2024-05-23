import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from "react-native";
import { SearchIcon } from "@/Assets/Icons/Search";
import { SvgXml } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import { MiniLocation, StarIcon } from "@/Assets/Icons/Card";
import HeartButton from "../HeartButton";
import { DeleteIcon, EditIcon } from "@/Assets/Icons/Proflie";
import { deleteExperienceHook } from "@/Hooks/HostManageHook";
import { useStateContext } from "@/Context/StateContext";

export default function ExpHostCard(props) {
  const navigation = useNavigation();
  const goToDetail = async (e) => {
    e.preventDefault();
    navigation.navigate("HostDetailScreen", {
      activityId: props.id,
      isExperience: props.isExperience,
    });
  };
  // const goToDetail = async (e) => {
  //   e.preventDefault();
  //   navigation.navigate("CloneScreen", {
  //     activityId: props.id,
  //     isExperience: props.isExperience,
  //   });
  // };
  const gotoHost = async (e) => {
    e.preventDefault();
    navigation.navigate("HostProfile");
  };

  const { accessToken } = useStateContext();

  const {
    deleteExperience,
    isDeleteExperienceLoading,
    deleteExperienceError
  } = deleteExperienceHook();

  return (
    <TouchableOpacity
      style={[styles.itemContainer, props.style]}
      key={props.id}
      onPress={goToDetail}
    >
      <Image style={styles.image} source={{ uri: props.imgPath }} />
      <View style={styles.cardDetail}>
        <View style={styles.container}>
          <View style={styles.line}>
            <SvgXml xml={StarIcon} />
            <Text style={styles.categoryText}>
              {" "}
              {parseFloat(props.star).toFixed(1)}
            </Text>
          </View>
          <View style={styles.line}>
            <SvgXml xml={MiniLocation} />
            <Text style={styles.location}> {props.location}</Text>
          </View>
        </View>

        <Text style={styles.cardName} numberOfLines={2}>
          {props.cardName}
        </Text>

        <View style={styles.container}>
          <View style={{ width: "80%" }}>
            <View style={styles.line}>
              <Text style={styles.categoryText}>
                Từ {props.price / 1000}K/người
              </Text>
            </View>
            <View style={styles.line}>
              <Text style={styles.location}>{props.category}</Text>
            </View>
          </View>

          <View style={styles.line}>
            <Pressable
              onPress={gotoHost}
              style={[styles.avatar, styles.actionPadding]}
            >
              <Image
                style={styles.avaImg}
                resizeMode="cover"
                source={{ uri: props.host }}
              />
            </Pressable>
          </View>
        </View>
        <View style={styles.container}>
          <Pressable
            onPress={() => {
              console.log("Edit");
            }}
            disabled={isDeleteExperienceLoading}
          >
            <SvgXml xml={EditIcon} />
          </Pressable>
          <Pressable
            onPress={() => {
              props.handleDelete(props.id);
              deleteExperience(accessToken, props.id);
              console.log("Delete");
            }}
            disabled={isDeleteExperienceLoading}
          >
            <SvgXml xml={DeleteIcon} />
          </Pressable>
        </View>
      </View>

      <HeartButton />
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  itemContainer: {
    height: 330,
    width: 175,
    marginBottom: 12,
  },
  image: {
    borderRadius: 7,
    width: "100%",
    height: 230,
  },
  cardDetail: {
    padding: 8,
  },
  line: {
    flexDirection: "row",
    alignItems: "center",
    // height: 10,
    marginBottom: 3,
  },
  location: {
    // marginLeft: 4,
    fontSize: 12,
    color: "#262626",
    textTransform: "capitalize",
  },
  cardName: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 3,
  },
  categoryText: {
    fontSize: 12,
    color: "#262626",
    fontWeight: "bold",
  },
  imageIcon: {
    flex: 1,
    width: "100%",
    height: 250,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  avaImg: {
    height: 30,
    width: 30,
    borderRadius: 40 / 2,
  },
});
