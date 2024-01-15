import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import { LocationDotIcon } from '@/Assets/Icons/LocationDot';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';

export default function SearchLocation() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate('SearchCityScreen')}>
      <View style={styles.container}>
        <SvgXml style={styles.icon} xml={LocationDotIcon} />
        <TextInput style={styles.inputArea} placeholder="Bạn muốn đi đâu ?" />
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  locationDot: {
    fontSize: 16,
  },
  container: {
    borderRadius: 15,
    borderStyle: 'solid',
    borderColor: '#e8e8e8',
    borderWidth: 1,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 15,
  },
  icon: {
    paddingLeft: 40,
  },
  inputArea: {
    width: '100%',
    height: '100%',
  },
});
