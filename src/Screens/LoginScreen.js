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


// Web: 373800336352-24ckj1qtr3u74urpb8sm9kb3rsmckq83.apps.googleusercontent.com
// iOS: 373800336352-qhjib0ej5vg0nv7tkfjsilgla9d00f4v.apps.googleusercontent.com
// Android: 373800336352-6mbstfrtj5u50k4s1c5dqo7h1c76s0t1.apps.googleusercontent.com

// WebBrowser.maybeCompleteAuthSession();

export default function Login () {
    const navigation = useNavigation();

    const goToMainPage = () => {
        navigation.navigate("Main");
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

                <TouchableOpacity style={styles.button} onPress={goToMainPage}>
                    <Text style={styles.buttonText}>Đăng nhập</Text>
                </TouchableOpacity>

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

                <View style={styles.dividerContainer}>
                    <View style={styles.dividerLine} />
                    <View style={styles.dividerLine} />
                </View>

                <View style={styles.signupTextCont}>
                    <Text style={styles.signupText}>Bạn chưa có tài khoản ?</Text>
                    <TouchableOpacity onPress={goToRegisterPage}>
                        <Text style={styles.signupButton}> Đăng ký</Text>
                    </TouchableOpacity>
                </View>
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
    detail: {
        marginTop: 24,
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    input: {
        width: '100%',
        height: 65,
        borderWidth: 1.5,
        borderColor: '#767676',
        marginBottom: 24,
        paddingHorizontal: 24,
        borderRadius: 20,
    },
    button: {
        marginTop: 8,
        width: "100%",
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
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 40, 
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#C7C7CD', 
    },
    dividerText: {
        marginHorizontal: 31, 
    },
    buttonGG: {
        flexDirection: 'row',
        width: "100%",
        height: 65,
        backgroundColor: '#FFFFFF', 
        borderColor: '#767676',
        borderWidth: 1.5,
        borderRadius: 20, 
        alignItems: 'center', 
        justifyContent: 'center',
    },
    buttonTextGG: {
        color: '#767676', 
        fontWeight: 'light', 
        fontSize: 18,
    },
    buttonFB: {
        marginTop: 24,
        flexDirection: 'row',
        width: "100%",
        height: 65,
        backgroundColor: '#FFFFFF', 
        borderColor: '#767676',
        borderWidth: 1.5,
        borderRadius: 20, 
        alignItems: 'center', 
        justifyContent: 'center',
    },
    buttonTextFB: {
        color: '#767676', 
        fontWeight: 'light', 
        fontSize: 18,
    },
    signupTextCont: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
        marginTop: -8,
    },
    signupText: {
        color: '#000',
        fontSize: 16,
    },
    signupButton: {
        color: '#000',
        fontSize: 16,
        fontWeight: '500',
    },
});

