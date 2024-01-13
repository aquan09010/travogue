import HomeScreen from "@/Screens/HomeScreen";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const TopTabs = createMaterialTopTabNavigator();
export default function CategoryTab() {
  return (
    <TopTabs.Navigator>
      <TopTabs.Screen name="Home" component={HomeScreen} />
      <TopTabs.Screen name="Settings" />
    </TopTabs.Navigator>
  );
}
