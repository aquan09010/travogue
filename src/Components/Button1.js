import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const Button1 = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate('AddDestination')}>
      <View style={styles.buttonContainer}>
        <Text style={styles.locationPlus}>location-plus</Text>

        <Text style={styles.buttonText}>Thêm điểm dừng chân</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    gap: 16,
    width: 301,
    height: 53,
    display: 'flex',
    borderRadius: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#d9d9d9'
  },
  locationPlus: {
    fontSize: 25,
    color: '#000',
    fontFamily: 'FontAwesome6ProLight'
  },
  buttonText: {
    fontSize: 20,
    color: '#000',
    fontWeight: '500',
    fontFamily: 'BeVietnamProMedium'
  }
})

export default Button1
