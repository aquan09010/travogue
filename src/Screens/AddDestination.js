import * as React from 'react'
import { Image } from 'expo-image'
import SuggestionTicket from '../Components/SuggestionTicket'
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity
} from 'react-native'

const AddDestination = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header: Nút quay lại & Thanh Search */}
      <View style={styles.headerContainer}>
        {/* Nút quay lại */}
        <TouchableOpacity onPress={() => navigation.navigate('DetailATripPlan')}>
          <Image
            style={styles.arrowLeftIcon}
            contentFit='cover'
            source={require("../Assets/arrowleft.png")}
          />
        </TouchableOpacity>

        {/* Thanh Search */}
        <View style={styles.searchContainer}>
          {/* Icon Search */}
          <Text style={styles.magnifyingGlass}>magnifying-glass</Text>

          {/* Text mặc định */}
          <Text style={styles.textSearch}>Tìm kiếm điểm dừng chân</Text>
        </View>
      </View>

      {/* Dòng kẻ dưới thanh Search */}
      <View style={styles.line} />

      {/* Tùy chọn các tỉnh thành */}
      <View style={styles.provinceContainer}>
        <Text style={styles.province}>Hồ Chí Minh</Text>

        <Text style={styles.angleDown}>angle-down</Text>
      </View>

      {/* Danh sách các Gợi ý */}
      <ScrollView style={styles.listDestinations}>
        <SuggestionTicket
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
        <SuggestionTicket
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
        <SuggestionTicket
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
        <SuggestionTicket
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
        <SuggestionTicket
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
        <SuggestionTicket
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
        <SuggestionTicket
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
        <SuggestionTicket
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
        <SuggestionTicket
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
        <SuggestionTicket
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

      {/* Nút xác nhận */}
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>{`Thêm vào Ngày 1 `}</Text>
        </View>
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
    gap: 24,
    display: 'flex',
    paddingTop: '5%',
    paddingBottom: '3%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  arrowLeftIcon: {
    width: 30,
    height: 30
  },
  searchContainer: {
    gap: 16,
    width: 291,
    borderWidth: 1,
    borderRadius: 15,
    paddingVertical: 16,
    alignItems: 'center',
    borderStyle: 'solid',
    flexDirection: 'row',
    // paddingHorizontal: 32,
    borderColor: '#767676',
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
  magnifyingGlass: {
    fontSize: 14,
    color: '#767676',
    fontFamily: 'FontAwesome6ProLight',
  },
  textSearch: {
    fontSize: 14,
    color: '#000',
    letterSpacing: 0.1,
    fontFamily: 'BeVN',
  },
  line: {
    height: 1,
    width: '100%',
    borderTopWidth: 1,
    paddingBottom: '3%',
    borderStyle: 'solid',
    borderColor: '#e8e8e8'
  },
  provinceContainer: {
    gap: 8,
    width: '100%',
    display: 'flex',
    marginBottom: '3%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  province: {
    fontSize: 21,
    color: '#000',
    fontWeight: '500',
    fontFamily: 'BeVNProMedium'
  },
  angleDown: {
    fontSize: 21,
    color: '#000',
    fontFamily: 'FontAwesome6ProLight'
  },
  listDestinations: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#e8e8e8'
  },
  buttonContainer: {
    height: '8%',
    alignItems: 'center',
    justifyContent: 'center'
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

export default AddDestination
