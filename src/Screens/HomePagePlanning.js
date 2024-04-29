import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity
} from 'react-native'
import Modal from 'react-native-modal'
import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useLayoutEffect, useState } from 'react'

const HomePagePlanning = () => {
  const navigation = useNavigation()

  // Modal Toggle
  const [isModalVisible, setModalVisible] = useState(false)

  const toggleModal = async e => {
    e.preventDefault()
    setModalVisible(!isModalVisible)
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Tiêu đề */}
      <View style={styles.title}>
        <Text style={styles.titleText}>Chuyến đi của bạn</Text>
        <TouchableOpacity onPress={toggleModal}>
          <Text style={styles.buttonFunction}>pen-to-square</Text>
        </TouchableOpacity>
      </View>

      {/* Nội dung */}
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
        <Text style={styles.text}> Ghi chú </Text>
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

      {/* Toggle hiển thị chức năng */}
      <Modal
        onBackButtonPress={() => setModalVisible(false)}
        onBackdropPress={() => setModalVisible(false)}
        swipeDirection='down'
        onSwipeComplete={toggleModal}
        isVisible={isModalVisible}
        avoidKeyboard={true}
        propagateSwipe={true}
        style={{
          justifyContent: 'flex-end',
          height: '100%',
          width: '100%',
          padding: 0,
          margin: 0
        }}
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
            <View style={styles.subcontainer1}>
              <Text style={styles.icon1}>layer-group</Text>
              <Text style={styles.text1}>Sắp xếp các Chuyến đi</Text>
            </View>

            <TouchableOpacity
              onPress={() => navigation.navigate('CreatePlanning')}
            >
              <View style={styles.subcontainer1}>
                <Text style={styles.icon1}>location-plus</Text>
                <Text style={styles.text1}>Tạo một Chuyến đi mới</Text>
              </View>
            </TouchableOpacity>

            <View style={styles.subcontainer1}>
              <Text style={styles.icon1}>trash</Text>
              <Text style={styles.text1}>Xóa Chuyến đi</Text>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    alignItems: 'center',
    borderColor: 'black',
    backgroundColor: '#fff'
  },
  title: {
    width: '85%',
    height: 'auto',
    marginTop: '5%',
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
    marginTop: '5%',
    marginLeft: '12%',
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'flex-start',
    justifyContent: 'flex-start'
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
  }
})

export default HomePagePlanning
