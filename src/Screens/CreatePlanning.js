import * as React from 'react'
import { Image } from 'expo-image'
import { useNavigation } from '@react-navigation/native'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'

const CreatePlanning = () => {
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      {/* Nút quay lại */}
      <TouchableOpacity onPress={() => navigation.navigate('HomePagePlanning')}>
        <Image
          style={styles.arrowLeftIcon}
          contentFit='cover'
          source={require("../Assets/arrowleft.png")}
        />
      </TouchableOpacity>

      {/* Đường kẻ */}
      <View style={styles.line} />

      {/* Tiêu đề */}
      <Text style={styles.title}>
        Hãy tạo hành trình cho chuyến đi của bạn !
      </Text>

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
        <View style={styles.item}>
          <Text style={styles.textLocation}>Hồ Chí Minh</Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.textLocation}>Hà Nội</Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.textLocation}>Đà Nẵng</Text>
        </View>
      </View>

      {/* Các địa điểm 2*/}
      <View style={styles.locationContainer}>
        <View style={styles.item}>
          <Text style={styles.textLocation}>Cần Thơ</Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.textLocation}>Huế</Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.textLocation}>Ninh Bình</Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.textLocation}>Cà Mau</Text>
        </View>
      </View>

      {/* Các địa điểm 3*/}
      <View style={styles.locationContainer}>
        <View style={styles.item}>
          <Text style={styles.textLocation}>Khánh Hòa</Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.textLocation}>Quảng Nam</Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.textLocation}>Hà Giang</Text>
        </View>
      </View>

      {/* Ô chọn thời gian cho chuyến đi */}
      <View style={styles.searchBarTime}>
        <Text style={styles.clock}>clock</Text>

        <Text style={styles.textSearchBar}>Thời gian cho Chuyến đi</Text>
      </View>

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
    marginTop: '15%'
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
    left: '5%',
    width: '90%',
    fontSize: 23,
    color: '#000',
    marginTop: '5%',
    textAlign: 'left',
    fontWeight: '500',
    fontFamily: 'BeVNProMedium'
  },
  touchableSearch: {
    height: '6%',
    marginTop: '5%'
  },
  searchBar: {
    width: '88%',
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
    width: '88%',
    height: '6%',
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
    flexDirection: 'row'
  },
  item: {
    width: 'auto',
    height: 'auto',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    paddingHorizontal: 16,
    justifyContent: 'center',
    backgroundColor: '#e8e8e8'
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
    height: '6%',
    marginTop: '65%',
  },
  createButton: {
    width: '88%',
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
