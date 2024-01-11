import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Onboarding from "react-native-onboarding-swiper";
import Lottie from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";
import { setItem } from "@/Utils/asyncStorage";

const { width, height } = Dimensions.get("window");

export default function OnboardingScreen() {
  const navigation = useNavigation();

  const handleDone = () => {
    navigation.navigate("Auth");
    setItem("onboarded", "1");
  };

  const skipButton = ({ ...props }) => {
    return (
      <TouchableOpacity style={styles.skipButton} {...props}>
        <Text style={{ color: "white", fontSize: 18 }}>Bỏ qua</Text>
      </TouchableOpacity>
    );
  };

  const nextButton = ({ ...props }) => {
    return (
      <TouchableOpacity style={styles.skipButton} {...props}>
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>
          Tiếp theo →
        </Text>
      </TouchableOpacity>
    );
  };

  const doneButton = ({ ...props }) => {
    return (
      <TouchableOpacity style={styles.doneButton} {...props}>
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>
          Bắt đầu ngay
        </Text>
      </TouchableOpacity>
    );
  };

  const Square = ({ isLight, selected }) => {
    let backgroundColor;
    if (isLight) {
      backgroundColor = selected ? "#651D43" : "#fff";
    } else {
      backgroundColor = selected ? "#651D43" : "#fff";
    }
    return (
      <View
        style={{
          width: 8,
          height: 8,
          borderRadius: 30,
          marginHorizontal: 3,
          marginBottom: 120,
          backgroundColor,
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Onboarding
        onDone={handleDone}
        onSkip={handleDone}
        bottomBarHighlight={false}
        DoneButtonComponent={doneButton}
        SkipButtonComponent={skipButton}
        NextButtonComponent={nextButton}
        DotComponent={Square}
        containerStyles={{ paddingHorizontal: 15 }}
        titleStyles={{ color: "white", fontWeight: "bold", fontSize: 28 }}
        subTitleStyles={{ color: "white", fontSize: 18 }}
        pages={[
          {
            backgroundColor: "#FFAF4E",
            image: (
              <View style={styles.lottie}>
                <Lottie
                  source={require("../Assets/animation/screen1.json")}
                  autoPlay
                  loop
                />
              </View>
            ),
            title: "Tìm kiếm địa điểm",
            subtitle:
              "Hãy cho chúng tôi biết điểm đến của bạn, những địa điểm tốt nhất và phù hợp nhất sẽ được đề xuất",
          },
          {
            backgroundColor: "#FFBE97",
            image: (
              <View style={styles.lottie}>
                <Lottie
                  source={require("../Assets/animation/screen2.json")}
                  autoPlay
                  loop
                />
              </View>
            ),
            title: "Đặt vé Trải nghiệm",
            subtitle:
              "Tìm hiểu những trải nghiệm đem lại những cảm giác mới mẽ, đồng thời hiểu được cuộc sống con người địa phương",
          },
          {
            backgroundColor: "#1FB090",
            image: (
              <View style={styles.lottie}>
                <Lottie
                  source={require("../Assets/animation/screen3.json")}
                  autoPlay
                  loop
                />
              </View>
            ),
            title: "Khám phá Travogue nào !",
            subtitle:
              "Hãy cùng chuẩn bị và lên kế hoạch cho những chuyến đi của bạn ngay bây giờ",
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  lottie: {
    width: width * 1,
    height: width * 0.7,
  },
  doneButton: {
    marginRight: 0.1 * width,
    backgroundColor: "#651D43",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    width: 0.8 * width,
    height: 49,
  },
  skipButton: {
    padding: 20,
    fontWeight: "bold",
  },
});
