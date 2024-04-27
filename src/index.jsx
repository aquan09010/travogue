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
    FontAwesome6ProLight: require('../assets/fonts/FontAwesome6Pro-Light.otf'),
    FontAwesome6FreeRegular: require('../assets/fonts/FontAwesome6Free-Regular.otf'),
    BeVNProLight: require('../assets/fonts/BeVietnamPro-Light.ttf'),
    BeVNProMedium: require('../assets/fonts/BeVietnamPro-Medium.ttf'),
    BeVNProThinItalic: require('../assets/fonts/BeVietnamPro-ThinItalic.ttf'),
    BeVNProExtraLight: require('../assets/fonts/BeVietnamPro-ExtraLight.ttf'),
    UrbanistBold: require('../assets/fonts/Urbanist-Bold.ttf'),
    UrbanistRegular: require('../assets/fonts/Urbanist-Regular.ttf'),
    VogueRegular: require('../assets/fonts/Vogue-Regular.otf'),
    SFProTextLight: require('../assets/fonts/SFProText-Light.otf')
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
