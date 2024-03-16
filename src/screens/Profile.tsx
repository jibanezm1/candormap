import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, StatusBar, Platform, Share, Dimensions } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { Switch } from 'react-native-paper';
import ProgressCircle from 'react-native-progress-circle'
import { ProgressBar, MD3Colors } from 'react-native-paper';
import PrimaryButton from '../components/atoms/Buttons/PrimaryButton';
import MenuItem from '../components/molecules/MenuItem';
import { Image } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../redux/slices/usuariosSlice';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Cabeza from '../components/molecules/Header';
import IconN from 'react-native-vector-icons/SimpleLineIcons';
import { Color } from '../styles/Global';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../styles/Colors';
import COLORS from '../consts/Colors';

const windowWidth = Dimensions.get('window').width;

// SCREEN CON EL PERFIL DE USUARIO (INVESTIGADOR O ENCUESTADO)

const Profile = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const currentUser = useSelector(state => state.usuarios.currentUser);
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const [percentage, setPercentage] = React.useState(0);
  const [level, setLevel] = React.useState('Experto');
  const [total, setTotal] = React.useState(100);
  const [progress, setProgress] = React.useState(0);
  const [userType, setUserType] = React.useState(""); // Tipo de usuario por defecto

  const onToggleSwitch = () => {
    setIsSwitchOn(!isSwitchOn);
    setUserType(isSwitchOn ? 'Investigador' : 'Encuestado');

    var status = isSwitchOn ? 1 : 2;

    // Aquí realizamos la solicitud a tu servidor PHP
    axios.get('https://candormap.cl/api/perfil?idUsuario=' + currentUser.idUsuario + '&idPerfil=' + status)
      .then(response => {
        // Manejar la respuesta si es necesario
        console.log('Respuesta del servidor:', response.data);
      })
      .catch(error => {
        // Manejar el error si ocurre algún problema
        console.error('Error al enviar la solicitud:', error);
      });
  };


  React.useEffect(() => {

    if (currentUser) {
      axios.get('https://candormap.cl/api/profile?idUsuario=' + currentUser.idUsuario)
        .then(response => {
          // Manejar la respuesta si es necesario
          setIsSwitchOn(response.data.idPerfil === 1 ? false : true);
          setUserType(response.data.idPerfil === 1 ? "Investigador" : "Encuestado");
          setPercentage(response.data.porcentajes);
          setProgress(response.data.resueltos);
          setTotal(response.data.disponibles);
          setLevel(response.data.nivelUsuario);
          console.log(currentUser.idUsuario)

        })
        .catch(error => {
          // Manejar el error si ocurre algún problema
          console.error('Error al enviar la solicitud:', error);
        });
    }

  }, [])


  const tasksData = [
    {
      id: 1,
      title: 'Datos adicionales',
      name: 'PersonalInfo',
      imageSource: require('../assets/iconos/informacion.png'),
    },
    {
      id: 2,
      title: 'Información personal',
      name: 'AdditionalData',
      imageSource: require('../assets/iconos/datos.png'),

    },
    {
      id: 3,
      title: 'Preguntas frecuentes',
      name: 'Faqs',
      imageSource: require('../assets/iconos/preguntas.png'),
    },
    {
      id: 4,
      title: 'Contacto',
      name: 'Contact',
      imageSource: require('../assets/iconos/contacto.png'),
    },
    {
      id: 5,
      title: 'Notificaciones',
      name: 'Notifications',
      imageSource: require('../assets/iconos/notificaciones.png'),
    },
    {
      id: 6,
      title: 'Acerca de',
      name: 'AboutUs',
      imageSource: require('../assets/iconos/acercade.png'),
    },
  ];


  const handleItemClick = () => {
    Alert.alert('Aviso', 'Esta funcionalidad estará disponible próximamente');
  };

  const askForConfirmation = () => {
    Alert.alert(
      'Confirmación',
      '¿Estás seguro de que deseas eliminar la cuenta?',
      [
        {
          text: 'No',
          style: 'cancel'
        },
        {
          text: 'Sí',
          onPress: handleDisableUser
        }
      ]
    );
  };

  const handleDisableUser = async () => {
    try {

      const response = await axios.post('https://candormap.cl/api/disable?idUsuario=' + currentUser.idUsuario);

      if (response.data.status === 'success') {
        Alert.alert(
          ' ',
          'Usuario deshabilitado con éxito',
          [
            {
              text: 'OK',
              onPress: handleLogout
            }
          ]
        );
      } else {
        Alert.alert('Error', response.data.message || 'Error al deshabilitar al usuario');
      }
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al deshabilitar al usuario');
    }
  };


  const handlePress = (screenName: string) => {
    navigation.navigate(screenName as never);
  };


  const handleLogout = async () => {
    try {
      // 1. Elimina el usuario del AsyncStorage
      await AsyncStorage.removeItem('currentUser');
      await AsyncStorage.removeItem('biometricEnabled');

      // 2. Actualiza el estado de Redux (asumiendo que tienes una acción `logoutUser`)
      dispatch(logoutUser());

      // 3. Navega el usuario de regreso a la pantalla de login o inicio
      navigation.navigate('Welcome');  // Asume que tienes una pantalla llamada 'LoginScreen' en tu Navigator

    } catch (error) {
      console.error("Error al hacer logout:", error);
    }
  };
  const onShare = async () => {
    let message = `¡Descubre Candormap! Una aplicación innovadora para participar en estudios de mercado.\n\n`;

    // Agregar enlaces específicos de la plataforma
    if (Platform.OS === 'android') {
      message += `Descárgala en Google Play: https://play.google.com/store/apps/details?id=com.candormap`;
    } else if (Platform.OS === 'ios') {
      message += `Descárgala en App Store: https://apps.apple.com/gt/app/candormapcl/id6467161987`;
    }

    try {
      const result = await Share.share({ message });

      // Manejar la respuesta de compartir
      // ...
    } catch (error) {
      Alert.alert(error.message);
    }
  };
  const footer = () => {
    return (<View style={{ marginBottom: 100 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-around", marginBottom: 60 }}>
        <Text style={{ color: "white", top: 20, left: 25, fontSize: 20, width: 200 }}>Referir a un Amigo</Text>
        <View style={styles.rightIcon}>
          <IconN name="paper-plane" size={15} color="white" />
        </View>
      </View>
      <View style={{ flex: 1, marginTop: 20 }}>

        {/* <TouchableOpacity style={[styles.bookNowBtn, { right: 21, top: 20 }]}
          onPress={() => handleLogout()} >
          <Text style={styles.footerText}>Cerrar sesión</Text>
        </TouchableOpacity> */}
        <PrimaryButton title="Cerrar sesión" onPress={handleLogout} />
        <TouchableOpacity onPress={askForConfirmation}>
          <Text style={{ textAlign: "center", color: "#64666E", top: 30, fontSize: 15 }}>Eliminar mi cuenta</Text>
        </TouchableOpacity>
      </View>


    </View>)
  }
  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
        <Cabeza tittle="Perfil" />

        <ScrollView style={{ backgroundColor: colors.background, padding: 10, top: 10 }}>
          <View style={styles.container}>


          </View>
          <View style={{ flex: 1, alignItems: "center" }}>
            <ProgressCircle
              percent={percentage}
              radius={50}

              borderWidth={8}
              color="#C485F7"
              shadowColor="#2D292D"
              bgColor="black"
            >
              <Text style={{ fontSize: 18, color: "white", fontWeight: "700" }}>{percentage}%</Text>
            </ProgressCircle>
            <Text style={{ fontSize: 15, fontWeight: '300', color: "#64666E", top: 5 }}>{level}</Text>
            <View style={[styles.row, { backgroundColor: "white", paddingVertical: 15, borderRadius: 60, width: "90%", marginTop: 20 }]}>
              <Text style={styles.title}>{userType}</Text>
              <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
            </View>
          </View>


          <View style={{ flexDirection: "row", marginLeft: 40, marginRight: 20, marginTop: 10 }}>
            <Text style={{ marginVertical: 5, color: "#C485F7", fontWeight: '600' }}>{progress}/{total}</Text>
            <View style={{ width: "65%", margin: 10 }}>
              <ProgressBar style={{ height: 10, borderRadius: 60 }} progress={percentage} color="#C485F7" />
            </View>
          </View>

          <View style={{ width: "72%", alignSelf: 'center', marginBottom: 30 }} >
            <Text style={{ fontSize: 15, top: 10, fontWeight: '300', color: "#64666E" }}>
              Aún te falta llenar algunos datos de tu perfil. <TouchableOpacity onPress={() => handlePress('PersonalInfo')}>
                <Text style={{ color: "white", top: 4 }}>Completar</Text>
              </TouchableOpacity>
            </Text>



          </View>
          <View style={styles.containerProgress}>

            <FlatList
              nestedScrollEnabled={true}

              data={tasksData}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <MenuItem
                  title={item.title}
                  onPress={() => handlePress(item.name)}
                  imageSource={item.imageSource}
                />
              )}
              ListFooterComponent={footer}


            />

          </View>
        </ScrollView>
      </SafeAreaView >
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 50,
    alignItems: 'center',
  },
  official3: {

    width: "100%",
  },
  bookNowBtn: {
    height: 50,
    backgroundColor: Color.white,
    borderRadius: 30,
    marginRight: 30,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: windowWidth * 0.040,
  },
  rightIcon: {
    backgroundColor: '#282B32',
    borderRadius: 50,
    marginTop: 18,
    right: 25,
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    flex: 1, // Asegura flexibilidad
    borderWidth: 1,
    borderColor: "#4931a1",
    paddingHorizontal: 26,
    padding: 10,
    borderRadius: 10,
    minWidth: 100, // Ancho mínimo para el botón
    margin: 5, // Margen entre botones
    justifyContent: 'center', // Centra el contenido horizontalmente
    alignItems: 'center', // Centra el contenido verticalmente
  },
  containerButtons: {
    flexDirection: "row",
    justifyContent: 'space-around', // Distribuye el espacio alrededor de los botones
    alignItems: 'center', // Alinea los botones verticalmente
  },

  containerProgress: {
    padding: 5,
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowExpand: {
    marginTop: 65,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    marginHorizontal: 60,
    fontSize: 18,
  },
  footerText: {
    color: "black",
    fontSize: 16,

    fontWeight: '100',
  },
});

export default Profile;
