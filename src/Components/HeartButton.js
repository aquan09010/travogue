import { StyleSheet } from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { useStateContext } from "@/Context/StateContext";

export default function HeartButton({isLiked, handleAddToWishlist, handleRemoveFromWishlist}) {
  const [liked, setLiked] = useState(isLiked);

  const handlePress = () => {
    if (liked) {
      setLiked(false)
      handleRemoveFromWishlist();
    } else {
      setLiked(true)
      handleAddToWishlist();
    }
  };

  return (
    <AntDesign
      onPress={handlePress}
      style={styles.heartIcon}
      name={liked ? "heart" : "hearto"}
      size={15}
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
