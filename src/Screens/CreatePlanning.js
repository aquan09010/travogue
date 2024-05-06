import { Image } from 'expo-image'
import { useNavigation } from '@react-navigation/native'
import React, { useState, useRef, useCallback, useMemo } from 'react'
import {
  Text,
  View,
  Modal,
  Button,
  Platform,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView
} from 'react-native'

// Danh sách Các Tỉnh/Thành phố gợi ý
const cities = [
  'Hồ Chí Minh',
  'Hà Nội',
  'Đà Nẵng',
  'Cần Thơ',
  'Huế',
  'Ninh Bình',
  'Cà Mau',
  'Khánh Hòa',
  'Quảng Nam',
  'Hà Giang'
]

const CreatePlanning = () => {
  const navigation = useNavigation()

  // Kiểm tra danh sách Thành phố/Tỉnh đã chọn
  const [selectedCity, setSelectedCity] = useState([])

  return (
    <View style={styles.container}>
      {/* Nút quay lại */}
      <TouchableOpacity onPress={() => navigation.navigate('Lập kế hoạch')}>
        <Image
          style={styles.arrowLeftIcon}
          contentFit='cover'
          source={require('../Assets/arrowleft.png')}
        />
      </TouchableOpacity>

      {/* Đường kẻ */}
      <View style={styles.line} />

      {/* Tiêu đề */}
      <Text style={styles.title}>
        Hãy tạo hành trình cho chuyến đi của bạn !
      </Text>

      {/* Nơi đặt trên cho kế hoạch */}
      <TouchableOpacity
        style={styles.touchableSearch}
        onPress={() => setModalVisible(true)}
      >
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>pencil</Text>
          <Text style={styles.textSearchBar}>Đặt tên cho Chuyến đi</Text>
        </View>
      </TouchableOpacity>


      {/* Thanh Search các địa điểm nếu bạn không tìm thấy ở địa điểm gợi ý */}
      <TouchableOpacity
        style={styles.touchableSearch}
        onPress={() => navigation.navigate('SearchDestination')}
      >
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>magnifying-glass</Text>

          <Text style={styles.textSearchBar}>Thêm nơi bắt đầu hành trình</Text>
        </View>
      </TouchableOpacity>

      {/* Gợi ý các địa điểm */}
      <Text style={styles.suggestText}>
        Bạn có thể thích những địa điểm này
      </Text>

      {/* Các địa điểm 1*/}
      <View style={styles.locationContainer}>
        {cities.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.item,
              {
                borderColor: selectedCity.includes(option) ? 'red' : 'black'
              }
            ]}
            onPress={() => {
              setSelectedCity(prevOptions => {
                if (prevOptions.includes(option)) {
                  // If the option is already selected, remove it from the array
                  return prevOptions.filter(prevOption => prevOption !== option)
                } else {
                  // If the option is not selected, add it to the array
                  return [...prevOptions, option]
                }
              })
            }}
          >
            <Text
              style={[
                styles.textLocation,
                {
                  color: selectedCity.includes(option) ? 'red' : 'black'
                }
              ]}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Ô chọn thời gian cho chuyến đi */}
      <TouchableOpacity>
        <View style={styles.searchBarTime}>
          <Text style={styles.clock}>clock</Text>

          <Text style={styles.textSearchBar}>Thời gian cho Chuyến đi</Text>
        </View>
      </TouchableOpacity>

      {/* Nút tạo chuyến đi */}
      <TouchableOpacity
        style={styles.touchableButton}
        onPress={() => navigation.navigate('DetailATripPlan')}
      >
        <View style={styles.createButton}>
          <View style={styles.createChild} />

          <Text style={styles.createText}>Tạo Chuyến đi</Text>
        </View>
      </TouchableOpacity>
    </View>
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
  arrowLeftIcon: {
    width: 30,
    left: '5%',
    height: 30,
    marginTop: '5%'
  },
  line: {
    height: 1,
    width: '100%',
    marginTop: '5%',
    borderTopWidth: 1,
    borderStyle: 'solid',
    borderColor: '#bababa'
  },
  title: {
    width: '90%',
    fontSize: 23,
    color: '#000',
    marginTop: '5%',
    marginLeft: '5%',
    fontWeight: '500',
    fontFamily: 'BeVNProMedium'
  },
  touchableSearch: {
    height: 50,
    marginTop: '5%'
  },
  searchBar: {
    width: 361,
    height: '100%',
    borderWidth: 1,
    borderRadius: 15,
    alignSelf: 'center',
    paddingVertical: 14,
    alignItems: 'center',
    borderStyle: 'solid',
    flexDirection: 'row',
    paddingHorizontal: 30,
    borderColor: '#767676',
    backgroundColor: '#fff'
  },
  searchBarTime: {
    width: 361,
    height: 50,
    borderWidth: 1,
    marginTop: '5%',
    borderRadius: 15,
    alignSelf: 'center',
    paddingVertical: 14,
    alignItems: 'center',
    borderStyle: 'solid',
    flexDirection: 'row',
    paddingHorizontal: 30,
    borderColor: '#767676',
    backgroundColor: '#fff'
  },
  searchIcon: {
    fontSize: 14,
    fontFamily: 'FontAwesome6ProLight'
  },
  textSearchBar: {
    fontSize: 14,
    width: 'auto',
    color: '#bababa',
    marginLeft: '7%',
    letterSpacing: 0.1,
    fontFamily: 'BeVN'
  },
  suggestText: {
    fontSize: 14,
    marginTop: '4%',
    marginLeft: '5%',
    fontFamily: 'BeVN'
  },
  locationContainer: {
    gap: 8,
    width: 'auto',
    height: 'auto',
    display: 'flex',
    marginTop: '4%',
    marginLeft: '5%',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  item: {
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    borderStyle: 'solid',
    paddingHorizontal: 16,
    justifyContent: 'center'

    // backgroundColor: '#e8e8e8'
  },
  textLocation: {
    fontSize: 14,
    color: '#000',
    letterSpacing: 0.1,
    fontFamily: 'BeVN'
  },
  clock: {
    fontSize: 14,
    color: '#000',
    fontFamily: 'FontAwesome6ProLight'
  },
  touchableButton: {
    height: 55,
    marginTop: '50%'
  },
  createButton: {
    width: 361,
    height: '100%',
    borderWidth: 1,
    borderRadius: 15,
    alignSelf: 'center',
    alignItems: 'center',
    borderStyle: 'solid',
    borderColor: '#1b1b1b',
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
  createText: {
    fontSize: 22,
    textAlign: 'left',
    fontWeight: '500',
    fontFamily: 'BeVNProMedium'
  }
})

export default CreatePlanning
