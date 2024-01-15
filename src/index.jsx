import React from 'react';
import AppNavigation from './Navigation/appNavigation';

import { StateContext } from './Context/StateContext';

export default function App() {
  return (
    <StateContext>
      <AppNavigation />
    </StateContext>
  );
}
