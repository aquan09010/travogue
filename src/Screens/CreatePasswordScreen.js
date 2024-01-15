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

export default function CreatePasswordScreen ()  {
    const [selectedOption, setSelectedOption] = useState('Điện thoại');

    const navigation = useNavigation();

    const goToConfirmPhonePage = () => {
        navigation.navigate("ConfirmPhone");
    };

    const goToRegisterPage = () => {
        navigation.navigate("Register");
    };

    const inputs = Array(6).fill().map(() => React.createRef());

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.travogue}>TRAVOGUE</Text>
            </View>

            <View style={styles.title}>
                <SvgXml xml={LeftArrow} style={styles.arrow} onPress={goToRegisterPage}/>
                <Text style={styles.titleText}>Đăng ký</Text>
            </View>

            <Text 
                style={{marginLeft: -140, 
                        marginTop: 16,
                        fontSize: 22, 
                        fontWeight: '800'}
                }
            >
                Tạo mật khẩu
            </Text>

            <TextInput
                    style={[styles.input, {fontWeight: '200'}]}
                    placeholder="Nhập mật khẩu"
                    placeholderTextColor="#767676"
                    secureTextEntry
            />

            <View style={styles.dividerLine} />
            
            <TouchableOpacity style={styles.button} onPress={goToConfirmPhonePage}>
                <Text style={styles.buttonText}>Tiếp tục</Text>
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
    button: {
        height: 55,
        width: "85%",
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
