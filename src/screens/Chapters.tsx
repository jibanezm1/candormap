import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

import { View, Text, Image, TouchableOpacity, Dimensions, StyleSheet } from 'react-native'
import ProgressCircle from 'react-native-progress-circle'
import PrimaryButton from '../components/atoms/Buttons/PrimaryButton';
const windowWidth = Dimensions.get('window').width;
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Color } from '../styles/Global';

interface ChaptersProps {
    title: string;
    description: string;
    price: string;
    duration: string;
    imageSource: string;
    cuestionario: any;
    instrucciones: string; // Add the 'instrucciones' property to the interface
    estado: boolean;
    mision: string | null;
    colorAleatorio: string;
    onPressTask: (estado: boolean, cuestionario: string, mision: string | null, instrucciones: string) => void;
    index: number;
}
export default class Chapters extends React.Component<ChaptersProps> {
    backgroundColor = 'purple';
    fadeAnim = new Animated.Value(0); // Inicializa aquí

    componentDidMount() {
        // Inicia la animación cuando el componente se monta
        Animated.timing(this.fadeAnim, {
            toValue: 1,
            duration: 1000,
            delay: this.props.index * 300, // Delay basado en el índice
            useNativeDriver: true,
        }).start();
    }

    render() {
        const { title, description, price, duration, imageSource, cuestionario, instrucciones, estado, mision, onPressTask, colorAleatorio, index } = this.props;
        console.log(windowWidth)
        return (
            <Animated.View style={{ opacity: this.fadeAnim }}>
                <TouchableOpacity
                    onPress={() => {
                        onPressTask(estado, cuestionario, mision, instrucciones, description)

                    }}
                    style={{
                        backgroundColor: "#272A31",
                        flexDirection: "row",
                        padding: 15,
                        paddingVertical: 25,
                        marginHorizontal: 30,
                        marginBottom: 20,
                        borderRadius: 60,
                        alignItems: "center",
                        borderBottomWidth: 0.3,
                        borderBottomColor: "#345c74"
                    }}
                >


                    <View style={{ top: title.length > 30 ? 0 : 0 }}>
                        <Text
                            allowFontScaling={false}
                            style={{
                                color: "white",
                                fontFamily: "Bold",
                                fontSize: 15,
                                paddingLeft: 14,
                                width: windowWidth * (windowWidth > 320 ? 0.60 : 0.55)
                            }}
                            numberOfLines={1} // Limita el texto a una sola línea
                            ellipsizeMode='tail' // Añade puntos suspensivos al final del texto si se desborda
                        >
                            {title}
                        </Text>
                        <Text style={{
                            color: "#8F8C9D",
                            fontSize: 12,
                            fontFamily: "Medium",
                            paddingLeft: 15
                        }}>
                            {duration} / {Number(price) === 0 ? "" : `${price}`} / {"encuesta"}
                        </Text>
                    </View>
                    <View style={{
                        bottom: title.length > 30 ? 5 : 0,
                        paddingLeft: 15,


                    }}>

                        <TouchableOpacity style={[styles.containers, { backgroundColor: Color.background, top: 5, borderRadius: 200, padding: 10 }]}

                            onPress={() => {
                                onPressTask(estado, cuestionario, mision, instrucciones)
                            }}
                        >



                            <View style={styles.rightIcon}>
                                <Icon name="chevron-right" size={24} color="white" />
                            </View>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Animated.View>

        )
    }
}

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
    leftContainer: {
        marginLeft: 10,
        paddingVertical: 5,
        paddingHorizontal: 5,
        marginBottom: 1,
    },
    listHeader: {
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
    listHeaderText: {
        color: "white",
        fontSize: 16,
        fontWeight: 'bold',
    },
    centerContainer: {
        flex: 1,
        paddingHorizontal: 15,
    },
    icon: {
        marginRight: 10,
    },
    timeText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
    titleText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    descText: {
        color: 'white',
        fontSize: 14,
    },
    rightIcon: {

        borderRadius: 50,
        height: 20,
        width: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        paddingVertical: 0,
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        maxHeight: '80%',
    },
    modalContents: {
        backgroundColor: 'white',
        paddingVertical: 10,
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        alignItems: 'center',
    },
    header: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
        borderRadius: 60,
    },
    modalContainer: {
        justifyContent: 'flex-end',
        margin: 0,
        borderRadius: 50,
    },
    modalItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    time: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    desc: {
        fontSize: 16,
        color: 'gray',
    },
    closeButton: {
        alignItems: 'center',
        marginTop: 10,
        backgroundColor: '#ddd',
        borderRadius: 4,
        padding: 8,
    },
    page: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        bottom: 0,

        left: '5%',
        right: '5%',
        padding: 10,
        borderRadius: 5,
        backgroundColor: 'purple',
        alignItems: 'center',
        color: 'white',
    },
    button2: {
        bottom: 0,
        left: '5%',
        right: '5%',
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#FFA000',
        alignItems: 'center',
        color: 'white',
    },
    container: {
        height: '100%',
        width: '100%',
    },
    map: {
        flex: 1,
        width: '100%',
    },
    markerContainer: {
        backgroundColor: 'purple',
        padding: 5,
        borderRadius: 5,
    },
    markerText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 12,
    },
    TouchableOpacityStyle: {
        //Here is the trick
        position: 'absolute',
        width: 80,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 10,
        bottom: 30,
    },
});