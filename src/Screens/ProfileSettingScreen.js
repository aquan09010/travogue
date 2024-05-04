import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Pressable } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { ArrowLeftBlack } from '@/Assets/Icons/Navigation';
import { useNavigation } from '@react-navigation/native';

const ProfileSettingScreen = () => {
    const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.statusBar}>
          <Pressable onPress={() => navigation.goBack()}>
            <SvgXml xml={ArrowLeftBlack} />
          </Pressable>
            <Text style={styles.title}>Cài đặt</Text>
          <Pressable onPress={() => {}}>
            {/* <SvgXml xml={SearchIconBlack} /> */}
          </Pressable>
        </View>
      <TouchableOpacity style={styles.settingItem} onPress={() => {}}>
        <Text style={styles.settingText}>Quản lý hoạt động bạn tổ chức</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingItem} onPress={() => {}}>
        <Text style={styles.settingText}>Quyền riêng tư</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingItem} onPress={() => {}}>
        <Text style={[styles.settingText, styles.logoutText]}>Đăng xuất</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  settingItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  settingText: {
    fontSize: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: "600",
  },
  statusBar: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
  logoutText: {
    color: '#ED2939', // Red color for logout text
  },

});

export default ProfileSettingScreen;
