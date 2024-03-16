import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Platform, ActivityIndicator, Alert, Dimensions } from 'react-native';
import { Color, FontSize, FontFamily, Padding, Border } from "../styles/Global";
import BaseAppScreen from '../templates/BaseAppScreen';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/slices/usuariosSlice';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import PrimaryButton from '../components/atoms/Buttons/PrimaryButton';


// SCREEN DE BIENVENIDA PARA DERIVAR A INICIO DE SESION O REGISTRO DE USUARIO


const Task = () => {

    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const checkAndRequestPermission = async (permission: any) => {
        const result = await check(permission);

        switch (result) {
            case RESULTS.UNAVAILABLE:
                console.log(`${permission} no está disponible en este dispositivo`);
                break;
            case RESULTS.DENIED:
                console.log(`${permission} no ha sido solicitado aún`);
                const newResult = await request(permission);
                if (newResult === RESULTS.GRANTED) {
                    console.log(`${permission} ha sido concedido`);
                } else {
                    console.log(`${permission} ha sido denegado`);
                }
                break;
            case RESULTS.GRANTED:
                console.log(`${permission} ya ha sido concedido`);
                break;
            case RESULTS.BLOCKED:
                console.log(`${permission} ha sido bloqueado y no se puede solicitar nuevamente`);
                break;
        }
    };


    useEffect(() => {
        // Verificar y solicitar permiso de cámara
        checkAndRequestPermission(PERMISSIONS.IOS.CAMERA);

        // Verificar y solicitar permiso de ubicación
        checkAndRequestPermission(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        checkCurrentUser();


        // Otras acciones iniciales aquí, como checkCurrentUser()
        // ...
    }, []);

    const checkBiometricEnabled = async () => {
        try {
            const biometricEnabled = await AsyncStorage.getItem('biometricEnabled');
            return biometricEnabled === 'true';
        } catch (error) {
            console.error("Error al leer de AsyncStorage", error);
            return false;
        }
    };

    const checkCurrentUser = async () => {
        try {
            const user = await AsyncStorage.getItem('currentUser');

            if (user) {
                dispatch(loginUser(user));

                // Verifica si la autenticación biométrica está habilitada
                navigation.navigate('Login');
            }
        } catch (error) {
            console.error("Error al leer el valor de AsyncStorage:", error);
        } finally {
            setLoading(false); // Detiene el indicador de carga
        }
    };

    return (
        <BaseAppScreen>
            {loading ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="#4931a1" />
                </View>
            ) : <View style={[styles.container, { top: Platform.OS == 'android' ? 50 : 20, }]}>
                <View style={{ flexDirection: "row" }}>
                    <Image

                        style={styles.logoIcon}
                        source={require("../assets/images_black/icono.png")}
                    />
                    <Text style={{ color: "#D0D4E3", fontWeight: "500", paddingVertical: 2, paddingHorizontal: 10, fontSize: 12 }}>Candormap</Text>

                </View>
                <Image
                    style={[styles.image, { marginTop: 50, paddingHorizontal: 30, marginBottom: 110 }]}
                    resizeMode="contain"
                    source={require("../assets/images_black/monedas.png")}
                />

                <View style={[styles.container, { marginHorizontal: 20 }]}>

                    <Image
                        style={[{ paddingHorizontal: 160, width: 51, height: 51 }]}
                        resizeMode="contain"
                        source={require("../assets/images_black/persona.png")}
                    />

                    <View style={{ marginTop: 25, paddingHorizontal: 50 }}>
                        <Text style={[styles.subtitulo,]}>Hola!</Text>
                        <Text style={styles.subtitulo}>
                            ¿listo para unirte?
                        </Text>
                        <Text style={[styles.secondaryText, { marginTop: 15, marginHorizontal: 20 }]}>Únete a nuestra comunidad y gana dinero hoy mismo</Text>
                        <View style={{ marginTop: 15, paddingHorizontal: 30 }}>
                            <PrimaryButton title="Iniciar" onPress={() => navigation.navigate("WelcomeSelector")} />


                        </View>

                    </View>

                </View>




            </View>}
        </BaseAppScreen>

    );
};


const styles = StyleSheet.create({

    container: {
        flex: 1,
         alignItems: 'center',
    },
    image: {
        width: "40%",
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
        color: "#F6F6F6",
        lineHeight: 30,
        textAlign: "center",
        fontFamily: FontFamily.proximaNovaRegular,
        fontSize: 30,
    },
    secondaryText: {
        textAlign: "center",
        color: Color.designLightGray,
        fontSize: 12,
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
        backgroundColor: 'white',
        borderColor: "#4931a1",
        fontFamily: FontFamily.proximaNovaRegular,
        top: 50,
        padding: 25,
        borderRadius: 60
    },
    button1: {
        fontFamily: FontFamily.proximaNovaRegular,
        backgroundColor: "#4931a1",
        paddingHorizontal: 37,
        padding: 10,
        borderRadius: 10
    },
    logoIcon: {
        width: 20,
        height: 20,
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
