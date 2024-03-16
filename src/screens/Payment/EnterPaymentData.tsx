import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Alert, SafeAreaView, ImageBackground, Dimensions, Image, ScrollView, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Modalize } from 'react-native-modalize';
import Input from '../../components/atoms/Input/Input';
import { bancosPorPais } from '../../utils/bancos';
import { RadioButton, List } from 'react-native-paper';
import { colors } from 'react-native-elements';
import Cabeza from '../../components/molecules/Header';
import MenuItem from '../../components/molecules/MenuItem';
import PrimaryButton from '../../components/atoms/Buttons/PrimaryButton';
import { Color } from '../../styles/Global';

const AddPayment = () => {
    const navigation = useNavigation();
    const [montoDolares, setMontoDolares] = useState(0);
    const [montoPesosChilenos, setMontoPesosChilenos] = useState(0);
    const [currentUser, setCurrentUser] = React.useState([]);
    const modalizeRef = useRef(null);
    const [opcionesBancos, setOpcionesBancos] = useState([]);
    const [bancoSeleccionado, setBancoSeleccionado] = useState('');
    const tiposDeCuentas = ['Cuenta de Ahorros', 'Cuenta Corriente', 'Cuenta de Nómina']; // Agrega más si es necesario
    const [expanded, setExpanded] = useState(false);
    const [expandedb, setExpandedb] = useState(false);
    const [cuentas, setCuentas] = useState([]);

    const [selectedOption, setSelectedOption] = useState('');


    const windowHeight = Dimensions.get('window').height;
    const desiredHeight = windowHeight * 0.83; // 80% de la altura de la pantalla
    const [logoAnimation] = useState(new Animated.Value(0)); // Valor animado para la animación
    const obtenerCuentasUsuario = async () => {
        try {
            const userString = await AsyncStorage.getItem('currentUser');
            if (userString) {
                const user = JSON.parse(userString);
                setCurrentUser(user);

                // Realizar la solicitud HTTP para obtener las cuentas del usuario
                const response = await axios.get(`https://candormap.cl/api/cuentausuario?idUsuario=${user.idUsuario}`);

                console.log('Respuesta de la API:', response.data);
                if (response.data && response.data.length > 0) {
                    // Actualizar el estado con las cuentas recibidas
                    setDatosCuenta({
                        Nombre_Titular: response.data[0].Nombre_Titular,
                        Numero_Cuenta: response.data[0].Numero_Cuenta,
                        Banco: response.data[0].Banco,
                        Tipo_Cuenta: response.data[0].Tipo_Cuenta,
                        Moneda: response.data[0].Moneda
                    });
                    setSelectedOption(response.data[0].Tipo_Cuenta);
                    setBancoSeleccionado(response.data[0].Banco);
                }

            }
        } catch (error) {
            console.error("Error al obtener las cuentas del usuario:", error);
        }
    };

    useEffect(() => {
        obtenerCuentasUsuario();
    }, []);

    const handleTipoCuentaSelect = (tipoCuenta) => {
        setDatosCuenta({ ...datosCuenta, Tipo_Cuenta: tipoCuenta });
        setSelectedOption(tipoCuenta);
        setExpanded(false);
    };
    const [datosCuenta, setDatosCuenta] = useState({
        Nombre_Titular: '',
        Numero_Cuenta: '',
        Banco: '',
        Tipo_Cuenta: '',
        Moneda: ''
    });
    const codigoPaisPorId = {
        1: 'CL',
        2: 'BO',
        5: 'AR',
        3: 'US',
        4: 'FR'
        // Continúa con otros mapeos si es necesario
    };
    const codigoPais = codigoPaisPorId[currentUser.country_id] || '';
    const bancos = bancosPorPais[codigoPais] || [];

    const onOpen = () => {
        modalizeRef.current?.open();
    };



    const enviarDatos = async () => {
        try {
            const requestData = {
                Nombre_Titular: datosCuenta.Nombre_Titular,
                Numero_Cuenta: datosCuenta.Numero_Cuenta,
                Banco: datosCuenta.Banco,
                Tipo_Cuenta: datosCuenta.Tipo_Cuenta,
                Moneda: datosCuenta.Moneda,
                idUsuario: currentUser.idUsuario
            };

            const response = await axios.post('https://candormap.cl/api/cuenta', requestData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.data.success) {
                Alert.alert('Datos enviados con éxito');
                navigation.navigate('Payment');
            } else {
                Alert.alert('Error al enviar los datos');
            }
        } catch (error) {
            console.error('Hubo un error al enviar los datos:', error);
            Alert.alert('Hubo un error al enviar los datos');
        }
    };



    const seleccionarBanco = (banco) => {
        setBancoSeleccionado(banco);
        setDatosCuenta({ ...datosCuenta, Banco: banco });
    };


    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const userString = await AsyncStorage.getItem('currentUser');
                if (userString) {
                    const user = JSON.parse(userString);
                    setCurrentUser(user);

                    const codigoPais = codigoPaisPorId[currentUser.country_id] || '';
                    const bancos = bancosPorPais[codigoPais] || [];
                    const a = bancos.map(banco => ({ label: banco, value: banco }));
                    setOpcionesBancos(a);

                    if (user.idUsuario) {
                        obtenerMontoDolares(user.idUsuario, user.country_id);
                    }
                }
            } catch (error) {
                console.error("Error al leer el valor de AsyncStorage:", error);
            }
        };
        fetchData();
    }, []);

    const handleChangeBanco = (value) => {




        setDatosCuenta({ ...datosCuenta, Banco: value });
    };

    React.useEffect(() => {
        // Función para cargar datos cuando la pantalla obtiene el foco
        const cargarDatos = () => {
            // Aquí tu lógica para cargar datos, por ejemplo:
            const fetchData = async () => {
                try {
                    const userString = await AsyncStorage.getItem('currentUser');
                    if (userString) {
                        const user = JSON.parse(userString);
                        setCurrentUser(user);
                        if (user.idUsuario) {
                            obtenerMontoDolares(user.idUsuario, user.country_id);
                        }
                    }
                } catch (error) {
                    console.error("Error al leer el valor de AsyncStorage:", error);
                }
            };
            fetchData();
        };

        // Suscribirse al evento de foco
        const unsubscribe = navigation.addListener('focus', cargarDatos);

        // Desuscribirse al desmontar el componente
        return unsubscribe;
    }, [navigation]);

    const obtenerMontoDolares = async (idUsuario, pais) => {
        try {
            // Primera llamada para obtener el monto en dólares
            const apiUrl = `https://candormap.cl/api/ganancias?idUsuario=${idUsuario}`;
            const respuesta = await axios.get(apiUrl);
            const montoEnDolares = respuesta.data.totalGanancias;
            setMontoDolares(montoEnDolares);

            // Segunda llamada para obtener la tasa de cambio
            const respuestaTasa = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
            let tasa;

            switch (pais) { // Utiliza el parámetro 'pais' que ahora representa el código del país
                case 1: // Chile
                    tasa = respuestaTasa.data.rates.CLP; // Tasa de USD a CLP
                    break;
                case 2: // Bolivia
                    tasa = respuestaTasa.data.rates.BOB; // Tasa de USD a BOB
                    break;
                case 5: // Argentina
                    tasa = respuestaTasa.data.rates.ARS; // Tasa de USD a ARS
                    break;
                case 3: // Estados Unidos
                    tasa = 1; // La moneda ya está en dólares, no necesita conversión
                    break;
                default:
                    tasa = 1; // Si el país no está soportado, no convertir
            }

            setMontoPesosChilenos(montoEnDolares * tasa);
        } catch (error) {
            console.error('Error al obtener el monto o la conversión:', error);
        }
    };




    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: 'Pago',
            headerTitleStyle: {
                color: 'white',
                fontSize: 24,
                fontWeight: 'bold',
            },
            headerStyle: {
                backgroundColor: 'purple',
            },
        });
    }, [navigation]);


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
            <Cabeza />
            <View style={{ marginHorizontal: 30, top: 100 }}>
                <Animated.View style={logoStyle}>
                    <TouchableOpacity onPress={() => { navigation.navigate("HomeTask") }} >
                        <Text style={{ color: "#C889FF", fontSize: 40 }}>Forma de Pago</Text>

                    </TouchableOpacity>
                </Animated.View>

               
               

            </View>

            <View style={styles.contenedor}>
                <ScrollView style={{ paddingBottom: 300, padding: 30 }}>
                    <Input
                        style={{ marginVertical: 10 }}

                        placeholder="Nombre Titular"
                        value={datosCuenta.Nombre_Titular}
                        placeholderTextColor={'#8F8C9D'}
                        disabled={false}
                        onChangeText={text => setDatosCuenta({ ...datosCuenta, Nombre_Titular: text })}
                    />
                    <Input
                        style={{ marginVertical: 10 }}
                        placeholder="Número de Cuenta"
                        value={datosCuenta.Numero_Cuenta}
                        placeholderTextColor={'#8F8C9D'}
                        disabled={false}
                        onChangeText={text => setDatosCuenta({ ...datosCuenta, Numero_Cuenta: text })}
                    />
                    <List.Accordion
                        title={selectedOption ? `TC: ${selectedOption}` : "Seleccionar Tipo de Cuenta"}
                        expanded={expanded}
                        onPress={() => setExpanded(!expanded)}
                        style={{ backgroundColor: "#272A31", padding: 30, marginVertical: 10, borderRadius: 60 }}
                        titleStyle={{ color: "white" }}
                        theme={{ colors: { background: Color.background } }}
                    >
                        <View style={{ padding: 10 }}>
                            {tiposDeCuentas.map((tipo, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={[
                                        styles.option,
                                        selectedOption === tipo && styles.selectedOption,
                                    ]}
                                    onPress={() => handleTipoCuentaSelect(tipo)}
                                >
                                    <Text style={{ color: 'white' }}>{tipo}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </List.Accordion>

                    <List.Accordion
                        title={bancoSeleccionado ? `Banco: ${bancoSeleccionado}` : "Seleccionar Banco"}
                        expanded={expandedb}
                        onPress={() => setExpandedb(!expandedb)}
                        style={{ backgroundColor: "#272A31", padding: 30, marginVertical: 10, borderRadius: 60 }}
                        titleStyle={{ color: "white" }}
                        theme={{ colors: { background:Color.background } }}
                    >
                        <View style={{ padding: 10 }}>
                            {bancos.map((banco, index) => (
                                <List.Item
                                    key={index}

                                    title={banco}
                                    onPress={() => {
                                        setBancoSeleccionado(banco);
                                        setDatosCuenta({ ...datosCuenta, Banco: banco });
                                        setExpandedb(false);
                                    }}
                                    titleStyle={[
                                        styles.optionText,
                                        bancoSeleccionado === banco && styles.selectedOptionText,
                                    ]}
                                    style={[
                                        styles.option,
                                        bancoSeleccionado === banco && styles.selectedOption,
                                    ]}
                                    left={() => <RadioButton.Android color="white" value={banco} status={bancoSeleccionado === banco ? 'checked' : 'unchecked'} />}
                                />
                            ))}
                        </View>
                    </List.Accordion>


                    <Input
                        style={{ marginVertical: 10 }}

                        placeholder="Moneda"
                        value={datosCuenta.Moneda}
                        placeholderTextColor={'#8F8C9D'}
                        disabled={false}
                        onChangeText={text => setDatosCuenta({ ...datosCuenta, Moneda: text })}
                    />





                    <PrimaryButton

                        type="primary"
                        title="Enviar Datos"
                        size='small'
                        style={{ width: '100%', marginBottom: 100, marginVertical: 10 }}
                        onPress={() => { enviarDatos(); }} // Llama a la función handleLogin cuando se presione el botón
                    />
                </ScrollView>
            </View>


        </SafeAreaView>

    )
};

const styles = StyleSheet.create({
    radioBoton: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        margin: 5
    },
    radioTexto: {
        marginRight: 10,
        color: "white"
        // ... Otros estilos para el texto
    },
    option: {
        padding: 10,
        marginVertical: 10,
        backgroundColor: '#272A31',
        borderRadius: 8,
        marginBottom: 8,
    },
    optionText: {
        color: 'white',
    },
    selectedOption: {
        backgroundColor: '#C889FF', // Color morado cuando está seleccionado
    },
    selectedOptionText: {
        fontWeight: 'bold', // Texto en negrita cuando está seleccionado
    },
    radioCirculo: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioCirculoSeleccionado: {
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor: '#000',
    },
    contenedor: {

        height: '100%',
    },
    buttonContainer: {
        flex: 1,
        alignItems: "center",
    },
    modalContent: {
        flex: 1,
        padding: 10,
        marginBottom: 600
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        marginBottom: 10
    },
    button: {
        borderWidth: 1,
        borderColor: "#4931a1",
        paddingHorizontal: 26,
        padding: 10,
        borderRadius: 10
    },
    button3: {
        textAlign: 'center',
        borderWidth: 1,
        width: "100%",
        borderColor: "#4931a1",
        padding: 15,
        borderRadius: 10
    },
    button2: {
        textAlign: 'center',
        borderWidth: 1,
        width: "100%",
        borderColor: "#4931a1",
        padding: 15,
        borderRadius: 10
    },
    containerButtons: {
        justifyContent: "space-around",
        flexDirection: "row",
    },
    official3: {
        marginLeft: 30,
        width: "100%",
    },
    button1: {
        backgroundColor: "#4931a1",
        paddingHorizontal: 37,
        padding: 10,
        borderRadius: 10
    },
    texto1: {
        color: 'rgba(46, 58, 89, 1)',
        textAlign: 'center',
        fontWeight: '100',
        fontSize: 35,
        paddingHorizontal: 50,
        marginTop: 100,
    },
    texto: {
        color: 'rgba(46, 58, 89, 1)',
        textAlign: 'center',
        fontWeight: '500',
        fontSize: 20,
        paddingHorizontal: 50,
    },
    lista: {
        marginTop: 50,
    },
});

export default AddPayment;
