import React, { useState } from 'react';
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
} from 'react-native';

import { SvgXml } from "react-native-svg";
import { GoogleIcon } from '@/Assets/Icons/Google';
import { FacebookIcon } from '@/Assets/Icons/Facebook';

export default function Register ()  {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.travogue}>TRAVOGUE</Text>
            </View>
            <View style={styles.tittle}>
                
                <Text style={styles.tittleText}>Đăng ký</Text>
            </View>

        </View>
    );
    
};

const styles = StyleSheet.create({
    travogue: {
        fontSize: 30,
        textAlign: "center",
        color: "white",
    },
    header: {
        width: "95%",
        backgroundColor: "#151515",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 19,
        paddingVertical: 13,
    },
    container: {
        flex: 1,
        marginTop: 44,
        alignItems: 'center',
        backgroundColor: '#fff',
    },

});
