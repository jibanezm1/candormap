import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Alert, ActivityIndicator, Platform, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Image } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Modalize } from 'react-native-modalize';
import { TextInput } from 'react-native-paper';
import Input from '../../components/atoms/Input/Input';
import { bancosPorPais } from '../../utils/bancos';
import Picker from '../../components/atoms/Input/Picker';
import { RadioButton, List } from 'react-native-paper';
import { colors } from 'react-native-elements';
import BaseAppScreen from '../../templates/BaseAppScreen';
import { Border, Color, FontFamily } from '../../styles/Global';
import Cabeza from '../../components/molecules/Header';
import PrimaryButton from '../../components/atoms/Buttons/PrimaryButton';
import { Modal, ModalFooter, ModalButton, ModalContent } from 'react-native-modals';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Payment = () => {
  const navigation = useNavigation();
  const [montoDolares, setMontoDolares] = useState(0);
  const [montoPesosChilenos, setMontoPesosChilenos] = useState(0);
  const [currentUser, setCurrentUser] = React.useState([]);
  const modalizeRef = useRef(null);
  const [opcionesBancos, setOpcionesBancos] = useState([]);
  const [bancoSeleccionado, setBancoSeleccionado] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [inputMonto, setInputMonto] = useState('');

  const enviarDatos = async () => {
    try {
        const currentUser = await AsyncStorage.getItem('currentUser');
        const userId = currentUser ? JSON.parse(currentUser).idUsuario : null;

        if (userId) {
            const response = await axios.post(`https://candormap.cl/api/crear-solicitud`, {
                idUsuario: userId,
                monto: montoDolares, // Aquí debes proporcionar el monto deseado
            });
            setIsModalVisible(false); // Cierra la modal después de enviar
          
            if (response.data.data.status == 1) {

              Alert.alert("Solicitud enviada", "Tu solicitud ha sido enviada con éxito");
            }else{
              Alert.alert("Error", "Hubo un problema al enviar la solicitud");
            
            }
          }
    } catch (error) {
        console.error('Error creating solicitud:', error);
    }
};

 


  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const userString = await AsyncStorage.getItem('currentUser');
        console.log(userString);
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
  }, []);

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

      console.log("respuesta.data: ", respuesta.data);

      const montoEnDolares = respuesta.data.totalGanancias;
      setMontoDolares(montoEnDolares);

      // Segunda llamada para obtener la tasa de cambio
      const respuestaTasa = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
      let tasa;
      console.log(pais)
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
      console.log("tasa: ", tasa);
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

  return (<BaseAppScreen>

    {<ScrollView style={styles.container}>
      <Cabeza tittle="Pagos" />
      <Modal
        visible={isModalVisible}
        onTouchOutside={() => setIsModalVisible(false)}
        footer={
          <ModalFooter>
            <ModalButton
              text="CANCELAR"
              onPress={() => setIsModalVisible(false)}
            />
            <ModalButton
              text="RETIRAR"
              onPress={() => enviarDatos()}
            />
          </ModalFooter>
        }
      >
        <ModalContent>
          <View style={{ width: Dimensions.get("screen").width * 0.8 }}>
            <Text style={{ textAlign: "center" }}>{(() => {
              switch (currentUser.country_id) {
                case 1: return "CLP";
                case 2: return "BOB";
                case 5: return "ARS";
                case 4: return "USD";
                default: return "";
              }
            })()} {montoPesosChilenos.toFixed(0).toLocaleString()}</Text>
            <Text style={{ textAlign: "center", paddingVertical: 10 }}>¿Seguro que desea retirar el monto?</Text>
          </View>

        </ModalContent>
      </Modal>
      <View style={[styles.containers, { flexDirection: "row", top: 20 }]}>

        <Image

          style={styles.logoIcon}
          source={require("../../assets/images_black/icono.png")}
        />
        <Text style={{ color: "#D0D4E3", fontWeight: "500", paddingVertical: 2, paddingHorizontal: 10, fontSize: 12 }}>Candormap</Text>

      </View>


      <View style={[styles.containers, { marginHorizontal: 20 }]}>
        <Image
          style={[styles.image, { top: 50, paddingHorizontal: 30, marginRight: 40 }]}
          resizeMode="contain"
          source={require("../../assets/images_black/monedas.png")}
        />
        <View style={{ paddingHorizontal: 50 }}>
          <Text style={[styles.subtitulo,]}>
            {(() => {
              switch (currentUser.country_id) {
                case 1: return "CLP";
                case 2: return "BOB";
                case 5: return "ARS";
                case 4: return "USD";
                default: return "";
              }
            })()} {montoPesosChilenos.toFixed(0).toLocaleString()}
          </Text>
          <Text style={[styles.secondaryText, { marginTop: 10 }]}>Disponible para retirar</Text>

          <TouchableOpacity onPress={() => {
            navigation.navigate("History");
          }}>
            <View style={{
              flexDirection: "row",
              marginTop: 10,
              justifyContent: "center"

            }}>
              <Icon name="history" size={15} color="#8e44ad" />
              <Text style={[styles.secondaryText, {}]}>Historial</Text>

            </View>
          </TouchableOpacity>



        </View>

      </View>



    </ScrollView>}
    <View
      style={{
        justifyContent: 'flex-end',
        marginBottom: 36,
      }}>
      <PrimaryButton style={{ marginHorizontal: 30 }} title='Agregar Medio de Pago' onPress={() => {
        navigation.navigate("addPayment")
      }} />
      <PrimaryButton
        disabled={montoDolares > 10 && currentUser.pendiente == 0 ? false : true}
        style={{ marginHorizontal: 30, marginTop: 20 }} title="Solicitar Retiro"
        onPress={() => {

          setIsModalVisible(true); // Cierra la modal después de aceptar

        }}
      />
    </View>
  </BaseAppScreen>);

};

const styles = StyleSheet.create({
  radioBoton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
  },
  image: {
    width: "40%",
    top: 30,
    marginBottom: 50
  },
  logoIcon: {
    width: 20,
    height: 20,
    borderRadius: Border.br_12xs,
    overflow: "hidden",
  },
  container: {
    flex: 1,
    top: Platform.OS == 'android' ? 25 : 0,
  },
  containers: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',
  },
  subtitulo: {
    color: "#F6F6F6",
    lineHeight: 30,
    textAlign: "center",
    fontFamily: FontFamily.proximaNovaRegular,
    fontSize: 30,
  },
  radioTexto: {
    marginRight: 10,
    // ... Otros estilos para el texto
  },
  secondaryText: {
    textAlign: "center",
    color: Color.designLightGray,
    textTransform: "uppercase",
    fontSize: 12,
    fontFamily: FontFamily.proximaNovaRegular,
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
    backgroundColor: 'white',
    height: '100%',
  },
  buttonContainer: {
    flex: 1,
    alignItems: "center",
  },
  modalContent: {
    padding: 20,
    marginBottom: 500
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginBottom: 10
  },
  button: {
    marginHorizontal: 20,
    marginVertical: 20,
    backgroundColor: 'white',
    borderColor: "#4931a1",
    fontFamily: FontFamily.proximaNovaRegular,
    padding: 18,
    borderRadius: 60
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

export default Payment;
