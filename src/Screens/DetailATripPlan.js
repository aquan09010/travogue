import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity
} from 'react-native'
import { Image } from 'expo-image'
import Modal from 'react-native-modal'
import React, { useState, useEffect } from 'react'
import Button1 from '../Components/Button1'
import { useNavigation } from '@react-navigation/native'

const DetailATripPlan = () => {
  const navigation = useNavigation()

  // Khởi tạo danh sách ngày với 7 ngày
  const [days, setDays] = useState([1])

  // Hàm để thêm một ngày mới vào danh sách
  const addDay = () => {
    setDays(prevDays => [...prevDays, prevDays.length + 1])
  }

  // Hàm để xóa ngày được chọn từ danh sách
  const deleteDay = () => {
    const newDays = days.filter(day => day !== selectedDay)
    setDays(newDays.map((day, index) => index + 1)) // Cập nhật lại số thứ tự ngày

    // Cập nhật ngày được chọn
    if (newDays.includes(selectedDay - 1)) {
      setSelectedDay(selectedDay - 1)
    } else {
      setSelectedDay(newDays[newDays.length - 1] || 1)
    }
  }

  useEffect(() => {
    // Nếu ngày được chọn không còn tồn tại trong danh sách, cập nhật nó
    if (!days.includes(selectedDay)) {
      if (days.includes(selectedDay - 1)) {
        setSelectedDay(selectedDay - 1)
      } else {
        setSelectedDay(days[days.length - 1] || 1)
      }
    }
  }, [days])

  // Cập nhật ngày trong Danh sách ngày
  const [selectedDay, setSelectedDay] = useState(1)

  const DayButton = ({ day }) => (
    <TouchableOpacity
      style={styles.dayContainer}
      onPress={() => setSelectedDay(day)}
    >
      <Text style={styles.days}>{`Ngày ${day}`}</Text>
      {selectedDay === day && <View style={styles.dayLine} />}
    </TouchableOpacity>
  )

  // Modal Toggle Edit
  const [isModalEditVisible, setModalEditVisible] = useState(false)

  const toggleEditModal = async e => {
    e.preventDefault()
    setModalEditVisible(!isModalEditVisible)
  }

  // Modal Toggle Delete All Items
  const [isModalDeleteVisible, setModalDeleteVisible] = useState(false)

  const toggleDeleteModal = async e => {
    e.preventDefault()
    setModalDeleteVisible(!isModalDeleteVisible)
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Nút quay lại. Nút share. Nút Edit */}
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.touchableBack}
          onPress={() => navigation.navigate('Lập kế hoạch')}
        >
          <Image
            style={styles.arrowLeftIcon}
            contentFit='cover'
            source={require('../Assets/arrowleft.png')}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.touchableShare}>
          <Text style={styles.shareFromSquare}>share-from-square</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.touchableEdit}
          onPress={toggleEditModal}
        >
          <Text style={styles.penToSquare}>pen-to-square</Text>
        </TouchableOpacity>
      </View>
      {/* Tiêu đề chuyến đi */}
      <Text style={styles.title}>Chuyến đi 7 ngày của bạn tại Hồ Chí Minh</Text>
      {/* Thông tin người tạo */}
      <Text style={styles.information}>
        Tạo bởi Ng Lâm Tùng | Có 6 điểm đến | 7 ngày
      </Text>
      {/* Nút nhấn vào để xem vị trí trên Map */}
      <View style={styles.mapContainer}>
        <Text style={styles.mapIcon}>map</Text>

        <Text style={styles.mapText}>Xem trên Map</Text>
      </View>
      {/* Khung nội dung kế hoạch */}
      <View style={styles.planContainer}>
        {/* Thanh hiển thị ngày */}
        <View style={styles.headerDays}>
          {/* Danh sách ngày */}
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={styles.listDay}
          >
            {days.map(day => (
              <DayButton key={day} day={day} />
            ))}
          </ScrollView>

          {/* Icon thêm ngày vào danh sách ngày */}
          <TouchableOpacity style={styles.touchableCalendar} onPress={addDay}>
            <Text style={styles.calendarCirclePlus}>calendar-circle-plus</Text>
          </TouchableOpacity>
        </View>

        {/* Đường kẻ */}
        <View style={styles.line} />

        <ScrollView style={styles.listDestinations}>
          {/* Nút xóa 1 ngày */}
          {days.length > 1 && (
            <View style={styles.filterAndDelete}>
              <TouchableOpacity
                style={styles.touchableTrash}
                onPress={toggleDeleteModal}
              >
                <Text style={styles.trash}>trash</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Nút thêm điểm dừng chân */}
          <View style={styles.buttonAddPlaceContainer}>
            <Button1 navigation={navigation} />
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
        </ScrollView>
      </View>

      {/* Toggle Edit Modal */}
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
        isVisible={isModalEditVisible}
        onSwipeComplete={toggleEditModal}
        onBackdropPress={() => setModalEditVisible(false)}
        onBackButtonPress={() => setModalEditVisible(false)}
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
                <Text style={styles.icon1}>pencil</Text>
                <Text style={styles.text1}>Đổi tên Chuyến đi</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity>
              <View style={styles.subcontainer1}>
                <Text style={styles.icon1}>layer-group</Text>
                <Text style={styles.text1}>Sắp xếp các điểm dừng chân</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity>
              <View style={styles.subcontainer1}>
                <Text style={styles.icon1}>trash</Text>
                <Text style={styles.text1}>Xóa Chuyến đi</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Toggle Delete Modal */}
      <Modal
        style={{
          margin: 0,
          padding: 0,
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        avoidKeyboard={true}
        swipeDirection='down'
        propagateSwipe={true}
        isVisible={isModalDeleteVisible}
        onSwipeComplete={toggleDeleteModal}
        onBackdropPress={() => setModalDeleteVisible(false)}
        onBackButtonPress={() => setModalDeleteVisible(false)}
      >
        <View
          style={{
            gap: 24,
            width: 320,
            height: 200,
            padding: 24,
            display: 'flex',
            borderRadius: 20,
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            backgroundColor: '#D9D9D9'
          }}
        >
          <Text style={styles.deleteTitle}>Xóa Ngày 1</Text>

          <Text style={styles.deleteText}>
            Tất cả điểm dừng chân trong ngày này sẽ bị xóa hoàn toàn. Bạn có
            muốn xóa hết ?
          </Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => setModalDeleteVisible(false)}>
              <Text style={styles.cancelText}>Hủy bỏ</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setModalDeleteVisible(false)
                deleteDay()
              }}
            >
              <Text style={styles.acceptDeleteText}>Xóa bỏ</Text>
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
    width: '100%',
    height: '100%',
    backgroundColor: '#fff'
  },
  headerContainer: {
    width: '100%',
    display: 'flex',
    paddingTop: '10%',
    paddingBottom: '3%',
    alignItems: 'center',
    flexDirection: 'row'
  },
  touchableBack: {
    marginLeft: '6%'
  },
  arrowLeftIcon: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  touchableShare: {
    marginLeft: '60%'
  },
  shareFromSquare: {
    fontSize: 24,
    color: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'FontAwesome6ProLight'
  },
  touchableEdit: {
    marginLeft: '6%'
  },
  penToSquare: {
    fontSize: 24,
    color: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'FontAwesome6ProLight'
  },
  title: {
    width: '90%',
    fontSize: 27,
    color: '#000',
    lineHeight: 36,
    fontWeight: '600',
    paddingLeft: '6%',
    fontFamily: 'BeVNSemi'
  },
  information: {
    fontSize: 14,
    color: '#000',
    fontWeight: '300',
    paddingLeft: '6%',
    paddingVertical: '1%',
    fontFamily: 'BeVNProLight'
  },
  mapContainer: {
    gap: 8,
    width: 162,
    height: 38,
    display: 'flex',
    marginLeft: '6%',
    borderRadius: 16,
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: '2%',
    justifyContent: 'center',
    backgroundColor: '#e8e8e8'
  },
  mapIcon: {
    fontSize: 22,
    color: '#000',
    fontFamily: 'FontAwesome6ProLight'
  },
  mapText: {
    fontSize: 14,
    color: '#000',
    fontWeight: '600',
    fontFamily: 'BeVNSemi'
  },
  planContainer: {
    flex: 1,
    shadowOffset: {
      width: 0,
      height: -20
    },
    elevation: 20,
    width: '100%',
    display: 'flex',
    marginTop: '3%',
    shadowRadius: 10,
    shadowOpacity: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    shadowColor: 'rgba(0, 0, 0, 1)'
  },
  headerDays: {
    gap: 8,
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 16
  },
  listDay: {
    display: 'flex',
    flexDirection: 'row'
  },
  dayContainer: {
    width: 'auto',
    display: 'flex',
    flexDirection: 'column',
    marginRight: 24
  },
  dayLine: {
    borderTopWidth: 3,
    borderColor: '#000',
    borderStyle: 'solid'
  },
  days: {
    fontSize: 16,
    color: '#000',
    lineHeight: 36,
    // paddingLeft: 24,
    fontFamily: 'BeVN'
  },
  touchableCalendar: {
    width: '10%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  calendarCirclePlus: {
    fontSize: 16,
    alignItems: 'center',
    justifyContent: 'center',
    color: '#000',
    lineHeight: 36,
    fontFamily: 'FontAwesome6ProLight'
  },
  filterAndDelete: {
    height: 18,
    width: '100%',
    marginTop: 16,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  touchableTrash: {
    marginRight: '7%'
  },
  trash: {
    fontSize: 17,
    color: '#000',
    fontFamily: 'FontAwesome6ProLight'
  },
  listDestinations: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  line: {
    height: 1,
    borderTopWidth: 1,
    borderStyle: 'solid',
    borderColor: '#bababa'
  },
  buttonAddPlaceContainer: {
    alignItems: 'center',
    marginVertical: '5%'
  },
  subcontainer: {
    width: 'auto',
    height: 'auto',
    marginTop: '5%',
    display: 'flex',
    marginLeft: '15%',
    alignItems: 'center',
    flexDirection: 'row',
    alignContent: 'center',
    alignSelf: 'flex-start'
  },
  icon: {
    width: 30,
    fontSize: 24,
    color: '#000',
    fontFamily: 'FontAwesome6ProLight'
  },
  text: {
    fontSize: 19,
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
    width: 40,
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
  deleteTitle: {
    fontSize: 18,
    color: '#000',
    fontWeight: '600',
    letterSpacing: 0.4,
    fontFamily: 'BeVNSemi'
  },
  deleteText: {
    fontSize: 14,
    color: '#000',
    fontWeight: '300',
    letterSpacing: 0.3,
    fontFamily: 'BeVNProLight'
  },
  buttonContainer: {
    gap: 32,
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'flex-end'
  },
  cancelText: {
    fontSize: 14,
    color: '#ed2939',
    fontWeight: '500',
    letterSpacing: 0.3,
    fontFamily: 'BeVNProMedium'
  },
  acceptDeleteText: {
    fontSize: 14,
    color: '#0b3bb7',
    fontWeight: '500',
    letterSpacing: 0.3,
    fontFamily: 'BeVNProMedium'
  }
})

export default DetailATripPlan
