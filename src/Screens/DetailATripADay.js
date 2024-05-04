import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity
} from 'react-native'
import { Image } from 'expo-image'
import Modal from 'react-native-modal'
import ChosenTicket from '../Components/ChosenTicket'
import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useLayoutEffect, useState } from 'react'


const DetailATripADay = () => {
  const navigation = useNavigation()

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

        <TouchableOpacity style={styles.touchableEdit}>
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

        <ScrollView style={styles.listDestinations}>
          <View style={styles.filterAndDelete}>
            <TouchableOpacity style={styles.touchableTrash}>
              <Text style={styles.trash}>trash</Text>
            </TouchableOpacity>
          </View>

          <ChosenTicket
            topRate={true}
            pic={require('../Assets/pic29.png')}
            name='Tham quan Tòa nhà Bitexco'
            rate='4.98'
            numberOfComments='253'
            address='Q1, Hồ Chí Minh'
            price='12'
            category='Nghệ thuật, Văn hoá, Lịch sử'
            admin={require('../Assets/admin3.png')}
          />
          <ChosenTicket
            topRate={false}
            pic={require('../Assets/pic28.png')}
            name='Tham quan Địa đạo Củ Chi'
            rate='4.98'
            numberOfComments='253'
            address='Củ Chi, Hồ Chí Minh'
            price='12'
            category='Nghệ thuật, Văn hoá, Lịch sử'
            admin={require('../Assets/admin3.png')}
          />
          <ChosenTicket
            topRate={false}
            pic={require('../Assets/pic27.png')}
            name='Tham quan Bưu điện trung tâm Sài Gòn'
            rate='4.98'
            numberOfComments='253'
            address='Q1, Hồ Chí Minh'
            price='12'
            category='Nghệ thuật, Văn hoá, Lịch sử'
            admin={require('../Assets/admin3.png')}
          />
          <ChosenTicket
            topRate={false}
            pic={require('../Assets/pic26.png')}
            name='Tham quan Thảo Cầm Viên Sài Gòn'
            rate='4.98'
            numberOfComments='253'
            address='Q1, Hồ Chí Minh'
            price='12'
            category='Nghệ thuật, Văn hoá, Lịch sử'
            admin={require('../Assets/admin3.png')}
          />
          <ChosenTicket
            topRate={false}
            pic={require('../Assets/pic25.png')}
            name='Tham quan Nhà thờ Đức Bà Sài Gòn'
            rate='4.98'
            numberOfComments='253'
            address='Q1, Hồ Chí Minh'
            price='12'
            category='Nghệ thuật, Văn hoá, Lịch sử'
            admin={require('../Assets/admin3.png')}
          />
          <ChosenTicket
            topRate={false}
            pic={require('../Assets/pic24.png')}
            name='Tham quan Dinh Độc Lập'
            rate='4.98'
            numberOfComments='253'
            address='Q1, Hồ Chí Minh'
            price='12'
            category='Nghệ thuật, Văn hoá, Lịch sử'
            admin={require('../Assets/admin3.png')}
          />
          <ChosenTicket
            topRate={false}
            pic={require('../Assets/pic23.png')}
            name='Khách sạn Liberty Central Sài Gòn Riverside'
            rate='4.98'
            numberOfComments='253'
            address='Q1, Hồ Chí Minh'
            price='12'
            category='Nghệ thuật, Văn hoá, Lịch sử'
            admin={require('../Assets/admin3.png')}
          />
          <ChosenTicket
            topRate={false}
            pic={require('../Assets/pic22.png')}
            name='The Odys Boutique Hotel'
            rate='4.98'
            numberOfComments='253'
            address='Q1, Hồ Chí Minh'
            price='12'
            category='Nghệ thuật, Văn hoá, Lịch sử'
            admin={require('../Assets/admin3.png')}
          />
          <ChosenTicket
            topRate={false}
            pic={require('../Assets/pic21.png')}
            name='Yuzu Omakase ゆずお任せ VN'
            rate='4.98'
            numberOfComments='253'
            address='Q1, Hồ Chí Minh'
            price='12'
            category='Nghệ thuật, Văn hoá, Lịch sử'
            admin={require('../Assets/admin3.png')}
          />
          <ChosenTicket
            topRate={false}
            pic={require('../Assets/pic20.png')}
            name='Nhà hàng Park Lounge'
            rate='4.98'
            numberOfComments='253'
            address='Q1, Hồ Chí Minh'
            price='12'
            category='Nghệ thuật, Văn hoá, Lịch sử'
            admin={require('../Assets/admin3.png')}
          />
          <ChosenTicket
            topRate={true}
            pic={require('../Assets/pic29.png')}
            name='Tham quan Tòa nhà Bitexco'
            rate='4.98'
            numberOfComments='253'
            address='Q1, Hồ Chí Minh'
            price='12'
            category='Nghệ thuật, Văn hoá, Lịch sử'
            admin={require('../Assets/admin3.png')}
          />
          <ChosenTicket
            topRate={false}
            pic={require('../Assets/pic28.png')}
            name='Tham quan Địa đạo Củ Chi'
            rate='4.98'
            numberOfComments='253'
            address='Củ Chi, Hồ Chí Minh'
            price='12'
            category='Nghệ thuật, Văn hoá, Lịch sử'
            admin={require('../Assets/admin3.png')}
          />
          <ChosenTicket
            topRate={false}
            pic={require('../Assets/pic27.png')}
            name='Tham quan Bưu điện trung tâm Sài Gòn'
            rate='4.98'
            numberOfComments='253'
            address='Q1, Hồ Chí Minh'
            price='12'
            category='Nghệ thuật, Văn hoá, Lịch sử'
            admin={require('../Assets/admin3.png')}
          />
          <ChosenTicket
            topRate={false}
            pic={require('../Assets/pic26.png')}
            name='Tham quan Thảo Cầm Viên Sài Gòn'
            rate='4.98'
            numberOfComments='253'
            address='Q1, Hồ Chí Minh'
            price='12'
            category='Nghệ thuật, Văn hoá, Lịch sử'
            admin={require('../Assets/admin3.png')}
          />
          <ChosenTicket
            topRate={false}
            pic={require('../Assets/pic25.png')}
            name='Tham quan Nhà thờ Đức Bà Sài Gòn'
            rate='4.98'
            numberOfComments='253'
            address='Q1, Hồ Chí Minh'
            price='12'
            category='Nghệ thuật, Văn hoá, Lịch sử'
            admin={require('../Assets/admin3.png')}
          />
          <ChosenTicket
            topRate={false}
            pic={require('../Assets/pic24.png')}
            name='Tham quan Dinh Độc Lập'
            rate='4.98'
            numberOfComments='253'
            address='Q1, Hồ Chí Minh'
            price='12'
            category='Nghệ thuật, Văn hoá, Lịch sử'
            admin={require('../Assets/admin3.png')}
          />
          <ChosenTicket
            topRate={false}
            pic={require('../Assets/pic23.png')}
            name='Khách sạn Liberty Central Sài Gòn Riverside'
            rate='4.98'
            numberOfComments='253'
            address='Q1, Hồ Chí Minh'
            price='12'
            category='Nghệ thuật, Văn hoá, Lịch sử'
            admin={require('../Assets/admin3.png')}
          />
          <ChosenTicket
            topRate={false}
            pic={require('../Assets/pic22.png')}
            name='The Odys Boutique Hotel'
            rate='4.98'
            numberOfComments='253'
            address='Q1, Hồ Chí Minh'
            price='12'
            category='Nghệ thuật, Văn hoá, Lịch sử'
            admin={require('../Assets/admin3.png')}
          />
          <ChosenTicket
            topRate={false}
            pic={require('../Assets/pic21.png')}
            name='Yuzu Omakase ゆずお任せ VN'
            rate='4.98'
            numberOfComments='253'
            address='Q1, Hồ Chí Minh'
            price='12'
            category='Nghệ thuật, Văn hoá, Lịch sử'
            admin={require('../Assets/admin3.png')}
          />
          <ChosenTicket
            topRate={false}
            pic={require('../Assets/pic20.png')}
            name='Nhà hàng Park Lounge'
            rate='4.98'
            numberOfComments='253'
            address='Q1, Hồ Chí Minh'
            price='12'
            category='Nghệ thuật, Văn hoá, Lịch sử'
            admin={require('../Assets/admin3.png')}
          />
          <ChosenTicket
            topRate={true}
            pic={require('../Assets/pic29.png')}
            name='Tham quan Tòa nhà Bitexco'
            rate='4.98'
            numberOfComments='253'
            address='Q1, Hồ Chí Minh'
            price='12'
            category='Nghệ thuật, Văn hoá, Lịch sử'
            admin={require('../Assets/admin3.png')}
          />
          <ChosenTicket
            topRate={false}
            pic={require('../Assets/pic28.png')}
            name='Tham quan Địa đạo Củ Chi'
            rate='4.98'
            numberOfComments='253'
            address='Củ Chi, Hồ Chí Minh'
            price='12'
            category='Nghệ thuật, Văn hoá, Lịch sử'
            admin={require('../Assets/admin3.png')}
          />
          <ChosenTicket
            topRate={false}
            pic={require('../Assets/pic27.png')}
            name='Tham quan Bưu điện trung tâm Sài Gòn'
            rate='4.98'
            numberOfComments='253'
            address='Q1, Hồ Chí Minh'
            price='12'
            category='Nghệ thuật, Văn hoá, Lịch sử'
            admin={require('../Assets/admin3.png')}
          />
          <ChosenTicket
            topRate={false}
            pic={require('../Assets/pic26.png')}
            name='Tham quan Thảo Cầm Viên Sài Gòn'
            rate='4.98'
            numberOfComments='253'
            address='Q1, Hồ Chí Minh'
            price='12'
            category='Nghệ thuật, Văn hoá, Lịch sử'
            admin={require('../Assets/admin3.png')}
          />
          <ChosenTicket
            topRate={false}
            pic={require('../Assets/pic25.png')}
            name='Tham quan Nhà thờ Đức Bà Sài Gòn'
            rate='4.98'
            numberOfComments='253'
            address='Q1, Hồ Chí Minh'
            price='12'
            category='Nghệ thuật, Văn hoá, Lịch sử'
            admin={require('../Assets/admin3.png')}
          />
          <ChosenTicket
            topRate={false}
            pic={require('../Assets/pic24.png')}
            name='Tham quan Dinh Độc Lập'
            rate='4.98'
            numberOfComments='253'
            address='Q1, Hồ Chí Minh'
            price='12'
            category='Nghệ thuật, Văn hoá, Lịch sử'
            admin={require('../Assets/admin3.png')}
          />
          <ChosenTicket
            topRate={false}
            pic={require('../Assets/pic23.png')}
            name='Khách sạn Liberty Central Sài Gòn Riverside'
            rate='4.98'
            numberOfComments='253'
            address='Q1, Hồ Chí Minh'
            price='12'
            category='Nghệ thuật, Văn hoá, Lịch sử'
            admin={require('../Assets/admin3.png')}
          />
          <ChosenTicket
            topRate={false}
            pic={require('../Assets/pic22.png')}
            name='The Odys Boutique Hotel'
            rate='4.98'
            numberOfComments='253'
            address='Q1, Hồ Chí Minh'
            price='12'
            category='Nghệ thuật, Văn hoá, Lịch sử'
            admin={require('../Assets/admin3.png')}
          />
          <ChosenTicket
            topRate={false}
            pic={require('../Assets/pic21.png')}
            name='Yuzu Omakase ゆずお任せ VN'
            rate='4.98'
            numberOfComments='253'
            address='Q1, Hồ Chí Minh'
            price='12'
            category='Nghệ thuật, Văn hoá, Lịch sử'
            admin={require('../Assets/admin3.png')}
          />
          <ChosenTicket
            topRate={false}
            pic={require('../Assets/pic20.png')}
            name='Nhà hàng Park Lounge'
            rate='4.98'
            numberOfComments='253'
            address='Q1, Hồ Chí Minh'
            price='12'
            category='Nghệ thuật, Văn hoá, Lịch sử'
            admin={require('../Assets/admin3.png')}
          />
        </ScrollView>
      </View>
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
  listDestinations: {
    flex: 1,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#e8e8e8'
  },
  filterAndDelete: {
    height: 16,
    width: '100%',
    marginTop: 16,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  touchableTrash: {
    marginRight: '5%'
  },
  trash: {
    fontSize: 15,
    color: '#000',
    fontFamily: 'FontAwesome6ProLight'
  }
})

export default DetailATripADay
