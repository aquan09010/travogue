import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getItem } from "@/Utils/asyncStorage.js";
import OnboardingScreen from "@/Screens/OnBoardingScreen";
import MainNavigator from "./MainNavigation";
import DetailScreen from "@/Screens/DetailScreen";
import OrderConfirm from "@/Screens/OrderConfirmed";
import LoginScreen from "@/Screens/LoginScreen";
import RegisterScreen from "@/Screens/RegisterScreen";
import ConfirmPhoneScreen from "@/Screens/ConfirmPhoneScreen";
import CreatePasswordScreen from "@/Screens/CreatePasswordScreen";
import HostProfile from "@/Screens/HostProfile";
import SearchCityScreen from "@/Screens/SearchCityScreen";
import CommunityScreen from "@/Screens/CommunityScreen";
import WhereaboutSearchScreen from "@/Screens/WhereaboutSearchScreen";
import CloneSceen from "@/Screens/CloneDetail";
import CloneDetailScreen from "@/Screens/CloneDetail";
import FollowingScreen from "@/Screens/FollowingScreen";
import SearchActivitiesScreen from "@/Screens/SearchActivitiesScreen";
import HomePagePlanning from "@/Screens/HomePagePlanning";
import CreatePlanning from "@/Screens/CreatePlanning";
import SearchDestination from "@/Screens/SearchDestination";
import DetailATripPlan from "@/Screens/DetailATripPlan";
import AddDestination from "@/Screens/AddDestination";
import ProfileScreen from "@/Screens/ProfileScreen";
import DetailATripADay from "@/Screens/DetailATripADay";
import NewPostScreen from "@/Screens/NewPostScreen";
import CameraScreen from "@/Screens/CameraScreen";
import ProfileSettingScreen from "@/Screens/ProfileSettingScreen";
import HostNavigation from "./HostNavigation";
import DetailHost from "@/Components/HostPage/DetailHost";
import CreateNewExp from "@/Screens/Host/CreateNewExp";
import SetTicketPrice from "@/Screens/Host/SetTicketPrice";
// import WhereaboutSearchScreen from "@/Screens/WhereaboutSearchScreen";

const Stack = createNativeStackNavigator();
export default function AppNavigation() {
  const [showOnboarding, setShowOnboarding] = useState(null);
  useEffect(() => {
    checkIfAlreadyOnboarded();
  }, []);
  const checkIfAlreadyOnboarded = async () => {
    let onboarded = await getItem("onboarded");
    if (onboarded == 1) {
      // hide onboarding
      setShowOnboarding(false);
    } else {
      // show onboarding
      setShowOnboarding(true);
    }
  };
  if (showOnboarding == null) {
    return null;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={showOnboarding ? "Onboarding" : "Login"}
      >
        <Stack.Screen
          name="Onboarding"
          options={{ headerShown: false }}
          component={OnboardingScreen}
        />
        <Stack.Screen
          name="Main"
          options={{ headerShown: false }}
          component={MainNavigator}
        />
        <Stack.Screen
          name="Host"
          options={{ headerShown: false }}
          component={HostNavigation}
        />
        <Stack.Screen
          name="Detail"
          options={{ headerShown: false }}
          component={DetailScreen}
        />
        <Stack.Screen
          name="OrderConfirm"
          options={{ headerShown: false }}
          component={OrderConfirm}
        />
        <Stack.Screen
          name="HostProfile"
          options={{ headerShown: false }}
          component={HostProfile}
        />
        <Stack.Screen
          name="Login"
          options={{ headerShown: false }}
          component={LoginScreen}
        />
        <Stack.Screen
          name="Register"
          options={{ headerShown: false }}
          component={RegisterScreen}
        />
        <Stack.Screen
          name="ConfirmPhone"
          options={{ headerShown: false }}
          component={ConfirmPhoneScreen}
        />
        <Stack.Screen
          name="CreatePassword"
          options={{ headerShown: false }}
          component={CreatePasswordScreen}
        />
        <Stack.Screen
          name="SearchCityScreen"
          options={{ headerShown: false }}
          component={SearchCityScreen}
        />
        <Stack.Screen
          name="SearchActivitiesScreen"
          options={{ headerShown: false }}
          component={SearchActivitiesScreen}
        />
        <Stack.Screen
          name="CommunityScreen"
          options={{ headerShown: false }}
          component={CommunityScreen}
        />
        <Stack.Screen
          name="CloneScreen"
          options={{ headerShown: false }}
          component={CloneDetailScreen}
        />
        <Stack.Screen
          name="WhereaboutSearch"
          options={{ headerShown: false }}
          component={WhereaboutSearchScreen}
        />
        <Stack.Screen
          name="ProfileScreen"
          options={{ headerShown: false }}
          component={ProfileScreen}
        />
        <Stack.Screen
          name="FollowingScreen"
          options={{ headerShown: false }}
          component={FollowingScreen}
        />
        <Stack.Screen
          name="HomePagePlanning"
          component={HomePagePlanning}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CreatePlanning"
          options={{ headerShown: false }}
          component={CreatePlanning}
        />
        <Stack.Screen
          name="SearchDestination"
          options={{ headerShown: false }}
          component={SearchDestination}
        />
        <Stack.Screen
          name="DetailATripPlan"
          options={{ headerShown: false }}
          component={DetailATripPlan}
        />
        <Stack.Screen
          name="AddDestination"
          options={{ headerShown: false }}
          component={AddDestination}
        />
        <Stack.Screen
          name="DetailATripADay"
          options={{ headerShown: false }}
          component={DetailATripADay}
        />
        <Stack.Screen
          name="NewPostScreen"
          options={{ headerShown: false }}
          component={NewPostScreen}
        />
        <Stack.Screen
          name="CameraScreen"
          options={{ headerShown: false }}
          component={CameraScreen}
        />
        <Stack.Screen
          name="ProfileSettingScreen"
          options={{ headerShown: false }}
          component={ProfileSettingScreen}
        />
        <Stack.Screen
          name="HostDetailScreen"
          options={{ headerShown: false }}
          component={DetailHost}
        />
        <Stack.Screen
          name="NewExpScreen"
          options={{ headerShown: false }}
          component={CreateNewExp}
        />
        <Stack.Screen
          name="SetTicketPriceScreen"
          options={{ headerShown: false }}
          component={SetTicketPrice}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
