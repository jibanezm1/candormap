import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import ProgressCircle from 'react-native-progress-circle'

interface ChaptersProps {
    title: string;
    description: string;
    price: number;
    duration: string;
    imageSource: string;
    cuestionario: any;
    instrucciones: string; // Add the 'instrucciones' property to the interface
    estado: string;
    mision: string;
    colorAleatorio: string;
    onPressTask: (estado: string, cuestionario: string, mision: string, instrucciones: string) => void;
}
export default class Chapters extends React.Component<ChaptersProps> {
    render() {
        const { title, description, price, duration, imageSource, cuestionario, instrucciones, estado, mision, onPressTask, colorAleatorio } = this.props;
        return (
            <TouchableOpacity
                onPress={() =>{
                     onPressTask(estado, cuestionario, mision, instrucciones)

                }}
                style={{
                    flexDirection: "row",
                    padding: 18,
                    marginHorizontal: 20,
                    borderRadius: 20,
                    alignItems: "center",
                }}
            >
                <View style={{
                    backgroundColor: colorAleatorio,
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                    borderRadius: 6
                }}>
                    <Text style={{
                        fontSize: 10,
                        fontFamily: "Bold"
                    }}>1</Text>
                </View>
                <View>
                    <Text
                        style={{
                            color: "#345c74",
                            fontFamily: "Bold",
                            fontSize: 13,
                            paddingLeft: 20,
                            width: 180
                        }}
                        numberOfLines={1} // Limita el texto a una sola línea
                        ellipsizeMode='tail' // Añade puntos suspensivos al final del texto si se desborda
                    >
                        {title.length > 20 ? `${title.substring(0, 20)}...` : title}
                    </Text>
                    <Text style={{
                        color: "#f58084",
                        fontSize: 12,
                        fontFamily: "Medium",
                        paddingLeft: 20
                    }}>
                        {duration}
                    </Text>
                </View>
                <Text style={{
                    color: "#345c74",
                    fontFamily: "Medium",
                    fontSize: 13,
                    width: 80
                }}>
                    {price}$
                </Text>

                <ProgressCircle
                    percent={100}
                    radius={17}
                    borderWidth={0.9}
                    color="#f58084"
                    shadowColor="#FFF"
                    bgColor={colorAleatorio}
                >
                    <Image
                        source={require('../assets/images/pl.png')}
                    />
                </ProgressCircle>
            </TouchableOpacity>
        )
    }
}