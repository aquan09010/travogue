import { Text, View, StyleSheet, Pressable, Image } from "react-native";
import TicketCard from "./TicketCard";
import { ScrollView } from "react-native-gesture-handler";
import { useState } from "react";
import LineProfile from "./LineProfile";

export default function FollowingTab({route}) {
  const [following, setFollowing] = useState(false);

  const { data } = route.params;
  return (
    <View style={{ height: "100%", backgroundColor: "white" }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {data.map(profile => <LineProfile data={profile}/>)}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  mainView: {
    padding: 16,
    paddingBottom: 0,
    backgroundColor: "#fff",
  },
  avaImg: {
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
  followText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 14,
  },
  followingText: {
    color: "black",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 14,
  },
  followButton: {
    borderRadius: 15,
    backgroundColor: "#418dff",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 30,
  },
  followingButton: {
    borderRadius: 15,
    backgroundColor: "#e8e8e8",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 30,
  },
});
