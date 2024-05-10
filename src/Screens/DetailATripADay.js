import {
  Text,
  View,
  SectionList,
  FlatList,
  TextInput,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity
} from 'react-native'
import { Image } from 'expo-image'
import Modal from 'react-native-modal'
import ChosenTicket from '../Components/ChosenTicket'
import { useNavigation } from '@react-navigation/native'
import { SwipeListView } from 'react-native-swipe-list-view'
import DraggableFlatList from 'react-native-draggable-flatlist'
import React, { useEffect, useLayoutEffect, useState } from 'react'

const data = [
  {
    key: '1',
    pic: require('../Assets/pic29.png'),
    name: 'Tham quan Tòa nhà Bitexco',
    rate: '4.98',
    numberOfComments: '253',
    address: 'Q1, Hồ Chí Minh',
    price: '12',
    category: 'Nghệ thuật, Văn hoá, Lịch sử',
    admin: require('../Assets/admin3.png'),
    topRate: true
  },
  {
    key: '2',
    pic: require('../Assets/pic28.png'),
    name: 'Tham quan Địa đạo Củ Chi',
    rate: '4.98',
    numberOfComments: '253',
    address: 'Củ Chi, Hồ Chí Minh',
    price: '12',
    category: 'Nghệ thuật, Văn hoá, Lịch sử',
    admin: require('../Assets/admin3.png'),
    topRate: false
  },
  {
    key: '3',
    pic: require('../Assets/pic27.png'),
    name: 'Tham quan Bưu điện trung tâm Sài Gòn',
    rate: '4.98',
    numberOfComments: '253',
    address: 'Q1, Hồ Chí Minh',
    price: '12',
    category: 'Nghệ thuật, Văn hoá, Lịch sử',
    admin: require('../Assets/admin3.png'),
    topRate: false
  },
  {
    key: '4',
    pic: require('../Assets/pic26.png'),
    name: 'Tham quan Thảo Cầm Viên Sài Gòn',
    rate: '4.98',
    numberOfComments: '253',
    address: 'Q1, Hồ Chí Minh',
    price: '12',
    category: 'Nghệ thuật, Văn hoá, Lịch sử',
    admin: require('../Assets/admin3.png'),
    topRate: false
  },
  {
    key: '5',
    pic: require('../Assets/pic25.png'),
    name: 'Tham quan Nhà thờ Đức Bà Sài Gòn',
    rate: '4.98',
    numberOfComments: '253',
    address: 'Q1, Hồ Chí Minh',
    price: '12',
    category: 'Nghệ thuật, Văn hoá, Lịch sử',
    admin: require('../Assets/admin3.png'),
    topRate: false
  },
  {
    key: '6',
    pic: require('../Assets/pic24.png'),
    name: 'Tham quan Dinh Độc Lập',
    rate: '4.98',
    numberOfComments: '253',
    address: 'Q1, Hồ Chí Minh',
    price: '12',
    category: 'Nghệ thuật, Văn hoá, Lịch sử',
    admin: require('../Assets/admin3.png'),
    topRate: false
  },
  {
    key: '7',
    pic: require('../Assets/pic23.png'),
    name: 'Khách sạn Liberty Central Sài Gòn Riverside',
    rate: '4.98',
    numberOfComments: '253',
    address: 'Q1, Hồ Chí Minh',
    price: '12',
    category: 'Nghệ thuật, Văn hoá, Lịch sử',
    admin: require('../Assets/admin3.png'),
    topRate: false
  },
  {
    key: '8',
    pic: require('../Assets/pic22.png'),
    name: 'The Odys Boutique Hotel',
    rate: '4.98',
    numberOfComments: '253',
    address: 'Q1, Hồ Chí Minh',
    price: '12',
    category: 'Nghệ thuật, Văn hoá, Lịch sử',
    admin: require('../Assets/admin3.png'),
    topRate: false
  },
  {
    key: '9',
    pic: require('../Assets/pic21.png'),
    name: 'Yuzu Omakase ゆずお任せ VN',
    rate: '4.98',
    numberOfComments: '253',
    address: 'Q1, Hồ Chí Minh',
    price: '12',
    category: 'Nghệ thuật, Văn hoá, Lịch sử',
    admin: require('../Assets/admin3.png'),
    topRate: false
  },
  {
    key: '10',
    pic: require('../Assets/pic20.png'),
    name: 'Nhà hàng Park Lounge',
    rate: '4.98',
    numberOfComments: '253',
    address: 'Q1, Hồ Chí Minh',
    price: '12',
    category: 'Nghệ thuật, Văn hoá, Lịch sử',
    admin: require('../Assets/admin3.png'),
    topRate: false
  }
]

