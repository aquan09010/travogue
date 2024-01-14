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
import { LeftArrow } from '@/Assets/Icons/LeftArrow';

export default function RegisterScreen ()  {
    const [selectedOption, setSelectedOption] = useState('Điện thoại');

    const navigation = useNavigation();

    const goToConfirmPhonePage = () => {
        navigation.navigate("ConfirmPhone");
    };

    const goToLoginPage = () => {
        navigation.navigate("Login");
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.travogue}>TRAVOGUE</Text>
            </View>

            <View style={styles.title}>
                <SvgXml xml={LeftArrow} style={styles.arrow} onPress={goToLoginPage}/>
                <Text style={styles.titleText}>Đăng ký</Text>
            </View>

            <View style={styles.formTitle}>
                <View style={styles.dividerContainer}>
                    <TouchableOpacity onPress={() => setSelectedOption('Điện thoại')} style={{ alignItems: 'center' }}>
                        <Text style={selectedOption === 'Điện thoại' ? styles.selectedText : styles.unselectedText}>Điện thoại</Text>
                        {
                            selectedOption === 'Điện thoại' && 
                            <View style={styles.selectedUnderline} /> 
                        }
                        {
                            selectedOption === 'Email' && 
                            <View style={styles.unselectedUnderline}/>
                        }
                    </TouchableOpacity>
                </View >
                <View style={styles.dividerContainer}>
                    <TouchableOpacity onPress={() => setSelectedOption('Email')} style={{ alignItems: 'center' }}>
                        <Text style={selectedOption === 'Email' ? styles.selectedText : styles.unselectedText}>Email</Text>
                        {
                            selectedOption === 'Email' && 
                            <View style={styles.selectedUnderline} />
                        }
                        {
                            selectedOption === 'Điện thoại' && 
                            <View style={styles.unselectedUnderline} />
                        }
                    </TouchableOpacity>
                </View>
            </View>

            {
                selectedOption === 'Điện thoại' && 
                <TextInput
                    style={[styles.input, {fontWeight: '200'}, {fontSize: 18}]}
                    placeholder="Số điện thoại"
                    placeholderTextColor="#767676"
                    keyboardType="phone-pad"
                />
            }
            {
                selectedOption === 'Email' && 
                <TextInput
                    style={[styles.input, {fontWeight: '200'}, {fontSize: 18}]}
                    placeholder="Email"
                    placeholderTextColor="#767676"
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
            }

            <TouchableOpacity style={styles.button} onPress={goToConfirmPhonePage}>
                <Text style={styles.buttonText}>Gửi mã xác nhận</Text>
            </TouchableOpacity>
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
        marginTop: 8,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        flexDirection: 'row',
        marginTop: 32,
        width: "100%",
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
    formTitle: {
        width: "100%",
        marginTop: 32,
        flexDirection: 'row',
        paddingHorizontal: 24,
        justifyContent: 'space-around',
    },
    dividerContainer: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    selectedUnderline: {
        height: 2, 
        width: 130,
        marginTop: 8,
        backgroundColor: '#000000', 
    },
    unselectedUnderline: {
        height: 1, 
        width: 130,
        marginTop: 8,
        backgroundColor: '#747474', 
    },
    selectedText: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    unselectedText: {
        fontSize: 18,
        color: '#747474',
        fontWeight: 'normal',
    },
    input: {
        height: 65,
        width: "85%",
        marginTop: 40,
        borderWidth: 1.5,
        borderRadius: 20,
        paddingHorizontal: 24,
        borderColor: '#767676',
    },
    button: {
        marginTop: 40,
        width: "85%",
        height: 55,
        backgroundColor: '#000000', 
        borderRadius: 15, 
        alignItems: 'center', 
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white', 
        fontWeight: 'bold', 
        fontSize: 22,
    },
});
