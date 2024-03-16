import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, Alert, KeyboardAvoidingView, SafeAreaView, Animated } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { launchCamera } from 'react-native-image-picker'; // Asegúrate de instalar esto
import RNFetchBlob from 'react-native-fetch-blob';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import usuariosSlice from '../redux/slices/usuariosSlice';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ActivityIndicator } from 'react-native';
import Cabeza from '../components/molecules/Header';
import Multiple from '../components/molecules/Multiple';
import Single from '../components/molecules/Single';
import PrimaryButton from '../components/atoms/Buttons/PrimaryButton';
import { Color } from '../styles/Global';


// SCREEN CON LA ENCUESTA 


export interface SurveyData {
    id: number;
    options: string[];
    question: string;
    selectedOptions: string[];
    type: string;
    cuestionarioData: any;
    misiones: any;
    tittle: string;
}

const HomeSurveyProfile = () => {

    const route = useRoute();
    const data: any = route.params.cuestionarioData;
    const misiones: any = route.params.misiones;
    const tittle: any = route.params.tittle;




    const [logoAnimation] = useState(new Animated.Value(0)); // Valor animado para la animación

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
                                navigation.navigate('PersonalInfo');

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
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Color.background }}>
            <Cabeza tittle={tittle} />

            <KeyboardAwareScrollView style={styles.container}>
                <View >
                    <View style={{ marginHorizontal: 10, top: 100 }}>
                        <Animated.View style={logoStyle}>
                            <Text style={{ color: "#C889FF", fontSize: 40 }}>{tittle}</Text>
                        </Animated.View>


                        <Animated.View style={logoStyle}>
                            <Image source={require('../assets/images_black/abajo.png')} style={{ width: 84, height: 84 }} />
                        </Animated.View>

                    </View>


                </View>



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
                    <View  >
                        {isSurveyComplete ? (
                            <PrimaryButton title="Enviar" onPress={() => {
                                setIsLoading(true);
                                send();

                            }} />
                            // <TouchableOpacity style={styles.button1} onPress={() => {
                            //     setIsLoading(true);
                            //     send();

                            // }}>
                            //     {isLoading && <ActivityIndicator />}
                            //     {!isLoading && <Text style={{ color: 'white' }} >
                            //         Enviar
                            //     </Text>}

                            // </TouchableOpacity>
                        ) : (
                            <PrimaryButton title="Completa los campos para enviar" type="secondary" />
                            // <TouchableOpacity style={styles.button1Disabled}>

                            //     <Text style={{ color: 'white' }} onPress={() => console.log(surveyData)}>
                            //         Completa los campos para enviar
                            //     </Text>
                            // </TouchableOpacity>
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
        backgroundColor: '#4931a1',
        paddingHorizontal: 37,
        padding: 10,
        borderRadius: 10,
    },
    button1Disabled: {
        backgroundColor: 'black',
        paddingHorizontal: 37,
        padding: 10,
        borderRadius: 10,
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
        fontSize: 15,
        marginVertical: 10,
        fontWeight: '900',
        color: "white"
    },
    option: {
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginBottom: 10,
        backgroundColor: "#f6f6f6"
    },
    selectedOption: {
        backgroundColor: 'orange',
        color: 'white',
    },
    optionText: {
        fontSize: 16,
    },
    input: {
        backgroundColor: '#272A31',
        padding: 10,
        marginVertical: 5,
        color: "white",
        borderRadius: 10,
        minHeight: 100,
    },
    cameraButton: {
        backgroundColor: '#DDDDDD',
        padding: 10,
        marginBottom: 10,
    },
});

export default HomeSurveyProfile;
