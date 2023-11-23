import React, { useEffect, useState } from 'react';
import {
    ImageBackground,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import { ScrollView } from 'react-native';

import Icon2 from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../consts/Colors';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ActivityIndicator } from 'react-native-paper';
import MapView, { Marker } from 'react-native-maps';

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

    console.log(route.params)
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

    const InstructionRow = ({ icon, text }) => (
        <View style={style.row}>
            <Icon name={icon} size={30} color="white" style={style.icon} />
            <Text style={style.description}>{text}</Text>
        </View>
    );

    return (<SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
        <StatusBar translucent backgroundColor="rgba(0,0,0,0)" />
        <ImageBackground style={{ flex: 0.7, backgroundColor: 'rgb(45, 46, 48)' }} imageStyle={{ opacity: 0.5 }} source={{ uri: imageUrl }}>


            <View style={style.imageDetails}>
                <Text
                    style={{
                        width: '70%',
                        fontSize: 25,
                        fontWeight: 'bold',
                        color: COLORS.white,
                        marginBottom: 20,
                    }}>
                    {mision.titulo}
                </Text>


            </View>
        </ImageBackground>
        <View style={style.detailsContainer}>
            <View style={style.iconContainer}>
                <Icon2 name="favorite" color={COLORS.red} size={30} />
            </View>
            <ScrollView style={{
                // backgroundColor:"red",
                paddingHorizontal: 10

            }}>

                <Text style={{ marginTop: 5, fontWeight: 'bold', fontSize: 20 }}>
                    Info de la Mision
                </Text>
                <Text style={{ marginTop: 5, lineHeight: 22 }}>{mision.descripcion}</Text>
                <View style={{ flexDirection: 'row' }}>

                    <Text
                        style={{

                            fontSize: 20,
                            fontWeight: 'bold',
                            color: COLORS.primary,
                        }}>
                        <View>
                            <InstructionRow icon="timer-outline" text={`${mision.tiempo} minutos para completar la tarea`} />
                            <InstructionRow icon="run-fast" text={`Requiere desplazarse.`} />
                            <InstructionRow icon="camera-marker-outline" text={`${instrucciones.requisitos}.`} />
                            {/* <MapView
                                style={{ height: 100, width: 600}}
                                initialRegion={{
                                    latitude: parseFloat(mision.lat),
                                    longitude: parseFloat(mision.lng),
                                    latitudeDelta: 0.0922,
                                    longitudeDelta: 0.0421,
                                }}
                            >
                                <Marker
                                    coordinate={{ latitude: parseFloat(mision.lat), longitude: parseFloat(mision.lng) }}
                                    title={mision.titulo}
                                />
                            </MapView> */}
                        </View>
                    </Text>

                </View>

            </ScrollView>
        </View>
        <View style={style.footer}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                <Text
                    style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        color: COLORS.white,
                    }}>
                    ${mision.recompensa}
                </Text>
                <Text
                    style={{
                        fontSize: 12,
                        fontWeight: 'bold',
                        color: COLORS.grey,
                        marginLeft: 2,
                    }}>
                    /Mision
                </Text>
            </View>
            <TouchableOpacity onPress={() => {
                return navigation.navigate("HomeSurveyMissions", { cuestionarioData: tasksData, misiones: mision.idMision })


            }} >
                <View style={style.bookNowBtn}>

                    {isLoading && <ActivityIndicator />}
                    {!isLoading && <Text
                        style={{ color: COLORS.primary, fontSize: 16, fontWeight: 'bold' }}>
                        Ingresar
                    </Text>}


                </View>
            </TouchableOpacity>
        </View>
    </SafeAreaView>);

};
const style = StyleSheet.create({
    row: {
        flexDirection: 'row',
    },
    icon: {
        marginTop: 9,
        marginRight: 10,
        color: 'black',
    },
    description: {
        fontSize: 15,
        marginVertical: 10,
    },
    bookNowBtn: {
        height: 50,
        width: 150,
        backgroundColor: COLORS.white,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },

    iconContainer: {
        height: 60,
        width: 60,
        position: 'absolute',
        top: -30,
        backgroundColor: COLORS.white,
        borderRadius: 30,
        right: 20,
        elevation: 10,
        justifyContent: 'center',
        alignItems: 'center',
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
    header: {
        marginTop: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    imageDetails: {
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        position: 'absolute',
        bottom: 30,
    },
    footer: {
        flexDirection: 'row',
        backgroundColor: COLORS.primary,
        height: 70,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
});

export default DetailsScreen;