import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SearchIcon } from '@/Assets/Icons/Search';
import { SvgXml } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { MiniLocation, StarIcon } from '@/Assets/Icons/Card';
import HeartButton from './HeartButton';

export default function CityCard(props) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={[styles.itemContainer, props.style]}
      key={props.id}
      onPress={() => {}}
    >
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={props.imgPath} />
        <Text style={styles.imageText}>{props.cardName}</Text>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  // ... other styles
  image: {
    borderRadius: 7,
    width: '100%',
    height: 230,
  },
  imageContainer: {
    position: 'relative',
    height: 230, // Adjust height as needed
    width: 230,
  },
  imageText: {
    position: 'absolute',
    bottom: 15, // Adjust bottom positioning as needed
    left: 15, // Adjust horizontal positioning as needed
    color: 'white', // Adjust text color as needed
    fontSize: 18, // Adjust text size as needed
    fontWeight: 'bold',
  },
});
