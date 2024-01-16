import React from 'react';
import AppNavigation from './Navigation/appNavigation';
import { useFonts } from 'expo-font';

import { StateContext } from './Context/StateContext';

export default function App() {
  const [loaded] = useFonts({
    Vogue: require('../assets/font/Vogue.ttf'),
  });

  if (!loaded) return null;

  return (
    <StateContext>
      <AppNavigation />
    </StateContext>
  );
}
