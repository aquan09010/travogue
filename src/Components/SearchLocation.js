import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SvgXml } from "react-native-svg";
import { LocationDotIcon } from "@/Assets/Icons/LocationDot";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function SearchLocation() {
  return (
    <View style={styles.container}>
      <SvgXml style={styles.icon} xml={LocationDotIcon} />
      <TextInput
        style={styles.inputArea}
        placeholder="Bạn muốn đi đâu ?"
      ></TextInput>
    </View>
  );
}
const styles = StyleSheet.create({
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
    width: "100%",
    height: "100%",
  },
});
