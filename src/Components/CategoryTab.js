import { useState } from "react";
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

export default function CategoryTab() {
  const tabs = ["Đi đâu", "Ăn gì", "Ở đâu", "Trải Nghiệm"];
  const menu = [
    "Công viên",
    "Khu giải trí",
    "Khu di tích",
    "Danh lam thắng cảnh",
    "Bảo tàng",
  ];
  const [selected, setSelected] = useState(0);

  return (
    <View>
      <View style={styles.header}>
        {tabs.map((e, i) => (
          <Pressable key={i} onPress={() => setSelected(i)}>
            <Text
              style={[
                styles.title,
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
  );
}
const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#767676",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingTop: 18,
    borderBottomWidth: 0.5,
    borderColor: "#767676",
  },
  line: {
    width: 35,
    height: 2,
    backgroundColor: "#151515",
    alignSelf: "center",
    marginTop: 9,
  },
});
