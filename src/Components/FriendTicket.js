import { Image } from 'expo-image'
import React, { useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'

const FriendTicket = ({
    avatar,
    nickName
}) => {
    return (
        <View style={styles.friendTicketContainer}>
            {/* Hình ảnh */}
            <Image style={styles.picture} contentFit='cover' source={avatar}/>

            {/* Nick Name */}
            <Text style={styles.nickName}>{nickName}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    friendTicketContainer: {
        gap: 8,
        display: 'flex',
        marginRight: 16,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    picture: {
        width: 40,
        height: 40,
    },
    nickName: {
        width: 90,
        fontSize: 10,
        color: "#000",
        fontFamily: 'BeVN',
    }
})

export default FriendTicket