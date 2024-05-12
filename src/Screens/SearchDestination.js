import * as React from 'react'
import { Image } from 'expo-image'
import { useNavigation } from '@react-navigation/native'
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  TextInput
} from 'react-native'
import { useStateContext } from '@/Context/StateContext'
import { searchCities } from '@/Hooks/CityHooks'

const SearchDestination = ({route}) => {
  const navigation = useNavigation()

  const { accessToken } = useStateContext();

  const { setSelectedCity } = route.params;

  const [searchQuery, setSearchQuery] = React.useState("");

  const { cities, isCitiesLoading, citiesError } = searchCities(
    accessToken,
    searchQuery
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        {/* Nút quay lại */}
        <TouchableOpacity
          style={styles.touchable}
          onPress={() => navigation.navigate('CreatePlanning')}
        >
          <Image
            style={styles.arrowLeftIcon}
            contentFit='cover'
            source={require('../Assets/arrowleft.png')}
          />
        </TouchableOpacity>

        {/* Thanh Search */}
        <TextInput
          style={styles.inputArea}
          placeholder="Bạn muốn đi đâu ?"
          value={searchQuery}
          onChangeText={(q) => setSearchQuery(q)}
          autoFocus={true}
        />
      </View>

      {isCitiesLoading ? (
        <>
          <ActivityIndicator
            size="large"
            color="#ED2939"
            style={{ paddingVertical: 12 }}
          />
          <Text
            style={{
              color: "#ED2939",
              textAlign: "center",
              paddingBottom: 20,
              fontSize: 14,
            }}
          >
            Please wait...
          </Text>
        </>
      ) : citiesError ? (
        <Text
          style={{
            color: "#A80027",
            textAlign: "center",
            paddingBottom: 20,
            fontSize: 16,
          }}
        >
          Something went wrong!
        </Text>
      ) : (
        <View style={styles.mainView}>
          <FlatList
            data={cities.data.data}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.suggestionItem}
                onPress={() => {
                  setSelectedCity(prevOptions => {
                    if (prevOptions.includes(item.name)) {
                      // If the option is already selected, remove it from the array
                      return prevOptions.filter(
                        prevOption => prevOption !== item.name
                      )
                    } else {
                      // If the option is not selected, add it to the array
                      return [...prevOptions, item.name]
                    }
                  })
                  navigation.goBack();
                }
                }
              >
                <Text style={styles.suggestionText}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  mainView: {
    padding: 16,
    paddingBottom: 0,
  },
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    backgroundColor: '#fff'
  },
  headerContainer: {
    width: '100%',
    display: 'flex',
    marginVertical: '5%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  touchable: {
    width: 30,
    height: 30
  },
  arrowLeftIcon: {
    width: 30,
    height: 30
  },
  inputArea: {
    width: 291,
    height: 50,
    borderWidth: 1,
    display: 'flex',
    marginLeft: '6%',
    borderRadius: 15,
    alignItems: 'center',
    borderStyle: 'solid',
    flexDirection: 'row',
    borderColor: '#767676',
    backgroundColor: '#fff',
    paddingLeft: 16
  },
  magnifyingGlass: {
    width: 20,
    fontSize: 14,
    color: '#767676',
    marginLeft: '10%',
    fontFamily: 'FontAwesome6ProLight'
  },
  inputText: {
    fontSize: 14,
    color: '#000',
    marginLeft: '6%',
    letterSpacing: 0.1,
    alignItems: 'center',
    fontFamily: 'BeVN'
  },
  line: {
    height: 1,
    width: '100%',
    borderTopWidth: 1,
    borderStyle: 'solid',
    marginVertical: '1%',
    borderColor: '#e8e8e8'
  },
  location: {
    fontSize: 17,
    color: '#000',
    fontFamily: 'BeVN',
    marginVertical: '3%',
    marginHorizontal: '11%'
  },
  suggestionText: {
    padding: 15,
    paddingHorizontal: 30,
  },
  suggestionItem: {
    borderBottomWidth: 1,
    borderColor: "#e8e8e8",
    borderStyle: "solid",
  },
})

export default SearchDestination