const DetailATripADay = () => {
  const navigation = useNavigation()

  // Khởi tạo danh sách ngày với 1 ngày mặc định
  const [days, setDays] = useState([1])

  // Hàm để thêm một ngày mới vào danh sách
  const addDay = () => {
    setDays(prevDays => [...prevDays, prevDays.length + 1])
  }

  // Hàm để xóa ngày được chọn từ danh sách
  const deleteDay = () => {
    const indexToDelete = days.indexOf(selectedDay)

    const newDays = days.filter(day => day !== selectedDay)
    setDays(newDays.map((day, index) => index + 1)) // Cập nhật lại số thứ tự ngày

    // Cập nhật ngày được chọn
    if (indexToDelete >= newDays.length) {
      setSelectedDay(Math.max(...newDays))
    } else {
      setSelectedDay(indexToDelete + 1)
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

  // Modal Toggle Các Chức Năng (Đổi tên, Sắp xếp, Xóa)
  const [isModalEditVisible, setModalEditVisible] = useState(false)

  const toggleEditModal = async () => {
    setModalEditVisible(!isModalEditVisible)
  }

  // Modal Toggle Xóa tất cả các điểm dừng chân trong 1 ngày (Xóa 1 ngày)
  const [isModalDeleteVisible, setModalDeleteVisible] = useState(false)

  const toggleDeleteModal = async () => {
    setModalDeleteVisible(!isModalDeleteVisible)
  }

  // Model Toggle Đổi tên
  const [isModalNameVisible, setModalNameVisible] = useState(false)

  const toggleModalName = async () => {
    setModalNameVisible(!isModalNameVisible)
  }

  // Modal Toggle Sắp xếp các điểm dừng chân
  const [isModalSortVisible, setModalSortVisible] = useState(false)

  const toggleSortModal = async () => {
    setModalSortVisible(!isModalSortVisible)
  }

  // Modal Toggle Xóa cả Chuyến đi
  const [isModalDeleteTripVisible, setModalDeleteTripVisible] = useState(false)

  const toggleDeleteTripModal = async () => {
    setModalDeleteTripVisible(!isModalDeleteTripVisible)
  }

  // Swipe List View (Để xóa 1 item bằng cách kéo sang trái)
  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={styles.deleteContainer}
        onPress={() => deleteRow(rowMap, data.item.key)}
      >
        <Image
          style={styles.redContainer}
          contentFit='cover'
          source={require('../Assets/ellipse_red.png')}
        />

        <Text style={styles.whiteTrash}>trash</Text>
      </TouchableOpacity>
    </View>
  )

  const deleteRow = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey)
    const newData = [...data]
    const prevIndex = data.findIndex(item => item.key === rowKey)
    newData.splice(prevIndex, 1)
    // setData(newData)
  }

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow()
    }
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

        <SwipeListView
          ListHeaderComponent={
            days.length > 1 && (
              <View style={styles.filterAndDelete}>
                {/* Nút xóa 1 ngày */}
                <TouchableOpacity
                  style={styles.touchableTrash}
                  onPress={toggleDeleteModal}
                >
                  <Text style={styles.trash}>trash</Text>
                </TouchableOpacity>
              </View>
            )
          }
          style={styles.listDestinations}
          data={data}
          renderItem={({ item }) => (
            <ChosenTicket
              topRate={item.topRate}
              pic={item.pic}
              name={item.name}
              rate={item.rate}
              numberOfComments={item.numberOfComments}
              address={item.address}
              price={item.price}
              category={item.category}
              admin={item.admin}
            />
          )}
          renderHiddenItem={renderHiddenItem}
          rightOpenValue={-75}
        />
      </View>

      {/*  Modal Toggle Các Chức Năng (Đổi tên, Sắp xếp, Xóa) */}
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
            <TouchableOpacity
              style={styles.touchableFunction}
              onPress={toggleModalName}
            >
              <View style={styles.subcontainer1}>
                <Text style={styles.icon1}>pencil</Text>
                <Text style={styles.text1}>Đổi tên Chuyến đi</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.touchableFunction}
              onPress={toggleSortModal}
            >
              <View style={styles.subcontainer1}>
                <Text style={styles.icon1}>layer-group</Text>
                <Text style={styles.text1}>Sắp xếp các điểm dừng chân</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.touchableFunction}
              onPress={toggleDeleteTripModal}
            >
              <View style={styles.subcontainer1}>
                <Text style={styles.icon1}>trash</Text>
                <Text style={styles.text1}>Xóa Chuyến đi</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal Toggle Xóa tất cả các điểm dừng chân trong 1 ngày */}
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
              <Text style={styles.cancelTextDelete}>Hủy bỏ</Text>
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

      {/* Modal Toggle Đổi tên */}
      <Modal
        style={{
          margin: 0,
          padding: 0,
          width: '100%',
          height: '100%',
          justifyContent: 'flex-end'
        }}
        avoidKeyboard={true}
        isVisible={isModalNameVisible}
        onBackdropPress={() => setModalNameVisible(false)}
        onBackButtonPress={() => setModalNameVisible(false)}
      >
        <View
          style={{
            gap: 24,
            bottom: 0,
            height: 140,
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            borderTopLeftRadius: 20,
            justifyContent: 'center',
            borderTopRightRadius: 20,
            backgroundColor: '#EAEAEA'
          }}
        >
          <View style={styles.functionNameButton}>
            <TouchableOpacity onPress={() => setModalNameVisible(false)}>
              <Text style={styles.cancelTextChangeName}>Hủy bỏ</Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Text style={styles.acceptText}>Hoàn thành</Text>
            </TouchableOpacity>
          </View>

          <TextInput
            selectionColor='gray'
            style={styles.textInput}
            placeholder='Chuyến đi 7 ngày của bạn tại Hồ Chí Minh'
          />
        </View>
      </Modal>

      {/* Modal Toggle Sắp xếp các điểm dừng chân */}
      <Modal
        style={{
          margin: 0,
          padding: 0,
          width: '100%',
          // height: '100%',
          flex: 1,
          display: 'flex',
          flexDirection: 'column'
          // alignItems: 'flex-end',
          // justifyContent: 'flex-end'
        }}
        avoidKeyboard={true}
        // swipeDirection='down'
        propagateSwipe={true}
        isVisible={isModalSortVisible}
        // onSwipeComplete={toggleSortModal}
        onBackdropPress={() => setModalSortVisible(false)}
        onBackButtonPress={() => setModalSortVisible(false)}
      >
        <View
          style={{
            // gap: 24,
            flex: 1,
            width: '100%',
            // height: '100%',
            // padding: 24,
            display: 'flex',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            flexDirection: 'column',
            // alignItems: 'flex-start',
            // justifyContent: 'center',
            backgroundColor: '#ffffff'
          }}
        >
          {/* Nút Quay lại + Nút Hoàn thành */}
          <View style={styles.returnAndCompleteContainer}>
            <TouchableOpacity onPress={() => setModalSortVisible(false)}>
              <Image
                style={styles.arrowLeftIcon}
                contentFit='cover'
                source={require('../Assets/arrowleft.png')}
              />
            </TouchableOpacity>

            <TouchableOpacity>
              <Text style={styles.acceptText}>Hoàn thành</Text>
            </TouchableOpacity>
          </View>

          {/* Thanh hiển thị ngày */}
          <View
            style={{
              ...styles.headerDays,
              backgroundColor: '#e8e8e8',
              borderWidth: 1
            }}
          >
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
          </View>

          {/* Danh sách các điểm dừng chân */}
          <FlatList
            style={styles.listDestinationsArrangeList}
            data={data}
            renderItem={({ item }) => (
              <ChosenTicket
                topRate={item.topRate}
                pic={item.pic}
                name={item.name}
                rate={item.rate}
                numberOfComments={item.numberOfComments}
                address={item.address}
                price={item.price}
                category={item.category}
                admin={item.admin}
              />
            )}
          />
        </View>
      </Modal>

      {/* Modal Toggle Xóa cả Chuyến đi */}
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
        isVisible={isModalDeleteTripVisible}
        onSwipeComplete={toggleDeleteTripModal}
        onBackdropPress={() => setModalDeleteTripVisible(false)}
        onBackButtonPress={() => setModalDeleteTripVisible(false)}
      >
        <View
          style={{
            width: 320,
            height: 200,
            display: 'flex',
            borderRadius: 20,
            flexDirection: 'column',
            backgroundColor: '#D9D9D9',
            alignItems: 'flex-start',
            justifyContent: 'center',
            gap: 24,
            padding: 24
          }}
        >
          <Text style={styles.deleteTitle}>Xóa Chuyến đi này</Text>

          <Text style={styles.deleteText}>
            Bạn có muốn xóa hoàn toàn “Chuyến đi 7 ngày của bạn tại Hồ Chí Minh”
            ?
          </Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => setModalDeleteTripVisible(false)}>
              <Text style={styles.cancelTextDelete}>Hủy bỏ</Text>
            </TouchableOpacity>

            <TouchableOpacity>
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
  days: {
    fontSize: 16,
    color: '#000',
    lineHeight: 36,
    fontFamily: 'BeVN'
  },
  dayLine: {
    borderTopWidth: 3,
    borderColor: '#000',
    borderStyle: 'solid'
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
  line: {
    height: 1,
    borderTopWidth: 1,
    borderStyle: 'solid',
    borderColor: '#bababa'
  },
  listDestinations: {
    flex: 1,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#e8e8e8'
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
  function: {
    gap: 24,
    width: 'auto',
    height: 'auto',
    display: 'flex',
    flexDirection: 'column'
  },
  touchableFunction: {
    marginTop: '6%',
    marginLeft: '8%'
  },
  subcontainer1: {
    width: 'auto',
    height: 'auto',
    display: 'flex',
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
  cancelTextDelete: {
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
  },
  rowBack: {
    flex: 1,
    paddingRight: 32,
    alignItems: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  deleteContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 25,
    position: 'relative',
    justifyContent: 'center'
  },
  redContainer: {
    width: 25,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center'
  },
  whiteTrash: {
    position: 'absolute',
    fontSize: 14,
    color: '#fff',
    fontFamily: 'FontAwesome6ProLight',
    alignItems: 'center',
    justifyContent: 'center'
  },
  functionNameButton: {
    display: 'flex',
    flexDirection: 'row',
    gap: 220
  },
  cancelTextChangeName: {
    fontSize: 17,
    color: '#767676',
    letterSpacing: 0.2,
    fontWeight: '500',
    fontFamily: 'BeVNProMedium'
  },
  acceptText: {
    fontSize: 17,
    color: '#0b3bb7',
    letterSpacing: 0.2,
    fontWeight: '500',
    fontFamily: 'BeVNProMedium'
  },
  textInput: {
    width: 380,
    height: 70,
    fontSize: 15,
    color: '#000',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 16,
    fontWeight: '300',
    fontFamily: 'BeVNProLight',
    backgroundColor: '#e8e8e8'
  },
  returnAndCompleteContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 16,
    gap: 235,
    alignItems: 'center',
    justifyContent: 'center'
  },
  listDestinationsArrangeList: {
    flex: 1,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#e8e8e8'
  }
})

export default DetailATripADay
