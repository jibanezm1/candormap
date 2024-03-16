import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView, Image } from 'react-native';
import { List, Switch } from 'react-native-paper';
import Input from '../../components/atoms/Input/Input';
import axios from 'axios';
import { Modal, ModalFooter, ModalButton, ModalContent } from 'react-native-modals';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/slices/usuariosSlice';
import PhoneInput from 'react-native-international-phone-number';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/Ionicons';
import { countries } from '../../utils/countries';
import BaseAppScreen from '../../templates/BaseAppScreen';
import { Color, FontFamily } from '../../styles/Global';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import GlobalStyles from '../../styles/GlobalStyles';
import PrimaryButton from '../../components/atoms/Buttons/PrimaryButton';
import Cabeza from '../../components/molecules/Header';



const Profile = () => {
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const [isVisible, setIsVisible] = useState(false);
  const [status, setStatus] = useState('');
  const [error, setError] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [isError, setIsError] = useState(false);
  const [currentStep, setCurrentStep] = useState(1); // Nuevo estado para controlar el paso actual

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [countryExpanded, setCountryExpanded] = useState(false);
  const [profileTypeExpanded, setProfileTypeExpanded] = useState(false);

  // Función para manejar la selección de país
  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setCountryExpanded(false); // Cierra el acordeón al seleccionar un país
  };

  // Función para manejar la selección del tipo de perfil
  const handleProfileTypeSelect = (type) => {
    setIsSwitchOn(type === '1' ? true : false);
    setProfileTypeExpanded(false); // Cierra el acordeón al seleccionar un tipo
  };


  const handleCountryChange = (country) => {
    setSelectedCountry(country);
  };


  const handleInputValue = (phoneNumber) => {
    setInputValue(phoneNumber);
  }

  const handleRegister = () => {
    if (!nombre || !apellidos || !email || !password || !inputValue) {
      setStatus("Por favor, complete todos los campos.");
      setIsError(true);
      setIsVisible(true);
      return;
    }

    if (password !== password2) {
      setStatus("Las contraseñas no coinciden.");
      setIsError(true);
      setIsVisible(true);
      return;
    }

    const userData = {
      nombre: nombre,
      apellidos: apellidos,
      email: email,
      password: password,
      telefono: inputValue,
      idPerfil: isSwitchOn == true ? 2 : 1,
      country: selectedCountry,
    };
    console.log(userData);
    axios.post('https://candormap.cl/api/register', userData)
      .then(response => {
        if (response.data.status === "error") {
          setStatus(response.data.message);
          setIsError(true);
          setIsVisible(true);
        } else {
          handleLogin(email, password);
          setStatus("Registro exitoso");
          setIsError(false);
          setIsVisible(true);
          handleSuccessfulRegistration(); // Nueva función para manejar registro exitoso
        }
      })
      .catch(error => {
        console.log(error);
        setStatus(error.message);
        setIsError(true);
        setIsVisible(true);
      });
  };

  const handleLogin = async (inputEmail, inputPassword) => {
    try {
      const response = await axios.post('https://candormap.cl/api/login', {
        email: inputEmail,
        password: inputPassword,
      });

      const user = response.data;
      await AsyncStorage.setItem('currentUser', JSON.stringify(user));
      dispatch(loginUser(user));
    } catch (error) {
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

  const handleSuccessfulRegistration = () => {
    Alert.alert(
      "Habilitar Autenticación Biométrica",
      "¿Deseas habilitar el inicio de sesión con FaceID o huella dactilar?",
      [
        {
          text: "Sí",
          onPress: () => enableBiometricAuth(),
        },
        {
          text: "No",
          onPress: () => console.log("Biometric Auth declined"),
          style: "cancel"
        },
      ],
      { cancelable: false }
    );
  };




  const enableBiometricAuth = async () => {
    try {
      await FingerprintScanner.authenticate({ description: 'Escanea tu huella' });
      // Si la autenticación es exitosa, guarda un indicador en AsyncStorage
      await AsyncStorage.setItem('biometricEnabled', 'true');
      console.log("Autenticación biométrica habilitada y guardada");
    } catch (error) {
      console.error("Error en la autenticación biométrica", error);
    }
  };


  const goToNextStep = () => {
    // Validaciones del paso 1 antes de avanzar
    if (currentStep === 1 && (!nombre || !apellidos || !email || !selectedCountry)) {
      Alert.alert("Error", "Por favor, completa todos los campos del paso 1.");
      return;
    }
    setCurrentStep(currentStep + 1);
  };

  const goToPreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <BaseAppScreen>
      <Cabeza tittle='Registrarse' menu={false} close={currentStep == 2 ? goToPreviousStep : null} />

      <ScrollView style={{ backgroundColor: "", padding: 10, top: 20 }}>
        <View style={[styles.container, { marginHorizontal: 20 }]}>
          <Image
            style={[{ paddingVertical: 5, width: 40, height: 40, marginBottom: 10 }]}

            source={require("../../assets/images_black/persona.png")}
          />
          <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
            <Text style={[styles.subtitulo,]}>Registrarse</Text>
            <Text style={[GlobalStyles.secondaryText, { marginTop: 30, paddingHorizontal: 50 }]}>Sólo algunos detalles para comenzar</Text>
          </View>
        </View>
        <KeyboardAwareScrollView

          innerRef={ref => {
            this.scroll = ref
          }}>
          {currentStep === 1 && (
            <View style={styles.inputContainer}>
              <Input placeholder=" Nombre" value={nombre} onChangeText={setNombre} />
              <Input placeholder=" Apellido" value={apellidos} onChangeText={setApellidos} />
              <Input placeholder=" Email" value={email} onChangeText={setEmail} />
              <List.Accordion
                title={selectedCountry ? selectedCountry : "País"}
                expanded={countryExpanded}
                onPress={() => setCountryExpanded(!countryExpanded)}
                theme={{ colors: { background: Color.background } }}
                style={{ backgroundColor: "#272A31",  marginVertical: 10, borderRadius: 60 }}
                titleStyle={{ color: Color.designLightGray, textAlign: "center", marginLeft:30}}
              >
                {countries.map((country, index) => (
                  <List.Item
                    key={index}
                    title={country.label}
                    onPress={() => handleCountrySelect(country.value)}
                    titleStyle={{ color: 'white' }}
                    style={{ backgroundColor: '#3A3E47' }}
                  />
                ))}
              </List.Accordion>
              <TouchableOpacity style={{
                flexDirection: 'row',
                justifyContent: "center"
              }}
                onPress={goToNextStep}>
                <Image
                  source={require('../../assets/images_black/volver.png')}
                  style={{ width: 80, height: 80, marginRight: -10, transform: [{ rotate: '180deg' }] }}
                />
              </TouchableOpacity>

            </View>
          )}

          {currentStep === 2 && (
            <View style={styles.inputContainer}>
              <List.Accordion
                title={isSwitchOn ? 'Investigador' : 'Encuestado'}
                expanded={profileTypeExpanded}
                onPress={() => setProfileTypeExpanded(!profileTypeExpanded)}
                theme={{ colors: { background: Color.background } }}
                style={{ backgroundColor: "#272A31", padding: 30, marginVertical: 10, borderRadius: 60 }}
                titleStyle={{ color: 'white' }}
              >
                <List.Item
                  title="Investigador"
                  onPress={() => handleProfileTypeSelect('1')}
                  titleStyle={{ color: 'white' }}
                  style={{ backgroundColor: '#3A3E47' }}
                />
                <List.Item
                  title="Encuestado"
                  onPress={() => handleProfileTypeSelect('2')}
                  titleStyle={{ color: 'white' }}
                  style={{ backgroundColor: '#3A3E47' }}
                />
              </List.Accordion>
              <Input
                placeholder="Codigo de Area + Num. de Telefono"
                value={inputValue}
                onChangeText={setInputValue}
              />
              <Input
                placeholder="Ingrese una contraseña"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
              <Input
                placeholder="Repite la contraseña"
                secureTextEntry
                value={password2}
                onChangeText={setPassword2}
              />
              <View style={{ width: "100%", }}>
                <PrimaryButton title="Crear Cuenta" onPress={handleRegister} />
                <Text style={styles.iniciar}>¿Ya tienes cuenta? <TouchableOpacity onPress={() => navigation.navigate("Login")}><Text style={{ color: "white", top: 2.5, fontWeight: "bold" }}>Iniciar sesión</Text></TouchableOpacity></Text>

              </View>
              {/* <View style={{ width: "100%", marginBottom: 100 }}>
                <PrimaryButton title="Anterior" onPress={goToPreviousStep} />
              </View> */}
            </View>
          )}
          {/* <View style={styles.inputContainer}>

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
              placeholder='Ingrese su Correo'
              disabled={false}
              value={email}
              style={{ marginVertical: 10 }}

              onChangeText={text => setEmail(text)}
            />
            <List.Accordion
              title={selectedCountry ? selectedCountry : "Seleccione el país"}
              expanded={countryExpanded}
              onPress={() => setCountryExpanded(!countryExpanded)}
              theme={{ colors: { background: Color.background } }}
              style={{ backgroundColor: "#272A31", padding: 30, marginVertical: 10, borderRadius: 60 }}
              titleStyle={{ color: 'white' }}
            >
              {countries.map((country, index) => (
                <List.Item
                  key={index}
                  title={country.label}
                  onPress={() => handleCountrySelect(country.value)}
                  titleStyle={{ color: 'white' }}
                  style={{ backgroundColor: '#3A3E47' }}
                />
              ))}
            </List.Accordion>

           

            <Input
              placeholderTextColor={'#8F8C9D'}
              placeholder='Codigo de Area + Num. de Telefono'
              disabled={false}
              value={inputValue}
              style={{ marginVertical: 10 }}


              onChangeText={text => setInputValue(text)}
            />

            <Input
              placeholderTextColor={'#8F8C9D'}
              placeholder='Ingrese una contraseña'
              disabled={false}
              value={password}
              style={{ marginVertical: 10 }}

              onChangeText={text => setPassword(text)}
              secureTextEntry
            />
            <Input
              label='Repite la contraseña'
              placeholder='Repite la contraseña'
              placeholderTextColor={'#8F8C9D'}
              disabled={false}
              value={password2}
              style={{ marginVertical: 10 }}
              onChangeText={text => setPassword2(text)}
              secureTextEntry
            />

            <View style={{ width: "100%", marginBottom: 100 }}>
              <PrimaryButton title="Crear Cuenta" onPress={handleRegister} />
            </View>
          </View> */}
        </KeyboardAwareScrollView>

        <Modal
          visible={isVisible}
          swipeDirection={['up', 'down']} // can be string or an array
          swipeThreshold={200} // default 100 juan.ibanez@outlook.com
          onSwipeOut={(event) => {
            setIsVisible(false);
          }}

        >

          <ModalContent>
            <View>
              <Text>{status}</Text>
            </View>
          </ModalContent>
          <ModalFooter>
            {isError ? (
              <ModalButton
                text="Salir"
                onPress={() => setIsVisible(false)}
              />
            ) : (
              <ModalButton
                text="Ingresar"
                onPress={() => { navigation.navigate('Onboarding'); setIsVisible(false); }}
              />
            )}
          </ModalFooter>
        </Modal>



      </ScrollView>
    </BaseAppScreen>

  );
};

const styles = StyleSheet.create({
  secondaryText: {
    textAlign: "center",
    color: Color.designLightGray,
    textTransform: "uppercase",
    fontSize: 12,
    fontFamily: FontFamily.proximaNovaRegular,
  },
  iniciar: {
    color: "#64666E",
    fontSize: 15,
    marginTop: 15,
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
  inputContainer: {
    marginVertical: 30,
    marginHorizontal: 30,
    padding: 10,
    backgroundColor: Color.background
  },
  button: {
    borderWidth: 1,
    borderColor: "#4931a1",
    paddingHorizontal: 26,
    padding: 10,
    borderRadius: 10
  },
  button2: {
    backgroundColor: 'white',
    borderColor: "#4931a1",
    fontFamily: FontFamily.proximaNovaRegular,
    top: 5,
    padding: 16,
    borderRadius: 60
  },
  containerButtons: {
    justifyContent: "space-around",
    flexDirection: "row",
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

export default Profile;
