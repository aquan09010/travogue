import * as React from 'react'
import { Image } from 'expo-image'
import { useNavigation } from '@react-navigation/native'
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity
} from 'react-native'

const SearchDestination = () => {
  const navigation = useNavigation()

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
        <View style={styles.inputArea}>
          {/* Icon Search */}
          <Text style={styles.magnifyingGlass}>magnifying-glass</Text>

          <Text style={styles.inputText}>B</Text>
        </View>
      </View>

      <View style={styles.line} />

      <Text style={styles.location}>Bà Rịa - Vũng Tàu</Text>

      <View style={styles.line} />

      <Text style={styles.location}>Bạc Liêu</Text>

      <View style={styles.line} />

      <Text style={styles.location}>Bắc Kạn</Text>

      <View style={styles.line} />

      <Text style={styles.location}>Bắc Giang</Text>

      <View style={styles.line} />

      <Text style={styles.location}>Bắc Ninh</Text>

      <View style={styles.line} />

      <Text style={styles.location}>Bến Tre</Text>

      <View style={styles.line} />

      <Text style={styles.location}>Bình Dương</Text>

      <View style={styles.line} />

      <Text style={styles.location}>Bình Định</Text>

      <View style={styles.line} />

      <Text style={styles.location}>Bình Phước</Text>

      <View style={styles.line} />

      <Text style={styles.location}>Bình Thuận</Text>

      <View style={styles.line} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
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
    backgroundColor: '#fff'
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
  }
})

export default SearchDestination
