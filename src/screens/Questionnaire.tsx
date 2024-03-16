import React, { useState } from 'react';
import {
    ImageBackground, StatusBar, Image, StyleSheet, View, Text, TouchableOpacity, ActivityIndicator, Share, Alert, Dimensions
} from 'react-native';
import { ScrollView } from 'react-native';



import COLORS from '../consts/Colors'; // Asegúrate de tener este archivo o ajusta los colores según tu esquema
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Cabeza from '../components/molecules/Header';
const windowWidth = Dimensions.get('window').width;
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconN from 'react-native-vector-icons/SimpleLineIcons';
import { Color, FontFamily } from '../styles/Global';
import PrimaryButton from '../components/atoms/Buttons/PrimaryButton';

const Questionnaire = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const data = route.params.cuestionarioData;
    const description = route.params.description;

    console.log(description);
    const insets = useSafeAreaInsets();

    const [isLoading, setIsLoading] = useState(false);

    // Suponiendo que tienes una URL base e imagen por defecto para el fondo
    const baseUrl = 'https://candormap.cl/uploads/';
    const imageUrl = `${baseUrl}${data.imagenIcono}`;
    const iconStyle = { padding: 0, color: 'black' };

    const onShare = async () => {

        try {
            const result = await Share.share({ message: "candormap://questionnaireDep?id=" + data.cuestionarioId });


        } catch (error: any) {
            Alert.alert(error.message);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Color.background }}>
            <Cabeza tittle="Tareas" />
            <View style={{ justifyContent: "center", alignItems: "center" }}>


                <Image
                    style={{ width: 300, height: 300, borderRadius: 150, borderWidth: 4, borderColor: "white" }}
                    source={{ uri: imageUrl }}
                />
            </View>
            <View style={{ flex: 1, top: 30, marginHorizontal: 20 }}>
                <Text style={{ color: "#C889FF", fontSize: 30, fontWeight: "500", fontFamily: FontFamily.robotoRegular, }}>{data.titulo}</Text>
                <Text style={{ color: "#DBDBDB", fontSize: 20 }}>{`${data.tiempoEstimado ? data.tiempoEstimado : 1} min`}</Text>
                <Text style={{ color: "#DBDBDB", fontSize: 15, fontWeight: "200", top: 10 }}>{data.descripcion}</Text>
                <TouchableOpacity style={[styles.containers, { backgroundColor: Color.background, top: 30, borderRadius: 200, padding: 10, width: 50 }]}

                    onPress={() => {
                        onShare();
                    }}
                >
                    <View style={styles.rightIcon}>
                        <IconN name="paper-plane" size={24} color="white" />
                    </View>
                </TouchableOpacity>
            </View>



            <View style={[styles.footer, { paddingBottom: insets.bottom }]}>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <Text
                        style={{
                            marginLeft: 20,
                            fontSize: 30,
                            fontWeight: '300',
                            color: COLORS.white,
                        }}>
                        ${data.valorMonetario}
                    </Text>

                </View>


                <TouchableOpacity style={styles.bookNowBtn} onPress={() => {
                    setIsLoading(true);
                    navigation.navigate("HomeSurvey", { cuestionarioData: data });
                    setIsLoading(false);
                }}>
                    {isLoading ? <ActivityIndicator /> : <Text style={styles.footerText}>Comenzar</Text>}
                </TouchableOpacity>
            </View>
        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    containers: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFA000',
        borderRadius: 5,
        marginBottom: 1,
        borderColor: "white",
        borderStyle: "solid",
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rightIcon: {
        backgroundColor: '#282B32',
        borderRadius: 50,
        height: 50,
        width: 50,
        justifyContent: 'center',
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
        backgroundColor: Color.background,
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
        borderRadius: 30,
        marginRight: 30,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: windowWidth * 0.080,
    },
    footerText: {
        color: "black",
        fontSize: 16,
        fontWeight: '300',
    },
});

export default Questionnaire;
