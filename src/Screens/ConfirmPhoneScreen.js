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

export default function ConfirmPhoneScreen ()  {
    const [selectedOption, setSelectedOption] = useState('Điện thoại');

    const navigation = useNavigation();

    const goToConfirmPhonePage = () => {
        navigation.navigate("ConfirmPhone");
    };

    const inputs = Array(6).fill().map(() => React.createRef());

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.travogue}>TRAVOGUE</Text>
            </View>

            <View style={styles.title}>
                <SvgXml xml={LeftArrow} style={styles.arrow} />
                <Text style={styles.titleText}>Đăng ký</Text>
            </View>

            <Text 
                style={{marginLeft: -120, 
                        marginTop: 16,
                        fontSize: 22, 
                        fontWeight: '800'}
                }
            >
                Nhập mã xác nhận
            </Text>

            <Text 
                style={{marginLeft: 5, 
                        marginTop: 16, 
                        width: 307,
                        fontSize: 17, 
                        fontWeight: '300',
                        color: '#747474'}
                }
            >
                Vui lòng nhập mã gồm 6 chữ số đã được gửi đến +84 1234567890
            </Text>

            <View style={{flexDirection: 'row', justifyContent: 'space-between', width: 307, marginTop: 16}}>
                {inputs.map((input, i) => (
                    <TextInput
                        key={i}
                        ref={input}
                        style={styles.input}
                        maxLength={1}
                        keyboardType="number-pad"
                        onSubmitEditing={() => inputs[i + 1] && inputs[i + 1].current.focus()}
                    />
                ))}
            </View>

            <TouchableOpacity style={styles.button} onPress={goToConfirmPhonePage}>
                <Text style={styles.buttonText}>Tiếp tục</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button2} onPress={goToConfirmPhonePage}>
                <Text style={styles.buttonText2}>Gửi lại mã</Text>
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
        marginTop: 40,
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
    button2: {
        height: 55,
        width: "85%",
        marginTop: 32,
        borderWidth: 1.5,
        borderRadius: 15, 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#FFFFFF', 
    },
    buttonText2: {
        fontSize: 22,
        color: '#000000', 
        fontWeight: 'bold', 
    },
    input: {
        width: 40,
        borderBottomWidth: 1,
        textAlign: 'center',
        fontSize: 24,
    },
});
