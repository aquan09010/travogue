import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
// import * as WebBrowser from 'expo-web-browser';
// import * as Google from 'expo-auth-session/providers/google';

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

import { KeyboardAvoidingView, Platform } from 'react-native';

// Web: 373800336352-24ckj1qtr3u74urpb8sm9kb3rsmckq83.apps.googleusercontent.com
// iOS: 373800336352-qhjib0ej5vg0nv7tkfjsilgla9d00f4v.apps.googleusercontent.com
// Android: 373800336352-6mbstfrtj5u50k4s1c5dqo7h1c76s0t1.apps.googleusercontent.com

// WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen () {
    const navigation = useNavigation();

    const goToOnboardingPage = () => {
        navigation.navigate("Onboarding");
    };

    const goToRegisterPage = () => {
        navigation.navigate("Register");
    }

    // const [accessToken, setAccessToken] = React.useState(null);
    // const [user, setUser] = React.useState(null);
    // const [request, response, promtAsync] = Google.useIdTokenAuthRequest({
    //     clientId: "373800336352-24ckj1qtr3u74urpb8sm9kb3rsmckq83.apps.googleusercontent.com",
    //     iosClientId: "373800336352-qhjib0ej5vg0nv7tkfjsilgla9d00f4v.apps.googleusercontent.com",
    //     androidClientId: "373800336352-6mbstfrtj5u50k4s1c5dqo7h1c76s0t1.apps.googleusercontent.com"
    // });

    // React.useEffect(() => {
    //     if(response?.type === 'success') {
    //         setAccessToken(response.authentication.accessToken);
    //         accessToken && fetchUserInfo();
    //     }
    // }, [response, accessToken]);

    // async function fetchUserInfo() {
    //     let response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
    //         headers: { Authorization: `Bearer ${accessToken}` },
    //     });
    //     const useInfo = await response.json();
    //     setUser(useInfo);
    // }

    // const ShowUserInfo = () => {
    //     if(user) {
    //         return (
    //             <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
    //                 <Text style={{fontSize:35, fontWeight: 'bold', marginBottom: 20}}>Welcome</Text>
    //                 <Image source={{uri:user.picture}} style={{width: 100, height: 100, borderRadius: 50}}/>
    //                 <Text style={{fontSize: 20, fontWeight: 'bold', }}>{user.name}</Text>
    //             </View>
    //         )
    //     }
    // }

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.travogue}>TRAVOGUE</Text>
            </View>
            
            <View style={styles.detail}>
                <TextInput
                    style={[styles.input, {fontWeight: '200'}]}
                    placeholder="Tài khoản"
                    placeholderTextColor="#767676"
                    value={username}
                    onChangeText={setUsername}
                />

                <TextInput
                    style={[styles.input, {fontWeight: '200'}]}
                    placeholder="Mật khẩu"
                    placeholderTextColor="#767676"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />

                <TouchableOpacity style={styles.button} onPress={goToOnboardingPage}>
                    <Text style={styles.buttonText}>Đăng nhập</Text>
                </TouchableOpacity>
            </View>
            
            <View style={styles.dividerContainer}>
                <View style={styles.dividerLine} />

                <Text style={styles.dividerText}>OR</Text>

                <View style={styles.dividerLine} />
            </View>

            {/* {user && <ShowUserInfo/>}       

            {user === null && 
                <>
                <TouchableOpacity
                    disabled={!request}
                    onPress={() => {
                        promptAsync();
                    }}
                    style={styles.buttonGoogle}
                >
                    <SvgXml xml={GoogleIcon} />
                    <Text style={styles.buttonText}>Đăng nhập bằng Google</Text>
                </TouchableOpacity>
                </>
            }          */}

            <TouchableOpacity style={styles.buttonGG}>
                <SvgXml xml={GoogleIcon} style={{marginRight: 16}} />

                <Text style={styles.buttonTextGG}>Đăng nhập bằng Google</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonFB}>
                <SvgXml xml={FacebookIcon} style={{marginRight: 16}} />

                <Text style={styles.buttonTextFB}>Đăng nhập bằng Facebook</Text>
            </TouchableOpacity>

            <View style={styles.dividerContainer1}>
                <View style={styles.dividerLine1} />
            </View>

            <View style={styles.signupTextCont}>
                <Text style={styles.signupText}>Bạn chưa có tài khoản ?</Text>
                
                <TouchableOpacity onPress={goToRegisterPage}>
                    <Text style={styles.signupButton}> Đăng ký</Text>
                </TouchableOpacity>
            </View>
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
    detail: {
        width: "100%",
        alignItems: 'center',
        paddingVertical: '4%',
        paddingHorizontal: '6%',
        justifyContent: 'center',
    },
    input: {
        height: 65,
        width: '100%',
        borderWidth: 1.5,
        borderRadius: 20,
        marginBottom: 24,
        borderColor: '#767676',
        paddingHorizontal: '9%',
    },
    button: {
        height: 55,
        width: "100%",
        borderRadius: 15, 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#000000', 
    },
    buttonText: {
        fontSize: 22,
        color: '#ffffff', 
        fontWeight: '800', 
    },
    dividerContainer: {
        marginTop: '1%',
        marginBottom:'4%',
        alignItems: 'center',
        flexDirection: 'row',
    },
    dividerLine: {
        height: 1,
        width: '32%',
        backgroundColor: '#C7C7CD', 
    },
    dividerText: {
        marginHorizontal: '9%', 
    },
    buttonGG: {
        height: 65,
        width: "87%",
        borderWidth: 1.5,
        borderRadius: 20, 
        alignItems: 'center', 
        flexDirection: 'row',
        borderColor: '#767676',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF', 
    },
    buttonTextGG: {
        fontSize: 18,
        color: '#767676', 
        fontWeight: '400', 
    },
    buttonFB: {
        height: 65,
        width: "87%",
        marginTop: '7%',
        borderWidth: 1.5,
        borderRadius: 20, 
        alignItems: 'center', 
        flexDirection: 'row',
        borderColor: '#767676',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF', 
    },
    buttonTextFB: {
        fontSize: 18,
        color: '#767676', 
        fontWeight: '400', 
    },
    dividerContainer1: {
        marginTop: '9%',
        marginBottom: '9%',
        alignItems: 'center',
        flexDirection: 'row',
    },
    dividerLine1: {
        height: 1,
        width: '85%',
        backgroundColor: '#C7C7CD', 
    },
    signupTextCont: {
        marginTop: '-2%',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    signupText: {
        fontSize: 16,
        color: '#000',
    },
    signupButton: {
        fontSize: 16,
        color: '#000000',
        fontWeight: '500',
    },
});

