import React, { useState, useEffect } from 'react';
import { View, Text, Animated, TouchableOpacity, StyleSheet, Alert, Dimensions, Image, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Cabeza from '../../components/molecules/Header';
import { Modalize } from 'react-native-modalize';
import colors from '../../styles/Colors';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Input from '../../components/atoms/Input/Input';
import PhoneInput from 'react-native-international-phone-number';
import { useDispatch, useSelector } from 'react-redux';
import COLORS from '../../consts/Colors';
import MenuItem from '../../components/molecules/MenuItem';
import axios from 'axios';
import { loginUser } from '../../redux/slices/usuariosSlice';
import { FlatList } from 'react-native-gesture-handler';
import Chapters from '../Chapters';
import { ScreenHeight } from 'react-native-elements/dist/helpers';
import { Color } from '../../styles/Global';


const PersonalInfo = () => {
    const navigation = useNavigation();
    const windowHeight = Dimensions.get('window').height;
    const desiredHeight = windowHeight * 0.83; // 80% de la altura de la pantalla
    const [logoAnimation] = useState(new Animated.Value(0)); // Valor animado para la animación

    const datas = [
        {
            cuestionarioId: 79,
            titulo: "Información Personal y Demográfica",
            descripcion: "Descripción del cuestionario de Información Personal y Demográfica",
            valorMonetario: "0", // Asumiendo que es gratis, si no es así, reemplaza con el valor correspondiente.
            tiempoEstimado: "10", // Estimación del tiempo en minutos, ajusta según sea necesario.
            imagenIcono: "icon1.png",
            instrucciones: "Instrucciones para el cuestionario de Información Personal y Demográfica",
        },
        {
            cuestionarioId: 80,
            titulo: "Intereses y Preferencias Personales",
            descripcion: "Descripción del cuestionario de Intereses y Preferencias Personales",
            valorMonetario: "0",
            tiempoEstimado: "10",
            imagenIcono: "icon2.png",
            instrucciones: "Instrucciones para el cuestionario de Intereses y Preferencias Personales",
        },
        {
            cuestionarioId: 81,
            titulo: "Comportamiento de Consumo y Compras",
            descripcion: "Descripción del cuestionario de Comportamiento de Consumo y Compras",
            valorMonetario: "1.00", // Asumiendo que este es el precio, ajusta si es necesario
            tiempoEstimado: "2", // Estimación del tiempo en minutos, ajusta según sea necesario
            imagenIcono: "icon3.png",
            instrucciones: "Instrucciones para el cuestionario de Comportamiento de Consumo y Compras",
        },
        {
            cuestionarioId: 82,
            titulo: "Estilo de Vida y Preferencias de Viaje",
            descripcion: "Descripción del cuestionario de Estilo de Vida y Preferencias de Viaje",
            valorMonetario: "1.00",
            tiempoEstimado: "2",
            imagenIcono: "icon4.png",
            instrucciones: "Instrucciones para el cuestionario de Estilo de Vida y Preferencias de Viaje",
        },
        {
            cuestionarioId: 83,
            titulo: "Tecnología y Medios",
            descripcion: "Descripción del cuestionario de Tecnología y Medios",
            valorMonetario: "1.00",
            tiempoEstimado: "2",
            imagenIcono: "icon5.png",
            instrucciones: "Instrucciones para el cuestionario de Tecnología y Medios",
        },
        {
            cuestionarioId: 84,
            titulo: "Participación Social y Activismo",
            descripcion: "Descripción del cuestionario de Participación Social y Activismo",
            valorMonetario: "1.00",
            tiempoEstimado: "2",
            imagenIcono: "icon6.png",
            instrucciones: "Instrucciones para el cuestionario de Participación Social y Activismo",
        },
    ];

    const dispatch = useDispatch();
    const [currentUser, setCurrentUser] = React.useState([]);
    const [loading, setLoading] = React.useState(true); // <-- Agregado estado para controlar el loading
    const [data, setData] = React.useState([]);
    const [nodata, setNoData] = React.useState([]);
    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const user = await AsyncStorage.getItem('currentUser');


                if (user) {
                    setCurrentUser(JSON.parse(user));
                }
            } catch (error) {
                console.error("Error al leer el valor de AsyncStorage:", error);
            }
        };
        fetchData();
    }, []);

    const fetchDataFromAPI = React.useCallback(() => {
        setLoading(true);
        if (currentUser && currentUser.idUsuario) {
            axios.get(`https://candormap.cl/api/adicional?idUsuario=${currentUser.idUsuario}`)
                .then(response => {
                    setData(response.data.cuestionariosNoResueltos);
                    setNoData(response.data.cuestionariosResueltos);
                    setLoading(false);
                })
                .catch(error => {
                    console.error("There was an error fetching data", error);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [currentUser]);

    React.useEffect(() => {
        fetchDataFromAPI();
    }, [fetchDataFromAPI]);

    useFocusEffect(
        React.useCallback(() => {
            fetchDataFromAPI();
            return () => { };
        }, [fetchDataFromAPI])
    );



    const onSubmit = (cuestionario: any[], tittle: string = "") => {
        console.log("tittle:", tittle);
        navigation.navigate("AdditionalForm", { cuestionarioData: cuestionario, misiones: null, tittle: tittle })
    }

    const colores = ["#f9e1fc", "#e8f1fd", "#e5ffef", "#fbfaf6"];

    const colorAleatorio = colores[Math.floor(Math.random() * colores.length)];

    const logoStyle = {
        transform: [
            {
                translateY: logoAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-100, 0], // Comienza 100 píxeles arriba y se mueve a su posición original
                }),
            },
        ],
    };
    return (<SafeAreaView style={{ flex: 1, backgroundColor: Color.background }}>
        <Cabeza tittle="Datos Adicionales" />
        <View style={{ paddingTop: 0, marginHorizontal: 30 }}>
            <View style={{ marginHorizontal: 10, top: 100 }}>
                <Animated.View style={logoStyle}>
                    <Text style={{ color: "#C889FF", fontSize: 40 }}>Datos Adicionales</Text>
                </Animated.View>
            </View>
            <FlatList
                nestedScrollEnabled={true}
                data={data}

                style={{ height: ScreenHeight, marginBottom: 700 }}
                keyExtractor={(item) => item.cuestionarioId.toString()}
                renderItem={({ item }) => {

                    var image = "https://candormap.cl/uploads/" + item.imagenIcono;
                    return (
                        <MenuItem
                            title={item.titulo}
                            onPress={() => onSubmit(item, item.titulo)}
                            imageSource={image}
                        />)
                }}
                
            />
        </View>
    </SafeAreaView>

    )
}


export default PersonalInfo;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    official3: {

        width: "100%",
    },
    button1: {

        backgroundColor: "#4931a1",
        paddingHorizontal: 37,
        padding: 10,
        borderRadius: 10
    },
    inputContainer: {
        marginVertical: 0,
        padding: 10,

    },
    button: {
        borderWidth: 1,
        borderColor: "#4931a1",
        paddingHorizontal: 26,
        padding: 10,
        borderRadius: 10
    },
    containerButtons: {
        justifyContent: "space-around",
        flexDirection: "row",
    },
    iconContainer: {
        height: 60,
        width: 60,
        position: 'absolute',
        top: 10,
        backgroundColor: COLORS.white,
        borderRadius: 30,
        right: 160,
        elevation: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerProgress: {
        padding: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
    },
    rowExpand: {
        marginTop: 65,
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        marginHorizontal: 10,
        fontSize: 18,
    },
});
