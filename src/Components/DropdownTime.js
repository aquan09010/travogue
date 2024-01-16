import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import { CalendarIcon } from "@/Assets/Icons/OrderConfirm";
import { SvgXml } from "react-native-svg";
import { CheckIcon } from "@/Assets/Icons/DetailIcon";

const data = [
  { label: " 6:30 - 8:30", value: "1" },
  { label: " 8:30 - 10:30", value: "2" },
  { label: " 11:30 - 13:30", value: "3" },
  { label: " 13:30 - 15:30", value: "4" },
  { label: " 17:30 - 19:30", value: "5" },
  { label: " 20:30 - 22:30", value: "6" },
];

const DropdownTime = () => {
  const [value, setValue] = useState(null);

  const renderItem = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
        {item.value === value && <SvgXml xml={CheckIcon} />}
      </View>
    );
  };

  return (
    <Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      data={data}
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder=" Chọn giờ"
      value={value}
      onChange={(item) => {
        setValue(item.value);
      }}
      renderLeftIcon={() => <SvgXml xml={CalendarIcon} />}
      renderItem={renderItem}
    />
  );
};

export default DropdownTime;

const styles = StyleSheet.create({
  dropdown: {
    width: "40%",
    marginTop: 12,
    height: 50,
    marginRight: 15,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
