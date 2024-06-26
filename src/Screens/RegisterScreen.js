import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";

import { SvgXml } from "react-native-svg";
import { GoogleIcon } from "@/Assets/Icons/Google";
import { FacebookIcon } from "@/Assets/Icons/Facebook";
import { LeftArrow } from "@/Assets/Icons/LeftArrow";
import { getOTPCode } from "@/Hooks/authHooks";
import { ArrowLeftBlack } from "@/Assets/Icons/Navigation";

export default function RegisterScreen() {
  const [selectedOption, setSelectedOption] = useState("Điện thoại");

  const navigation = useNavigation();

  const [email, setEmail] = useState("");

  const { getOTP, otp, isOTPLoading, otpError } = getOTPCode();

  const goToConfirmPage = async (e) => {
    e.preventDefault();

    await getOTP(email);
  };

  useEffect(() => {
    if (otp) navigation.navigate("ConfirmPhone", { email: email });
  }, [otp]);

  const goToLoginPage = () => {
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.travogue}>TRAVOGUE</Text>
      </View>

      <View style={styles.title}>
        <SvgXml
          xml={ArrowLeftBlack}
          style={styles.arrow}
          onPress={goToLoginPage}
        />

        <Text style={styles.titleText}>Đăng ký</Text>
      </View>

      <View style={styles.formTitle}>
        <View style={styles.dividerContainer}>
          <TouchableOpacity
            onPress={() => setSelectedOption("Điện thoại")}
            style={{ alignItems: "center" }}
          >
            <Text
              style={
                selectedOption === "Điện thoại"
                  ? styles.selectedText
                  : styles.unselectedText
              }
            >
              Điện thoại
            </Text>

            {selectedOption === "Điện thoại" && (
              <View style={styles.selectedUnderline} />
            )}

            {selectedOption === "Email" && (
              <View style={styles.unselectedUnderline} />
            )}
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 60 }}>
          {isOTPLoading ? (
            <>
              <ActivityIndicator size="large" color="#ED2939" style={{}} />
            </>
          ) : otpError ? (
            <Text
              style={{
                color: "#A80027",
                textAlign: "center",
                fontSize: 16,
              }}
            >
              {Array.isArray(otpError) ? otpError[0].message : otpError.message}
            </Text>
          ) : (
            <></>
          )}
        </View>

        <View style={styles.dividerContainer}>
          <TouchableOpacity
            onPress={() => setSelectedOption("Email")}
            style={{ alignItems: "center" }}
          >
            <Text
              style={
                selectedOption === "Email"
                  ? styles.selectedText
                  : styles.unselectedText
              }
            >
              Email
            </Text>

            {selectedOption === "Email" && (
              <View style={styles.selectedUnderline} />
            )}

            {selectedOption === "Điện thoại" && (
              <View style={styles.unselectedUnderline} />
            )}
          </TouchableOpacity>
        </View>
      </View>

      {selectedOption === "Điện thoại" && (
        <TextInput
          style={[styles.input, { fontWeight: "200" }, { fontSize: 18 }]}
          placeholder="Số điện thoại"
          placeholderTextColor="#767676"
          keyboardType="phone-pad"
        />
      )}

      {selectedOption === "Email" && (
        <TextInput
          style={[styles.input, { fontWeight: "200" }, { fontSize: 18 }]}
          placeholder="Email"
          placeholderTextColor="#767676"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
      )}

      <TouchableOpacity style={styles.button} onPress={goToConfirmPage}>
        <Text style={styles.buttonText}>Gửi mã xác nhận</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: "10%",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  header: {
    width: "95%",
    alignItems: "center",
    paddingVertical: "2%",
    justifyContent: "center",
    backgroundColor: "#151515",
  },
  travogue: {
    fontWeight: "500",
    fontSize: 30,
    color: "#ffffff",
    textAlign: "center",
    fontFamily: "Vogue",
  },
  title: {
    width: "100%",
    marginTop: "8%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  arrow: {
    left: "7%",
    position: "absolute",
  },
  titleText: {
    center: true,
    fontSize: 22,
    fontWeight: "700",
  },
  formTitle: {
    width: "100%",
    marginTop: "9%",
    flexDirection: "row",
    paddingHorizontal: "6%",
    justifyContent: "space-around",
  },
  dividerContainer: {
    alignItems: "center",
    flexDirection: "column",
  },
  selectedText: {
    fontSize: 18,
    fontWeight: "700",
  },
  unselectedText: {
    fontSize: 18,
    color: "#747474",
    fontWeight: "400",
  },
  selectedUnderline: {
    height: 2,
    width: 130,
    marginTop: "6%",
    backgroundColor: "#000000",
  },
  unselectedUnderline: {
    height: 1,
    width: 130,
    marginTop: "6%",
    backgroundColor: "#747474",
  },
  input: {
    height: 65,
    width: "85%",
    marginTop: "11%",
    borderWidth: 1.5,
    borderRadius: 20,
    paddingHorizontal: 24,
    borderColor: "#767676",
  },
  button: {
    height: 55,
    width: "85%",
    marginTop: "11%",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000000",
  },
  buttonText: {
    fontSize: 22,
    color: "#ffffff",
    fontWeight: "800",
  },
});
