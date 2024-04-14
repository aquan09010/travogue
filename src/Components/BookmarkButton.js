import { StyleSheet } from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";

export default function BookmarkButton() {
  const [liked, setLiked] = useState(false);

  const handlePress = () => {
    setLiked(!liked);
  };

  return (
    <AntDesign
      onPress={handlePress}
      style={styles.heartIcon}
      name={liked ? "bookmark" : "bookmarko"}
      size={20}
      color={liked ? "#E00034" : "#70001A"}
      borderColor="#70001A"
    />
  );
}

const styles = StyleSheet.create({
  heartIcon: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});
