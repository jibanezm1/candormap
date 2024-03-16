import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, Alert, KeyboardAvoidingView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { launchCamera } from 'react-native-image-picker'; // Asegúrate de instalar esto
import RNFetchBlob from 'react-native-fetch-blob';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import usuariosSlice from '../redux/slices/usuariosSlice';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ActivityIndicator } from 'react-native';
import { Color, FontFamily } from '../styles/Global';
import { SafeAreaView } from 'react-native-safe-area-context';
import Cabeza from '../components/molecules/Header';
import { List, IconButton, useTheme } from 'react-native-paper';
import Multiple from '../components/molecules/Multiple';
import Single from '../components/molecules/Single';


// SCREEN CON LA ENCUESTA 


export interface SurveyData {
    id: number;
    options: string[];
    question: string;
    selectedOptions: string[];
    type: string;
    cuestionarioData: any;
    misiones: any;
}

const HomeSurvey = () => {

    const route = useRoute();
    const data: any = route.params.cuestionarioData;
    const misiones: any = route.params.misiones;
    const navigation = useNavigation();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [isLoading, setIsLoading] = useState(false);
    const [currentUser, setCurrentUser] = React.useState([]);  // <--- Estado para almacenar la data
    const [expanded, setExpanded] = useState(false);
    const { colors } = useTheme();
    useEffect(() => {

        const interval = setInterval(() => {
            setCurrentDate(new Date());
        }, 1000); // actualiza la hora cada segundo

        return () => {
            clearInterval(interval); // limpiar el intervalo cuando el componente se desmonta
        };
    }, []);


    // Llama a la API cuando el componente se monta
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

    const [surveyData, setSurveyData] = useState(() => {
        if (data && data.preguntas) {
            return data.preguntas.map((question: any) => ({
                id: question.id,
                options: question.options.map((option: any) => ({ id: option[1], text: option[0] })),
                question: question.question,
                selectedOptionIds: [],
                type: question.type,
            }));
        } else {
            return [];
        }
    });


    const handleOptionSelect = (questionId: number, optionId: number, type: string) => {
        setSurveyData((prevData) =>
            prevData.map((question) => {
                if (question.id === questionId) {
                    const isSelected = question.selectedOptionIds.includes(optionId);
                    if (type === 'single') {
                        return {
                            ...question,
                            selectedOptionIds: [optionId],
                        };
                    } else if (isSelected) {
                        return {
                            ...question,
                            selectedOptionIds: question.selectedOptionIds.filter((item) => item !== optionId),
                        };
                    } else {
                        return {
                            ...question,
                            selectedOptionIds: [...question.selectedOptionIds, optionId],
                        };
                    }
                }
                return question;
            })
        );
    };

    const handleTextInput = (questionId: number, text: string) => {
        setSurveyData((prevData) =>
            prevData.map((question) => {
                if (question.id === questionId) {
                    return {
                        ...question,
                        selectedOptionIds: [text],
                    };
                }
                return question;
            })
        );
    };


    const sendSurveyData = async (mappedResponses: any) => {
        try {

            if (!currentUser.idUsuario) {
                Alert.alert("Error", "Usuario no identificado. Por favor, inicie sesión de nuevo.");
                return;  // Detener la ejecución de la función si no hay idUsuario
            }
            let formData = new FormData();
            formData.append(`idCuestionario`, data.cuestionarioId);
            formData.append(`idUsuario`, currentUser.idUsuario);

            formData.append(`misiones`, misiones);



            mappedResponses.forEach((response: any, index: number) => {
                if (response.urlFoto) {
                    const fileName = response.urlFoto.split('/').pop();  // Extrae el nombre del archivo de la URI
                    const type = 'image/jpeg';  // Asumimos JPEG, pero puedes usar otra lógica para determinar el tipo

                    const file = {
                        uri: response.urlFoto,
                        name: fileName,
                        type
                    };

                    formData.append(`urlFoto_${index}`, file);

                    const fieldName = `urlFoto_${index}`;  // Guarda el nombre del campo
                    formData.append(`response_${index}`, JSON.stringify({ ...response, urlFoto: fieldName }));
                } else {
                    formData.append(`response_${index}`, JSON.stringify(response));
                }
            });

            const response = await axios({
                method: 'POST',
                url: 'https://candormap.cl/api/save',
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            if (response.data.success) {
                setIsLoading(false);
                Alert.alert(
                    "Éxito",
                    "Encuesta enviada con éxito",
                    [
                        {
                            text: "OK",
                            onPress: () => {
                                navigation.navigate('HomeTask');

                            }
                        }
                    ],
                    { cancelable: false }  // Esto hace que el alerta no se pueda cerrar tocando fuera de él
                );
            } else {
                setIsLoading(false);

                Alert.alert("Error", "Error al enviar la encuesta");
            }

        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log('Error data:', error.response.data);
                console.log('Error status:', error.response.status);
                console.log('Error headers:', error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                console.log('Error request:', error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error message:', error.message);
            }
            console.log('Error config:', error.config);
        }
    };


    const send = () => {
        const mappedResponses = surveyData.reduce((acc, question) => {
            if (question.type === "multiple" || question.type === "single") {

                if (question.selectedOptionIds) {  // Cambiamos a selectedOptionIds aquí
                    question.selectedOptionIds.forEach(optionId => { // optionId representa el ID
                        acc.push({
                            idPregunta: question.id,
                            idOpcion: optionId,  // Usamos directamente optionId aquí
                            textoRespuesta: null,
                            urlFoto: null
                        });
                    });
                }
            } else if (question.type === "open") {
                acc.push({
                    idPregunta: question.id,
                    idOpcion: null,
                    textoRespuesta: question.selectedOptionIds[0],  // Cambiamos a selectedOptionIds aquí
                    urlFoto: null
                });
            } else if (question.type === "camera") {
                acc.push({
                    idPregunta: question.id,
                    idOpcion: null,
                    textoRespuesta: null,
                    urlFoto: question.selectedOptionIds[0]  // Cambiamos a selectedOptionIds aquí
                });
            }
            return acc;
        }, []);

        sendSurveyData(mappedResponses);
    }

    const handleCameraSelect = (questionId: number) => {
        launchCamera({ noData: true }, (response) => {

            console.log('response: ', response);


            if (response.assets[0].uri) {
                setSurveyData((prevData) => {
                    return prevData.map((q) => q.id === questionId ? { ...q, selectedOptionIds: [response.assets[0].uri] } : q)
                });
            }
        });
    };

    const isSurveyComplete = surveyData.every((question) => {

        return question.selectedOptionIds && question.selectedOptionIds.length > 0;
    });

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Color.background }}>
            <Cabeza tittle="Encuesta" />
            <KeyboardAwareScrollView style={styles.container}>
                <Text style={{ color: "#DBDBDB", fontSize: 30, fontWeight: "500", fontFamily: FontFamily.robotoRegular, }}>{data.titulo}</Text>
                <Text style={styles.subtitle}>
                    {currentDate.toLocaleDateString('es-ES', {
                        day: '2-digit',
                        month: 'long',
                    })} - {currentDate.toLocaleTimeString().slice(0, 5)}
                </Text>
                <Text style={styles.subtitle}>
                   {data.descripcion}
                </Text>
                <Text style={{ color: "#BCABFC", marginVertical: 30, left: 5 }}>____________________</Text>

                {surveyData.map((question) => (
                    <View style={{ marginTop:5  }} key={question.id}>
                        <Text style={styles.question}>
                        {/* ¿Qué opinás sobre la medida de desvinculación de aprox  7000 empleados públicos mediante el DNU firmado por el presidente Milei? */}
                        {question.question}
                        </Text>
                        {question.type === 'multiple' && (
                            <Multiple
                                question={question}
                                handleOptionSelect={handleOptionSelect}
                            />
                        )}

                        {question.type === 'single' && (
                            <Single
                                question={question}
                                handleOptionSelect={handleOptionSelect}
                            />
                        )}


                        {question.type === 'open' && (
                            <KeyboardAwareScrollView>
                                <View>
                                    <TextInput
                                        style={styles.input}
                                        onChangeText={(text) => handleTextInput(question.id, text)}
                                        value={question.selectedOptionIds[0]}
                                        multiline
                                    />
                                </View>

                            </KeyboardAwareScrollView>

                        )}
                        {question.type === 'camera' && (
                            <TouchableOpacity onPress={() => handleCameraSelect(question.id)} style={styles.cameraButton}>
                                <Text style={{ textAlign: "center" }}>Tomar foto</Text>
                                {question.selectedOptionIds && question.selectedOptionIds.length > 0 && question.selectedOptionIds[0] !== '' && (
                                    <Image source={{ uri: question.selectedOptionIds[0] }} style={{ width: 100, height: 100 }} />
                                )}
                            </TouchableOpacity>
                        )}
                    </View>
                ))}
                <View style={{ width: '100%', top: 10, marginBottom: 100 }}>
                    <View style={[styles.official3, styles.containerButtons]}>
                        {isSurveyComplete ? (
                            <TouchableOpacity style={styles.button1} onPress={() => {
                                setIsLoading(true);
                                send();

                            }}>
                                {isLoading && <ActivityIndicator />}
                                {!isLoading && <Text style={{ color: 'black' }} >
                                    Finalizar encuesta
                                </Text>}

                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity style={styles.button1}>

                                <Text style={{ color: 'black' }} onPress={() => console.log(surveyData)}>
                                    Finalizar encuesta
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Color.background,
        flex: 1,
        padding: 20,
        paddingBottom: 300,
    },
    containerButtons: {
        justifyContent: 'space-around',
        flexDirection: 'row',
    },
    official3: {
        width: '100%',
    },
    button1: {
        backgroundColor: 'white',
        paddingHorizontal: 37,
        padding: 15,
        borderRadius: 35,
    },
    button1Disabled: {
        backgroundColor: 'white',
        paddingHorizontal: 37,
        paddingVertical: 20,
        padding: 10,
        borderRadius: 60,
    },
    button: {
        borderWidth: 1,
        borderColor: '#4931a1',
        paddingHorizontal: 33,
        padding: 10,
        borderRadius: 10,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 16,
        color: 'grey',
    },

    question: {
        fontSize: 21.9,
        marginVertical: 10,
        lineHeight: 30,
        padding: 15,
        fontWeight: '400',
        fontFamily: "OpenSans-Regular",
        color: 'white',
    },
    option: {
        borderWidth: 1,
        borderColor: '#272A31',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginBottom: 10,
        backgroundColor: "#272A31"
    },
    selectedOption: {
        backgroundColor: 'orange',
        color: 'white',
    },
    optionText: {
        fontSize: 16,
        color: 'white',
    },
    input: {
        backgroundColor: '#f6f6f6',
        padding: 10,
        marginVertical: 5,
        borderRadius: 10,
        minHeight: 100,
    },
    cameraButton: {
        backgroundColor: '#DDDDDD',
        padding: 10,
        marginBottom: 10,
    },
});

export default HomeSurvey;