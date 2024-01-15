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
import { StarBlackIcon } from "@/Assets/Icons/Proflie";

export default function CircleCard(props) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={[styles.itemContainer, props.style]}
      key={props.id}
      onPress={() => {}}
    >
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={props.imgPath} />
        <View style={[styles.line, { marginLeft: 5, marginBottom: 4 }]}>
          <SvgXml xml={StarBlackIcon} />
          <Text style={[styles.text]}> {props.star}</Text>
        </View>
        <Text style={{ marginLeft: 5, marginBottom: 4 }}>{props.cityName}</Text>
        <Text style={{ marginLeft: 5, marginBottom: 5, fontWeight: "600" }}>
          {props.cardName}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  // ... other styles
  image: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
  },
  imageContainer: {
    width: 100,
  },
  imageText: {},
  line: {
    flexDirection: "row",
    alignContent: "center",
    // height: 10,
    paddingTop: 10,
    alignItems: "center",
  },
});
