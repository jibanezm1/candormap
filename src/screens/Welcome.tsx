import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Platform, ActivityIndicator, Alert } from 'react-native';
import { Color, FontSize, FontFamily, Padding, Border } from "../styles/Global";
import BaseAppScreen from '../templates/BaseAppScreen';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/slices/usuariosSlice';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

const Task = () => {

    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        check(PERMISSIONS.IOS.CAMERA)
            .then((result) => {
                switch (result) {
                    case RESULTS.UNAVAILABLE:
                        console.log('Esta característica no está disponible (en este dispositivo / en este contexto)');
                        break;
                    case RESULTS.DENIED:
                        console.log('El permiso no se ha solicitado / se ha denegado pero se puede solicitar');
                        // Solicitar el permiso
                        request(PERMISSIONS.IOS.CAMERA).then((newResult) => {
                            if (newResult === RESULTS.GRANTED) {
                                console.log('El permiso ha sido concedido');
                            } else {
                                console.log('El permiso ha sido denegado');
                            }
                        });
                        break;
                    case RESULTS.GRANTED:
                        console.log('El permiso ha sido concedido');
                        break;
                    case RESULTS.BLOCKED:
                        console.log('El permiso ha sido denegado y no se puede solicitar nuevamente');
                        break;
                }
            })
            .catch((error) => {
                // Manejar el error
            });
        // Función para verificar el valor en AsyncStorage
        checkCurrentUser();
    }, []); // Array vacío significa que este useEffect se ejecuta solo una vez cuando el componente se monta.

    const checkCurrentUser = async () => {
        try {
            const user = await AsyncStorage.getItem('currentUser');
            console.log(user);
            if (user) {
                dispatch(loginUser(user));

                navigation.navigate('BottomTabNavigator', { screen: 'HomeTask' });
            }
        } catch (error) {
            console.error("Error al leer el valor de AsyncStorage:", error);
        } finally {
            setLoading(false);  // ¡Importante! Esto detiene el loading al final de la función, sin importar si fue exitoso o hubo un error.
        }
    };

    return (
        <BaseAppScreen>
            {loading ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="#4931a1" />
                </View>
            ) : <View style={styles.container}>
                <Image
                    style={styles.image}
                    resizeMode="cover"
                    source={require("../assets/pair.png")}
                />
                <Text style={styles.titulo}>¡Bienvenido a Candormap!</Text>
                <Text style={styles.subtitulo}>
                    Únete a nuestra comunidad mundial y empieza a ganar dinero hoy mismo.
                </Text>
                <Text style={styles.secondaryText}>Iniciar sesión con</Text>
                <View style={{ height: 100, width: "100%", top: 40 }}>
                    <TouchableOpacity onPress={() => Alert.alert("Proximamente")} style={[styles.official, styles.officialBorder]}>
                        <Image
                            style={styles.logoIcon}
                            resizeMode="cover"
                            source={require("../assets/logo1.png")}
                        />
                        <Text style={[styles.continueWithFacebook, styles.withTypo]}>
                            Continue with Facebook
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => Alert.alert("Proximamente")} style={[styles.official2, styles.officialBorder]}>
                        <Image
                            style={styles.logoIcon}
                            resizeMode="cover"
                            source={require("../assets/logo.png")}
                        />
                        <Text style={[styles.signInWith, styles.withTypo]}>
                            Sign in with Apple
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={{ width: "82%", top: 45 }}>
                    <View style={[styles.official3, styles.containerButtons]}>
                        <TouchableOpacity style={styles.button}
                            onPress={() => navigation.navigate("Login")}
                        >
                            <Text style={{ color: "black" }}>Tengo Cuenta</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button1}
                            onPress={() => navigation.navigate("Register")}
                        >
                            <Text style={{ color: "white" }}>Soy Nuevo</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>}
        </BaseAppScreen>

    );
};
const styles = StyleSheet.create({

    container: {
        backgroundColor: "white",
        flex: 1,
        top: Platform.OS == 'android' ? 100 : 20,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    image: {
        width: "50%",
        top: 30,
        marginBottom: 50
    },
    titulo: {
        fontWeight: "800",
        fontSize: 22,
        color: Color.designTitle,
        fontFamily: FontFamily.fontsBTNText,
    },
    subtitulo: {
        top: 10,
        color: Color.designDefault,
        lineHeight: 30,
        width: "80%",
        textAlign: "center",
        fontFamily: FontFamily.proximaNovaRegular,
        fontSize: FontSize.size_base,
    },
    secondaryText: {
        top: 25,
        color: Color.designLightGray,
        textTransform: "uppercase",
        fontSize: FontSize.size_sm,
        fontFamily: FontFamily.proximaNovaRegular,
    },
    withTypo: {
        color: Color.black,
        letterSpacing: 0,
        fontSize: FontSize.size_base,
        textAlign: "left",
    },
    officialButtonsSignInWit: {
        top: 25,
        width: "80%",
    },
    button: {
        borderWidth: 1,
        borderColor: "#4931a1",
        fontFamily: FontFamily.proximaNovaRegular,
        paddingHorizontal: 26,
        padding: 10,
        borderRadius: 10
    },
    button1: {
        fontFamily: FontFamily.proximaNovaRegular,
        backgroundColor: "#4931a1",
        paddingHorizontal: 37,
        padding: 10,
        borderRadius: 10
    },
    logoIcon: {
        width: 40,
        height: 40,
        borderRadius: Border.br_12xs,
        overflow: "hidden",
    },
    officialBorder: {
        paddingRight: Padding.p_xs,
        borderColor: "#000",
        borderRadius: Border.br_9xs,
        left: 63,
        borderWidth: 1,
        borderStyle: "solid",
        backgroundColor: Color.white,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        overflow: "hidden",
    },
    containerButtons: {
        justifyContent: "space-around",
        flexDirection: "row",
    },
    official: {
        top: "50%",
        width: "70%"
    },
    official2: {

        width: "70%"
    },
    official3: {

        width: "100%",
    },
    continueWithFacebook: {
        fontFamily: FontFamily.sFProTextSemibold,
        fontWeight: "600",
        color: Color.black,
        letterSpacing: 0,
    },
    signInWith: {
        fontFamily: FontFamily.sFProTextMedium,
        fontWeight: "500",
    },
});

export default Task;
