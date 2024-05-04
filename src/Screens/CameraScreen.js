import { Camera, CameraType } from "expo-camera";
import React, { useLayoutEffect, useState, useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import * as MediaLibrary from "expo-media-library";
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
  Keyboard,
  TouchableWithoutFeedback,
  FlatList,
  Button,
  CheckBox,
} from "react-native";
import { SvgXml } from "react-native-svg";

import {
  CancelIcon,
  CancelLightIcon,
  FlashIcon,
  RetakeIcon,
  RotateIcon,
  SaveIcon,
  SnapIcon,
  XFlashIcon,
} from "@/Assets/Icons/DetailIcon";
export default function CameraScreen({ route }) {
  const {handleTakeImage} = route.params
  const navigation = useNavigation();
  const goToPreviousTab = () => {
    navigation.goBack();
  };
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = useRef(null);
  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");
    })();
  }, []);
  const takePicture = async () => {
    if (cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync();
        console.log(data);
        setImage(data.uri);
      } catch (e) {
        console.log(e);
      }
    }
  };
  const savePicture = async () => {
    if (image) {
      try {
        await MediaLibrary.createAssetAsync(image);
        alert("Snap Successfully");
        handleTakeImage(image);
        navigation.goBack();
        setImage(null);
      } catch (e) {
        console.log(e);
      }
    }
  };
  return (
    <View style={styles.container}>
      {!image ? (
        <Camera
          style={styles.camera}
          type={type}
          flashMode={flash}
          ref={cameraRef}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: 30,
              marginVertical: 60,
            }}
          >
            <TouchableOpacity
              style={{ justifyContent: "center" }}
              onPress={goToPreviousTab}
            >
              <SvgXml xml={CancelLightIcon} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ justifyContent: "center" }}
              onPress={() => {
                setType(
                  type === CameraType.back ? CameraType.front : CameraType.back
                );
              }}
            >
              <SvgXml xml={RotateIcon} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ justifyContent: "center" }}
              onPress={() => {
                setFlash(
                  flash === Camera.Constants.FlashMode.off
                    ? Camera.Constants.FlashMode.on
                    : Camera.Constants.FlashMode.off
                );
              }}
            >
              {flash === Camera.Constants.FlashMode.off ? (
                <SvgXml xml={XFlashIcon} />
              ) : (
                <SvgXml xml={FlashIcon} />
              )}
            </TouchableOpacity>
          </View>
        </Camera>
      ) : (
        <Image source={{ uri: image }} style={styles.camera} />
      )}
      {!image ? (
        <View
          style={{
            height: 80,
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 40,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={takePicture}
          >
            <SvgXml xml={SnapIcon} />
          </TouchableOpacity>
        </View>
      ) : (
        <View
          style={{
            height: 80,
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 40,
            marginHorizontal: 30,
          }}
        >
          <TouchableOpacity
            style={{ justifyContent: "center" }}
            onPress={() => {
              setImage(null);
            }}
          >
            <SvgXml xml={RetakeIcon} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ justifyContent: "center" }}
            onPress={savePicture}
          >
            <SvgXml xml={SaveIcon} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "column",
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "black",
  },
  camera: {
    flex: 1,
  },
});
