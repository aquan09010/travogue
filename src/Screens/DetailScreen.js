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
  ActivityIndicator,
  Button,
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { ParkIconActive } from '@/Assets/Icons/Where';
import React, { useLayoutEffect, useState, useRef } from 'react';
import { SearchIcon, ArrowLeft } from '@/Assets/Icons/Navigation';
import {
  CancelIcon,
  CommentIcon,
  DotIcon,
  FourStarBar,
  HeartIcon,
  LanguageIcon,
  MiniLocation1,
  MiniStar,
  OneStarBar,
  ShareIcon,
  TwoStarBar,
} from '@/Assets/Icons/DetailIcon';
import { MiniLocation } from '@/Assets/Icons/Card';
import { useStateContext } from '@/Context/StateContext';
import { getDetailActivity } from '@/Hooks/TravelActivityHooks';
import Modal from 'react-native-modal';
import ModalComment from './ModalComment';

export default function DetailScreen({ route }) {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  const goToOrder = async (e) => {
    setModalTicketVisible(false);
    e.preventDefault();
    navigation.navigate('OrderConfirm');
  };
  const gotoHost = async (e) => {
    e.preventDefault();
    navigation.navigate('HostProfile');
  };

  const { accessToken } = useStateContext();

  const { activity, isActivityLoading, activityError } = getDetailActivity(
    accessToken,
    route.params.activityId
  );

  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalTicketVisible, setModalTicketVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const toggleModalTicket = () => {
    setModalTicketVisible(!isModalTicketVisible);
  };
  return (
    <View style={styles.container}>
      {isActivityLoading ? (
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
          }}
        >
          <ActivityIndicator size="large" color="#ED2939" />
        </View>
      ) : activityError ? (
        <Text
          style={{
            color: '#A80027',
            textAlign: 'center',
            paddingBottom: 20,
            fontSize: 16,
          }}
        >
          Something went wrong!
        </Text>
      ) : (
        <>
          <ImageBackground
            source={{ uri: activity.data.mainImage }}
            style={styles.image}
            resizeMode="cover"
          >
            <View style={styles.mainView}>
              <View style={styles.statusBar}>
                <Pressable onPress={() => navigation.goBack()}>
                  <SvgXml xml={ArrowLeft} />
                </Pressable>
                <Pressable onPress={() => {}}>
                  <SvgXml xml={SearchIcon} />
                </Pressable>
              </View>
            </View>
            <View style={styles.actionContainer}>
              {route.params.isExperience && (
                <Pressable
                  onPress={gotoHost}
                  style={[styles.avatar, styles.actionPadding]}
                >
                  <Image
                    style={styles.avaImg}
                    resizeMode="cover"
                    source={{ uri: activity.data.host.avatar }}
                  />
                </Pressable>
              )}

              <Pressable style={styles.actionPadding}>
                <SvgXml xml={HeartIcon} />
              </Pressable>
              <Pressable
                onPress={toggleModal}
                style={[styles.actionPadding, styles.extraLine]}
              >
                <SvgXml xml={CommentIcon} />
                <Text style={styles.text}>120</Text>
              </Pressable>
              <Pressable style={[styles.actionPadding, styles.extraLine]}>
                <SvgXml xml={ShareIcon} />
                <Text style={styles.text}>120</Text>
              </Pressable>
            </View>

            {route.params.isExperience && (
              <TouchableOpacity
                style={styles.buttonTicket}
                onPress={toggleModalTicket}
              >
                <Text style={styles.textDetail}>
                  Từ {activity.data.generalPrice / 1000}K/người
                </Text>
                <View style={styles.button}>
                  <Text style={[styles.textDetail]}>Đặt ngay</Text>
                </View>
              </TouchableOpacity>
            )}

            <View style={styles.detailContainer}>
              {route.params.isExperience &&
                activity.data.averageRating >= 4.8 && (
                  <View style={styles.topWrapper}>
                    <Text style={[styles.textDetail]}>Top trải nghiệm</Text>
                  </View>
                )}

              <View>
                <Text style={[styles.title]} numberOfLines={2}>
                  {activity.data.activityName +
                    ' - ' +
                    activity.data.activityCategory.categoryName}
                </Text>

                <View style={[styles.container1]}>
                  <View style={[styles.line]}>
                    <SvgXml xml={MiniStar} />
                    <Text style={[styles.text]}>
                      {parseFloat(activity.data.averageRating).toFixed(1)}
                    </Text>
                  </View>
                  <View style={[styles.line]}>
                    <SvgXml xml={MiniLocation1} />
                    <Text style={[styles.text]}>{activity.data.city.name}</Text>
                  </View>
                </View>
                <View
                  style={[styles.frameContainer, styles.frameParentShadowBox]}
                >
                  {activity.data.tags.split(';').map((tag) => (
                    <View style={styles.wrapperSpaceBlock}>
                      <Text style={[styles.textTag]}>{tag}</Text>
                    </View>
                  ))}
                </View>

                {route.params.isExperience && (
                  <View style={[styles.line]}>
                    <SvgXml xml={LanguageIcon} />
                    <Text style={[styles.languageBorder]}>
                      {activity.data.languages}
                    </Text>
                  </View>
                )}
              </View>
              <Text style={styles.textDetail}>{activity.data.description}</Text>
            </View>
          </ImageBackground>
        </>
      )}
      <Modal
        onBackButtonPress={() => setModalVisible(false)}
        onBackdropPress={() => setModalVisible(false)}
        swipeDirection="down"
        onSwipeComplete={toggleModal}
        isVisible={isModalVisible}
        avoidKeyboard={true}
        style={{
          justifyContent: 'flex-end',
          width: '100%',
          padding: 0,
          margin: 0,
        }}
      >
        <View
          style={{
            bottom: 0,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            backgroundColor: '#fff',
            height: 500,
            minHeight: 100,
          }}
        >
          <View
            style={{
              paddingTop: 20,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 18,
              paddingVertical: 8,
            }}
          >
            <Text style={{ fontWeight: '600', fontSize: 20 }}>
              Bình luận
              <Text style={{ fontSize: 14 }}> (12)</Text>
            </Text>
            <Pressable style={{}} onPress={toggleModal}>
              <SvgXml xml={CancelIcon} />
            </Pressable>
          </View>
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 18,
              paddingVertical: 12,
            }}
          >
            <Pressable
              onPress={() => {}}
              style={[styles.avatar, styles.actionPadding]}
            >
              <Image
                style={[styles.avaImg, { marginRight: 10 }]}
                resizeMode="cover"
                source={require('../Assets/ava1.jpg')}
              />
            </Pressable>
            <View style={{}}>
              <View style={styles.line}>
                <SvgXml xml={OneStarBar} />
                <Text> Jordan • 1 giờ trước</Text>
              </View>
              <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Vestibulum blandit velit erat ... Xem thêm
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 18,
              paddingVertical: 12,
            }}
          >
            <Pressable
              onPress={() => {}}
              style={[styles.avatar, styles.actionPadding]}
            >
              <Image
                style={[styles.avaImg, { marginRight: 10 }]}
                resizeMode="cover"
                source={require('../Assets/ava1.jpg')}
              />
            </Pressable>
            <View style={{}}>
              <View style={styles.line}>
                <SvgXml xml={FourStarBar} />
                <Text> Jordan • 1 giờ trước</Text>
              </View>
              <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Vestibulum blandit velit erat ... Xem thêm
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 18,
              paddingVertical: 12,
            }}
          >
            <Pressable
              onPress={() => {}}
              style={[styles.avatar, styles.actionPadding]}
            >
              <Image
                style={[styles.avaImg, { marginRight: 10 }]}
                resizeMode="cover"
                source={require('../Assets/ava1.jpg')}
              />
            </Pressable>
            <View style={{}}>
              <View style={styles.line}>
                <SvgXml xml={TwoStarBar} />
                <Text> Jordan • 1 giờ trước</Text>
              </View>
              <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Vestibulum blandit velit erat ... Xem thêm
              </Text>
            </View>
          </View>
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              borderColor: '#bababa',
              borderTopWidth: 1,
              paddingHorizontal: 18,
              paddingTop: 12,
              paddingBottom: 24,
              flexDirection: 'row',
              width: '100%',
              flex: 1,
              borderStyle: 'solid',
              height: 180,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                paddingHorizontal: 18,
                paddingVertical: 12,
              }}
            >
              <Pressable
                onPress={() => {}}
                style={[styles.avatar, styles.actionPadding]}
              >
                <Image
                  style={[styles.avaImg, { marginRight: 10 }]}
                  resizeMode="cover"
                  source={require('../Assets/ava1.jpg')}
                />
              </Pressable>
              <View style={{}}>
                <View style={[styles.line, { paddingBottom: 10 }]}>
                  <SvgXml xml={TwoStarBar} />
                </View>
                <TextInput
                  style={styles.inputArea}
                  placeholder="Viết bình luận..."
                  placeholderTextColor="#1b1b1b"
                ></TextInput>
              </View>
            </View>
            <View style={{ position: 'absolute', bottom: 20, right: 30 }}>
              <View style={[styles.button1]}>
                <Text style={{ color: '#fff' }}>Đăng</Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        onBackButtonPress={() => setModalTicketVisible(false)}
        onBackdropPress={() => setModalTicketVisible(false)}
        swipeDirection="down"
        onSwipeComplete={toggleModalTicket}
        isVisible={isModalTicketVisible}
        avoidKeyboard={true}
        style={{
          justifyContent: 'flex-end',
          width: '100%',
          padding: 0,
          margin: 0,
        }}
      >
        <View
          style={{
            bottom: 0,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            backgroundColor: '#fff',
            height: 500,
            minHeight: 100,
          }}
        >
          <View
            style={{
              paddingTop: 20,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 18,
              paddingVertical: 8,
            }}
          >
            <Text style={{ fontWeight: '600', fontSize: 20 }}>Vé và giá</Text>
            <Pressable style={{}} onPress={toggleModal}>
              <SvgXml xml={CancelIcon} />
            </Pressable>
          </View>
        </View>
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            borderColor: '#bababa',
            borderTopWidth: 1,
            paddingHorizontal: 18,
            paddingTop: 12,
            paddingBottom: 24,
            flexDirection: 'row',
            width: '100%',
            flex: 1,
            borderStyle: 'solid',
            height: 100,
            justifyContent: 'space-between',
          }}
        >
          <View style={{}}>
            <Text style={{}}>Tổng thanh toán</Text>
            <Text style={{ fontWeight: '600', fontSize: 16, color: '#ed2939' }}>
              đ260.000
            </Text>
          </View>
          <TouchableOpacity
            onPress={goToOrder}
            style={[styles.button2, { height: 45, alignItems: 'center' }]}
          >
            <Text style={{ color: '#fff' }}>Tiếp tục</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
  mainView: {
    padding: 16,
    paddingBottom: 0,
    paddingTop: '10%',
  },
  statusBar: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
  actionContainer: {
    top: 400,
    left: 360,
    alignItems: 'center',
    position: 'absolute',
  },
  actionPadding: {
    paddingBottom: 15,
  },
  extraLine: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 12,
  },
  avaImg: {
    height: 40,
    width: 40,
    borderRadius: 40 / 2,
  },
  detailContainer: {
    bottom: 40,
    left: '50%',
    marginLeft: -187.5,
    width: 375,
    position: 'absolute',
  },
  textDetail: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'left',
    fontWeight: '600',
  },
  topWrapper: {
    paddingVertical: 4,
    paddingHorizontal: 5,
    backgroundColor: '#ed2939',
    borderRadius: 7,
    width: '28%',
    flexDirection: 'row',
  },
  frameParentShadowBox: {
    alignItems: 'center',
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    flexDirection: 'row',
    paddingBottom: 8,
  },
  wrapperSpaceBlock: {
    paddingHorizontal: 6,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingVertical: 2,
    flexDirection: 'row',
    borderRadius: 7,
  },
  title: {
    fontSize: 20,
    textShadowRadius: 4,
    textShadowOffset: {
      width: 0,
      height: 4,
    },
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textAlign: 'left',
    color: '#fff',
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 5,
    textTransform: 'capitalize',
  },

  text: {
    marginLeft: 4,
    textAlign: 'left',
    color: '#fff',
  },

  textTag: {
    color: '#151515',
    textAlign: 'left',
    textTransform: 'capitalize',
  },
  lchSWrapper: {
    marginLeft: 4,
  },
  frameContainer: {
    marginTop: 8,
    gap: 6,
    alignSelf: 'stretch',
    display: 'flex',
    flexWrap: 'wrap' /* Enable wrapping of tags */,
  },
  languageBorder: {
    width: 210,
    marginLeft: 4,
    textAlign: 'left',
    color: '#fff',
    textTransform: 'capitalize',
  },
  line: {
    flexDirection: 'row',
    alignContent: 'center',
    // height: 10,
    marginRight: 15,
  },
  container1: {
    alignContent: 'center',
    flexDirection: 'row',
  },
  buttonTicket: {
    top: 630,
    left: 300,
    alignItems: 'center',
    position: 'absolute',
  },
  checkout: {
    fontSize: 14,
    color: '#fff',
  },
  button: {
    borderRadius: 7,
    backgroundColor: '#ed2939',
    borderStyle: 'solid',
    borderColor: '#fff',
    borderWidth: 1,
    width: 100,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    marginTop: 5,
  },
  inputArea: {
    borderRadius: 7,
    backgroundColor: '#E8E8E8',
    color: '#1b1b1b',
    paddingVertical: 10,
    paddingHorizontal: 18,
    width: 275,
    height: 50,
  },
  button1: {
    borderRadius: 7,
    backgroundColor: '#ed2939',
    borderColor: '#fff',
    flexWrap: 'wrap',
    paddingVertical: 12,
    paddingHorizontal: 16,
    overflow: 'hidden',
    width: 100,
    alignContent: 'center',
    alignItems: 'center',
  },
  button2: {
    borderRadius: 7,
    backgroundColor: '#ed2939',
    borderColor: '#fff',
    flexWrap: 'wrap',
    paddingVertical: 14,
    overflow: 'hidden',
    width: 100,
    alignContent: 'center',
    alignItems: 'center',
  },
});
