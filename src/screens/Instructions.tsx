import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image,  ActivityIndicator, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';



// SCREEN CON LAS INSTRUCCIONES DE LA MISION, ESTA PANTALLA SE MUESTRA CUANDO INSTRUCCIONES TIENE ALGO EN SU DATA


const Instructions = ({ data, cuestionarioData }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [isLoading2, setIsLoading2] = useState(false);
    const [tasksData, setTasksData] = useState([]);
    const navigation = useNavigation();
    const baseUrl = 'https://candormap.cl/uploads/';


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
        <View style={styles.row}>
            <Icon name={icon} size={30} color="white" style={styles.icon} />
            <Text style={styles.description}>{text}</Text>
        </View>
    );
    return (
        <ScrollView style={styles.container}>

            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: parseFloat(data.lat),
                    longitude: parseFloat(data.lng),
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                <Marker
                    coordinate={{ latitude: parseFloat(data.lat), longitude: parseFloat(data.lng) }}
                    title={data.titulo}
                />
            </MapView>

            <Text style={styles.title}>{data.titulo}</Text>

            <View style={{ padding: 10 }}>
                <InstructionRow icon="timer-outline" text={`${data.tiempoEstimado} minutos para completar la tarea`} />
                <InstructionRow icon="run-fast" text={`Requiere desplazarse.`} />
                <InstructionRow icon="camera-marker-outline" text={`${data.requisitos}.`} />
            </View>

            <Text style={styles.description}>
                {data.descripcion}
            </Text>

            <Image
                style={styles.image}
                source={{ uri: `${baseUrl}${data.imagen}` }}
            // Asegúrate de ajustar la URL base para las imágenes según donde estén alojadas.
            />
            <View style={{ width: "100%", top: 0 }}>
                <View style={[styles.official3, styles.containerButtons]}>

                    <TouchableOpacity style={styles.button1} onPress={() => {
                        return navigation.navigate("HomeSurveyMissions", { cuestionarioData: tasksData, misiones: data.idMision })

                        
                    }} >
                        {isLoading && <ActivityIndicator />}
                        {!isLoading && <Text style={styles.buttonText}>Comenzar ahora</Text>}
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ height: 100 }} />


        </ScrollView>
    );
};

const styles = StyleSheet.create({
    buttonText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
    },
    button: {
        borderWidth: 1,
        borderColor: "#4931a1",
        paddingHorizontal: 26,
        padding: 10,
        borderRadius: 10
    },
    button1: {
        backgroundColor: "#4931a1",
        paddingHorizontal: 37,
        padding: 10,
        borderRadius: 10
    },
    containerButtons: {
        justifyContent: "space-around",
        flexDirection: "row",
    },
    official3: {

        width: "100%",
    },
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: 'white',
    },
    row: {
        flexDirection: 'row',
    },
    icon: {
        marginTop: 9,
        marginRight: 10,
        color: 'black',
    },
    map: {
        height: 200,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 15,
    },
    instructionsContainer: {
        marginVertical: 10,
    },
    instruction: {
        fontSize: 16,
        marginVertical: 5,
    },
    description: {
        fontSize: 18,
        marginVertical: 10,
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        marginVertical: 10,
    },
});

export default Instructions;
