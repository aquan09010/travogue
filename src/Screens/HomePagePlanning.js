import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity
} from 'react-native'
import Checkbox from 'expo-checkbox'
import Modal from 'react-native-modal'
import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useLayoutEffect, useState } from 'react'

const HomePagePlanning = () => {
  const navigation = useNavigation()

  // Mẫu data danh sách các Chuyến đi
  const [trips, setTrips] = useState(
    [
      {
        key: '1',
        image: require('../Assets/HoChiMinhCity.png'),
        titleName: 'Hồ Chí Minh',
        countItems: 'Có 6 điểm đến',
        updateStatus: 'Thay đổi 6 phút trước'
      },
      {
        key: '2',
        image: require('../Assets/HoChiMinhCity.png'),
        titleName: 'Hồ Chí Minh',
        countItems: 'Có 6 điểm đến',
        updateStatus: 'Thay đổi 6 phút trước'
      },
      {
        key: '3',
        image: require('../Assets/HoChiMinhCity.png'),
        titleName: 'Hồ Chí Minh',
        countItems: 'Có 6 điểm đến',
        updateStatus: 'Thay đổi 6 phút trước'
      },
      {
        key: '4',
        image: require('../Assets/HoChiMinhCity.png'),
        titleName: 'Hồ Chí Minh',
        countItems: 'Có 6 điểm đến',
        updateStatus: 'Thay đổi 6 phút trước'
      },
      {
        key: '5',
        image: require('../Assets/HoChiMinhCity.png'),
        titleName: 'Hồ Chí Minh',
        countItems: 'Có 6 điểm đến',
        updateStatus: 'Thay đổi 6 phút trước'
      }
    ].map(trip => ({ ...trip, isChecked: false }))
  )

  // Nút Check
  const [isChecked, setChecked] = useState(false)

  const handlePress = () => {
    setChecked(!isChecked)
  }

  // Handle checkbox change
  const handleCheckboxChange = (key, newValue) => {
    setTrips(
      trips.map(trip => {
        if (trip.key === key) {
          return { ...trip, isChecked: newValue }
        }
        return trip
      })
    )
  }

  // Kiểm tra xem có nhấn nút Sắp xếp chưa để hiển thị ô tick
  const [isDeleting, setIsDeleting] = useState(false)

  // Kiểm tra để hiển thị/ẩn nút Xóa
  const [isDeleteButton, setIsDeleteButton] = useState(false)

  // Modal Toggle Chức năng (Sắp xếp + Tạo mới + Xóa)
  const [isModalVisible, setModalVisible] = useState(false)

  const toggleModal = async e => {
    e.preventDefault()
    setModalVisible(!isModalVisible)
  }

  // Hàm trung gian vừa đóng được Modal vừa chuyển sang trang CreatePlanning
  const navigateAndCloseModal = routeName => {
    setModalVisible(false)
    navigation.navigate(routeName)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>Danh sách yêu thích của bạn</Text>
      </View>

      {/* Danh sách yêu thích Mặc định */}
      <TouchableOpacity style={styles.touchableFavorite}>
        <View style={styles.favoriteContainer}>
          {/* Ảnh đại diện */}
          <Image
            style={styles.imageFavorite}
            contentFit='cover'
            source={require('../Assets/HoChiMinhCity.png')}
          />

          {/* Thông tin */}
          <View style={styles.informationFavorite}>
            <Text style={styles.titleFavorite}>DS Yêu Thích</Text>

            <View style={styles.statusContainer}>
              <Text style={styles.countItems}>(Có 6 điểm đến)</Text>

              <Text style={styles.updateStatus}>Thay đổi 6 phút trước</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>

      {/* Tiêu đề */}
      <View style={styles.title}>
        <Text style={styles.titleText}>Chuyến đi của bạn</Text>

        <TouchableOpacity onPress={toggleModal}>
          <Text style={styles.buttonFunction}>pen-to-square</Text>
        </TouchableOpacity>
      </View>

      {/* Nội dung */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollContainer}
      >
        <View style={styles.subcontainer}>
          <Text style={styles.icon}>circle-location-arrow</Text>
          <Text style={styles.text}>Địa điểm bạn muốn đi</Text>
        </View>

        <View style={styles.subcontainer}>
          <Text style={styles.icon}>pot-food</Text>
          <Text style={styles.text}>Món ăn muốn thưởng thức</Text>
        </View>

        <View style={styles.subcontainer}>
          <Text style={styles.icon}>hotel</Text>
          <Text style={styles.text}>Nơi bạn muốn ở</Text>
        </View>

        <View style={styles.subcontainer}>
          <Text style={styles.icon}>mountain-sun</Text>
          <Text style={styles.text}>Trải nghiệm mới mẻ</Text>
        </View>

        <View style={styles.subcontainer}>
          <Text style={styles.icon}>circle-bookmark</Text>
          <Text style={styles.text}>Ghi chú</Text>
        </View>

        <View style={styles.subcontainer}>
          <Text style={styles.icon}>circle-camera</Text>
          <Text style={styles.text}>Thêm những khoảnh khắc đẹp</Text>
        </View>

        <View style={styles.subcontainer}>
          <Text style={styles.icon}>circle-user</Text>
          <Text style={styles.text}>Mời bạn bè</Text>
        </View>

        <View style={styles.subcontainer}>
          <Text style={styles.icon}>user-group</Text>
          <Text style={styles.text}>Chia sẻ lên cộng đồng</Text>
        </View>

        {trips.map(trip => (
          <TouchableOpacity
            key={trip.key}
            style={styles.touchableFavorite}
            onPress={() => handleCheckboxChange(trip.key, !trip.isChecked)}
          >
            {isDeleting && (
              <Checkbox
                disabled={false}
                value={trip.isChecked}
                style={styles.iconCheck}
                onPress={() => handleCheckboxChange(trip.key, !trip.isChecked)}
                color={trip.isChecked ? 'red' : undefined}
              />
            )}

            <View style={styles.favoriteContainer}>
              {/* Ảnh đại diện */}
              <Image
                style={styles.imageFavorite}
                contentFit='cover'
                source={trip.image}
              />

              {/* Thông tin */}
              <View style={styles.informationFavorite}>
                <Text style={styles.titleFavorite}>{trip.titleName}</Text>

                <View style={styles.statusContainer}>
                  <Text style={styles.countItems}>{trip.countItems}</Text>

                  <Text style={styles.updateStatus}>{trip.updateStatus}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        {/* Nút Xóa Chuyến đi */}
        {isDeleteButton && (
          <TouchableOpacity
            style={styles.touchableButton}
            onPress={() => {
              setIsDeleting(false)
              setIsDeleteButton(false)
            }}
          >
            <View style={styles.buttonContainer}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Xóa Chuyến đi (0)</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      </ScrollView>

      {/* Modal Toggle Chức năng (Sắp xếp + Tạo mới + Xóa) */}
      <Modal
        style={{
          margin: 0,
          padding: 0,
          width: '100%',
          height: '100%',
          justifyContent: 'flex-end'
        }}
        avoidKeyboard={true}
        swipeDirection='down'
        propagateSwipe={true}
        isVisible={isModalVisible}
        onSwipeComplete={toggleModal}
        onBackdropPress={() => setModalVisible(false)}
        onBackButtonPress={() => setModalVisible(false)}
      >
        <View
          style={{
            bottom: 0,
            height: 270,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            backgroundColor: '#EAEAEA'
          }}
        >
          {/* Thanh kéo lên kéo xuống */}
          <View
            style={{
              width: 40,
              height: 10,
              marginTop: 15,
              borderRadius: 5,
              alignSelf: 'center',
              backgroundColor: '#000000'
            }}
          />

          {/* Nội dung các chức năng */}
          <View style={styles.function}>
            <TouchableOpacity>
              <View style={styles.subcontainer1}>
                <Text style={styles.icon1}>layer-group</Text>
                <Text style={styles.text1}>Sắp xếp các Chuyến đi</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigateAndCloseModal('CreatePlanning')}
            >
              <View style={styles.subcontainer1}>
                <Text style={styles.icon1}>location-plus</Text>
                <Text style={styles.text1}>Tạo một Chuyến đi mới</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setIsDeleting(true)
                setModalVisible(false)
                setIsDeleteButton(true)
              }}
            >
              <View style={styles.subcontainer1}>
                <Text style={styles.icon1}>trash</Text>
                <Text style={styles.text1}>Xóa Chuyến đi</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    borderColor: 'black',
    backgroundColor: '#fff'
  },
  title: {
    width: '85%',
    // height: 'auto',
    marginVertical: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  titleText: {
    fontSize: 24,
    color: '#000',
    fontWeight: '600',
    fontFamily: 'BeVNSemi'
  },
  buttonFunction: {
    fontSize: 28,
    fontFamily: 'FontAwesome6FreeRegular'
  },
  subcontainer: {
    width: 'auto',
    height: 'auto',
    display: 'flex',
    marginTop: 24,
    marginLeft: '12%',
    alignItems: 'center',
    flexDirection: 'row'
    // alignSelf: 'flex-start',
    // justifyContent: 'flex-start'
  },
  icon: {
    width: '13%',
    fontSize: 30,
    color: '#000',
    marginRight: '1%',
    fontFamily: 'FontAwesome6ProLight'
  },
  text: {
    fontSize: 18,
    color: '#000',
    marginLeft: '2%',
    fontFamily: 'BeVN'
  },
  function: {
    gap: 24,
    width: 'auto',
    height: 'auto',
    display: 'flex',
    flexDirection: 'column'
  },
  subcontainer1: {
    width: 'auto',
    height: 'auto',
    display: 'flex',
    marginTop: '6%',
    marginLeft: '8%',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'flex-start'
  },
  icon1: {
    fontSize: 30,
    color: '#000',
    textAlign: 'center',
    fontFamily: 'FontAwesome6ProLight'
  },
  text1: {
    fontSize: 20,
    color: '#000',
    marginLeft: '5%',
    fontFamily: 'BeVN'
  },
  touchableFavorite: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  favoriteContainer: {
    width: 330,
    height: 280,
    marginVertical: 16,
    display: 'flex',
    borderRadius: 7,
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#dcdcdc'
  },
  scrollContainer: {
    flex: 1,
    width: '100%',
    height: '100%'
  },
  imageFavorite: {
    height: 220,
    width: '100%'
  },
  informationFavorite: {
    gap: 16,
    marginTop: 8,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  titleFavorite: {
    fontSize: 18,
    color: '#000',
    fontWeight: '600',
    letterSpacing: 0.4,
    fontFamily: 'BeVNSemi'
  },
  statusContainer: {
    gap: 8,
    display: 'flex',
    flexDirection: 'column'
  },
  countItems: {
    fontSize: 12,
    color: '#000',
    fontWeight: '200',
    letterSpacing: 0.4,
    fontFamily: 'BeVNProExtraLight'
  },
  updateStatus: {
    fontSize: 9,
    color: '#000',
    fontWeight: '100',
    letterSpacing: 0.4,
    fontStyle: 'italic',
    fontFamily: 'BeVNProThinItalic'
  },
  scrollContainer: {
    flex: 1,
    marginBottom: 64
  },
  iconCheck: {
    fontSize: 20,
    color: '#000',
    textAlign: 'left',
    marginRight: '3%',
    alignSelf: 'center'
  },
  touchableButton: {
    height: 60,
    justifyContent: 'center'
  },
  buttonContainer: {
    alignItems: 'center'
  },
  button: {
    height: 45,
    width: '85%',
    borderWidth: 1,
    borderRadius: 16,
    alignItems: 'center',
    borderStyle: 'solid',
    borderColor: '#767676',
    justifyContent: 'center',
    backgroundColor: '#bababa'
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
    fontFamily: 'BeVNSemi'
  }
})

export default HomePagePlanning
