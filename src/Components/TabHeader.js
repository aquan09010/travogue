import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from 'react-native';
import { SearchIcon } from '@/Assets/Icons/Search';
import { SvgXml } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
export default function TabHeader() {
  const navigation = useNavigation();
  
  return (
    <View style={styles.header}>
      <Text style={styles.travogue}>TRAVOGUE</Text>
      <Pressable onPress={() => navigation.navigate('SearchActivitiesScreen')}><SvgXml xml={SearchIcon} /></Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  travogue: {
    fontSize: 30,
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Vogue',
  },
  header: {
    width: '110%',
    marginLeft: -20,
    backgroundColor: '#151515',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 19,
    paddingVertical: 13,
  },
});
