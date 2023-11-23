import React, { useState } from 'react';
import {
    ImageBackground, SafeAreaView, StatusBar, StyleSheet, View, Text, TouchableOpacity,  ActivityIndicator
} from 'react-native';
import { ScrollView } from 'react-native';

import Icon2 from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../consts/Colors'; // Asegúrate de tener este archivo o ajusta los colores según tu esquema
import { useNavigation, useRoute } from '@react-navigation/native';

const Questionnaire = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const data = route.params.cuestionarioData;
    const [isLoading, setIsLoading] = useState(false);

    // Suponiendo que tienes una URL base e imagen por defecto para el fondo
    const baseUrl = 'https://candormap.cl/uploads/';
    const imageUrl = `${baseUrl}${data.imagenIcono}`;

    const InstructionRow = ({ icon, text }) => (
        <View style={styles.row}>
            <Icon name={icon} size={30} color="white" style={styles.icon} />
            <Text style={styles.description}>{text}</Text>
        </View>
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <StatusBar translucent backgroundColor="rgba(0,0,0,0)" />
            <ImageBackground style={styles.imageBackground} imageStyle={{ opacity: 0.5 }} source={{ uri: imageUrl }}>
                <View style={styles.imageDetails}>
                    <Text style={styles.imageTitle}>{data.titulo}</Text>
                </View>
            </ImageBackground>
            <View style={styles.detailsContainer}>
                <ScrollView style={styles.scrollView}>
                    <Text style={styles.missionInfoTitle}>Info del Cuestionario</Text>
                    <Text style={styles.missionDescription}>
                        Encuesta - Responde esta breve encuesta sobre: {data.titulo}.
                    </Text>
                    {/* Puedes agregar más InstructionRow con la información relevante */}
                </ScrollView>
            </View>
            <View style={styles.footer}>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <Text
                        style={{
                            fontSize: 18,
                            fontWeight: 'bold',
                            color: COLORS.white,
                        }}>
                        ${data.valorMonetario}
                    </Text>
                    <Text
                        style={{
                            fontSize: 12,
                            fontWeight: 'bold',
                            color: COLORS.grey,
                            marginLeft: 2,
                        }}>
                        /Encuesta
                    </Text>
                </View>
                <TouchableOpacity style={styles.bookNowBtn} onPress={() => {
                    setIsLoading(true);
                    navigation.navigate("HomeSurvey", { cuestionarioData: data });
                    setIsLoading(false);
                }}>
                    {isLoading ? <ActivityIndicator /> : <Text style={styles.footerText}>Comenzar ahora</Text>}
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginRight: 10,
    },
    description: {
        fontSize: 15,
        color: 'black',
    },
    imageBackground: {
        flex: 0.7,
        backgroundColor: 'rgb(45, 46, 48)',
    },
    imageDetails: {
        padding: 20,
        position: 'absolute',
        bottom: 30,
        width: '100%',
    },
    imageTitle: {
        width: '70%',
        fontSize: 25,
        fontWeight: 'bold',
        color: COLORS.white,
        marginBottom: 20,
    },
    detailsContainer: {
        top: -30,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingTop: 40,
        paddingHorizontal: 5,
        backgroundColor: COLORS.white,
        flex: 0.3,
    },
    scrollView: {
        paddingHorizontal: 10,
    },
    missionInfoTitle: {
        marginTop: 5,
        fontWeight: 'bold',
        fontSize: 20,
    },
    missionDescription: {
        marginTop: 5,
        lineHeight: 22,
    },
    footer: {
        flexDirection: 'row',
        backgroundColor: COLORS.primary,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    bookNowBtn: {
        height: 50,
        backgroundColor: COLORS.white,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    footerText: {
        color: COLORS.primary,
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Questionnaire;
