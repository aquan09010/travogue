import React, { useState, useEffect, useRef } from 'react';
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
    // Move to other pages.
    const navigation = useNavigation();

    const goToConfirmPhonePage = () => {
        navigation.navigate("ConfirmPhone");
    };

    const goToRegisterPage = () => {
        navigation.navigate("Register");
    };

    const goToCreatePasswordPage = () => {
        navigation.navigate("CreatePassword");
    };

    // 6-numbers input.
    const inputs = Array(6).fill().map(() => React.createRef());

    const handleInput = (index, value) => {
        if (value && index < 5) {
            inputs[index + 1].current.focus();
        }
    };

    const handleKeyPress = (index, event) => {
        if (event.nativeEvent.key === 'Backspace' && index > 0 && !inputs[index].current.value) {
            inputs[index - 1].current.focus();
        }
    };

    // Resend code.
    const [seconds, setSeconds] = useState(0);
    const intervalRef = useRef();

    useEffect(() => {
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    const resendCode = () => {
        setSeconds(60);
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        intervalRef.current = setInterval(() => {
            setSeconds((s) => {
                if (s === 1) {
                    clearInterval(intervalRef.current);
                    return 0;
                }
                return s - 1;
            });
        }, 1000);
        // Code to resend the code goes here
    };


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
                style={{fontSize: 22, 
                        marginTop: '5%',
                        fontWeight: '800',
                        marginLeft: '-33%',}
                }
            >
                Nhập mã xác nhận
            </Text>

            <Text 
                style={{width: '85%',
                        fontSize: 17, 
                        marginTop: '5%', 
                        color: '#747474',
                        marginLeft: '1%', 
                        fontWeight: '300'}
                }
            >
                Vui lòng nhập mã gồm 6 chữ số đã được gửi đến +84 1234567890
            </Text>

            <View style={{flexDirection: 'row', justifyContent: 'space-between', width: 307, marginTop: 16}}>
                {inputs.map((input, i) => (
                    <TextInput
                        key={i}
                        ref={input}
                        maxLength={1}
                        style={styles.input}
                        keyboardType="numeric"
                        onChangeText={(value) => handleInput(i, value)}
                        onKeyPress={(event) => handleKeyPress(i, event)}
                    />
                ))}
            </View>

            <TouchableOpacity style={styles.button} onPress={goToCreatePasswordPage}>
                <Text style={styles.buttonText}>Tiếp tục</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button2} onPress={resendCode}>
                <Text style={styles.buttonText2}>Gửi lại mã {seconds > 0 && `(${seconds})`}</Text>
            </TouchableOpacity>
        </View>
    );
    
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: '10%',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    header: {
        width: "95%",
        alignItems: "center",
        paddingVertical: "2%",
        justifyContent: "center",
        backgroundColor: "#151515",
    },
    travogue: {
        fontWeight: '500',
        fontSize: 30,
        color: "#ffffff",
        textAlign: "center",
    },
    title: {
        width: "100%",
        marginTop: '8%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    arrow: {
        left: '7%',
        position: 'absolute',
    },
    titleText: {
        center: true,
        fontSize: 22,
        fontWeight: '700',
    },
    input: {
        width: '13%',
        fontSize: 24,
        textAlign: 'center',
        borderBottomWidth: 1,
    },
    button: {
        height: 55,
        width: "85%",
        marginTop: '11%',
        borderRadius: 15, 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#000000', 
    },
    buttonText: {
        fontSize: 22,
        color: 'white', 
        fontWeight: '800', 
    },
    button2: {
        height: 55,
        width: "85%",
        marginTop: '8%',
        borderWidth: 1.5,
        borderRadius: 15, 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#FFFFFF', 
    },
    buttonText2: {
        fontSize: 22,
        color: '#000000', 
        fontWeight: '800', 
    },
});
