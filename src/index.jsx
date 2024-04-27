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
    FontAwesome6ProLight: require("../assets/font/FontAwesome6Pro-Light.otf"),
    FontAwesome6FreeRegular: require("../assets/font/FontAwesome6Free-Regular.otf"),
    BeVNProLight: require("../assets/font/BeVietnamPro-Light.ttf"),
    BeVNProMedium: require("../assets/font/BeVietnamPro-Medium.ttf"),
    BeVNProThinItalic: require("../assets/font/BeVietnamPro-ThinItalic.ttf"),
    BeVNProExtraLight: require("../assets/font/BeVietnamPro-ExtraLight.ttf"),
    UrbanistBold: require("../assets/font/Urbanist-Bold.ttf"),
    UrbanistRegular: require("../assets/font/Urbanist-Regular.ttf"),
    VogueRegular: require("../assets/font/Vogue-Regular.otf"),
    SFProTextLight: require("../assets/font/SFProText-Light.otf")
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
