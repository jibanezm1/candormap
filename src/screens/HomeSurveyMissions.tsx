import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, Alert, KeyboardAvoidingView, SafeAreaView, Dimensions } from 'react-native';
import { ScrollView } from 'react-native';
import { launchCamera } from 'react-native-image-picker'; // Asegúrate de instalar esto
import RNFetchBlob from 'react-native-fetch-blob';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import usuariosSlice from '../redux/slices/usuariosSlice';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ActivityIndicator } from 'react-native';
import colors from '../styles/Colors';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import COLORS from '../consts/Colors';
import Multiple from '../components/molecules/Multiple';
import Single from '../components/molecules/Single';
import { Color, FontFamily } from '../styles/Global';
import Cabeza from '../components/molecules/Header';


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
const windowWidth = Dimensions.get('window').width;

const HomeSurveyMissions = () => {

    const route = useRoute();
    const data: any = route.params.cuestionarioData;
    const misiones: any = route.params.misiones;
    const navigation = useNavigation();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [isLoading, setIsLoading] = useState(false);
    const [currentUser, setCurrentUser] = React.useState([]);  // <--- Estado para almacenar la data


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
                                navigation.navigate('MissionsHome');

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
        <SafeAreaView style={{ flex: 1, backgroundColor: Color.background}}>
            <Cabeza tittle="Encuesta" />

            <ScrollView style={styles.container}>
                <Text style={{ color: "#DBDBDB", fontSize: 30, fontWeight: "300", fontFamily: FontFamily.robotoRegular, }}>{data.titulo}</Text>
                <Text style={styles.subtitle}>
                    {currentDate.toLocaleDateString('es-ES', {
                        day: '2-digit',
                        month: 'long',
                    })} - {currentDate.toLocaleTimeString().slice(0, 5)}
                </Text>
                <Text style={styles.subtitle}>
                   {data.descripcion}
                </Text>
                <Text style={{ color: "white", top: -5, left: 5 }}>_________</Text>

                {surveyData.map((question) => (
                    <View style={{ padding: 10 }} key={question.id}>
                        <Text style={styles.question}>{question.question}</Text>
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
                            <TouchableOpacity style={styles.button1Disabled} onPress={() => {
                                setIsLoading(true);
                                send();

                            }}>
                                {isLoading && <ActivityIndicator />}
                                {!isLoading && <Text style={{  color: 'black', textAlign:"center"}} >
                                    Finalizar encuesta
                                </Text>}

                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity style={styles.button1Disabled}>

                                <Text style={{ color: 'black', textAlign:"center" }} onPress={() => console.log(surveyData)}>
                                    Finalizar encuesta
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView >

    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Color.background,
        flex: 1,
        padding: 20,
        paddingBottom: 300,
    },
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
    title: {
        fontSize: 26,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 16,
        color: 'grey',
    },
    rightIcon: {
        backgroundColor: '#282B32',
        borderRadius: 50,
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    question: {
        fontSize: 15,
        marginVertical: 10,
        fontWeight: '300',
        color: 'white',
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
    button1Disabled: {
        backgroundColor: 'white',
        paddingHorizontal: 37,
        paddingVertical: 20,
        padding: 10,
        borderRadius: 60,
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
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    bookNowBtn: {
        height: 50,
        backgroundColor: colors.white,
        borderRadius: 30,
        marginRight: 30,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: windowWidth * 0.040,
    },
    footerText: {
        color: "black",
        fontSize: 16,

        fontWeight: '100',
    },
});

export default HomeSurveyMissions;
