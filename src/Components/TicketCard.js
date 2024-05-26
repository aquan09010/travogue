import { CheckIcon } from "@/Assets/Icons/DetailIcon";
import {
  BoxCheckIcon,
  CalendarIcon,
  FailIcon,
  PeopleIcon,
  SuccessIcon,
  TimeIcon,
  WaitIcon,
} from "@/Assets/Icons/OrderConfirm";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Pressable,
  Animated,
} from "react-native";
import { SvgXml } from "react-native-svg";

const formatTimeRange = (startAt, endAt) => {
  const formattedStart = startAt.slice(11, 16); // Extract "18:22"
  const formattedEnd = endAt.slice(11, 16);

  return `${formattedStart} - ${formattedEnd}`;
};

export default function TicketCard({data}) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.frameChild}
        resizeMode="cover"
        source={{uri: data.activity.mainImage}}
      />
      <View style={styles.marginLeftTicket}>
        <Text style={[styles.titleTicket]}>
          {data.activity.activityName}
        </Text>
        <View style={styles.parentFlexBox}>
          <SvgXml xml={CalendarIcon} />
          <Text style={[styles.th714]}>{data.ticket.activityTimeFrame.startAt.substr(0,10) }</Text>
        </View>
        <View style={[styles.clockParent, styles.parentFlexBox]}>
          <SvgXml xml={TimeIcon} />
          <Text style={[styles.th714]}>{formatTimeRange(data.ticket.activityTimeFrame.startAt, data.ticket.activityTimeFrame.endAt) }</Text>
        </View>
        <View style={[styles.clockParent, styles.parentFlexBox]}>
          <SvgXml xml={PeopleIcon} />
          <Text style={[styles.th714]}>{data.ticket.numOfAdults} người lớn, {data.ticket.numOfChildren} trẻ em, {data.ticket.numOfBabies} em bé</Text>
        </View>
        <View style={[styles.clockParent, styles.parentFlexBox]}>
          <Text style={[styles.hostContainer]}>
            <Text style={styles.hostTitle}>Host:</Text>
            <Text style={styles.hostName}> {data.activity.host.firstName + ' ' + data.activity.host.lastName}</Text>
          </Text>
          <Image
            style={styles.avaImg}
            resizeMode="cover"
            source={{uri: data.activity.host.avatar}}
          />
        </View>
        
        {data.ticket.ticketStatus === "PAID" ?
          <View style={[styles.clockParent, styles.parentFlexBox]}>
          <SvgXml xml={SuccessIcon} />
          <Text
            style={{
              marginLeft: 6,
              fontSize: 12,
              flex: 1,
              color: "#1d800e",
              textAlign: "left",
            }}
          >
            Đã thanh toán
          </Text>
          </View> : data.ticket.ticketStatus === "PAY_AT_PICK_UP" ? 
        <View style={[styles.clockParent, styles.parentFlexBox]}>
        <SvgXml xml={WaitIcon} />
        <Text
          style={{
            marginLeft: 6,
            fontSize: 12,
            flex: 1,
            color: "#ffc107",
            textAlign: "left",
          }}
        >
          Thanh toán tại điểm đến
        </Text>
      </View> :
          <View style={[styles.clockParent, styles.parentFlexBox]}>
          <SvgXml xml={FailIcon} />
          <Text
            style={{
              marginLeft: 6,
              fontSize: 12,
              flex: 1,
              color: "#ff0000",
              textAlign: "left",
            }}
          >
            Đã huỷ
          </Text>
        </View>} 
        
        
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  th714FlexBox: {
    textAlign: "left",
    color: "#151515",
  },
  parentFlexBox: {
    marginTop: 6,
    alignSelf: "stretch",
    flexDirection: "row",
  },
  frameChild: {
    borderRadius: 7,
    width: 130,
    height: 130,
  },
  titleTicket: {
    fontWeight: "600",
    fontSize: 14,
    alignSelf: "stretch",
  },
  th714: {
    marginLeft: 6,
    fontSize: 12,
    flex: 1,
  },
  clockParent: {
    alignItems: "center",
  },
  hostTitle: {
    fontWeight: "600",
  },
  hostContainer: {
    fontSize: 12,
  },
  frameItem: {
    width: 30,
    height: 30,
    marginLeft: 6,
  },

  marginLeftTicket: {
    marginLeft: 12,
    alignSelf: "stretch",
    flex: 1,
  },
  container: {
    width: "100%",
    paddingHorizontal: 18,
    paddingVertical: 12,
    flexDirection: "row",
    flex: 1,
  },
  avaImg: {
    height: 30,
    width: 30,
    borderRadius: 30 / 2,
    marginLeft: 5,
  },
});
