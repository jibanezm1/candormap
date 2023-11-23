import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, TouchableOpacity, Image, StatusBar } from 'react-native';

const Cabeza = () => {

    const navigation = useNavigation();
    return (
        <>
            <StatusBar translucent
            />
            <View style={{
                flexDirection: "row",
                width: "100%",
                paddingHorizontal: 20
            }}>
                <TouchableOpacity
                    onPress={() => console.log("Hola")}
                    style={{
                        paddingHorizontal: 10,
                        paddingVertical: 13,
                        borderRadius: 10,
                        marginTop: 30,

                    }}
                >
                    <Image
                        source={require('../../../assets/images/a1.png')}
                        style={{ height: 15, width: 20 }}
                    />
                </TouchableOpacity>
                <TouchableOpacity 
                onPress={()=>{
                    navigation.navigate('Profile');
                }}
                style={{
                    paddingHorizontal: 10,
                    paddingVertical: 13,
                    borderRadius: 10,
                    marginTop: 30,
                    marginLeft: 280
                }}>
                    <Image
                        source={require('../../../assets/images/hum.png')}
                        style={{ height: 20, width: 25 }}
                    />
                </TouchableOpacity>
            </View >
        </>
    );
};

export default Cabeza;
