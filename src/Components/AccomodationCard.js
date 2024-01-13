import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SearchIcon } from "@/Assets/Icons/Search";
import { SvgXml } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import { MiniLocation, StarIcon } from "@/Assets/Icons/Card";
import HeartButton from "./HeartButton";

export default function AccommodationCard(props) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={[styles.itemContainer, props.style]}
      key={props.id}
      onPress={() => {}}
    >
      <Image style={styles.image} source={props.imgPath} />
      <View style={styles.cardDetail}>
        <Text style={styles.cardName}>{props.cardName}</Text>

        <View style={styles.line}>
          <SvgXml xml={MiniLocation} />
          <Text style={styles.location}>{props.location}</Text>
        </View>
        <View style={styles.container}>
          <View>
            <Text style={styles.categoryText}> $ {props.price}</Text>
          </View>
          <View style={styles.line}>
            <SvgXml xml={StarIcon} />
            <Text style={styles.categoryText}> {props.star}</Text>
          </View>
        </View>
      </View>
      <HeartButton />
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  itemContainer: {
    height: 100,
    width: "48%",
    marginBottom: 8,
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
    alignContent: "center",
    height: 10,
    marginBottom: 3,
  },
  location: {
    marginLeft: 4,
    fontSize: 11,
    color: "#262626",
  },
  cardName: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 3,
    minHeight: 30,
    maxHeight: 30,
  },
  categoryText: {
    fontSize: 12,
    color: "#262626",
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
});
