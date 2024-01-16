import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

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
} from 'react-native';

import { SvgXml } from 'react-native-svg';
import { GoogleIcon } from '@/Assets/Icons/Google';
import { FacebookIcon } from '@/Assets/Icons/Facebook';
import { LeftArrow } from '@/Assets/Icons/LeftArrow';
import { registerHook } from '@/Hooks/authHooks';
import { useStateContext } from '@/Context/StateContext';

export default function CreatePasswordScreen({ route }) {
  const navigation = useNavigation();

  const goToRegisterPage = () => {
    navigation.navigate('Register');
  };

  const [password, setPassword] = useState('');

  const { register, reg, isRegisterLoading, registerError } = registerHook();

  const handleRegister = async (e) => {
    e.preventDefault();
    await register(route.params.token, route.params.email, password);
  };

  const { setRefreshToken, setAccessToken, setUser } = useStateContext();

  useEffect(() => {
    if (reg) {
      console.log(reg);
      // console.log(registerResponse.data.tokens);

      setAccessToken(reg.data.tokens.access.token);
      setRefreshToken(reg.data.tokens.refresh.token);
      setUser(reg.data.user);

      navigation.navigate('Onboarding');
    }
  }, [reg]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.travogue}>TRAVOGUE</Text>
      </View>

      <View style={styles.title}>
        <SvgXml
          xml={LeftArrow}
          style={styles.arrow}
          onPress={goToRegisterPage}
        />
        <Text style={styles.titleText}>Đăng ký</Text>
      </View>

      <Text
        style={{
          marginLeft: -140,
          marginTop: 16,
          fontSize: 22,
          fontWeight: '800',
        }}
      >
        Tạo mật khẩu
      </Text>

      <View style={{}}>
        {isRegisterLoading ? (
          <>
            <ActivityIndicator size="large" color="#ED2939" style={{}} />
          </>
        ) : registerError ? (
          <Text
            style={{
              color: '#A80027',
              textAlign: 'center',
              fontSize: 16,
            }}
          >
            {registerError.message}
          </Text>
        ) : (
          <>{console.log(reg)}</>
        )}
      </View>

      <TextInput
        style={[styles.input, { fontWeight: '200' }]}
        placeholder="Nhập mật khẩu"
        placeholderTextColor="#767676"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <View style={styles.dividerLine} />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Tiếp tục</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  travogue: {
    fontSize: 30,
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Vogue',
  },
  header: {
    width: '95%',
    backgroundColor: '#151515',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 19,
    paddingVertical: 13,
  },
  container: {
    flex: 1,
    marginTop: 8,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    flexDirection: 'row',
    marginTop: 32,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrow: {
    position: 'absolute',
    left: 24,
  },
  titleText: {
    center: true,
    fontSize: 22,
    fontWeight: 'bold',
  },
  button: {
    height: 55,
    width: '85%',
    marginTop: 24,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
  },
  buttonText: {
    fontSize: 22,
    color: 'white',
    fontWeight: 'bold',
  },
  input: {
    width: '84%',
    height: 60,
    borderWidth: 1.5,
    borderColor: '#767676',
    marginTop: 24,
    paddingHorizontal: 24,
    borderRadius: 20,
  },
  dividerLine: {
    height: 1,
    width: 115,
    marginTop: 24,
    backgroundColor: '#747474',
  },
});
