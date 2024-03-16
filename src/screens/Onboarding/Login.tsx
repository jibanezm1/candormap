import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, KeyboardAvoidingView, ActivityIndicator, TouchableOpacity, Linking, Platform, Dimensions } from 'react-native';
import BaseAppScreen from '../../templates/BaseAppScreen';
import Button from '../../components/atoms/Buttons/Button';
import PrimaryButton from '../../components/atoms/Buttons/PrimaryButton';
import Metrics from '../../styles/Metrics';
import Colors from '../../styles/Colors';
import GlobalStyles from '../../styles/GlobalStyles';
import Input from '../../components/atoms/Input/Input';
import { Image } from 'react-native-elements';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/slices/usuariosSlice';
import { ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import Icon from 'react-native-vector-icons/MaterialIcons';  // Puedes cambiarlo por el paquete de íconos que prefieras
import { Color, FontFamily } from '../../styles/Global';
import FontAwesome, { BrandIcons } from 'react-native-vector-icons/FontAwesome';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const [showButtonBiometric, setShowButtonBiometric] = useState(false);
  useEffect(() => {
    valid();
  }, []);


  const authenticateUser = async () => {
    try {
      const result = await FingerprintScanner.authenticate({ description: 'Escanea tu huella' });
      if (result) {
        await AsyncStorage.setItem('biometricEnabled', 'true');
        biometricLogin();
      }
      console.log('Resultado de la autenticación biométrica:', result);

      // biometricLogin();
    } catch (error) {
      console.error("Error en la autenticación biométrica", error);
      // Manejo del error específico, pero permitiendo que el flujo continúe
      if (error.name !== 'FingerprintScannerNotEnrolled') {
        // Manejar otros errores de forma diferente si es necesario
      }
    }
  };

  const biometricLogin = async () => {
    const valid = await AsyncStorage.getItem('biometricEnabled');
    if (valid) {
      navigation.navigate('HomeTask');

    }
    // Si 'valid' no es verdadero, no se realiza ninguna acción adicional aquí,
    // lo que permite que el flujo continúe hacia la navegación que sigue a `authenticateUser` en `handleLogin`.
  };

  const valid = async () => {
    let currentUser = null;

    try {
      const biometricEnabled = await AsyncStorage.getItem('biometricEnabled');
      const currentUserString = await AsyncStorage.getItem('currentUser');
      currentUser = currentUserString ? JSON.parse(currentUserString) : null;

      const isSupported = await FingerprintScanner.isSensorAvailable();


      if (biometricEnabled && isSupported) {
        setShowButtonBiometric(true);
        setIsBiometricSupported(true);
      }
    } catch (error) {
      if (error.name === 'FingerprintScannerNotEnrolled') {
        console.warn('Advertencia: No hay huellas dactilares registradas en el escáner.');
      } else {
        console.error('Error al utilizar FingerprintScanner:', error);
      }
    }

    // Establecer el email independientemente de si hubo un error o no
    if (currentUser) {
      setEmail(currentUser.email);
    }
  };



  const handleLogin = async () => {
    setIsLoading(true);

    try {
      // Realiza la autenticación
      const response = await axios.post('https://candormap.cl/api/login', {
        email: email,
        password: password,
      });

      // Obtén la respuesta del servidor
      const user = response.data;

      // Guarda la información del usuario en el AsyncStorage
      await AsyncStorage.setItem('currentUser', JSON.stringify(user));

      // Actualiza el estado de Redux con la acción loginUser
      dispatch(loginUser(user));


      await authenticateUser();

      // Navega a la pantalla Onboarding u otras acciones
      setIsLoading(false);
      // navigation.navigate('Onboarding'); 

      navigation.navigate('HomeTask');
      // navigation.navigate('BottomTabNavigator', { screen: 'HomeTask' });
    } catch (error) {
      setIsLoading(false);

      // Manejo de errores
      console.error(error);

      Alert.alert(
        'Error de inicio de sesión',
        'Hubo un problema al intentar iniciar sesión. Por favor, verifica tus credenciales e intenta nuevamente.',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false }
      );
    }
  };
  const handleItemClick = () => {
    const url = 'https://candormap.cl/recover?hash=a3dcb4d229de6fde0db5686dee47145d';

    // Abrir URL
    Linking.openURL(url)
      .catch(err => console.error('Error al abrir la URL', err));
  };


  return (
    <BaseAppScreen >

      <ScrollView>
        <View style={[styles.container, {}]}>
          <Image
            style={[{ paddingVertical: 5, width: 40, height: 40, marginBottom: 10 }]}

            source={require("../../assets/images_black/persona.png")}
          />

          <View style={{ top: 5, }}>
            <Text style={[styles.subtitulo,]}>Iniciar sesión!</Text>

            <Text style={[GlobalStyles.secondaryText, { marginTop: 20 }]}>Hola, bienvenido de nuevo.</Text>

            {isLoading && <ActivityIndicator />}

            <View style={[GlobalStyles.inputContainer]}>

              <Input
                placeholder='Ingrese su Correo'
                placeholderTextColor={'#8F8C9D'}
                disabled={false}
                value={email}
                onChangeText={setEmail}
              />
              <Input
                placeholder='Ingrese una contraseña'
                placeholderTextColor={'#8F8C9D'}
                disabled={false}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />

              <PrimaryButton type='primary' title="Iniciar sesión" onPress={handleLogin} />
              <TouchableOpacity style={{ marginTop: 10 }} onPress={handleItemClick}>
                <Text style={{ textAlign: 'center', color: "#64666E" }}>¿Olvidaste tu Contraseña?</Text>
              </TouchableOpacity>
              <Text style={{ textAlign: 'center', color: "#64666E", marginTop: 65 }}>o inicia sesión con</Text>

            </View>
            <View style={styles.containers}>
              <SocialButton iconName="google" onPress={() => { Alert.alert("Proximamente") }} />
              <SocialButton iconName="apple" onPress={() => { Alert.alert("Proximamente") }} />
              <SocialButton iconName="facebook" onPress={() => { Alert.alert("Proximamente") }} />
            </View>
            <View style={{ alignSelf: 'center' }} >

              {isBiometricSupported && showButtonBiometric && (
                <TouchableOpacity style={styles.biometricButton} onPress={authenticateUser}>
                  <Icon name="fingerprint" size={50} color="#fff" />

                </TouchableOpacity>
              )}
            </View>
            <Text style={styles.iniciar}>No tienes cuenta? <TouchableOpacity onPress={() => navigation.navigate("Register")}><Text style={{ color: "white", top: 2.5, fontWeight: "600" }}>Registrarse</Text></TouchableOpacity></Text>

          </View>
        </View>

      </ScrollView>



    </BaseAppScreen>
  );
};

