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
export default function TabHeader() {
  return (
    <View style={styles.header}>
      <Text style={styles.travogue}>TRAVOGUE</Text>
      <SvgXml xml={SearchIcon} />
    </View>
  );
}
const styles = StyleSheet.create({
  travogue: {
    fontSize: 32,
    textAlign: "center",
    color: "white",
  },
  header: {
    width: "110%",
    marginLeft: -20,
    backgroundColor: "#151515",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 19,
    paddingVertical: 16,
  },
});
