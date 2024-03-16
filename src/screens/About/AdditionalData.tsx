import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet, Alert, Dimensions, Animated, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Cabeza from '../../components/molecules/Header';
import { Modalize } from 'react-native-modalize';
import colors from '../../styles/Colors';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Input from '../../components/atoms/Input/Input';
import PhoneInput from 'react-native-international-phone-number';
import { useDispatch, useSelector } from 'react-redux';
import COLORS from '../../consts/Colors';
import MenuItem from '../../components/molecules/MenuItem';
import axios from 'axios';
import { loginUser } from '../../redux/slices/usuariosSlice';
import PrimaryButton from '../../components/atoms/Buttons/PrimaryButton';
import GlobalStyles from '../../styles/GlobalStyles';
import { Color } from '../../styles/Global';

const AdtionalData = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const windowHeight = Dimensions.get('window').height;
    const desiredHeight = windowHeight * 0.83; // 80% de la altura de la pantalla

    const [currentUsers, setCurrentUser] = React.useState([]);
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


    const [selectedCountry, setSelectedCountry] = useState(null);

    const [nombre, setNombre] = useState('');
    const [idUsuario, setIdUsuario] = useState('');

    const [apellidos, setApellidos] = useState('');
    const [email, setEmail] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const [status, setStatus] = useState('');
    const [error, setError] = useState(false);
    const [logoAnimation] = useState(new Animated.Value(0)); // Valor animado para la animación


    const isJSON = (str: any) => {
        try {
            JSON.parse(str);
            return true;
        } catch (error) {
            return false;
        }
    };

    useEffect(() => {
        if (currentUsers) {
            const user = currentUsers;
            console.log(user.telefono);
            setNombre(user.nombre);
            setApellidos(user.apellidos);
            setIdUsuario(user.idUsuario);
            setEmail(user.email);
            setInputValue(user.telefono);
        }



    }, [currentUsers]);








    const handleSelectedCountry = (country) => {
        setSelectedCountry(country);
    }

    const handleInputValue = (phoneNumber) => {
        setInputValue(phoneNumber);
    }

    const handleUpdate = async () => {
        console.log(nombre);
        if (!nombre || !apellidos || !email || !inputValue) {
            setStatus("Por favor, complete todos los campos.");
            setIsVisible(true);
            return;
        }

        const userData = {
            idUsuario: idUsuario,
            nombre: nombre,
            apellidos: apellidos,
            email: email,
            telefono: inputValue,
            country: selectedCountry ? selectedCountry.cca2 : "CL"
        };

        console.log(userData);

        try {
            const response = await axios.post('https://candormap.cl/api/update', userData);
            const user = response.data;
            await AsyncStorage.setItem('currentUser', JSON.stringify(user));
            dispatch(loginUser(user));

            // Muestra un mensaje de éxito
            Alert.alert(
                "Éxito",
                "Datos actualizados correctamente",
                [
                    {
                        text: "OK",
                        onPress: () => navigation.goBack() // Navegar a la pantalla anterior
                        // O puedes usar navigation.navigate('NombreDeLaPantalla')
                    }
                ]
            );
        } catch (error) {
            // Aquí puedes manejar los errores, por ejemplo, mostrar un mensaje
            Alert.alert("Error", "No se pudieron actualizar los datos.");
        }
    };

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
        <Cabeza />
        <View style={{ marginHorizontal: 20, top: 120 }}>
            <Animated.View style={logoStyle}>
                <Text style={{ color: "#C889FF", fontSize: 40 }}>Información Personal</Text>
            </Animated.View>




        </View>

        <View style={{ marginHorizontal: 10 }}>
            {
                currentUsers ? <View style={{ height: 1000, padding: 10 }}>



                    <Text>{status}</Text>
                    <View style={GlobalStyles.inputContainer}>
                        <Input
                            placeholderTextColor={'#8F8C9D'}
                            placeholder='Ingrese su Nombre'
                            disabled={false}
                            value={nombre} // Usar el estado "nombre" como valor
                            style={{ marginVertical: 10 }}
                            onChangeText={text => setNombre(text)} // Actualizar el estado "nombre"
                        />
                        <Input
                            placeholderTextColor={'#8F8C9D'}
                            placeholder='Ingrese su Apellido'
                            disabled={false}
                            value={apellidos} // Usar el estado "apellidos" como valor
                            style={{ marginVertical: 10 }}

                            onChangeText={text => setApellidos(text)} // Actualizar el estado "apellidos"
                        />
                        <Input
                            placeholderTextColor={'#8F8C9D'}
                            placeholder='Ingrese su email'
                            disabled={false}
                            value={email}
                            style={{ marginVertical: 10 }}

                            onChangeText={text => setEmail(text)}
                        />



                        <Input
                            placeholderTextColor={'#8F8C9D'}
                            placeholder='Codigo de Area + Num. de Telefono'
                            disabled={false}
                            value={inputValue}
                            style={{ marginVertical: 10 }}


                            onChangeText={text => setInputValue(text)}
                        />

                        <PrimaryButton title='Actualizar mis datos' onPress={handleUpdate} />

                    </View>
                    
                    



                </View> : null
            }
        </View>

    </SafeAreaView>

    )
}


export default AdtionalData;


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