const SocialButton = ({ iconName, onPress }) => {

  const iconPaths = {
    'google': require('../../assets/iconos/google.webp'),
    'facebook': require('../../assets/iconos/facebook.webp'),
    'apple': require('../../assets/iconos/white.png'),
    'mail': require('../../assets/iconos/mail.webp'),

  };
  const iconSource = iconPaths[iconName];

  return (
    <TouchableOpacity style={styles.buttons} onPress={onPress}>
      {iconSource && <Image source={iconSource} style={[styles.logoIcon, { width: iconName == "apple" ? 35 : 40, height: iconName == "apple" ? 35 : 40 }]} />}
    </TouchableOpacity>
  );


}

const styles = StyleSheet.create({
  containers: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.background // Assuming you want a black background as in the image
  },
  logoIcon: {

    overflow: "hidden",
  },
  buttons: {
    padding: 5, // You can adjust the padding as needed
    marginHorizontal: 12
    // Add more styling if needed
  },
  iniciar: {
    color: "#64666E",
    fontSize: 15,
    marginTop: 65,
    textAlign: "center",
  },

  subtitulo: {
    color: "#F6F6F6",
    lineHeight: 30,
    textAlign: "center",
    fontFamily: FontFamily.proximaNovaRegular,
    fontSize: 30,
  },
  container: {
    flex: 1,
    top: Platform.OS == 'android' ? 50 : 10,
    marginBottom: Dimensions.get("screen").height / 4,

    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'white',
    borderColor: "#4931a1",
    fontFamily: FontFamily.proximaNovaRegular,
    marginTop: 10,
    padding: 10,
    borderRadius: 60
  },
  biometricButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  continue: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4931a1', // Cambia el color según tu diseño
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  biometricButtonText: {
    textAlign: 'center',
    color: 'black',
    padding: 7,
    // Agrega otros estilos para el texto si es necesario
  },
  image: {
    width: 330,
    height: 180,
    margin: 30
  },
  title: {
    ...GlobalStyles.title,
    fontWeight: '700',
    paddingHorizontal: 2,
    color: Colors.textDark,
    fontSize: 20,
    lineHeight: 25,
  },
  text: {
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 21,
    marginBottom: 32,
    fontFamily: 'Raleway-Regular'
  },
  form: {
    marginVertical: 30,
  },

});
export default Login;
