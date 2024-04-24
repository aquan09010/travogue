import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Button,
} from "react-native";
import React, { useCallback, useMemo, useRef, useState } from "react";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";

export default function CommunityScreen() {
  const snapPoints = useMemo(() => ["100%"], []);
  const bottomSheetRef = React.createRef(BottomSheet);
  // const bottomSheetRef = useRef < BottomSheet > null;
  const handleClosePress = () => bottomSheetRef.current?.close();
  const handleOpenPress = () => bottomSheetRef.current?.expand();
  const handleCollapsePress = () => bottomSheetRef.current?.collapse();
  const snapeToIndex = (index) => bottomSheetRef.current?.snapToIndex(index);
  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
      />
    ),
    []
  );

  return (
    <View style={styles.container}>
      <Button title="Open" onPress={handleOpenPress} />
      <Button title="Close" onPress={handleClosePress} />
      <Button title="Collapse" onPress={handleCollapsePress} />
      <Button title="Snap To 0" onPress={() => snapeToIndex(0)} />
      <Button title="Snap To 1" onPress={() => snapeToIndex(1)} />
      <Button title="Snap To 2" onPress={() => snapeToIndex(2)} />

      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        handleIndicatorStyle={{ backgroundColor: "black" }}
        backgroundStyle={{}}
        backdropComponent={renderBackdrop}
      >
        <View style={styles.contentContainer}>
          <Text style={styles.containerHeadline}>Bình luận</Text>
        </View>
      </BottomSheet>
    </View>
  );
}
const styles = StyleSheet.create({
  containerModal: {
    flex: 1,
    alignItems: "center",
  },
  contentContainerModal: {
    flex: 1,
    alignItems: "center",
  },
  containerHeadlineModal: {
    fontSize: 16,
    fontWeight: "600",
    padding: 5,
    color: "black",
  },
});
