import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  useState,
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import { LocationDotIcon } from '@/Assets/Icons/LocationDot';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// SearchCityScreen component (implement search functionality and suggestion list)
export default function SearchCityScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]); // Your suggestion data

  const handleSearch = (query) => {
    setSearchQuery(query);
    // Filter suggestions based on query
    setSuggestions(
      suggestions.filter((suggestion) =>
        suggestion.toLowerCase().startsWith(query.toLowerCase())
      )
    );
  };

  return (
    <KeyboardAwareScrollView>
      <TextInput
        style={styles.inputArea}
        placeholder="Bạn muốn đi đâu ?"
        value={searchQuery}
        onChangeText={handleSearch}
      />
      {suggestions.length > 0 && (
        <FlatList
          data={suggestions}
          renderItem={({ item }) => <Text>{item}</Text>}
        />
      )}
    </KeyboardAwareScrollView>
  );
}
