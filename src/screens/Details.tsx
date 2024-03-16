import React, { useEffect, useState } from 'react';
import {
    ImageBackground,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    Share,
    Image
} from 'react-native';
import { ScrollView } from 'react-native';
import IconN from 'react-native-vector-icons/SimpleLineIcons';

import Icon2 from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../consts/Colors';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ActivityIndicator } from 'react-native-paper';
import MapView, { Marker } from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Cabeza from '../components/molecules/Header';
import { Color, FontFamily } from '../styles/Global';
const windowWidth = Dimensions.get('window').width;

const DetailsScreen = () => {
    const route = useRoute();

    const data: any = route.params.cuestionarioData;
    const instrucciones: any = route.params.instrucciones;
    const mision: any = route.params.mision;
    const cuestionarioData = route.params.cuestionarioData;
    const [isLoading, setIsLoading] = useState(false);
    const [isLoading2, setIsLoading2] = useState(false);
    const [tasksData, setTasksData] = useState([]);
    const navigation = useNavigation();
    const baseUrl = 'https://candormap.cl/uploads/';
    const imageUrl = `${baseUrl}${mision.instrucciones.imagen}`;
    const insets = useSafeAreaInsets();
    const iconStyle = { padding: 0, color: 'black' };

    const onShare = async () => {

        try {
            const result = await Share.share({ message: "candormap://questionnaireDep?id=" + data.cuestionarioId });


        } catch (error: any) {
            Alert.alert(error.message);
        }
    };

    useEffect(() => {
        // URL de la API que proporciona los datos
        const apiUrl = 'https://candormap.cl/api/cuestionario?id=' + cuestionarioData.idCuestionario;

        // Realiza una solicitud GET a la API
        axios
            .get(apiUrl)
            .then((response) => {
                // Extrae los datos de la respuesta JSON
                const data = response.data;
                // Actualiza el estado con los datos de la API
                setTasksData(data);
            })
            .catch((error) => {
                console.error('Error fetching data from API: ', error);
            });
    }, []);


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Color.background }}>
            <Cabeza tittle="Tareas" />
            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Image
                    style={{ width: 200, height: 200, borderRadius: 150, borderWidth: 4, borderColor: "white" }}
                    source={{ uri: imageUrl }}
                />
            </View>
            <View style={{ flex: 1, top: 30, marginHorizontal: 20 }}>
                <Text style={{ color: "#C889FF", fontSize: 30, fontWeight: "300", fontFamily: FontFamily.robotoRegular, }}>{data.titulo}</Text>
                <Text style={{ color: "#DBDBDB", fontSize: 20 }}>{`${data.tiempoEstimado ? data.tiempoEstimado : 1} min`}</Text>
                <Text style={{ color: "#DBDBDB", fontSize: 15, fontWeight: "200", top: 10 }}>{mision.descripcion}</Text>
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
                            marginLeft: 30,
                            fontSize: 30,
                            fontWeight: '300',
                            color: COLORS.white,
                        }}>
                        ${data.valorMonetario}
                    </Text>

                </View>


                <TouchableOpacity style={styles.bookNowBtn} onPress={() => {
                    setIsLoading(true);
                    navigation.navigate("HomeSurveyMissions", { cuestionarioData: tasksData, misiones: mision.idMision });
                    setIsLoading(false);
                }}>
                    {isLoading ? <ActivityIndicator /> : <Text style={styles.footerText}>Comenzar ahora</Text>}
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
    rightIcon: {
        backgroundColor: '#282B32',
        borderRadius: 50,
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
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
        backgroundColor: COLORS.background,
        height: 120,
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
        paddingHorizontal: windowWidth * 0.040,
    },
    footerText: {
        color: COLORS.primary,
        fontSize: 16,
        fontWeight: 'bold',
    },
});
 

export default DetailsScreen;