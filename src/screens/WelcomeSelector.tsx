import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Platform, ActivityIndicator, Alert, ScrollView, Dimensions } from 'react-native';
import { Color, FontSize, FontFamily, Padding, Border } from "../styles/Global";
import BaseAppScreen from '../templates/BaseAppScreen';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/slices/usuariosSlice';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';


// SCREEN DE BIENVENIDA PARA DERIVAR A INICIO DE SESION O REGISTRO DE USUARIO


const WelcomeSelector = () => {

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
    const showAlert = () => {
        Alert.alert("Próximamente", "Esta funcionalidad estará disponible pronto.");
    };
    return (
        <SafeAreaView style={{ height: Dimensions.get("screen").height, backgroundColor: "#18191C" }}>
            {loading ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="#4931a1" />
                </View>
            ) : (
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={styles.container}>
                        <View style={[styles.container, { marginHorizontal: 20 }]}>
                            <Image
                                style={[{ paddingVertical: 5, width: 40, height: 40, marginBottom: 10 }]}
                                source={require("../assets/images_black/persona.png")}
                            />
                            <View style={{ top: 5, paddingHorizontal: 20 }}>
                                <Text style={[styles.subtitulo]}>Hola!</Text>
                                <Text style={styles.subtitulo}>
                                    ¿Listo para unirte?
                                </Text>
                                <Text style={[styles.secondaryText, { top: 20 }]}>Únete a nuestra comunidad y gana dinero hoy mismo</Text>
                                <View style={{ marginTop: 25 }}>
                                    <ButtonIcon iconName="google" buttonText="Continuar con Google" onPress={showAlert} />
                                    <ButtonIcon iconName="apple" buttonText="Continuar con Apple" onPress={showAlert} />
                                    <ButtonIcon iconName="facebook" buttonText="Continuar con Facebook" onPress={showAlert} />
                                    <Text style={styles.separatorText}>o</Text>
                                    <ButtonIcon iconName="mail" buttonText="Registrarse con Email" onPress={() => navigation.navigate("Register")} />
                                    <Text style={styles.iniciar}>¿Ya tienes cuenta? <TouchableOpacity onPress={() => navigation.navigate("Login")}><Text style={{ color: "white", top: 2.5, fontWeight: "bold" }}>Iniciar sesión</Text></TouchableOpacity></Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            )}
        </SafeAreaView>
    );
};

const ButtonIcon = ({ iconName, buttonText, onPress }) => {
    // Acceder al path del icono basado en iconName
    const iconPaths = {
        'google': require('../assets/iconos/google.webp'),
        'facebook': require('../assets/iconos/facebook.webp'),
        'apple': require('../assets/iconos/apple.webp'),
        'mail': require('../assets/iconos/mail.webp'),

     };
    const iconSource = iconPaths[iconName];

    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <View style={styles.buttonContent}>
                {iconSource && <Image source={iconSource} style={styles.logoIcon} />}
                <Text style={styles.buttonText}>{buttonText}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonContent: {
        flexDirection: "row",
        alignItems: 'center', // Alinea los ítems verticalmente
        margin: 5,
        marginLeft: 20
    },
    buttonText: {
        color: "black",
        textAlign: "center",
        fontWeight: "200",
        fontSize: 15,
        marginLeft: 10,
    },
    separatorText: {
        color: "white",
        fontSize: 30,
        marginTop: 5,
        textAlign: "center",
    },
    iniciar: {
        color: "#64666E",
        fontSize: 15,
        marginTop: 15,
        textAlign: "center",
    },
    container: {
        top: Platform.OS == 'android' ? 50 : 10,
        marginBottom: Dimensions.get("screen").height / 4,
        justifyContent: 'flex-start',
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
        marginTop: 20,
        padding: 10,
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
        width: 30,
        height: 30,
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

export default WelcomeSelector;
