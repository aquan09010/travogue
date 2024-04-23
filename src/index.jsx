import React from "react";
import AppNavigation from "./Navigation/appNavigation";
import { useFonts } from "expo-font";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StateContext } from "./Context/StateContext";

export default function App() {
  const [loaded] = useFonts({
    Vogue: require("../assets/font/Vogue.ttf"),
    BeVN: require("../assets/font/BeVietnamPro-Regular.ttf"),
    BeVNBold: require("../assets/font/BeVietnamPro-Bold.ttf"),
    BeVNSemi: require("../assets/font/BeVietnamPro-SemiBold.ttf"),
  });

  if (!loaded) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <StateContext>
          <AppNavigation />
        </StateContext>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
