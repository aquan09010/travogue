import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Pressable,
  SafeAreaView,
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { ParkIconActive } from '@/Assets/Icons/Where';
import React, { useLayoutEffect, useState, useRef } from 'react';
import {
  SearchIcon,
  ArrowLeft,
  ArrowLeftBlack,
  SearchIconBlack,
} from '@/Assets/Icons/Navigation';
import {
  CommentIcon,
  DotIcon,
  HeartIcon,
  LanguageIcon,
  MiniLocation1,
  MiniStar,
  ShareIcon,
} from '@/Assets/Icons/DetailIcon';
import { MiniLocation } from '@/Assets/Icons/Card';
import {
  AppleIcon,
  BoxCheckIcon,
  CalendarIcon,
  CashIcon,
  FailIcon,
  OrderIcon,
  PeopleIcon,
  SuccessIcon,
  TimeIcon,
  VisaIcon,
} from '@/Assets/Icons/OrderConfirm';
export default function OrderConfirm({ route }) {
  const navigation = useNavigation();
  const gotoHost = async (e) => {
    e.preventDefault();
    navigation.navigate('HostProfile');
  };

  const handleCheckout = () => {
    navigation.navigate('Main');
  };

  const { activity, host, data } = route.params;

  console.log(activity);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.statusBar}>
        <Pressable onPress={() => navigation.goBack()}>
          <SvgXml xml={ArrowLeftBlack} />
        </Pressable>
        <Text style={styles.title}>Xác nhận và thanh toán</Text>
        <Pressable onPress={() => {}}>
          <SvgXml xml={SearchIconBlack} />
        </Pressable>
      </View>
      <ScrollView style={{ height: '87%' }}>
        <View style={styles.containerCard}>
          <Image
            style={styles.img}
            resizeMode="cover"
            source={{ uri: activity.mainImage }}
          />
          <View style={styles.orderCard}>
            <Text style={styles.textDetail}>{activity.name}</Text>
            <View style={[styles.line]}>
              <SvgXml xml={CalendarIcon} />
              <Text style={[styles.text]}> {activity.date}</Text>
            </View>
            <View style={[styles.line]}>
              <SvgXml xml={TimeIcon} />
              <Text style={[styles.text]}> {activity.time}</Text>
            </View>
            <View style={[styles.line]}>
              <SvgXml xml={PeopleIcon} />
              <Text style={[styles.text]}>
                {' '}
                {data.numOfAdults} người lớn, {data.numOfChildren} trẻ em,{' '}
                {data.numOfBabies} em bé
              </Text>
            </View>
            <Pressable style={styles.line1} onPress={gotoHost}>
              <Text style={{ alignSelf: 'center', marginRight: 5 }}>
                <Text style={{ fontWeight: '600', fontSize: 16 }}>Host:</Text>
                <Text style={{ fontSize: 16 }}> {host.email}</Text>
              </Text>
              <View style={[styles.avatar, styles.actionPadding]}>
                <Image
                  style={styles.avaImg}
                  resizeMode="cover"
                  source={require('../Assets/ava1.jpg')}
                />
              </View>
            </Pressable>
          </View>
        </View>
        <View style={styles.mainView}>
          <View style={[styles.line]}>
            <SvgXml xml={OrderIcon} />
            <Text style={{ fontWeight: '600', fontSize: 16 }}>
              {' '}
              Nhập mã giảm giá
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 10,
            }}
          >
            <TextInput
              style={styles.inputArea}
              placeholder="Nhập mã giảm giá"
            ></TextInput>
            <View style={styles.button}>
              <Text>Áp dụng</Text>
            </View>
          </View>
          <View style={styles.line3}>
            <Text style={{}}>Đã áp dụng mã giảm giá ABCDEF</Text>
            <Text style={{}}>-đ20.000</Text>
          </View>
          <View style={styles.line3}>
            <Text style={{}}>Đã áp dụng mã giảm giá ABCDEF</Text>
            <Text style={{}}>-đ20.000</Text>
          </View>
        </View>
        <View style={styles.mainView}>
          <View style={[styles.line]}>
            <SvgXml xml={OrderIcon} />
            <Text style={{ fontWeight: '600', fontSize: 16 }}>
              {' '}
              Chi tiết thanh toán
            </Text>
          </View>

          <View style={styles.line3}>
            <Text style={{}}>Vé người lớn</Text>
            <Text style={{}}>x{data.numOfAdults}</Text>
            <Text style={{}}>đ{data.adultsPrice.toLocaleString()}</Text>
          </View>
          <View style={styles.line3}>
            <Text style={{}}>Vé trẻ em</Text>
            <Text style={{}}>x{data.numOfChildren}</Text>
            <Text style={{}}>đ{data.childrenPrice.toLocaleString()}</Text>
          </View>
          <View style={styles.line3}>
            <Text style={{}}>Vé em bé</Text>
            <Text style={{}}>x{data.numOfBabies}</Text>
            <Text style={{}}>đ{data.babyPrice.toLocaleString()}</Text>
          </View>
          <View style={styles.line3}>
            <Text style={{}}>Giảm giá từ event của app</Text>
            <Text style={{}}>-đ20.000</Text>
          </View>
          <View style={styles.line3}>
            <Text style={{}}>Tổng cộng Voucher giảm giá</Text>
            <Text style={{}}>-đ40.000</Text>
          </View>
          <View style={styles.line3}>
            <Text style={{ fontWeight: '600', fontSize: 16 }}>
              Tổng thanh toán:
            </Text>
            <Text style={{ fontWeight: '600', fontSize: 16, color: '#ed2939' }}>
              đ
              {data.numOfAdults * data.adultsPrice +
                data.numOfChildren * data.childrenPrice +
                data.numOfBabies * data.babyPrice -
                40000}
            </Text>
          </View>
        </View>
        <View style={styles.mainView}>
          <View style={[styles.line]}>
            <SvgXml xml={CashIcon} />
            <Text style={{ fontWeight: '600', fontSize: 16 }}>
              {' '}
              Phương thức thanh toán
            </Text>
          </View>
          <View style={[styles.line, { marginLeft: 5 }]}>
            <SvgXml xml={VisaIcon} />
            <Text style={{}}> Thẻ Tín dụng/Ghi nợ</Text>
          </View>
          <View style={[styles.line, { marginLeft: 5 }]}>
            <SvgXml xml={AppleIcon} />
            <Text style={{}}> Apple Pay</Text>
          </View>
        </View>
        <View style={styles.mainView}>
          <Text style={{ fontWeight: '600', fontSize: 16 }}>
            {' '}
            Chính sách về vé và giá
          </Text>
          <View style={[styles.line]}>
            <SvgXml xml={SuccessIcon} />
            <Text style={{ color: '#1d800e', textAlign: 'left' }}>
              {' '}
              Hoàn 100% tiền vé nếu huỷ trước 24 giờ bắt đầu
            </Text>
          </View>
          <View style={[styles.line]}>
            <SvgXml xml={SuccessIcon} />
            <Text style={{ color: '#1d800e', textAlign: 'left' }}>
              {' '}
              Đã bao gồm phí cho tất cả các dịch vụ trong suốt trải nghiệm
            </Text>
          </View>
          <View style={[styles.line]}>
            <SvgXml xml={SuccessIcon} />
            <Text style={{ color: '#1d800e', textAlign: 'left' }}>
              {' '}
              Giảm 10% khi đăng ký từ 2 người trở lên, Giảm 10% khi đăng ký từ 2
              người trở lên
            </Text>
          </View>
          <View style={[styles.line]}>
            <SvgXml xml={FailIcon} />
            <Text style={{ color: '#ff0000', textAlign: 'left' }}>
              {' '}
              Chưa bao gồm tiền ...
            </Text>
          </View>
          <View style={[styles.line]}>
            <SvgXml xml={FailIcon} />
            <Text style={{ color: '#ff0000', textAlign: 'left' }}>
              {' '}
              Huỷ không hoàn tiền
            </Text>
          </View>
        </View>
        <View style={styles.mainView}>
          <View style={[styles.line]}>
            <SvgXml xml={BoxCheckIcon} />
            <Text style={{}}>
              {' '}
              Nhấn “Thanh toán” đồng nghĩa với việc bạn đồng ý tuân theo Điều
              khoản của Travogue.
            </Text>
          </View>
        </View>
      </ScrollView>
      <View style={[styles.frameParent4]}>
        <View style={{}}>
          <Text style={{}}>Tổng thanh toán</Text>
          <Text style={{ fontWeight: '600', fontSize: 16, color: '#ed2939' }}>
            đ
            {data.numOfAdults * data.adultsPrice +
              data.numOfChildren * data.childrenPrice +
              data.numOfBabies * data.babyPrice -
              40000}
          </Text>
        </View>
        <Pressable style={[styles.button1]} onPress={handleCheckout}>
          <Text style={{ color: '#fff' }}>Thanh toán</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  mainView: {
    padding: 16,
    paddingBottom: 0,
  },
  container: {
    backgroundColor: '#fff',
  },
  statusBar: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  containerCard: {
    width: '100%',
    paddingHorizontal: 18,
    paddingVertical: 12,
    flexDirection: 'row',
  },
  img: {
    borderRadius: 7,
    width: 130,
    height: 130,
  },
  orderCard: {
    marginLeft: 12,
    alignSelf: 'stretch',
    flex: 1,
  },
  textDetail: {
    fontSize: 16,
    textAlign: 'left',
    fontWeight: '600',
  },
  line: {
    flexDirection: 'row',
    alignContent: 'center',
    // height: 10,
    paddingTop: 10,
  },
  line1: {
    flexDirection: 'row',
    alignContent: 'center',
    // height: 10,
  },
  avaImg: {
    height: 40,
    width: 40,
    borderRadius: 40 / 2,
  },
  inputArea: {
    borderRadius: 7,
    borderStyle: 'solid',
    borderColor: '#767676',
    borderWidth: 1,
    width: '70%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  button: {
    borderRadius: 7,
    backgroundColor: '#fff',
    borderStyle: 'solid',
    borderColor: '#151515',
    borderWidth: 1,
    overflow: 'hidden',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  line3: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
  },
  frameParent4: {
    height: 80,
    borderTopWidth: 1,
    paddingTop: 18,
    flexWrap: 'wrap',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 0,
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderColor: '#bababa',
    borderStyle: 'solid',
    backgroundColor: '#fff',
    bottom: 0,
    position: 'relative',
    width: '100%',
  },
  button1: {
    borderRadius: 7,
    backgroundColor: '#ed2939',
    borderColor: '#fff',
    flexWrap: 'wrap',
    paddingVertical: 12,
    paddingHorizontal: 16,
    overflow: 'hidden',
  },
});
