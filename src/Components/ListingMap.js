import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Pressable,
  FlatList,
  Animated,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import React from "react";
import { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapView from "react-native-map-clustering";
const ListingMap = () => {
  const placeData = [
    {
      name: "Place A",
      latitude: 40.7128,
      longitude: -74.006,
      price: 2,
    },
    {
      name: "Place B",
      latitude: 37.7749,
      longitude: -122.4194,
      price: 3,
    },
    {
      name: "Place C",
      latitude: 51.5074,
      longitude: -0.1278,
      price: 1,
    },
    {
      name: "Place D",
      latitude: 35.6895,
      longitude: 139.6917,
      price: 3,
    },
    {
      name: "Place E",
      latitude: -33.8651,
      longitude: 151.2099,
      price: 2,
    },
    {
      name: "Place F",
      latitude: 52.52,
      longitude: 13.405,
      price: 3,
    },
    {
      name: "Place G",
      latitude: 48.8566,
      longitude: 2.3522,
      price: 3,
    },
    {
      name: "Place H",
      latitude: 37.9838,
      longitude: 23.7275,
      price: 1,
    },
    {
      name: "Place I",
      latitude: -22.9068,
      longitude: -43.1729,
      price: 2,
    },
    {
      name: "Place J",
      latitude: -33.4489,
      longitude: -70.6693,
      price: 1,
    },
  ];
  const INITIAL_REGION = {
    latitude: 10.88,
    longitude: 106.8,
    latitudeDelta: 9,
    longitudeDelta: 9,
  };
  return (
    <SafeAreaView>
      <MapView
        style={{ width: "100%", height: "97%" }}
        provider={MapView.PROVIDER_GOOGLE}
        clusterColor="#fff"
        clusterTextColor="#000"
        clusterFontFamily="mon-sb"
        showsUserLocation
        showsMyLocationButton
        initialRegion={INITIAL_REGION}
      >
        {placeData.map((item) => (
          <Marker
            key={item.name}
            coordinate={{
              latitude: +item.latitude,
              longitude: +item.longitude,
            }}
          >
            <View style={styles.marker}>
              <Image
                style={{ width: 30, height: 30, marginRight: 5 }}
                resizeMode="cover"
                source={require("../Assets/card1.jpg")}
              />
              <Text style={styles.markerText}>€ {item.price}</Text>
            </View>
          </Marker>
        ))}
      </MapView>
    </SafeAreaView>
  );
};

export default ListingMap;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  marker: {
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    elevation: 5,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 10,
    },
    flexDirection: "row",
  },
  markerText: {
    fontSize: 14,
    fontFamily: "mon-sb",
  },
  locateBtn: {
    position: "absolute",
    top: 70,
    right: 20,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 10,
    },
  },
});
