import React from 'react'
import { View, Text, Image, ImageBackground, TouchableOpacity, StatusBar, Dimensions, } from 'react-native'
import { Modalize } from 'react-native-modalize'
import Chapters from './Chapters'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '../styles/Colors'
import Cabeza from '../components/molecules/Header'

const windowWidth = Dimensions.get('window').width; // Ancho de la ventana

export default class Xd extends React.Component {
    render() {
        return (

            <ImageBackground
                source={require('../assets/images/crs.png')}
                style={{ width: "100%", height: "100%" }}
            >

                <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
                    <Cabeza />
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Image
                            source={require('../assets/images/logos.png')}
                            style={{
                                height: 170, // Puedes ajustar esto según necesites
                                width: windowWidth * 0.8, // 80% del ancho de la pantalla
                                resizeMode: 'contain', // Asegura que la imagen se ajuste dentro de las dimensiones
                            }}
                        />
                        <Text style={{
                            color: "#FFF",
                            fontFamily: "Bold",
                            fontSize: 10,
                            width: 200,
                            alignSelf: "center",
                            textAlign: "center"
                        }}>Misiones</Text>
                        
                    </View>



                    <Modalize
                        panGestureEnabled={false}

                        modalStyle={{
                            borderTopLeftRadius: 60,
                            borderTopRightRadius: 60
                        }}
                        withHandle={false}
                        alwaysOpen={400}
                        scrollViewProps={{ showsVerticalScrollIndicator: false }}
                    >
                        <View style={{
                            flexDirection: "row",
                            marginHorizontal: 30,
                            marginTop: 40
                        }}>
                            <Image
                                source={require('../assets/images/2.jpg')}
                                style={{
                                    height: 50,
                                    width: 50,
                                    borderWidth: 2,
                                    borderColor: "#f58084",
                                    borderRadius: 50,
                                }}
                            />
                            <View style={{ marginHorizontal: 20 }}>
                                <Text style={{
                                    color: "#345c74",
                                    fontFamily: "Bold",
                                    fontSize: 18
                                }}>Mikolaj Galezioski</Text>
                                <Text style={{
                                    color: "#f58084",
                                    fontFamily: "Medium",
                                    fontSize: 12
                                }}>
                                    Author, UI/UX Designer
                                </Text>
                            </View>
                            <View style={{
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: "#fff2f2",
                                width: 40,
                                height: 40,
                                borderRadius: 40
                            }}>
                                <Image
                                    source={require('../assets/images/a2.png')}
                                />
                            </View>
                        </View>
                        <View>

                            <Chapters
                                num={1}
                                color="#fde6e6"
                                percent={25}
                                duration="2 hours, 20 minutes"
                                title="Introduction"
                                onPress={() => console.log("Hola")}
                            />
                            <Chapters
                                num={2}
                                color="#f9e1fc"
                                percent={50}
                                duration="1 hours, 35 minutes"
                                title="Design Tools"
                            />
                            <Chapters
                                num={3}
                                color="#e8f1fd"
                                percent={0}
                                duration="2 hours, 20 minutes"
                                title="Prototyping Tools"
                            />
                            <Chapters
                                num={4}
                                color="#e5ffef"
                                percent={0}
                                duration="2 hours, 20 minutes"
                                title="Summary & Exercise"
                            />
                            <Chapters
                                num={5}
                                color="#fbfaf6"
                                percent={0}
                                duration="0 hours, 30 minutes"
                                title="Conclusion"
                            />
                        </View>

                        <View
                            style={{
                                flexDirection: "row",
                                // paddingVertical: 5,
                                backgroundColor: "#fff2f2",
                                marginHorizontal: 20,
                                paddingVertical: 15,
                                alignItems: "center",
                                borderRadius: 10,
                                justifyContent: "center"
                            }}
                        >
                            <Text style={{
                                color: "#f58084",
                                fontFamily: "Bold",
                                fontSize: 13,
                                marginRight: 5
                            }}>Resume last lesson</Text>
                            <Image source={require('../assets/images/a2.png')} />
                        </View>
                    </Modalize>
                </SafeAreaView>
            </ImageBackground>

        )
    }
}