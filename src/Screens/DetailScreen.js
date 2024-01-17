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
  FlatList,
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { ParkIconActive } from '@/Assets/Icons/Where';
import React, { useLayoutEffect, useState, useRef, useEffect } from 'react';
import { SearchIcon, ArrowLeft } from '@/Assets/Icons/Navigation';
import { Dropdown } from 'react-native-element-dropdown';

import {
  CancelIcon,
  CommentIcon,
  DotIcon,
  FourStarBar,
  HeartIcon,
  LanguageIcon,
  MiniLocation1,
  MiniStar,
  MinusIcon,
  NoticeIcon,
  OneStarBar,
  PlusIcon,
  ShareIcon,
  TwoStarBar,
} from '@/Assets/Icons/DetailIcon';
import { MiniLocation } from '@/Assets/Icons/Card';
import { useStateContext } from '@/Context/StateContext';
import {
  getCommentsByActivity,
  getDetailActivity,
  postCommentsByActivity,
} from '@/Hooks/TravelActivityHooks';
import Modal from 'react-native-modal';
import ModalComment from './ModalComment';
import DropdownComponent from '@/Components/DropdownComponent';
import { PeopleIcon } from '@/Assets/Icons/OrderConfirm';
import { LanguageBlackIcon } from '@/Assets/Icons/Proflie';
import DropdownTime from '@/Components/DropdownTime';
import StarRating from '@/Components/StarRating';
import { CalendarIcon } from '@/Assets/Icons/OrderConfirm';
import { CheckIcon } from '@/Assets/Icons/DetailIcon';

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

  const { accessToken, user, commentList, setCommentList } = useStateContext();

  const { activity, isActivityLoading, activityError } = getDetailActivity(
    accessToken,
    route.params.activityId
  );

  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalTicketVisible, setModalTicketVisible] = useState(false);

  const toggleModal = async (e) => {
    e.preventDefault();
    setModalVisible(!isModalVisible);

    await getComments(accessToken, activity.data.id);
  };

  const toggleModalTicket = () => {
    setModalTicketVisible(!isModalTicketVisible);
  };

  // Call Comment API
  const { getComments, comments, isCommentLoading, commentError } =
    getCommentsByActivity();

  const { postComments, newComment, isPostCommentLoading, postCommentError } =
    postCommentsByActivity();

  const handlePostComment = async (e) => {
    e.preventDefault();

    await postComments(accessToken, activity.data.id, currentRating, userCmt);
    setCurrentRating(0);
    setUserCmt('');
  };

  const [currentRating, setCurrentRating] = useState(0);
  const [userCmt, setUserCmt] = useState('');

  useEffect(() => {
    if (comments) setCommentList(comments.data);
    if (newComment) {
      setCommentList([newComment.data.activityComment, ...commentList]);
    }
  }, [comments, newComment]);

  const timeAgo = (dateString) => {
    const now = new Date();
    const createdAt = new Date(dateString);
    const differenceInSeconds = Math.floor((now - createdAt) / 1000);

    const intervals = [
      ['year', 31536000],
      ['month', 2592000],
      ['day', 86400],
      ['hour', 3600],
      ['minute', 60],
      ['second', 1],
    ];

    for (const [name, seconds] of intervals) {
      const intervalCount = Math.floor(differenceInSeconds / seconds);
      if (intervalCount >= 1) {
        return `${intervalCount} ${
          intervalCount === 1 ? name : name + 's'
        } ago`;
      }
    }

    return 'just now';
  };

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const renderDateItem = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.date}</Text>
        {item.id === selectedDate?.id && <SvgXml xml={CheckIcon} />}
      </View>
    );
  };

  const renderTimeItem = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.timeRange}</Text>
        {item.id === selectedTime?.id && <SvgXml xml={CheckIcon} />}
      </View>
    );
  };

  const formatTimeRange = (startAt, endAt) => {
    const formattedStart = startAt.slice(11, 16); // Extract "18:22"
    const formattedEnd = endAt.slice(11, 16);

    return `${formattedStart} - ${formattedEnd}`;
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
                <Text style={[styles.textDetail, { color: '#ed2939' }]}>
                  Từ {activity.data.generalPrice / 1000}K/người
                </Text>
                <View onPress={toggleModalTicket} style={styles.button}>
                  <Text style={[styles.textDetail]}>Đặt ngay</Text>
                </View>
              </TouchableOpacity>
              // <View style={styles.buttonTicket}>
              //   <Button title=" Đặt ngay" onPress={toggleModalTicket}></Button>
              // </View>
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
                    <StarRating
                      disabled={true}
                      color="white"
                      rating={activity.data.averageRating}
                    />
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
        propagateSwipe={true}
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
              <Text style={{ fontSize: 14 }}> ({commentList.length})</Text>
            </Text>
            <Pressable style={{}} onPress={toggleModal}>
              <SvgXml xml={CancelIcon} />
            </Pressable>
          </View>

          {isCommentLoading ? (
            <>
              <ActivityIndicator
                size="large"
                color="#ED2939"
                style={{ paddingVertical: 12 }}
              />
            </>
          ) : commentError ? (
            <Text
              style={{
                color: '#A80027',
                textAlign: 'center',
                paddingBottom: 20,
                fontSize: 16,
              }}
            >
              {commentError.message}
            </Text>
          ) : commentList.length > 0 ? (
            <View style={{ height: 270 }}>
              <ScrollView>
                {commentList.map((item) => (
                  <Pressable
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
                        source={{ uri: item.user.avatar }}
                      />
                    </Pressable>
                    <View style={{}}>
                      <View style={styles.line}>
                        <StarRating rating={item.rating} disabled={true} />
                        <Text>
                          {' '}
                          {item.user.email.split('@')[0]} •{' '}
                          {timeAgo(item.createdAt)}
                        </Text>
                      </View>
                      <Text style={{ paddingRight: 45 }}>{item.comment}</Text>
                    </View>
                  </Pressable>
                ))}
              </ScrollView>
            </View>
          ) : (
            <></>
          )}

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
                  source={{ uri: user.avatar }}
                />
              </Pressable>
              <View style={{}}>
                <View style={[styles.line, { paddingBottom: 10 }]}>
                  {/* <SvgXml xml={TwoStarBar} /> */}
                  <StarRating
                    rating={currentRating}
                    onStarPress={setCurrentRating}
                  />
                </View>
                <TextInput
                  style={styles.inputArea}
                  placeholder="Viết bình luận..."
                  placeholderTextColor="#1b1b1b"
                  value={userCmt}
                  onChangeText={setUserCmt}
                ></TextInput>
              </View>
            </View>
            <Pressable
              style={{ position: 'absolute', bottom: 20, right: 30 }}
              onPress={handlePostComment}
            >
              <View style={[styles.button1]}>
                <Text style={{ color: '#fff' }}>Đăng</Text>
              </View>
            </Pressable>
          </View>
        </View>
      </Modal>

      {route.params.isExperience && (
        <Modal
          onBackdropPress={() => setModalTicketVisible(false)}
          swipeDirection="down"
          onSwipeComplete={toggleModalTicket}
          isVisible={isModalTicketVisible}
          avoidKeyboard={true}
          propagateSwipe={true}
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
              height: 650,
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
              <Pressable style={{}} onPress={toggleModalTicket}>
                <SvgXml xml={CancelIcon} />
              </Pressable>
            </View>
            <View
              style={{
                paddingHorizontal: 18,
                paddingVertical: 12,
              }}
            >
              <Text style={{ fontWeight: '600', fontSize: 14 }}>
                Chọn ngày và giờ
              </Text>
              <View style={styles.line}>
                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={activity.data?.activityDates}
                  maxHeight={300}
                  labelField="date"
                  valueField="id"
                  placeholder=" Chọn ngày"
                  value={selectedDate?.date}
                  onChange={(item) => {
                    setSelectedDate(item);
                  }}
                  renderLeftIcon={() => <SvgXml xml={CalendarIcon} />}
                  renderItem={renderDateItem}
                />

                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={
                    selectedDate
                      ? selectedDate?.activityTimeFrames.map((e) => ({
                          ...e,
                          timeRange: formatTimeRange(e.startAt, e.endAt),
                        }))
                      : []
                  }
                  maxHeight={300}
                  labelField="timeRange"
                  valueField="id"
                  placeholder=" Chọn giờ"
                  value={
                    selectedTime
                      ? formatTimeRange(
                          selectedTime.startAt,
                          selectedTime.endAt
                        )
                      : 'Chưa có'
                  }
                  onChange={(item) => {
                    setSelectedTime(item);
                  }}
                  renderLeftIcon={() => <SvgXml xml={CalendarIcon} />}
                  renderItem={renderTimeItem}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <View style={[styles.line, { paddingTop: 10 }]}>
                  <SvgXml xml={PeopleIcon} />
                  <Text style={{ fontWeight: '600' }}>
                    {' '}
                    {selectedTime
                      ? selectedTime.numOfRegisteredGuests +
                        '/' +
                        selectedTime.maximumGuests
                      : '.../...'}
                  </Text>
                </View>
                <View style={[styles.line, { paddingTop: 10 }]}>
                  <SvgXml xml={LanguageBlackIcon} />
                  <Text style={{ fontWeight: '600' }}>
                    {' '}
                    {selectedTime ? selectedTime.languages : ''}
                  </Text>
                </View>
              </View>
              <View style={[styles.line, { paddingTop: 10 }]}>
                <SvgXml xml={NoticeIcon} />
                <Text style={{ fontStyle: 'italic' }}> Lưu ý của Host</Text>
              </View>
              <View style={[styles.line, { paddingTop: 10 }]}>
                <Text style={{}}>{selectedTime?.hostNotes}</Text>
              </View>

              <View style={{ paddingTop: 10 }}>
                <Text style={{ fontWeight: '600', fontSize: 14 }}>
                  Vé của bạn{' '}
                </Text>
                <Text
                  style={{
                    fontStyle: 'italic',
                    paddingTop: 10,
                    paddingBottom: 10,
                  }}
                >
                  {' '}
                  Gửi lời nhắn cho Host
                </Text>
                <TextInput
                  style={[styles.inputArea, { width: '100%' }]}
                  placeholder="Lời nhắn"
                  placeholderTextColor="#1b1b1b"
                ></TextInput>
                <View
                  style={{
                    paddingTop: 10,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <View>
                    <Text style={{ fontWeight: '600', fontSize: 14 }}>
                      Người lớn
                    </Text>
                    <Text style={{ fontWeight: '600', fontSize: 14 }}>
                      {selectedTime?.adultsPrice.toLocaleString()} VND
                    </Text>
                  </View>
                  <View style={styles.minusParent}>
                    <SvgXml xml={MinusIcon} />
                    <Text style={{ color: 'black' }}>2</Text>
                    <SvgXml xml={PlusIcon} />
                  </View>
                </View>
                <View
                  style={{
                    paddingTop: 10,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <View>
                    <Text style={{ fontWeight: '600', fontSize: 14 }}>
                      Trẻ em (2 đến dưới 12 tuổi){' '}
                    </Text>
                    <Text style={{ fontWeight: '600', fontSize: 14 }}>
                      {' '}
                      {selectedTime?.adultsPrice.toLocaleString()} VND
                    </Text>
                  </View>
                  <View style={styles.minusParent}>
                    <SvgXml xml={MinusIcon} />
                    <Text style={{ color: 'black' }}>1</Text>
                    <SvgXml xml={PlusIcon} />
                  </View>
                </View>
                <View
                  style={{
                    paddingTop: 10,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <View>
                    <Text style={{ fontWeight: '600', fontSize: 14 }}>
                      Em bé (Dưới 2 tuổi)
                    </Text>
                    <Text style={{ fontWeight: '600', fontSize: 14 }}>
                      {selectedTime?.babyPrice.toLocaleString()} VND
                    </Text>
                  </View>
                  <View style={styles.minusParent}>
                    <SvgXml xml={MinusIcon} />
                    <Text style={{ color: 'black' }}>1</Text>
                    <SvgXml xml={PlusIcon} />
                  </View>
                </View>
              </View>
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
              <Text
                style={{ fontWeight: '600', fontSize: 16, color: '#ed2939' }}
              >
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
      )}
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
    paddingBottom: 0,
    paddingTop: '11%',
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
    width: '70%',
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
    top: 550,
    left: 16,
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
  minusParent: {
    borderRadius: 7,
    borderStyle: 'solid',
    borderColor: '#1b1b1b',
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 8,
    width: '25%',
  },
  dropdown: {
    width: '48%',
    marginTop: 12,
    height: 50,
    marginRight: 15,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
