import React, { useState } from 'react'
import { Image } from 'expo-image'
import Button1 from '../Components/Button1'
import { useNavigation } from '@react-navigation/native'
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity
} from 'react-native'

const DetailATripPlan = () => {
  const navigation = useNavigation()

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

  return (
    <View style={styles.container}>
      {/* Nút quay lại. Nút share. Nút Edit */}
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.touchableBack}
          onPress={() => navigation.navigate('HomePagePlanning')}
        >
          <Image
            style={styles.arrowLeftIcon}
            contentFit='cover'
            source={require('../Assets/arrowleft.png')}
          />
        </TouchableOpacity>

        <Text style={styles.shareFromSquare}>share-from-square</Text>

        <Text style={styles.penToSquare}>pen-to-square</Text>
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
            <DayButton day={1} />
            <DayButton day={2} />
            <DayButton day={3} />
            <DayButton day={4} />
            <DayButton day={5} />
            <DayButton day={6} />
            <DayButton day={7} />
          </ScrollView>

          {/* Icon thêm ngày vào danh sách ngày */}
          <TouchableOpacity style={styles.touchableCalendar}>
            <Text style={styles.calendarCirclePlus}>calendar-circle-plus</Text>
          </TouchableOpacity>
        </View>

        {/* Đường kẻ */}
        <View style={styles.line} />

        {/* Nút thêm điểm dừng chân */}
        <View style={styles.buttonContainer}>
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
      </View>
    </View>
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
    height: 'auto',
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
  shareFromSquare: {
    fontSize: 24,
    color: '#000',
    marginLeft: '60%',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'FontAwesome6ProLight'
  },
  penToSquare: {
    fontSize: 24,
    color: '#000',
    marginLeft: '6%',
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
    shadowOffset: {
      width: 0,
      height: -20
    },
    elevation: 20,
    width: '100%',
    height: 'auto',
    display: 'flex',
    marginTop: '3%',
    shadowRadius: 10,
    shadowOpacity: 1,
    paddingBottom: '10%',
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
  line: {
    height: 1,
    borderTopWidth: 1,
    borderStyle: 'solid',
    borderColor: '#bababa'
  },
  buttonContainer: {
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
    fontSize: 22,
    color: '#000',
    fontFamily: 'FontAwesome6ProLight'
  },
  text: {
    fontSize: 16,
    color: '#000',
    marginLeft: '2%',
    fontFamily: 'BeVN'
  }
})

export default DetailATripPlan
