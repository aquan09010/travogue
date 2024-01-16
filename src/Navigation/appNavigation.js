import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getItem } from '@/Utils/asyncStorage.js';
import OnboardingScreen from '@/Screens/OnBoardingScreen';
import MainNavigator from './MainNavigation';
import DetailScreen from '@/Screens/DetailScreen';
import OrderConfirm from '@/Screens/OrderConfirmed';
import LoginScreen from '@/Screens/LoginScreen';
import RegisterScreen from '@/Screens/RegisterScreen';
import ConfirmPhoneScreen from '@/Screens/ConfirmPhoneScreen';
import CreatePasswordScreen from '@/Screens/CreatePasswordScreen';
import HostProfile from '@/Screens/HostProfile';
import SearchCityScreen from '@/Screens/SearchCityScreen';
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
import WhereaboutSearchScreen from "@/Screens/WhereaboutSearchScreen";

const Stack = createNativeStackNavigator();
export default function AppNavigation() {
  const [showOnboarding, setShowOnboarding] = useState(null);
  useEffect(() => {
    checkIfAlreadyOnboarded();
  }, []);
  const checkIfAlreadyOnboarded = async () => {
    let onboarded = await getItem('onboarded');
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
        initialRouteName={showOnboarding ? 'Onboarding' : 'Login'}
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
          name="WhereaboutSearch"
          options={{ headerShown: false }}
          component={WhereaboutSearchScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
